# Ritual Tweet Forge

Premium static web app for generating unique Ritual tweet drafts and saving selected drafts on Ritual Testnet.

## Features

- Ritual tweet draft generator for community members
- Topic, tone, and custom angle controls
- Audience, length, CTA, mention, and hook controls
- Content structures: Problem First, Comparison / Contrast, Fact Lead, Narrative, Question Hook, Builder Insight, Myth vs Reality, and Mini Thread
- Five unique drafts per generation
- Required Ritual Testnet gas transaction before each generation
- Required mentions for `@ritualnet` and `@ritualfnd`
- Casual human-sounding outputs with no visible structure labels
- Mixed hook styles, natural endings, and hashtags that can appear mid-tweet or at the end
- Copy feedback with button state, card flash, and toast confirmation
- Copy-to-clipboard buttons and X share flow
- Local tweet draft history
- Ritual Testnet wallet helper using Chain ID `1979`
- EVM wallet selector for OKX Wallet, MetaMask, Rabby, Coinbase, Brave, Trust, and EIP-6963 wallets
- Optional draft-saving transaction on Ritual Testnet, paid with testnet gas
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

The current app is frontend-only so it can ship quickly. Next upgrades can connect generations to an API, save records in Supabase, or replace the local generator with Ritual LLM / agent precompile calls when you are ready.
