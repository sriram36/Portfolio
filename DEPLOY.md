# Running and deploying the portfolio

## Look at it locally

```
python -m http.server 3200 --bind 127.0.0.1
```

Open http://127.0.0.1:3200. `npm test` checks the data and the file wiring (Node 18 or newer, no packages to install). Without the Worker, the page calls GitHub and pings the demos from the visitor's browser.

## Deploy to Cloudflare

The Worker in `worker/index.js` serves the static files and adds two endpoints:

| Path | What it returns | Cached for |
|---|---|---|
| `/api/github` | repo names with their last push, and recent public pushes | 10 minutes |
| `/api/ping` | latency of each demo, measured from Cloudflare's edge | 30 seconds |

```
npx wrangler login
npx wrangler deploy
```

`wrangler.jsonc` names the Worker `portfolio`, which gives `portfolio.<your-subdomain>.workers.dev`. `.assetsignore` keeps the Worker code, git data and local analysis out of the public files.

Optional: lift GitHub's rate limit by adding a read-only token with no scopes.

```
npx wrangler secret put GITHUB_TOKEN
```

To try the Worker locally: `npx wrangler dev`.

## Files that must be deployed

`index.html`, `css/`, `js/`, `fonts/`, `favicon.svg` and `og-image.png`. The Resume links point to a Dropbox file, so update the resume there, not in this folder.

## Share image

`og-image.png` is a plain image. Its numbers (8 of 28) do not update by themselves. If the counts change, regenerate it.
