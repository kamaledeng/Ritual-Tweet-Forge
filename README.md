# Ritual Tweet Forge

Premium static web app for generating unique Ritual tweet drafts and saving selected drafts on Ritual Testnet.

## Features

- Ritual tweet draft generator for community members
- Topic, tone, and custom angle controls
- Five unique drafts per generation
- Copy-to-clipboard and X share flow
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
