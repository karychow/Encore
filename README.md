# Encore — landing page

Marketing landing page for Encore, the energy copilot for dancers. Static HTML/CSS/JS, no build step.

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Deploy

Deploys to Vercel as a static site — no framework, no build command needed. Connect this repo in the Vercel dashboard, or run `vercel` from this directory.

## Notes

- The waitlist form stores signups to `localStorage` only; wire it to a real email service (e.g. a Vercel serverless function, Formspree, ConvertKit) before launch.
- Copy pulled from the Encore MVP design. Placeholder partner/pilot-city details should be confirmed before shipping publicly.
