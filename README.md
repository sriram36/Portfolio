# Sriram Kolli, portfolio

Live site: https://portfolio.kollisriram6.workers.dev

Most portfolios show the projects that survived. This one starts with every project I started, public or private, and shows what happened to each: how many are live, what I learned, and what is not sorted yet.

## What is on the page

- A ball board. Every project is a ball that falls into the bin for its outcome. You can drag a ball, push it with the cursor, or scrub a time-lapse from April 2025 to now.
- Experience, selected work, how the main projects work, and the decisions behind two of them.
- Small simulations you can poke at: a grader lookup inspector, a concurrent-approvals sandbox, and a game where you pick the best of 40 random strategies.
- Every claim is marked "Check it" (it links to something verifiable) or "My word" (it does not).
- Optional extras: sound (off until you press Sound), a skim view, a search palette on `/` or Ctrl+K, and a black and white print layout.

## Files

| Path | What it is |
|---|---|
| `index.html` | The markup only |
| `css/` | Styles, one file per concern: base, hero, sections, footer, motion, widgets, print |
| `js/data.js` | All the content: projects, outcomes, receipts, skills. Edit this to change what the page says |
| `js/core.js`, `util.js` | The project list and shared helpers |
| `js/board.js`, `sound.js`, `render.js`, `app.js` | The ball board, synthesized sound, section rendering and start-up |
| `js/features/` | One file per feature: time-lapse, search palette, sandbox, inspector and so on |
| `tests/` | Node tests for the data and the file wiring |
| `fonts/` | Self-hosted Bricolage Grotesque |
| `favicon.svg`, `og-image.png` | Icon and link preview image |
| `_headers`, `wrangler.jsonc` | Security headers and Cloudflare static-asset config |
| `tools/` | Regenerates the link preview image from the live counts |

There is no build step. The scripts are plain classic scripts loaded in order (see the bottom of `index.html`), so they share one global scope.

## Run it

```
python -m http.server 3200 --bind 127.0.0.1
```

Open http://127.0.0.1:3200. Run `npm test` to check the data. Deployment steps are in [DEPLOY.md](DEPLOY.md).

## Editing the data

The project list, outcomes and notes are in `js/data.js` (`const P=[...]`). Add or change a row, and the board, the counts and the time-lapse follow.
