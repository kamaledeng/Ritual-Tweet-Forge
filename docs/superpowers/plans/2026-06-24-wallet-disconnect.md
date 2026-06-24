# Wallet Disconnect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a functional wallet menu that lets connected users disconnect their local Ritual Tweet Forge session.

**Architecture:** Keep the existing injected-wallet connection flow. Add a small reusable session reset helper, an anchored header menu, and event handling for disconnect, outside click, and Escape.

**Tech Stack:** Static HTML, CSS, browser JavaScript modules, Node.js built-in test runner.

## Global Constraints

- Disconnect only the app session; do not attempt to revoke permissions inside MetaMask, OKX, Rabby, or another wallet.
- Preserve all existing transaction and network behavior.
- Keep the header compact on desktop and mobile.

---

### Task 1: Wallet Session Reset

**Files:**
- Create: `wallet-session.js`
- Create: `tests/wallet-session.test.mjs`
- Modify: `package.json`
- Modify: `scripts/build.mjs`

**Interfaces:**
- Produces: `clearWalletSession(state)` returning empty wallet state.

- [x] Write a failing Node test asserting address, provider, and wallet name are cleared.
- [x] Run `npm test` and confirm it fails because the module is missing.
- [x] Add the minimal session reset helper and include it in the static build.
- [x] Run `npm test` and confirm it passes.

### Task 2: Header Disconnect Menu

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

**Interfaces:**
- Consumes: `clearWalletSession(state)`.
- Produces: connected-address menu with `Disconnect wallet`.

- [x] Add source-level failing assertions for menu markup and event wiring.
- [x] Run `npm test` and confirm the new assertions fail.
- [x] Add accessible menu markup and responsive styling.
- [x] Change connected button behavior to toggle the menu; keep disconnected behavior opening the wallet selector.
- [x] Clear local state and restore `Connect wallet`, `No wallet`, and the status message on disconnect.
- [x] Close the menu on outside click and Escape.
- [x] Run tests, JavaScript syntax checks, and `npm run build`.

### Task 3: Publish

**Files:**
- Modify only generated `dist` output through the build.

- [ ] Inspect the final diff for scope.
- [ ] Commit the implementation.
- [ ] Push `main` to `origin`.
