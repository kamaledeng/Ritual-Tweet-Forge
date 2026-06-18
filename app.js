const ritualChain = {
  chainId: "0x7BB",
  chainName: "Ritual Testnet",
  nativeCurrency: {
    name: "RITUAL",
    symbol: "RITUAL",
    decimals: 18
  },
  rpcUrls: ["https://rpc.ritualfoundation.org"],
  blockExplorerUrls: ["https://explorer.ritualfoundation.org"]
};

const agents = [
  {
    name: "Sovereign Strategist",
    role: "Designs autonomous agents that can hold state, money, and long-term objectives.",
    verbs: ["persists", "coordinates", "monetizes", "defends"],
    strengths: ["agent identity", "RitualWallet flow", "long-running execution"],
    bias: 9
  },
  {
    name: "Mechanism Designer",
    role: "Optimizes incentives, scoring, and market structure for machine participants.",
    verbs: ["prices", "allocates", "settles", "scores"],
    strengths: ["incentive design", "leaderboards", "market quality"],
    bias: 7
  },
  {
    name: "TEE Sentinel",
    role: "Protects secrets, attestations, and privacy boundaries for adversarial settings.",
    verbs: ["verifies", "encrypts", "redacts", "attests"],
    strengths: ["privacy", "secret handling", "executor trust"],
    bias: 8
  },
  {
    name: "Community Oracle",
    role: "Turns builder needs and social signals into product decisions.",
    verbs: ["listens", "summarizes", "ranks", "broadcasts"],
    strengths: ["community loops", "shareability", "onboarding"],
    bias: 6
  },
  {
    name: "Protocol Auditor",
    role: "Finds weak assumptions before an agent touches money or production workflows.",
    verbs: ["audits", "stress-tests", "flags", "contains"],
    strengths: ["risk scoring", "failure modes", "contract safety"],
    bias: 8
  }
];

const demoChallenges = [
  "I want to build an AI auditor for Ritual that reviews smart contracts and saves a public risk score on testnet.",
  "I want to build a bounty agent where users post small tasks and an autonomous agent judges completed work.",
  "I want to build a Ritual community idea board where every accepted app idea is saved as a testnet transaction.",
  "I want to build a private AI helper that explains Ritual docs and lets users save useful answers onchain."
];

const presetChallenges = [
  {
    label: "Builder launch",
    prompt: "I want to ship a simple Ritual app in 48 hours. The app should be useful for community members and include one testnet transaction."
  },
  {
    label: "Agent economy",
    prompt: "I want to build an autonomous bounty agent that can score user submissions and create a visible reputation record."
  },
  {
    label: "Privacy UX",
    prompt: "I want to build a private AI assistant for Ritual users, but the app must explain privacy without sounding too technical."
  },
  {
    label: "Community growth",
    prompt: "I want to build a Ritual community app that creates shareable results people would post on X every day."
  }
];

let walletAddress = "";
let lastBattle = null;
let selectedProvider = null;
let selectedWalletName = "";
let discoveredWallets = [];

const elements = {
  form: document.querySelector("#battleForm"),
  challengeInput: document.querySelector("#challengeInput"),
  agentA: document.querySelector("#agentA"),
  agentB: document.querySelector("#agentB"),
  judgeMode: document.querySelector("#judgeMode"),
  intensity: document.querySelector("#intensity"),
  connectWallet: document.querySelector("#connectWallet"),
  walletLabel: document.querySelector("#walletLabel"),
  walletModal: document.querySelector("#walletModal"),
  walletList: document.querySelector("#walletList"),
  closeWalletModal: document.querySelector("#closeWalletModal"),
  switchRitual: document.querySelector("#switchRitual"),
  statusLine: document.querySelector("#statusLine"),
  networkStatus: document.querySelector("#networkStatus"),
  matchTitle: document.querySelector("#matchTitle"),
  agentAName: document.querySelector("#agentAName"),
  agentBName: document.querySelector("#agentBName"),
  agentAOutput: document.querySelector("#agentAOutput"),
  agentBOutput: document.querySelector("#agentBOutput"),
  agentAScore: document.querySelector("#agentAScore"),
  agentBScore: document.querySelector("#agentBScore"),
  winnerText: document.querySelector("#winnerText"),
  judgeReason: document.querySelector("#judgeReason"),
  anchorBattle: document.querySelector("#anchorBattle"),
  txLink: document.querySelector("#txLink"),
  shareX: document.querySelector("#shareX"),
  leaderboardList: document.querySelector("#leaderboardList"),
  battleHistory: document.querySelector("#battleHistory"),
  battleTimeline: document.querySelector("#battleTimeline"),
  agentRoster: document.querySelector("#agentRoster"),
  presetRow: document.querySelector("#presetRow"),
  persistenceMetric: document.querySelector("#persistenceMetric"),
  coordinationMetric: document.querySelector("#coordinationMetric"),
  ritualFitMetric: document.querySelector("#ritualFitMetric"),
  seedBattle: document.querySelector("#seedBattle"),
  canvas: document.querySelector("#arenaField")
};

function getProvider() {
  return selectedProvider || getDefaultProvider();
}

function getDefaultProvider() {
  return discoveredWallets[0]?.provider || window.ethereum;
}

function walletIdentity(provider, fallbackName = "Injected Wallet") {
  if (!provider) return fallbackName;
  if (provider.isOkxWallet || provider.isOKExWallet) return "OKX Wallet";
  if (provider.isRabby) return "Rabby";
  if (provider.isCoinbaseWallet) return "Coinbase Wallet";
  if (provider.isTrust) return "Trust Wallet";
  if (provider.isBraveWallet) return "Brave Wallet";
  if (provider.isMetaMask) return "MetaMask";
  return fallbackName;
}

function walletIcon(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function registerWallet(wallet) {
  if (!wallet?.provider) return;

  const alreadyRegistered = discoveredWallets.some((item) => item.provider === wallet.provider || item.id === wallet.id);
  if (alreadyRegistered) return;

  discoveredWallets.push({
    id: wallet.id || wallet.info?.uuid || walletIdentity(wallet.provider),
    name: wallet.name || wallet.info?.name || walletIdentity(wallet.provider),
    icon: wallet.info?.icon || "",
    provider: wallet.provider
  });
}

function discoverInjectedWallets() {
  const ethereum = window.ethereum;
  if (!ethereum) return;

  const providers = Array.isArray(ethereum.providers) ? ethereum.providers : [ethereum];
  providers.forEach((provider, index) => {
    const name = walletIdentity(provider, index === 0 ? "Browser Wallet" : `Wallet ${index + 1}`);
    registerWallet({
      id: `${name}-${index}`,
      name,
      provider
    });
  });
}

function renderWalletList() {
  discoverInjectedWallets();

  elements.walletList.innerHTML = discoveredWallets.length
    ? discoveredWallets.map((wallet, index) => `
      <button class="wallet-option" type="button" data-wallet-index="${index}">
        <span>${wallet.icon ? `<img src="${escapeHtml(wallet.icon)}" alt="" />` : escapeHtml(walletIcon(wallet.name))}</span>
        <div>
          <strong>${escapeHtml(wallet.name)}</strong>
          <small>${selectedProvider === wallet.provider ? "Selected" : "Injected EVM provider"}</small>
        </div>
      </button>
    `).join("")
    : `<div class="wallet-empty"><strong>No EVM wallet detected</strong><span>Install OKX Wallet, MetaMask, Rabby, or open this app in a wallet browser.</span></div>`;
}

function openWalletModal() {
  renderWalletList();
  elements.walletModal.classList.add("active");
  elements.walletModal.setAttribute("aria-hidden", "false");
}

function closeWalletModal() {
  elements.walletModal.classList.remove("active");
  elements.walletModal.setAttribute("aria-hidden", "true");
}

function attachProviderListeners(provider) {
  provider.on?.("chainChanged", refreshNetwork);
  provider.on?.("accountsChanged", (accounts) => {
    walletAddress = accounts[0] || "";
    elements.connectWallet.classList.toggle("connected", Boolean(walletAddress));
    elements.walletLabel.textContent = walletAddress ? shortAddress(walletAddress) : "Connect wallet";
  });
}

function shortAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function populateAgents() {
  agents.forEach((agent, index) => {
    const optionA = new Option(agent.name, String(index));
    const optionB = new Option(agent.name, String(index));
    elements.agentA.add(optionA);
    elements.agentB.add(optionB);
  });
  elements.agentA.value = "0";
  elements.agentB.value = "1";
}

function renderPresetChallenges() {
  elements.presetRow.innerHTML = presetChallenges.map((preset) => `
    <button type="button" data-prompt="${escapeHtml(preset.prompt)}">${escapeHtml(preset.label)}</button>
  `).join("");
}

function renderAgentRoster() {
  elements.agentRoster.innerHTML = agents.map((agent, index) => `
    <article class="roster-card">
      <div>
        <small>Agent 0${index + 1}</small>
        <strong>${escapeHtml(agent.name)}</strong>
      </div>
      <p>${escapeHtml(agent.role)}</p>
      <span>${agent.strengths.map(escapeHtml).join(" / ")}</span>
    </article>
  `).join("");
}

function loadBattles() {
  return JSON.parse(localStorage.getItem("ritual-agent-arena") || "[]");
}

function saveBattle(battle) {
  const battles = [battle, ...loadBattles()].slice(0, 14);
  localStorage.setItem("ritual-agent-arena", JSON.stringify(battles));
  return battles;
}

function hashText(text) {
  return [...text].reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) % 9973;
  }, 17);
}

function scoreAgent(agent, opponent, challenge, judgeMode, intensity) {
  const source = `${agent.name}-${opponent.name}-${challenge}-${judgeMode}`;
  const base = 58 + (hashText(source) % 27);
  const relevance = agent.strengths.some((item) => challenge.toLowerCase().includes(item.split(" ")[0])) ? 9 : 0;
  const pressure = Number(intensity) * 2;
  return Math.min(98, base + relevance + agent.bias - pressure + (hashText(judgeMode + agent.role) % 8));
}

function buildAgentOutput(agent, opponent, challenge, judgeMode, score) {
  const verb = agent.verbs[hashText(challenge + agent.name) % agent.verbs.length];
  const strength = agent.strengths[hashText(judgeMode + agent.name) % agent.strengths.length];
  const angle = score > 82 ? "high-conviction" : score > 72 ? "balanced" : "cautious";

  return `${agent.name} takes a ${angle} route: it ${verb} the idea around ${strength}, then frames the challenge as a durable agent workflow instead of a one-off interface. Against ${opponent.name}, its strongest point is making the product feel Ritual-native without hiding the user outcome.`;
}

function buildJudgeReason(winner, loser, judgeMode, scoreGap) {
  const edge = scoreGap > 12 ? "clear edge" : "narrow edge";
  return `${winner.name} gives the strongest recommendation by a ${edge} under the ${judgeMode.toLowerCase()} lens. The judge favored stronger Ritual alignment, clearer execution path, and a better bridge from current testnet UX to future autonomous agent primitives. ${loser.name} still contributed useful constraints for the next iteration.`;
}

function buildTelemetry(battle) {
  const combined = Math.round((battle.agentA.score + battle.agentB.score) / 2);
  const gap = Math.abs(battle.agentA.score - battle.agentB.score);
  return {
    persistence: Math.min(99, combined + (battle.challenge.toLowerCase().includes("agent") ? 5 : 0)),
    coordination: Math.min(99, 70 + gap + Number(elements.intensity.value) * 3),
    ritualFit: Math.min(99, battle.winner.score + (battle.judgeMode === "Ritual-native design" ? 4 : 0))
  };
}

function buildTimeline(battle) {
  return [
    `Idea submitted / ${battle.judgeMode}`,
    `${battle.agentA.name} reviewed product direction`,
    `${battle.agentB.name} reviewed Ritual fit`,
    `Recommendation selected ${battle.winner.name}`
  ];
}

function setProcessingState(isProcessing) {
  document.body.classList.toggle("processing", isProcessing);
  elements.statusLine.textContent = isProcessing
    ? "Reviewers are analyzing your app idea..."
    : "Review complete. Result saved locally and ready to share.";
}

function renderBattle(battle) {
  const telemetry = buildTelemetry(battle);
  elements.matchTitle.textContent = battle.challenge;
  elements.agentAName.textContent = battle.agentA.name;
  elements.agentBName.textContent = battle.agentB.name;
  elements.agentAOutput.textContent = battle.agentA.output;
  elements.agentBOutput.textContent = battle.agentB.output;
  elements.agentAScore.value = battle.agentA.score;
  elements.agentBScore.value = battle.agentB.score;
  elements.winnerText.textContent = `${battle.winner.name} recommends build path ${battle.winner.score}-${battle.loser.score}`;
  elements.judgeReason.textContent = battle.verdict;
  elements.shareX.href = buildShareUrl(battle);
  elements.persistenceMetric.textContent = `${telemetry.persistence}%`;
  elements.coordinationMetric.textContent = `${telemetry.coordination}%`;
  elements.ritualFitMetric.textContent = `${telemetry.ritualFit}%`;
  elements.battleTimeline.innerHTML = buildTimeline(battle).map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function runBattle(challenge) {
  const agentA = agents[Number(elements.agentA.value)];
  let agentB = agents[Number(elements.agentB.value)];
  if (agentA.name === agentB.name) {
    agentB = agents[(Number(elements.agentB.value) + 1) % agents.length];
    elements.agentB.value = String(agents.indexOf(agentB));
  }

  const judgeMode = elements.judgeMode.value;
  const intensity = elements.intensity.value;
  const scoreA = scoreAgent(agentA, agentB, challenge, judgeMode, intensity);
  const scoreB = scoreAgent(agentB, agentA, challenge, judgeMode, intensity);
  const winner = scoreA >= scoreB ? { ...agentA, score: scoreA } : { ...agentB, score: scoreB };
  const loser = scoreA >= scoreB ? { ...agentB, score: scoreB } : { ...agentA, score: scoreA };

  const battle = {
    id: `arena-${Date.now()}`,
    challenge,
    judgeMode,
    createdAt: new Date().toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    wallet: walletAddress ? shortAddress(walletAddress) : "Unsigned simulation",
    agentA: {
      name: agentA.name,
      score: scoreA,
      output: buildAgentOutput(agentA, agentB, challenge, judgeMode, scoreA)
    },
    agentB: {
      name: agentB.name,
      score: scoreB,
      output: buildAgentOutput(agentB, agentA, challenge, judgeMode, scoreB)
    },
    winner,
    loser,
    verdict: buildJudgeReason(winner, loser, judgeMode, Math.abs(scoreA - scoreB))
  };

  lastBattle = battle;
  renderBattle(battle);
  saveBattle(battle);
  renderRecords();
  return battle;
}

function buildShareUrl(battle) {
  const pageUrl = `${window.location.origin}${window.location.pathname}`;
  const text = [
    "I reviewed a Ritual app idea.",
    `"${battle.challenge}"`,
    `Top reviewer: ${battle.winner.name} (${battle.winner.score})`,
    "#Ritual #AutonomousAgents #AI"
  ].join("\n\n");

  return `https://x.com/intent/tweet?${new URLSearchParams({ text, url: pageUrl }).toString()}`;
}

function stringToHex(value) {
  const bytes = new TextEncoder().encode(value);
  return `0x${[...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

function buildAnchorMemo(battle) {
  return JSON.stringify({
    app: "Ritual Idea Review",
    id: battle.id,
    challenge: battle.challenge.slice(0, 180),
    judgeMode: battle.judgeMode,
    winner: battle.winner.name,
    score: battle.winner.score,
    createdAt: battle.createdAt
  });
}

async function ensureRitualNetwork() {
  const provider = getProvider();
  const chainId = await provider.request({ method: "eth_chainId" });
  if (chainId.toLowerCase() !== ritualChain.chainId.toLowerCase()) {
    await switchToRitual();
  }
}

async function anchorCurrentBattle() {
  if (!lastBattle) {
    elements.statusLine.textContent = "Review an idea first, then save the result on Ritual Testnet.";
    return;
  }

  const provider = getProvider();
  if (!provider) {
    elements.statusLine.textContent = "Wallet not detected. Use OKX, MetaMask, Rabby, or another EVM wallet to save a review.";
    return;
  }

  if (!walletAddress) {
    await connectWallet();
  }

  if (!walletAddress) return;

  try {
    elements.statusLine.textContent = "Preparing Ritual Testnet transaction. If wallet simulation is unavailable, verify it is 0 RITUAL to your own address, then continue.";
    await ensureRitualNetwork();

    const txHash = await provider.request({
      method: "eth_sendTransaction",
      params: [{
        from: walletAddress,
        to: walletAddress,
        value: "0x0",
        data: stringToHex(buildAnchorMemo(lastBattle))
      }]
    });

    lastBattle.txHash = txHash;
    elements.txLink.href = `${ritualChain.blockExplorerUrls[0]}/tx/${txHash}`;
    elements.txLink.textContent = `Ritual tx: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`;
    elements.statusLine.textContent = "Review saved on Ritual Testnet. This used testnet gas and created an explorer record.";
  } catch (error) {
    const message = String(error?.message || "").toLowerCase();
    elements.statusLine.textContent = message.includes("insufficient")
      ? "Transaction was not sent. Get Ritual testnet tokens from the faucet, then try again."
      : "Transaction was not sent. Check wallet network, testnet balance, or user rejection.";
  }
}

function renderRecords() {
  const battles = loadBattles();
  const scores = new Map();

  battles.forEach((battle) => {
    [battle.agentA, battle.agentB].forEach((agent) => {
      const current = scores.get(agent.name) || { name: agent.name, total: 0, matches: 0, wins: 0 };
      current.total += agent.score;
      current.matches += 1;
      if (battle.winner.name === agent.name) current.wins += 1;
      scores.set(agent.name, current);
    });
  });

  const leaders = [...scores.values()]
    .map((item) => ({ ...item, average: Math.round(item.total / item.matches) }))
    .sort((a, b) => b.wins - a.wins || b.average - a.average)
    .slice(0, 5);

  elements.leaderboardList.innerHTML = leaders.length
    ? leaders.map((item, index) => `
      <article class="leader-row">
        <span>${index + 1}</span>
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <small>${item.wins} wins / ${item.matches} matches</small>
        </div>
        <b>${item.average}</b>
      </article>
    `).join("")
    : `<article class="empty-state"><strong>No leaderboard yet</strong><span>Review an idea to rank the agents.</span></article>`;

  elements.battleHistory.innerHTML = battles.length
    ? battles.map((battle) => `
      <article class="history-card">
        <div>
          <small>${escapeHtml(battle.createdAt)} / ${escapeHtml(battle.wallet)}</small>
          <strong>${escapeHtml(battle.challenge)}</strong>
        </div>
        <p>${escapeHtml(battle.winner.name)} gave the strongest recommendation under ${escapeHtml(battle.judgeMode)}.</p>
      </article>
    `).join("")
    : `<article class="empty-state"><strong>No reviews saved</strong><span>Your latest idea reviews will appear here.</span></article>`;
}

async function connectWallet() {
  discoverInjectedWallets();

  if (!selectedProvider && discoveredWallets.length > 1) {
    openWalletModal();
    elements.statusLine.textContent = "Choose an EVM wallet first, then connect to Ritual Testnet.";
    return;
  }

  if (!selectedProvider && discoveredWallets.length === 1) {
    selectedProvider = discoveredWallets[0].provider;
    selectedWalletName = discoveredWallets[0].name;
  }

  const provider = getProvider();
  if (!provider) {
    openWalletModal();
    elements.statusLine.textContent = "Wallet not detected. Open with OKX Wallet, MetaMask, Rabby, or another injected EVM wallet.";
    return;
  }

  const accounts = await provider.request({ method: "eth_requestAccounts" });
  walletAddress = accounts[0] || "";
  if (!walletAddress) return;

  elements.connectWallet.classList.add("connected");
  elements.walletLabel.textContent = shortAddress(walletAddress);
  elements.statusLine.textContent = `${selectedWalletName || walletIdentity(provider)} connected. Saved reviews will include your address preview.`;
  attachProviderListeners(provider);
  await refreshNetwork();
}

async function refreshNetwork() {
  const provider = getProvider();
  if (!provider) {
    elements.networkStatus.textContent = "No wallet";
    return;
  }

  const chainId = await provider.request({ method: "eth_chainId" });
  elements.networkStatus.textContent = chainId.toLowerCase() === ritualChain.chainId.toLowerCase()
    ? "Ritual connected"
    : `Chain ${parseInt(chainId, 16)}`;
}

async function switchToRitual() {
  const provider = getProvider();
  if (!provider) {
    elements.statusLine.textContent = "Wallet not detected. Install or open a wallet browser first.";
    return;
  }

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ritualChain.chainId }]
    });
  } catch (error) {
    if (error.code !== 4902) throw error;
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [ritualChain]
    });
  }

  await refreshNetwork();
  elements.statusLine.textContent = "Ritual Testnet is ready in your wallet.";
}

function bootCanvas() {
  const canvas = elements.canvas;
  const context = canvas.getContext("2d");
  const nodes = Array.from({ length: 86 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00055,
    vy: (Math.random() - 0.5) * 0.00055,
    radius: 1 + Math.random() * 1.8
  }));

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    context.clearRect(0, 0, width, height);

    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > 1) node.vx *= -1;
      if (node.y < 0 || node.y > 1) node.vy *= -1;

      context.beginPath();
      context.arc(node.x * width, node.y * height, node.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(114, 241, 181, 0.5)";
      context.fill();
    });

    for (let index = 0; index < nodes.length; index += 1) {
      for (let next = index + 1; next < nodes.length; next += 1) {
        const first = nodes[index];
        const second = nodes[next];
        const distance = Math.hypot((first.x - second.x) * width, (first.y - second.y) * height);
        if (distance < 132) {
          context.beginPath();
          context.moveTo(first.x * width, first.y * height);
          context.lineTo(second.x * width, second.y * height);
          context.strokeStyle = `rgba(247, 189, 81, ${0.11 * (1 - distance / 132)})`;
          context.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const challenge = elements.challengeInput.value.trim();
  if (!challenge) return;

  setProcessingState(true);
  setTimeout(() => {
    const battle = runBattle(challenge);
    setProcessingState(false);
    elements.statusLine.textContent = `${battle.winner.name} gave the strongest recommendation. Review saved locally.`;
  }, 720);
});

elements.connectWallet.addEventListener("click", connectWallet);
elements.closeWalletModal.addEventListener("click", closeWalletModal);
elements.walletModal.addEventListener("click", (event) => {
  if (event.target === elements.walletModal) closeWalletModal();
});
elements.walletList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-wallet-index]");
  if (!button) return;

  const wallet = discoveredWallets[Number(button.dataset.walletIndex)];
  if (!wallet) return;

  selectedProvider = wallet.provider;
  selectedWalletName = wallet.name;
  closeWalletModal();
  await connectWallet();
});
elements.switchRitual.addEventListener("click", async () => {
  try {
    await switchToRitual();
  } catch {
    elements.statusLine.textContent = "Could not add or switch Ritual network. Check wallet permissions.";
  }
});

elements.seedBattle.addEventListener("click", () => {
  const challenge = demoChallenges[hashText(String(Date.now())) % demoChallenges.length];
  elements.challengeInput.value = challenge;
  runBattle(challenge);
  elements.statusLine.textContent = "Demo review generated and saved.";
});

elements.anchorBattle.addEventListener("click", anchorCurrentBattle);

elements.presetRow.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  elements.challengeInput.value = button.dataset.prompt;
  elements.challengeInput.focus();
});

window.addEventListener("eip6963:announceProvider", (event) => {
  registerWallet({
    id: event.detail?.info?.uuid,
    name: event.detail?.info?.name,
    info: event.detail?.info,
    provider: event.detail?.provider
  });
});

window.dispatchEvent(new Event("eip6963:requestProvider"));
discoverInjectedWallets();
if (getProvider()) refreshNetwork();

populateAgents();
renderPresetChallenges();
renderAgentRoster();
renderRecords();
bootCanvas();
