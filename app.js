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

const topics = {
  "Autonomous agents": {
    nouns: ["autonomous agents", "onchain agents", "agent-native apps", "persistent AI systems"],
    claims: [
      "agents should be able to reason and act in the same environment",
      "the next crypto UX may be powered by agents that do useful work for users",
      "AI agents become more interesting when they can hold state, trigger actions, and coordinate"
    ]
  },
  "Multi-agent evals": {
    nouns: ["multi-agent evals", "agent competitions", "machine-to-machine tests", "onchain evals"],
    claims: [
      "evals become more useful when results are transparent and replayable",
      "agent performance should be visible instead of hidden inside private dashboards",
      "onchain evals can turn AI experiments into public coordination games"
    ]
  },
  "Ritual Chain": {
    nouns: ["Ritual Chain", "AI-native blockspace", "Ritual's testnet", "the Ritual stack"],
    claims: [
      "smart contracts become more expressive when they can call real-world compute",
      "AI x crypto gets serious when the chain can support thinking, acting, and persistence",
      "Ritual is exploring what apps look like when compute is part of the chain"
    ]
  },
  "Private AI": {
    nouns: ["private AI", "encrypted inference", "secret-aware agents", "privacy-preserving AI UX"],
    claims: [
      "consumer AI needs privacy before it can touch sensitive workflows",
      "agents need better boundaries around secrets, identity, and permissions",
      "private AI is not just a feature; it is a requirement for useful agent apps"
    ]
  },
  "Builder ecosystem": {
    nouns: ["Ritual builders", "AI app founders", "onchain AI builders", "community developers"],
    claims: [
      "the best Ritual apps will make AI infrastructure feel simple for normal users",
      "builders need experiments that prove why Ritual is different, not just another landing page",
      "community apps are the fastest way to make a new chain feel alive"
    ]
  },
  "Testnet activity": {
    nouns: ["Ritual testnet", "testnet actions", "wallet activity", "onchain experiments"],
    claims: [
      "testnet apps should teach users something while creating a real transaction",
      "a useful testnet app gives people a reason to click beyond farming",
      "small transactions can still create meaningful proof that users explored the ecosystem"
    ]
  }
};

const quickAngles = [
  "Explain Ritual like I am new to AI x crypto",
  "Make it sound useful for builders",
  "Make it feel exciting for community members",
  "Focus on testnet activity",
  "Ask a thoughtful question",
  "Talk about autonomous agents",
  "Make it sound like a casual observation",
  "Focus on why Ritual is different",
  "Make it useful for people trying the testnet",
  "Explain it without technical jargon",
  "Sound like a builder sharing a note",
  "Make it feel early but not overhyped"
];

const hooks = [
  "hot take",
  "my honest take",
  "small Ritual thought",
  "this is why I keep watching Ritual",
  "one thing I like about Ritual",
  "Ritual is starting to click for me",
  "I might be early on this",
  "this is the part people may miss"
];

const questionHooks = [
  "what if AI apps did more than answer prompts?",
  "what changes when agents can leave a record onchain?",
  "what would you build if AI could actually act inside the app?",
  "is the next AI x crypto app going to feel more like a tool than a chatbot?",
  "what if testnet actions were actually useful?"
];

const openerHooks = [
  "random Ritual thought",
  "been thinking about this today",
  "one thing that clicked for me",
  "quick opinion",
  "tiny builder note",
  "this feels underrated"
];

const bridges = [
  "that is way more useful than another vague AI dashboard",
  "the cool part is users can actually see something happen",
  "that makes testnet activity feel less like a chore",
  "simple apps around this could teach people faster than long docs",
  "the best version probably feels normal to users and powerful under the hood",
  "that is the kind of thing builders can turn into real products"
];

const ctas = [
  "def worth watching",
  "would love to see more builders try this",
  "this is why I am paying attention",
  "small apps can explain this better than huge threads",
  "if you are into AI x crypto, this is worth a look",
  "more experiments like this would be fun"
];

const endings = [
  "curious how this plays out",
  "still early, but the direction is interesting",
  "I want to see more simple apps around this",
  "this could be easier to feel through testnet apps",
  "not overthinking it, just watching the experiments",
  "the next few builder experiments should be fun"
];

const threadOpeners = [
  "few quick thoughts on Ritual",
  "how I am thinking about Ritual rn",
  "why Ritual feels interesting to me",
  "quick Ritual thought"
];

const mentionMap = {
  both: "@ritualnet @ritualfnd",
  net: "@ritualnet",
  fnd: "@ritualfnd"
};

const audienceLines = {
  community: [
    "the community angle is what makes this fun to watch",
    "this is the kind of thing a community can actually experiment with"
  ],
  builders: [
    "for builders, the useful part is having more design space than a normal app",
    "builder takeaway: the user experience still matters more than the infrastructure pitch"
  ],
  newcomers: [
    "for someone new, the simple version is that Ritual makes AI feel more usable inside apps",
    "you do not need to understand every primitive to see why this direction is interesting"
  ],
  airdrop: [
    "testnet actions feel better when the app teaches something along the way",
    "a good testnet app should give people more than a checkbox"
  ],
  researchers: [
    "the research angle is the link between agent behavior, state, and verifiable execution",
    "this gets interesting when AI systems are evaluated through public app behavior"
  ],
  friends: [
    "the simple version: this is one of the AI x crypto projects I keep checking on",
    "not financial advice, just something I find genuinely interesting"
  ]
};

const hookGroups = {
  opinion: ["hot take", "my honest take", "I might be early on this", "one thing I like about Ritual"],
  curiosity: ["been thinking about this", "small question", "this is the part I keep coming back to", "quick thought"],
  builder: ["builder note", "if I were building here", "product thought", "one app idea I keep thinking about"],
  casual: ["ngl", "small Ritual thought", "Ritual is starting to click for me", "this is kinda interesting"]
};

let walletAddress = "";
let selectedProvider = null;
let selectedWalletName = "";
let discoveredWallets = [];
let selectedDraft = null;
let latestDrafts = [];

const elements = {
  form: document.querySelector("#tweetForm"),
  topicSelect: document.querySelector("#topicSelect"),
  structureSelect: document.querySelector("#structureSelect"),
  toneSelect: document.querySelector("#toneSelect"),
  audienceSelect: document.querySelector("#audienceSelect"),
  lengthSelect: document.querySelector("#lengthSelect"),
  ctaSelect: document.querySelector("#ctaSelect"),
  mentionSelect: document.querySelector("#mentionSelect"),
  hookSelect: document.querySelector("#hookSelect"),
  angleInput: document.querySelector("#angleInput"),
  presetRow: document.querySelector("#presetRow"),
  switchRitual: document.querySelector("#switchRitual"),
  statusLine: document.querySelector("#statusLine"),
  outputTitle: document.querySelector("#outputTitle"),
  tweetOutput: document.querySelector("#tweetOutput"),
  selectedTitle: document.querySelector("#selectedTitle"),
  selectedTweet: document.querySelector("#selectedTweet"),
  copyTweet: document.querySelector("#copyTweet"),
  anchorDraft: document.querySelector("#anchorDraft"),
  shareX: document.querySelector("#shareX"),
  txLink: document.querySelector("#txLink"),
  tweetHistory: document.querySelector("#tweetHistory"),
  generateDemo: document.querySelector("#generateDemo"),
  variantMetric: document.querySelector("#variantMetric"),
  seedMetric: document.querySelector("#seedMetric"),
  charMetric: document.querySelector("#charMetric"),
  connectWallet: document.querySelector("#connectWallet"),
  walletLabel: document.querySelector("#walletLabel"),
  walletModal: document.querySelector("#walletModal"),
  walletList: document.querySelector("#walletList"),
  closeWalletModal: document.querySelector("#closeWalletModal"),
  networkStatus: document.querySelector("#networkStatus"),
  copyToast: document.querySelector("#copyToast"),
  canvas: document.querySelector("#arenaField")
};

function randomInt(max) {
  if (window.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function pick(items) {
  return items[randomInt(items.length)];
}

function pickHook() {
  const style = elements.hookSelect.value;
  if (style === "curiosity") return pick(questionHooks);
  if (style === "casual") return pick(openerHooks);
  if (randomInt(4) === 0) return pick(questionHooks);
  if (randomInt(3) === 0) return pick(openerHooks);
  return pick(hookGroups[style] || hooks);
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

function getProvider() {
  return selectedProvider || discoveredWallets[0]?.provider || window.ethereum;
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
  return name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function registerWallet(wallet) {
  if (!wallet?.provider) return;
  const exists = discoveredWallets.some((item) => item.provider === wallet.provider || item.id === wallet.id);
  if (exists) return;

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
    registerWallet({ id: `${name}-${index}`, name, provider });
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

function buildSeed() {
  return `${Date.now().toString(36)}-${randomInt(999999).toString(36)}`;
}

function trimTweet(text) {
  if (text.length <= 275) return text;
  return `${text.slice(0, 270).trim()}...`;
}

function getMentions(mentionStyle, index) {
  if (mentionStyle === "net") return ["@ritualnet"];
  if (mentionStyle === "fnd") return ["@ritualfnd"];
  return index % 2 === 0 ? ["@ritualnet", "@ritualfnd"] : [pick(["@ritualnet", "@ritualfnd"])];
}

function injectMentions(text, mentionStyle, index) {
  if (text.includes("@ritualnet") || text.includes("@ritualfnd")) return trimTweet(text);

  const mentions = getMentions(mentionStyle, index);
  let output = text;

  if (mentions.includes("@ritualnet") && /\bRitual\b/.test(output) && index % 3 !== 2) {
    output = output.replace(/\bRitual\b/, "@ritualnet");
    if (mentions.includes("@ritualfnd")) {
      const parts = output.split("\n\n");
      parts.splice(Math.min(2, parts.length), 0, "@ritualfnd");
      output = parts.join("\n\n");
    }
    return trimTweet(output);
  }

  const parts = output.split("\n\n");
  if (index % 3 === 0) {
    parts.splice(Math.min(1, parts.length), 0, mentions.join(" "));
  } else {
    parts.push(mentions.join(" "));
  }

  return trimTweet(parts.join("\n\n"));
}

function formatByLength(text, length) {
  if (length === "short") return text.split("\n\n").slice(0, 3).join("\n\n");
  if (length === "long") return text;
  return trimTweet(text);
}

function getCta(ctaStyle) {
  if (ctaStyle === "none") return "";
  if (ctaStyle === "watch") return pick(["worth watching imo", "keeping this on my radar", "this is why I keep checking Ritual"]);
  if (ctaStyle === "builder") return pick(["would love to see more builders try this", "this feels like a good space for small experiments", "builders could make this much easier to understand"]);
  if (ctaStyle === "question") return pick(["what would you build with this?", "curious what the community thinks", "what is the simplest app that could show this?"]);
  if (ctaStyle === "testnet") return pick(["testnet apps should make this easier to feel", "this is the kind of thing worth testing onchain", "small testnet actions can explain a lot"]);
  return pick(["just my take", "that is the part I find interesting", "still early, but worth watching"]);
}

function buildTweet(topic, structure, tone, angle, index) {
  const data = topics[topic];
  const noun = pick(data.nouns);
  const claim = pick(data.claims);
  const hook = pickHook();
  const bridge = pick(bridges);
  const audience = elements.audienceSelect.value;
  const length = elements.lengthSelect.value;
  const cta = getCta(elements.ctaSelect.value);
  const audienceLine = pick(audienceLines[audience] || audienceLines.community);
  const mentionStyle = elements.mentionSelect.value;
  const personalAngle = angle ? `\n\nMy angle: ${angle}` : "";
  const ending = pick(endings);
  const close = cta ? `\n\n${cta}\n\n${ending}` : `\n\n${ending}`;

  if (structure === "thread" || tone === "thread" || length === "thread") {
    return injectMentions([
      pick(threadOpeners),
      "",
      `1/ ${hook}. ${claim}.`,
      "",
      `2/ For ${noun}, the key is not just intelligence. It is execution, memory, and visible state.`,
      "",
      `3/ ${audienceLine}. ${bridge}${close}`,
    ].join("\n"), mentionStyle, index);
  }

  let output = "";

  if (structure === "problem") {
    output = `${hook}:\n\nAI x crypto needs apps that feel useful, not just smart.\n\nRitual is interesting to me because ${claim}.\n\n${audienceLine}${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (structure === "contrast") {
    output = `${hook}:\n\nAI as a side feature is not that exciting to me.\n\nAI that can actually become part of the app flow is different.\n\nthat is why I keep coming back to ${noun} on Ritual${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (structure === "fact") {
    output = `${hook}:\n\nRitual is not interesting to me because it has AI branding.\n\nit is interesting because ${claim}.\n\n${bridge}${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (structure === "story") {
    output = `${hook}:\n\nimagine using an app where the agent does the work, leaves a record, and keeps getting better over time\n\nthat is the Ritual idea I keep thinking about: ${claim}.${personalAngle}${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (structure === "question") {
    output = `${hook}:\n\nwhat should apps look like when ${claim}?\n\nmy guess: the best Ritual apps will make ${noun} feel simple, not technical${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (structure === "builder") {
    output = `${hook}:\n\nif I were building around ${noun}, I would not lead with the infra\n\nI would lead with the user outcome, then use Ritual for proof, memory, or action\n\n${bridge}${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (structure === "myth") {
    output = `${hook}:\n\nI do not see Ritual as just another AI narrative play.\n\nwhat makes it interesting is the chance to build apps where ${claim}.\n\nthat feels like a bigger design space for ${noun}${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (tone === "hype") {
    output = `${hook}\n\n${noun} make Ritual feel like more than another chain because ${claim}. ${bridge}${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (tone === "builder") {
    output = `if you are building around ${noun}, start from the user outcome first\n\nthen use Ritual for proof, memory, or action\n\n${bridge}${personalAngle}${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  if (tone === "curious") {
    output = `what would you build if ${claim}?\n\nI think the answer starts with ${noun}, but the winning apps will make the infrastructure feel invisible${close}`;
    return injectMentions(formatByLength(output, length), mentionStyle, index);
  }

  output = `${hook}:\n\n${claim}.\n\nthat is why ${noun} are worth paying attention to in the Ritual ecosystem.\n\n${bridge}${close}`;
  return injectMentions(formatByLength(output, length), mentionStyle, index);
}

function generateDrafts(txHash = "") {
  const topic = elements.topicSelect.value;
  const structure = elements.structureSelect.value;
  const tone = elements.toneSelect.value;
  const angle = elements.angleInput.value.trim();
  const seed = buildSeed();
  const drafts = Array.from({ length: 5 }, (_, index) => ({
    id: `${seed}-${index}`,
    seed,
    topic,
    structure,
    tone,
    txHash,
    text: buildTweet(topic, structure, tone, angle, index),
    createdAt: new Date().toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
  }));

  latestDrafts = drafts;
  selectedDraft = drafts[0];
  renderDrafts(drafts);
  selectDraft(drafts[0]);
  saveHistory(drafts);
  renderHistory();
  elements.outputTitle.textContent = `${topic} / ${structure}`;
  elements.variantMetric.textContent = String(drafts.length);
  elements.seedMetric.textContent = seed.slice(-5).toUpperCase();
  elements.statusLine.textContent = txHash
    ? "Ritual fee paid. Fresh tweet drafts generated."
    : "Fresh tweet drafts generated. Pick one to copy, share, or save on Ritual.";
}

function renderDrafts(drafts) {
  elements.tweetOutput.innerHTML = drafts.map((draft, index) => `
    <article class="tweet-card ${selectedDraft?.id === draft.id ? "selected" : ""}" data-draft-id="${escapeHtml(draft.id)}">
      <small>Variant ${index + 1} / ${escapeHtml(draft.topic)}</small>
      <p>${escapeHtml(draft.text)}</p>
      <div class="tweet-actions">
        <button type="button" data-action="select">Select</button>
        <button type="button" data-action="copy" aria-label="Copy this tweet">Copy</button>
      </div>
    </article>
  `).join("");
}

function selectDraft(draft) {
  selectedDraft = draft;
  elements.selectedTitle.textContent = `${draft.topic} draft`;
  elements.selectedTweet.textContent = draft.text;
  elements.charMetric.textContent = String(draft.text.length);
  elements.shareX.href = `https://x.com/intent/tweet?${new URLSearchParams({ text: draft.text }).toString()}`;
  renderDrafts(latestDrafts);
}

function showCopyFeedback(button, card) {
  if (button) {
    const previousText = button.textContent;
    button.textContent = "Copied";
    button.classList.add("copied");
    setTimeout(() => {
      button.textContent = previousText;
      button.classList.remove("copied");
    }, 1400);
  }

  if (card) {
    card.classList.add("copied-flash");
    setTimeout(() => card.classList.remove("copied-flash"), 900);
  }

  elements.copyToast.classList.add("active");
  setTimeout(() => elements.copyToast.classList.remove("active"), 1500);
}

async function copyTweetText(text, button = null, card = null) {
  await navigator.clipboard.writeText(text);
  elements.statusLine.textContent = "Copied. Paste it into X.";
  showCopyFeedback(button, card);
}

function loadHistory() {
  return JSON.parse(localStorage.getItem("ritual-tweet-forge") || "[]");
}

function saveHistory(drafts) {
  const history = [...drafts, ...loadHistory()].slice(0, 24);
  localStorage.setItem("ritual-tweet-forge", JSON.stringify(history));
}

function renderHistory() {
  const history = loadHistory();
  elements.tweetHistory.innerHTML = history.length
    ? history.slice(0, 8).map((draft) => `
      <article class="history-card">
        <div>
          <small>${escapeHtml(draft.createdAt)} / ${escapeHtml(draft.topic)}</small>
          <strong>${escapeHtml(draft.text)}</strong>
        </div>
        <p>${escapeHtml(draft.tone)} tone / seed ${escapeHtml(draft.seed.slice(-5).toUpperCase())}</p>
      </article>
    `).join("")
    : `<article class="empty-state"><strong>No tweets forged yet</strong><span>Your generated drafts will appear here.</span></article>`;
}

async function copySelectedTweet() {
  if (!selectedDraft) {
    elements.statusLine.textContent = "Generate and select a tweet first.";
    return;
  }

  await copyTweetText(selectedDraft.text, elements.copyTweet);
}

function stringToHex(value) {
  const bytes = new TextEncoder().encode(value);
  return `0x${[...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

function buildAnchorMemo(draft) {
  return JSON.stringify({
    app: "Ritual Tweet Forge",
    id: draft.id,
    topic: draft.topic,
    tone: draft.tone,
    seed: draft.seed,
    preview: draft.text.slice(0, 160),
    createdAt: draft.createdAt
  });
}

function buildGenerateMemo() {
  return JSON.stringify({
    app: "Ritual Tweet Forge",
    action: "generate",
    topic: elements.topicSelect.value,
    structure: elements.structureSelect.value,
    tone: elements.toneSelect.value,
    audience: elements.audienceSelect.value,
    length: elements.lengthSelect.value,
    cta: elements.ctaSelect.value,
    mention: elements.mentionSelect.value,
    hook: elements.hookSelect.value,
    createdAt: new Date().toISOString()
  });
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
  elements.statusLine.textContent = `${selectedWalletName || walletIdentity(provider)} connected. You can save drafts on Ritual Testnet.`;
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
    elements.statusLine.textContent = "Wallet not detected. Install or open an EVM wallet first.";
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

async function ensureRitualNetwork() {
  const provider = getProvider();
  const chainId = await provider.request({ method: "eth_chainId" });
  if (chainId.toLowerCase() !== ritualChain.chainId.toLowerCase()) await switchToRitual();
}

async function payGenerationFee() {
  const provider = getProvider();
  if (!provider) {
    elements.statusLine.textContent = "Choose an EVM wallet first. Generation requires Ritual testnet gas.";
    openWalletModal();
    return "";
  }

  if (!walletAddress) await connectWallet();
  if (!walletAddress) return "";

  elements.statusLine.textContent = "Confirm the Ritual Testnet transaction to generate tweets. Value is 0 RITUAL; you only pay gas.";
  await ensureRitualNetwork();

  return provider.request({
    method: "eth_sendTransaction",
    params: [{
      from: walletAddress,
      to: walletAddress,
      value: "0x0",
      data: stringToHex(buildGenerateMemo())
    }]
  });
}

async function anchorSelectedDraft() {
  if (!selectedDraft) {
    elements.statusLine.textContent = "Generate and select a tweet first.";
    return;
  }

  const provider = getProvider();
  if (!provider) {
    elements.statusLine.textContent = "Wallet not detected. Use OKX, MetaMask, Rabby, or another EVM wallet.";
    openWalletModal();
    return;
  }

  if (!walletAddress) await connectWallet();
  if (!walletAddress) return;

  try {
    elements.statusLine.textContent = "Preparing Ritual Testnet transaction for selected tweet draft...";
    await ensureRitualNetwork();
    const txHash = await provider.request({
      method: "eth_sendTransaction",
      params: [{
        from: walletAddress,
        to: walletAddress,
        value: "0x0",
        data: stringToHex(buildAnchorMemo(selectedDraft))
      }]
    });

    elements.txLink.href = `${ritualChain.blockExplorerUrls[0]}/tx/${txHash}`;
    elements.txLink.textContent = `Ritual tx: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`;
    elements.statusLine.textContent = "Tweet draft saved on Ritual Testnet. This used testnet gas.";
  } catch (error) {
    const message = String(error?.message || "").toLowerCase();
    elements.statusLine.textContent = message.includes("insufficient")
      ? "Transaction was not sent. Get Ritual testnet tokens from the faucet, then try again."
      : "Transaction was not sent. Check wallet network, testnet balance, or user rejection.";
  }
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
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const txHash = await payGenerationFee();
    if (!txHash) return;
    elements.txLink.href = `${ritualChain.blockExplorerUrls[0]}/tx/${txHash}`;
    elements.txLink.textContent = `Generate tx: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`;
    generateDrafts(txHash);
  } catch (error) {
    const message = String(error?.message || "").toLowerCase();
    elements.statusLine.textContent = message.includes("insufficient")
      ? "Generation failed. Get Ritual testnet tokens from the faucet, then try again."
      : "Generation cancelled or failed. Check wallet approval and Ritual Testnet.";
  }
});

elements.presetRow.innerHTML = quickAngles.map((angle) => `<button type="button" data-angle="${escapeHtml(angle)}">${escapeHtml(angle)}</button>`).join("");
elements.presetRow.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  elements.angleInput.value = button.dataset.angle;
});

elements.tweetOutput.addEventListener("click", (event) => {
  const card = event.target.closest("[data-draft-id]");
  if (!card) return;
  const draft = latestDrafts.find((item) => item.id === card.dataset.draftId);
  if (!draft) return;

  if (event.target.closest("[data-action='copy']")) {
    copyTweetText(draft.text, event.target.closest("button"), card);
    selectDraft(draft);
    return;
  }

  selectDraft(draft);
});

elements.copyTweet.addEventListener("click", copySelectedTweet);
elements.anchorDraft.addEventListener("click", anchorSelectedDraft);
elements.generateDemo.addEventListener("click", () => {
  elements.angleInput.value = pick(quickAngles);
  elements.statusLine.textContent = "Angle randomized. Click generate and confirm the Ritual fee transaction.";
  document.querySelector("#forge").scrollIntoView({ behavior: "smooth", block: "start" });
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
renderHistory();
bootCanvas();
