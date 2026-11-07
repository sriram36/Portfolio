// Cloudflare Worker for the portfolio.
// Serves the static files, and adds two small endpoints so visitors' browsers
// do not each have to call GitHub or ping the demos themselves:
//   GET /api/github  repos (name, last push) and recent public pushes, cached for 10 minutes
//   GET /api/ping    latency of each deployed demo, measured from Cloudflare's edge, cached for 30 seconds
// Optional secret: GITHUB_TOKEN (a read-only token with no scopes) raises GitHub's rate limit.

const USER = 'sriram36';
const TARGETS = [
  ['LeaveFlow demo', 'https://leave-flow-cyan.vercel.app'],
  ['FinSight app', 'https://finsight-wine-tau.vercel.app'],
  ['FinSight API', 'https://finsight-api-d84z.onrender.com/docs'],
  ['RefillCare app', 'https://refillcare.vercel.app'],
  ['RefillCare API', 'https://refillcare.onrender.com/docs'],
  ['School bus tracker', 'https://location-sharing-chi.vercel.app'],
  ['Wind forecast', 'https://x7z9p-yxu2.vercel.app'],
];
const SECURITY = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'x-frame-options': 'DENY',
};

const json = (data, ttl, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': `public, max-age=${ttl}`,
    },
  });

// Cache a response at the edge, keyed by path only.
async function cached(req, ctx, make) {
  const cache = typeof caches !== 'undefined' ? caches.default : null;
  const u = new URL(req.url);
  const key = new Request(u.origin + u.pathname);
  if (cache) {
    const hit = await cache.match(key);
    if (hit) return hit;
  }
  const res = await make();
  if (cache && res.ok) ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

async function github(env) {
  const headers = { 'user-agent': 'portfolio-worker', accept: 'application/vnd.github+json' };
  if (env.GITHUB_TOKEN) headers.authorization = 'Bearer ' + env.GITHUB_TOKEN;
  const [a, b] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`, { headers }),
    fetch(`https://api.github.com/users/${USER}/events/public?per_page=40`, { headers }),
  ]);
  if (!a.ok && !b.ok) return json({ error: 'GitHub is unavailable' }, 30, 502);
  const repos = a.ok
    ? (await a.json()).filter((g) => !g.fork).map((g) => ({ name: g.name, pushed_at: g.pushed_at }))
    : [];
  const events = b.ok
    ? (await b.json())
        .filter((e) => e.type === 'PushEvent')
        .slice(0, 12)
        .map((e) => ({ repo: e.repo.name, size: (e.payload && e.payload.size) || 1, created_at: e.created_at }))
    : [];
  return json({ t: Date.now(), repos, events }, 600);
}

async function ping(req) {
  const colo = (req.cf && req.cf.colo) || null;
  const results = await Promise.all(
    TARGETS.map(async ([name, url]) => {
      const start = Date.now();
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 8000);
      try {
        const r = await fetch(url, { signal: ctl.signal, redirect: 'follow', headers: { 'user-agent': 'portfolio-worker-ping' } });
        return { name, ms: Date.now() - start, status: r.status, ok: r.status < 500 };
      } catch (e) {
        return { name, ms: -1, status: 0, ok: false };
      } finally {
        clearTimeout(timer);
      }
    })
  );
  return json({ t: Date.now(), colo, results }, 30);
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    try {
      if (url.pathname === '/api/github' && req.method === 'GET') return await cached(req, ctx, () => github(env));
      if (url.pathname === '/api/ping' && req.method === 'GET') return await cached(req, ctx, () => ping(req));
      if (url.pathname.startsWith('/api/')) return json({ error: 'not found' }, 60, 404);
    } catch (e) {
      return json({ error: 'upstream failure' }, 30, 502);
    }
    const res = await env.ASSETS.fetch(req);
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY)) out.headers.set(k, v);
    return out;
  },
};
