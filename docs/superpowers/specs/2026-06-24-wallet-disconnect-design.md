# Wallet Disconnect Design

## Goal

Give connected users an obvious way to end the wallet session inside Ritual Tweet Forge without disconnecting or removing the account from their wallet extension.

## Interaction

- Before connection, the header control reads `Connect wallet` and opens the existing wallet selector.
- After connection, the header control shows the shortened wallet address.
- Clicking the connected address opens a compact menu anchored below the control.
- The menu contains one action: `Disconnect wallet`.
- Choosing it clears the app's selected provider, wallet name, wallet address, and connected UI state.
- The header returns to `Connect wallet`, network status returns to `No wallet`, and a short confirmation appears in the existing status line.
- Clicking outside the menu or pressing Escape closes it without disconnecting.

## Technical Boundaries

Injected EVM providers generally do not expose a universal disconnect method. The feature therefore disconnects only the app session. MetaMask, OKX Wallet, Rabby, or another extension remains authorized until the user revokes the site from that wallet.

The implementation will reuse the existing header button, wallet state variables, and status elements. A small menu element and focused state-reset helper will be added. No transaction or network behavior changes.

## Accessibility

- The address button exposes whether the menu is expanded.
- The menu action is keyboard focusable.
- Escape closes the menu and returns focus to the address button.
- Labels describe the action explicitly.

## Verification

- Add a focused behavior test for clearing connected state and restoring disconnected labels.
- Verify connect behavior still opens the selector when disconnected.
- Verify the menu opens only when connected and closes on outside click or Escape.
- Run JavaScript syntax checks and the production build.
