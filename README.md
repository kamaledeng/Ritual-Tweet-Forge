# Ritual Agent Arena

Premium static web app for a Ritual-native multi-agent battle experience.

## Features

- Agent-vs-agent battle simulator with judge verdicts
- Clear community purpose section for builders and reviewers
- Premium first-screen arena interface with preset challenge prompts
- Battle telemetry for persistence, coordination, and Ritual fit
- Agent roster section with Ritual-native roles and strengths
- Local battle history and leaderboard
- Ritual Testnet wallet helper using Chain ID `1979`
- Optional battle anchoring transaction on Ritual Testnet, paid with testnet gas
- Official Ritual links for docs, explorer, faucet, and website
- No framework or backend required, ready for Vercel static deploy

## Local

Open `index.html` directly, or run:

```bash
npm run dev
```

Build the Vercel output with:

```bash
npm run build
```

## Vercel

Vercel runs:

```bash
npm run build
```

and serves the `dist` directory.

## Upgrade Path

The current app is frontend-only so it can ship quickly. Next upgrades can connect battles to an API, save records in Supabase, or replace the deterministic simulator with Ritual LLM / agent precompile calls when you are ready.
