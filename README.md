# Sriram Kolli, portfolio

Live site: https://portfolio.kollisriram6.workers.dev

Most portfolios show the projects that survived. This one starts with every project I started, public or private, and shows what happened to each: how many are live, what I learned, and what is not sorted yet.

## What is on the page

- A ball board. Every project is a ball that falls into the bin for its outcome. You can drag a ball, push it with the cursor, or scrub a time-lapse from April 2025 to now.
- Experience, selected work, how the main projects work, and the decisions behind two of them.
- Small simulations you can poke at: a grader lookup inspector, a concurrent-approvals sandbox, and a game where you pick the best of 40 random strategies.
- Live latency for the deployed demos and my latest GitHub pushes.
- Every claim is marked "Check it" (it links to something verifiable) or "My word" (it does not).
- Optional extras: sound (off until you press Sound), a skim view, a search palette on `/` or Ctrl+K, and a black and white print layout.

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole page: markup, styles and scripts. No build step. |
| `fonts/` | Self-hosted Bricolage Grotesque |
| `favicon.svg`, `og-image.png` | Icon and link preview image |
| `worker/` | Cloudflare Worker that serves the files and caches GitHub data and edge pings |
| `resume/` | Builds the ATS-friendly resume copy and compares it with a job description |
| `tools/` | Regenerates the link preview image from the live counts |

## Run it

```
python -m http.server 3200 --bind 127.0.0.1
```

Open http://127.0.0.1:3200. Deployment steps are in [DEPLOY.md](DEPLOY.md).

## Editing the data

The project list, outcomes and notes are at the top of the script in `index.html` (`const P=[...]`). Add or change a row, and the board, the counts and the time-lapse follow.
