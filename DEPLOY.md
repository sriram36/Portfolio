# Running and deploying the portfolio

## Look at it locally

```
python -m http.server 3200 --bind 127.0.0.1
```

Open http://127.0.0.1:3200. `npm test` checks the data and the file wiring (Node 18 or newer, no packages to install).

## Deploy to Cloudflare

The site is static files on Cloudflare Workers static assets. There is no Worker code and no build step.

```
npx wrangler login
npx wrangler deploy
```

`wrangler.jsonc` names the project `portfolio`, which gives `portfolio.<your-subdomain>.workers.dev`. `_headers` sets the security headers. `.assetsignore` keeps tests, tools, git data and local files out of the public files.

You can also connect the GitHub repo in the Cloudflare dashboard (Workers and Pages, then Builds), so every push to `main` deploys.

## Files that must be deployed

`index.html`, `css/`, `js/`, `fonts/`, `_headers`, `favicon.svg` and `og-image.png`. The Resume links point to a Dropbox file, so update the resume there, not in this folder.

## Share image

`og-image.png` is a plain image. Its numbers (8 of 28) do not update by themselves. If the counts change, run `python tools/make_og.py`.
