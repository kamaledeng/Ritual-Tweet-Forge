import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("clearWalletSession removes all local wallet identity", async () => {
  const { clearWalletSession } = await import("../wallet-session.js");
  const connected = {
    walletAddress: "0xcf3d000000000000000000000000000000007232",
    selectedProvider: { isMetaMask: true },
    selectedWalletName: "MetaMask"
  };

  assert.deepEqual(clearWalletSession(connected), {
    walletAddress: "",
    selectedProvider: null,
    selectedWalletName: ""
  });
});

test("header includes an accessible disconnect menu", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /id="walletMenu"/);
  assert.match(html, /Connected wallet/);
  assert.match(html, /id="walletMenuAddress"/);
  assert.match(html, /Ritual session active/);
  assert.match(html, /id="disconnectWallet"/);
  assert.match(html, />Disconnect</);
  assert.match(html, /Only disconnects this app/);
});

test("app wires disconnect, outside click, and Escape behavior", async () => {
  const source = await readFile(new URL("../app.js", import.meta.url), "utf8");

  assert.match(source, /disconnectWallet\.addEventListener/);
  assert.match(source, /clearWalletSession/);
  assert.match(source, /walletMenuAddress\.textContent = shortAddress\(walletAddress\)/);
  assert.match(source, /walletMenuAddress\.textContent = "Not connected"/);
  assert.match(source, /event\.key === "Escape"/);
  assert.match(source, /walletMenu\.contains/);
});
