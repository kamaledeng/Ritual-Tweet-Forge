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
  "Which app should win a Ritual community build challenge: an autonomous bounty agent or a multi-agent debate arena?",
  "How should a new builder explain Ritual Chain to users who have never touched AI precompiles?",
  "Design a Ritual-native app that can become useful before mainnet but still prove the autonomous agent thesis.",
  "What is the best way to make agent identity, privacy, and payments understandable in one simple product?"
];

const presetChallenges = [
  {
    label: "Builder launch",
    prompt: "A solo builder wants to ship a Ritual app in 48 hours. Should they build an agent arena, an AI auditor, or a bounty agent first?"
  },
  {
    label: "Agent economy",
    prompt: "Design a Ritual-native agent that can earn, spend, and reinvest value without becoming confusing for normal users."
  },
  {
    label: "Privacy UX",
    prompt: "How should a consumer app explain secrets, attestations, and private AI without sounding like infrastructure documentation?"
  },
  {
    label: "Community growth",
    prompt: "What autonomous agent experience would make the Ritual community share results on X every day?"
  }
];

let walletAddress = "";
let lastBattle = null;

const elements = {
  form: document.querySelector("#battleForm"),
  challengeInput: document.querySelector("#challengeInput"),
  agentA: document.querySelector("#agentA"),
  agentB: document.querySelector("#agentB"),
  judgeMode: document.querySelector("#judgeMode"),
  intensity: document.querySelector("#intensity"),
  connectWallet: document.querySelector("#connectWallet"),
  walletLabel: document.querySelector("#walletLabel"),
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
  return window.ethereum;
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
  return `${winner.name} wins by a ${edge} under the ${judgeMode.toLowerCase()} lens. The judge favored stronger Ritual alignment, clearer execution path, and a better bridge from current testnet UX to future autonomous agent primitives. ${loser.name} still contributed useful constraints for the next iteration.`;
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
    `Prompt committed / ${battle.judgeMode}`,
    `${battle.agentA.name} proposed execution path`,
    `${battle.agentB.name} challenged assumptions`,
    `Judge selected ${battle.winner.name}`
  ];
}

function setProcessingState(isProcessing) {
  document.body.classList.toggle("processing", isProcessing);
  elements.statusLine.textContent = isProcessing
    ? "Agents are reasoning through the arena..."
    : "Battle complete. Result saved locally and ready to share.";
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
  elements.winnerText.textContent = `${battle.winner.name} wins ${battle.winner.score}-${battle.loser.score}`;
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
    "I ran a Ritual Agent Arena battle.",
    `"${battle.challenge}"`,
    `Winner: ${battle.winner.name} (${battle.winner.score})`,
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
    app: "Ritual Agent Arena",
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
    elements.statusLine.textContent = "Run a battle first, then anchor the result on Ritual Testnet.";
    return;
  }

  const provider = getProvider();
  if (!provider) {
    elements.statusLine.textContent = "Wallet not detected. Use MetaMask or Rabby to anchor a battle.";
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
    elements.statusLine.textContent = "Battle anchored on Ritual Testnet. This used testnet gas and created an explorer record.";
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
    : `<article class="empty-state"><strong>No leaderboard yet</strong><span>Run a battle to rank the agents.</span></article>`;

  elements.battleHistory.innerHTML = battles.length
    ? battles.map((battle) => `
      <article class="history-card">
        <div>
          <small>${escapeHtml(battle.createdAt)} / ${escapeHtml(battle.wallet)}</small>
          <strong>${escapeHtml(battle.challenge)}</strong>
        </div>
        <p>${escapeHtml(battle.winner.name)} won under ${escapeHtml(battle.judgeMode)}.</p>
      </article>
    `).join("")
    : `<article class="empty-state"><strong>No battles saved</strong><span>Your latest arena records will appear here.</span></article>`;
}

async function connectWallet() {
  const provider = getProvider();
  if (!provider) {
    elements.statusLine.textContent = "Wallet not detected. Open with MetaMask, Rabby, or another injected wallet.";
    return;
  }

  const accounts = await provider.request({ method: "eth_requestAccounts" });
  walletAddress = accounts[0] || "";
  if (!walletAddress) return;

  elements.connectWallet.classList.add("connected");
  elements.walletLabel.textContent = shortAddress(walletAddress);
  elements.statusLine.textContent = "Wallet connected. New arena records will include your address preview.";
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
    elements.statusLine.textContent = `${battle.winner.name} won. Battle saved to the local arena record.`;
  }, 720);
});

elements.connectWallet.addEventListener("click", connectWallet);
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
  elements.statusLine.textContent = "Demo battle generated and saved.";
});

elements.anchorBattle.addEventListener("click", anchorCurrentBattle);

elements.presetRow.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  elements.challengeInput.value = button.dataset.prompt;
  elements.challengeInput.focus();
});

if (getProvider()) {
  getProvider().on?.("chainChanged", refreshNetwork);
  getProvider().on?.("accountsChanged", (accounts) => {
    walletAddress = accounts[0] || "";
    elements.connectWallet.classList.toggle("connected", Boolean(walletAddress));
    elements.walletLabel.textContent = walletAddress ? shortAddress(walletAddress) : "Connect wallet";
  });
  refreshNetwork();
}

populateAgents();
renderPresetChallenges();
renderAgentRoster();
renderRecords();
bootCanvas();
