# Ritual Tweet Forge

Premium static web app for generating unique Ritual tweet drafts and saving selected drafts on Ritual Testnet.

## Features

- Ritual tweet draft generator for community members
- Topic, tone, and custom angle controls
- Audience, length, CTA, mention, and hook controls
- Auto / no preference mode for every major control so users can generate without filling every choice
- Uniqueness mode with High uniqueness enabled by default for stronger variation across users and variants
- Keyword Focus dropdown with Ritual keywords such as verifiable compute, onchain agents, Ritual Chain, AI x crypto, testnet activity, async execution, validators / executors, and private AI
- Keyword style control for natural, direct, subtle, or question-based keyword usage
- Content structures: Problem First, Comparison / Contrast, Fact Lead, Narrative, Question Hook, Builder Insight, Myth vs Reality, and Mini Thread
- Five unique drafts per generation
- Required MetaMask-compatible 0 RITUAL self-transaction before each generation
- Required mentions for `@ritualnet` and `@ritualfnd`
- Optional bottom-only team mentions for `@Jez_Cryptoz`, `@joshsimenhoff`, `@0xMadScientist`, `@dunken9718`, and `@cryptooflashh`
- Casual human-sounding outputs with no visible structure labels
- Mixed hook styles, natural endings, and mentions that can appear mid-tweet or at the end
- Copy feedback with button state, card flash, and toast confirmation
- Copy-to-clipboard buttons and X share flow
- Advanced AI image prompt builder with ratio, style, scene, and prompt mode controls
- Required MetaMask-compatible 0 RITUAL self-transaction before each image prompt build
- Prompt state indicator when image settings or selected tweet need a rebuild
- Ratio options: 1:1, 16:9, 4:5, 9:16, and 3:2
- Copyable image prompts based on the selected tweet, topic, seed, and tx hash
- Open ChatGPT helper next to the reliable copy prompt button
- Local tweet draft history
- Ritual Testnet wallet helper using Chain ID `1979`
- EVM wallet selector for OKX Wallet, MetaMask, Rabby, Coinbase, Brave, Trust, and EIP-6963 wallets
- Manual Ritual Testnet details are surfaced in wallet errors: Chain ID `1979`, RPC `https://rpc.ritualfoundation.org`, symbol `RITUAL`
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
