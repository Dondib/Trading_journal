const USERS_KEY = "cortexa_vora_users_v1";
const SESSION_KEY = "cortexa_vora_session_v1";
const TRADES_PREFIX = "cortexa_vora_trades_";
const SETTINGS_KEY = "cortexa_vora_settings_v1";

const defaultSettings = {
  appName: "CORTEXA_VORA",
  quote: "When you achieve complete acceptance of the uncertainty of each trade and the uniqueness of each moment, your frustration with trading will end.",
  logoDataUrl: "",
  defaultLogoUrl: "assets/cortexa-vora-logo.jpg"
};

const entryModels = [
  { key: "DM", label: "DM (Double Mitigation)", aliases: ["DM", "DOUBLE MITIGATION"] },
  { key: "H4/C1L", label: "H4/C1L", aliases: ["H4/C1L", "H4 C1L", "C1L"] },
  { key: "FVG/4H", label: "FVG/4H", aliases: ["FVG/4H", "FVG", "4H/FVG"] },
  { key: "4H/OB", label: "4H/OB", aliases: ["4H/OB", "OB/4H", "ORDER BLOCK", "OB"] },
  { key: "SPM", label: "SPM Trade", aliases: ["SPM", "SPM TRADE"] }
];

const icons = {
  book: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg>',
  bar: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V7"/><path d="M17 16v-3"/></svg>',
  plus: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',
  trend: '<svg class="icon" viewBox="0 0 24 24"><path d="m3 17 6-6 4 4 7-7"/><path d="M14 8h6v6"/></svg>',
  target: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  line: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/></svg>',
  alert: '<svg class="icon" viewBox="0 0 24 24"><path d="m12 3 10 18H2L12 3z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  trophy: '<svg class="icon" viewBox="0 0 24 24"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M5 5H3v3a4 4 0 0 0 4 4"/><path d="M19 5h2v3a4 4 0 0 1-4 4"/></svg>',
  folder: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 6h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/></svg>',
  file: '<svg class="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>',
  bookmark: '<svg class="icon" viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>',
  calendar: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>',
  lock: '<svg class="icon" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  logout: '<svg class="icon" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  trash: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/></svg>',
  edit: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  shield: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  upload: '<svg class="icon" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>',
  mail: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
};

const app = document.getElementById("app");
let currentView = "journal";
let authMode = "login";
let editingTradeId = "";

function getSettings() {
  return { ...defaultSettings, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
}

function setSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...getSettings(), ...settings }));
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
}

function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

function setSession(username) {
  localStorage.setItem(SESSION_KEY, username);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function currentAccount() {
  const username = getSession();
  if (!username) return null;
  return getUsers()[username.toLowerCase()] || null;
}

function hasAdmin(users = getUsers()) {
  return Object.values(users).some((user) => user.role === "admin");
}

function normalizeAccount(username) {
  const users = getUsers();
  const key = username.toLowerCase();
  if (!users[key]) return null;
  users[key].email = users[key].email || "";
  users[key].role = users[key].role || (hasAdmin(users) ? "trader" : "admin");
  setUsers(users);
  return users[key];
}

function isAdmin() {
  return currentAccount()?.role === "admin";
}

function tradeKey(username) {
  return `${TRADES_PREFIX}${username.toLowerCase()}`;
}

function loadTrades(username = getSession()) {
  if (!username) return [];
  return JSON.parse(localStorage.getItem(tradeKey(username)) || "[]");
}

function saveTrades(trades, username = getSession()) {
  localStorage.setItem(tradeKey(username), JSON.stringify(trades));
}

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function makeSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function calculateStats(trades) {
  const totalTrades = trades.length;
  const totalPnL = trades.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0);
  const wins = trades.filter((trade) => Number(trade.pnl) > 0);
  const losses = trades.filter((trade) => Number(trade.pnl) < 0);
  const grossProfit = wins.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0);
  const grossLoss = Math.abs(losses.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0));
  const winRate = totalTrades ? (wins.length / totalTrades) * 100 : 0;
  const averageRR = totalTrades ? trades.reduce((sum, trade) => sum + Number(trade.rr || 0), 0) / totalTrades : 0;
  const bestTrade = trades.reduce((best, trade) => Number(trade.pnl || 0) > Number(best.pnl ?? -Infinity) ? trade : best, {});
  const worstTrade = trades.reduce((worst, trade) => Number(trade.pnl || 0) < Number(worst.pnl ?? Infinity) ? trade : worst, {});
  const profitFactor = grossLoss ? grossProfit / grossLoss : grossProfit ? grossProfit : 0;
  return { totalTrades, totalPnL, wins: wins.length, losses: losses.length, winRate, averageRR, bestTrade, worstTrade, profitFactor };
}

function render() {
  const username = getSession();
  document.title = `${getSettings().appName} Trading Journal`;
  if (!username) {
    renderAuth();
    return;
  }
  normalizeAccount(username);
  renderApp(username);
}

function brandMarkup() {
  const settings = getSettings();
  const logoUrl = settings.logoDataUrl || settings.defaultLogoUrl;
  const logo = logoUrl
    ? `<img class="brand-logo-img" src="${escapeHtml(logoUrl)}" alt="${escapeHtml(settings.appName)} logo" />`
    : `<div class="brand-mark">${escapeHtml(settings.appName.slice(0, 2).toUpperCase())}</div>`;
  return `
    <div class="brand">
      ${logo}
      <div class="brand-name">${escapeHtml(settings.appName)}</div>
    </div>
  `;
}

function renderAuth() {
  const settings = getSettings();
  app.innerHTML = `
    <main class="auth-page">
      <section class="auth-art">
        ${brandMarkup()}
        <div>
          <h1>Trading journal for every trader separately.</h1>
          <p>Track entries, mistakes, P&L, win rate, risk-reward, and performance without mixing one person's data with another person's account.</p>
        </div>
        <p class="small muted">Email recovery is simulated locally until a backend mail service is connected.</p>
      </section>
      <section class="auth-panel">
        <div class="auth-card">
          <h2>${authHeading()}</h2>
          <p class="muted">${authSubheading()}</p>
          <div class="tabs" role="tablist">
            <button class="tab ${authMode === "login" ? "active" : ""}" data-auth-mode="login">Login</button>
            <button class="tab ${authMode === "register" ? "active" : ""}" data-auth-mode="register">Register</button>
            <button class="tab ${authMode === "reset" ? "active" : ""}" data-auth-mode="reset">Forgot</button>
          </div>
          <form class="form" id="authForm">
            <div class="field">
              <label for="username">Username</label>
              <input id="username" name="username" autocomplete="username" required />
            </div>
            ${authMode !== "login" ? `
              <div class="field">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" autocomplete="email" required />
              </div>
            ` : ""}
            <div class="field">
              <label for="password">${authMode === "reset" ? "New Password" : "Password"}</label>
              <input id="password" name="password" type="password" autocomplete="${authMode === "login" ? "current-password" : "new-password"}" required minlength="4" />
            </div>
            <div class="message" id="authMessage"></div>
            <button class="primary-btn" type="submit">${authMode === "reset" ? icons.mail : icons.lock}${authButtonText()}</button>
          </form>
        </div>
      </section>
    </main>
  `;

  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      authMode = button.dataset.authMode;
      renderAuth();
    });
  });
  document.getElementById("authForm").addEventListener("submit", handleAuth);
}

function authHeading() {
  if (authMode === "register") return "Create account";
  if (authMode === "reset") return "Reset password";
  return "Welcome back";
}

function authSubheading() {
  if (authMode === "register") return "Add email so forgotten passwords can be recovered.";
  if (authMode === "reset") return "Confirm username and email to set a new password.";
  return "Sign in to open your private journal.";
}

function authButtonText() {
  if (authMode === "register") return "Create Account";
  if (authMode === "reset") return "Reset Password";
  return "Login";
}

async function handleAuth(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const username = String(form.get("username")).trim();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password"));
  const message = document.getElementById("authMessage");
  const users = getUsers();
  const key = username.toLowerCase();

  if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(username)) {
    message.textContent = "Use 3-24 characters: letters, numbers, dot, dash, or underscore.";
    return;
  }

  if (authMode === "register") {
    if (users[key]) {
      message.textContent = "That username already exists.";
      return;
    }
    const salt = makeSalt();
    users[key] = {
      username,
      email,
      role: hasAdmin(users) ? "trader" : "admin",
      salt,
      passwordHash: await hashPassword(password, salt),
      createdAt: new Date().toISOString()
    };
    setUsers(users);
    setSession(username);
    currentView = "journal";
    render();
    return;
  }

  if (authMode === "reset") {
    const account = users[key];
    if (!account || String(account.email || "").toLowerCase() !== email) {
      message.textContent = "Username and email do not match.";
      return;
    }
    const salt = makeSalt();
    account.salt = salt;
    account.passwordHash = await hashPassword(password, salt);
    account.updatedAt = new Date().toISOString();
    users[key] = account;
    setUsers(users);
    authMode = "login";
    renderAuth();
    return;
  }

  const account = users[key];
  if (!account) {
    message.textContent = "No account found for this username.";
    return;
  }

  const passwordHash = await hashPassword(password, account.salt);
  if (passwordHash !== account.passwordHash) {
    message.textContent = "Wrong password.";
    return;
  }

  setSession(account.username);
  currentView = "journal";
  render();
}

function renderApp(username) {
  const account = currentAccount();
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        ${brandMarkup()}
        <nav class="top-nav" aria-label="Main navigation">
          ${navButton("journal", icons.book, "Journal")}
          ${navButton("trades", icons.bar, "Trade Log")}
          ${navButton("new", icons.plus, "New Trade")}
          ${navButton("stats", icons.trend, "Statistics")}
          ${navButton("calendar", icons.calendar, "Calendar")}
          ${isAdmin() ? navButton("admin", icons.shield, "Admin") : ""}
        </nav>
        <div class="user-tools">
          <span class="pill">${escapeHtml(username)} · ${escapeHtml(account?.role || "trader")}</span>
          <button class="ghost-btn" id="logoutBtn" title="Logout">${icons.logout}Logout</button>
        </div>
      </header>
      <main class="main">
        ${renderView(username)}
      </main>
    </div>
  `;

  bindNavigation();
  document.getElementById("logoutBtn").addEventListener("click", () => {
    clearSession();
    authMode = "login";
    render();
  });

  const tradeForm = document.getElementById("tradeForm");
  if (tradeForm) tradeForm.addEventListener("submit", saveTradeFromForm);

  const adminForm = document.getElementById("adminSettingsForm");
  if (adminForm) adminForm.addEventListener("submit", saveAdminSettings);

  const logoInput = document.getElementById("logoUpload");
  if (logoInput) logoInput.addEventListener("change", uploadLogo);

  const adminResetForm = document.getElementById("adminResetForm");
  if (adminResetForm) adminResetForm.addEventListener("submit", adminResetPassword);

  document.querySelectorAll("[data-delete-trade]").forEach((button) => {
    button.addEventListener("click", () => deleteTrade(button.dataset.deleteTrade));
  });

  document.querySelectorAll("[data-edit-trade]").forEach((button) => {
    button.addEventListener("click", () => {
      editingTradeId = button.dataset.editTrade;
      currentView = "edit";
      render();
    });
  });
}

function bindNavigation() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      currentView = button.dataset.view;
      editingTradeId = "";
      render();
    });
  });
}

function navButton(view, icon, label) {
  return `<button class="nav-btn ${currentView === view ? "active" : ""}" data-view="${view}">${icon}${label}</button>`;
}

function renderView(username) {
  const trades = loadTrades(username);
  const stats = calculateStats(trades);
  if (currentView === "trades") return renderTrades(trades);
  if (currentView === "new") return renderTradeForm();
  if (currentView === "edit") return renderTradeForm(trades.find((trade) => trade.id === editingTradeId));
  if (currentView === "stats") return renderStats(trades, stats);
  if (currentView === "calendar") return renderCalendar(trades);
  if (currentView === "admin" && isAdmin()) return renderAdmin();
  return renderJournal(trades, stats);
}

function renderHeader(title, action = "") {
  return `
    <div class="page-header">
      <div>
        <h1>${title}</h1>
        <div class="quote">${escapeHtml(getSettings().quote)}</div>
      </div>
      ${action}
    </div>
  `;
}

function statCard(label, value, icon, trend = "") {
  return `
    <div class="stat-card">
      <div class="stat-top"><span>${label}</span>${icon}</div>
      <div class="stat-value ${trend}">${value}</div>
    </div>
  `;
}

function renderStatsGrid(stats, expanded = false) {
  const best = Number(stats.bestTrade.pnl || 0);
  const worst = Number(stats.worstTrade.pnl || 0);
  return `
    <div class="stat-grid ${expanded ? "wide-stats" : ""}">
      ${statCard("Total Trades", stats.totalTrades, icons.bar)}
      ${statCard("Win Rate", `${stats.winRate.toFixed(1)}%`, icons.target, stats.winRate >= 50 ? "positive" : "negative")}
      ${statCard("Winning", stats.wins, icons.trophy, "positive")}
      ${statCard("Losing", stats.losses, icons.alert, stats.losses ? "negative" : "")}
      ${statCard("Total P&L", money(stats.totalPnL), icons.trend, stats.totalPnL >= 0 ? "positive" : "negative")}
      ${statCard("Best Trade", money(best), icons.trophy, best >= 0 ? "positive" : "negative")}
      ${statCard("Worst Trade", money(worst), icons.alert, worst < 0 ? "negative" : "")}
      ${statCard("Avg R:R", `${stats.averageRR.toFixed(2)}R`, icons.line, stats.averageRR >= 1 ? "positive" : "")}
      ${expanded ? statCard("Profit Factor", stats.profitFactor.toFixed(2), icons.trend, stats.profitFactor >= 1 ? "positive" : "negative") : ""}
    </div>
  `;
}

function renderJournal(trades, stats) {
  return `
    ${renderHeader("Journal")}
    <div class="quick-actions">
      <button class="ghost-btn" data-view="new">${icons.plus}New Trade</button>
      <button class="ghost-btn" data-view="trades">${icons.bar}Trade Log</button>
      <button class="ghost-btn" data-view="stats">${icons.trend}Statistics</button>
      ${isAdmin() ? `<button class="ghost-btn" data-view="admin">${icons.shield}Admin</button>` : ""}
    </div>
    ${renderStatsGrid(stats)}
    ${section("Daily Essentials", [
      ["trades", icons.bar, "Trade Log"],
      ["stats", icons.line, "My Analysis"]
    ])}
    ${section("Performance", [
      ["stats", icons.target, "Statistics"],
      ["stats", icons.book, "Monthly Performance"],
      ["stats", icons.line, "Equity Curve"],
      ["stats", icons.alert, "Mistakes"],
      ["trades", icons.trophy, "Winning Trades"],
      ["stats", icons.trend, "Trading Model"]
    ])}
    ${section("Resource Vault", [
      ["trades", icons.folder, "Backtests"],
      ["trades", icons.file, "Trading Notes"],
      ["trades", icons.bookmark, "Edu Content"]
    ])}
  `;
}

function section(title, items) {
  return `
    <section class="section-block">
      <div class="section-title">${title}</div>
      <div class="link-grid">
        ${items.map(([view, icon, label]) => `<button class="journal-link" data-view="${view}">${icon}${label}</button>`).join("")}
      </div>
    </section>
  `;
}

function renderTradeForm(existing = null) {
  const trade = existing || {};
  return `
    ${renderHeader(existing ? "Edit Trade" : "New Trade")}
    <section class="panel">
      <div class="panel-header">
        <h2>Trade Details</h2>
        <span class="pill">${existing ? "Update entry mistake or result" : "Saved only to your account"}</span>
      </div>
      <form class="form form-grid" id="tradeForm" data-trade-id="${escapeHtml(trade.id || "")}">
        ${field("date", "Date", "date", trade.date || new Date().toISOString().slice(0, 10))}
        ${field("symbol", "Symbol", "text", trade.symbol || "", "EURUSD, NQ, XAUUSD")}
        <div class="field">
          <label for="side">Side</label>
          <select id="side" name="side">
            <option ${trade.side === "Long" ? "selected" : ""}>Long</option>
            <option ${trade.side === "Short" ? "selected" : ""}>Short</option>
          </select>
        </div>
        ${field("setup", "Entry Model", "text", trade.setup || "", "Liquidity sweep, breakout, retest")}
        ${field("pnl", "P&L", "number", trade.pnl ?? "", "0.00", "0.01")}
        ${field("rr", "Risk:Reward", "number", trade.rr ?? "", "1.5", "0.1")}
        ${field("mistake", "Mistake", "text", trade.mistake || "", "Optional", "", false)}
        <div class="field full">
          <label for="notes">Notes</label>
          <textarea id="notes" name="notes" placeholder="What happened? What did you follow or break?">${escapeHtml(trade.notes || "")}</textarea>
        </div>
        <div class="full form-actions">
          <button class="primary-btn" type="submit">${existing ? icons.edit : icons.plus}${existing ? "Update Trade" : "Save Trade"}</button>
          <button class="ghost-btn" type="button" data-view="trades">Cancel</button>
        </div>
      </form>
    </section>
  `;
}

function field(name, label, type, value = "", placeholder = "", step = "", required = true) {
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      <input id="${name}" name="${name}" type="${type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" ${step ? `step="${step}"` : ""} ${required ? "required" : ""} />
    </div>
  `;
}

function saveTradeFromForm(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const id = event.currentTarget.dataset.tradeId;
  const trades = loadTrades();
  const trade = {
    id: id || crypto.randomUUID(),
    date: String(form.get("date")),
    symbol: String(form.get("symbol")).trim().toUpperCase(),
    side: String(form.get("side")),
    setup: String(form.get("setup")).trim(),
    pnl: Number(form.get("pnl") || 0),
    rr: Number(form.get("rr") || 0),
    mistake: String(form.get("mistake")).trim(),
    notes: String(form.get("notes")).trim(),
    updatedAt: new Date().toISOString()
  };
  const nextTrades = id ? trades.map((item) => item.id === id ? trade : item) : [trade, ...trades];
  saveTrades(nextTrades);
  editingTradeId = "";
  currentView = "trades";
  render();
}

function renderTrades(trades) {
  return `
    ${renderHeader("Trade Log", `<button class="primary-btn" data-view="new">${icons.plus}New Trade</button>`)}
    <section class="panel">
      <div class="panel-header">
        <h2>All Trades</h2>
        <span class="pill">${trades.length} records</span>
      </div>
      ${trades.length ? `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Symbol</th>
                <th>Side</th>
                <th>Entry Model</th>
                <th>P&L</th>
                <th>R:R</th>
                <th>Mistake</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${trades.map(renderTradeRow).join("")}
            </tbody>
          </table>
        </div>
      ` : emptyState("No trades yet. Add your first trade to start tracking performance.")}
    </section>
  `;
}

function renderTradeRow(trade) {
  const pnl = Number(trade.pnl || 0);
  return `
    <tr>
      <td>${escapeHtml(trade.date)}</td>
      <td><strong>${escapeHtml(trade.symbol)}</strong></td>
      <td>${escapeHtml(trade.side)}</td>
      <td>${escapeHtml(trade.setup)}</td>
      <td class="${pnl >= 0 ? "positive" : "negative"}">${money(pnl)}</td>
      <td>${Number(trade.rr || 0).toFixed(1)}R</td>
      <td>${escapeHtml(trade.mistake || "-")}</td>
      <td>${escapeHtml(trade.notes || "-")}</td>
      <td class="row-actions">
        <button class="ghost-btn icon-btn" title="Edit trade" data-edit-trade="${trade.id}">${icons.edit}</button>
        <button class="danger-btn icon-btn" title="Delete trade" data-delete-trade="${trade.id}">${icons.trash}</button>
      </td>
    </tr>
  `;
}

function deleteTrade(id) {
  const trades = loadTrades().filter((trade) => trade.id !== id);
  saveTrades(trades);
  render();
}

function renderStats(trades, stats) {
  return `
    ${renderHeader("Statistics")}
    ${renderStatsGrid(stats, true)}
    <div class="analytics-grid">
      <section class="panel chart-panel">
        <div class="panel-header">
          <h2>Equity Curve</h2>
          <span class="pill">${stats.totalTrades} trades</span>
        </div>
        ${trades.length ? renderEquityChart(trades) : emptyState("Your equity curve will appear after you add trades.")}
      </section>
      <section class="panel chart-panel">
        <div class="panel-header">
          <h2>Win / Loss Ratio</h2>
          <span class="pill">${stats.wins} / ${stats.losses}</span>
        </div>
        ${trades.length ? renderPieChart(stats) : emptyState("Your pie chart will appear after you add trades.")}
      </section>
      <section class="panel chart-panel">
        <div class="panel-header">
          <h2>Monthly P&L</h2>
          <span class="pill">By month</span>
        </div>
        ${trades.length ? renderMonthlyChart(trades) : emptyState("Monthly results will appear after you add trades.")}
      </section>
      <section class="panel chart-panel">
        <div class="panel-header">
          <h2>Entry Model Performance</h2>
          <span class="pill">By setup</span>
        </div>
        ${trades.length ? renderSetupChart(trades) : emptyState("Entry model performance will appear after you add trades.")}
      </section>
    </div>
    ${trades.length ? `
      <section class="section-block">
        <div class="section-title">Entry Model Breakdown</div>
        ${renderEntryModelTable(trades)}
      </section>
      <section class="section-block">
        <div class="section-title">Monthly Breakdown</div>
        ${renderMonthlyTable(trades)}
      </section>
    ` : ""}
  `;
}

function equityPoints(trades) {
  let total = 0;
  return [...trades].reverse().map((trade, index) => {
    total += Number(trade.pnl || 0);
    return { x: index + 1, y: total };
  });
}

function renderEquityChart(trades) {
  const points = equityPoints(trades);
  const values = points.map((point) => point.y);
  const min = Math.min(0, ...values);
  const max = Math.max(1, ...values);
  const width = 620;
  const height = 260;
  const pad = 34;
  const range = max - min || 1;
  const path = points.map((point, index) => {
    const x = pad + (points.length === 1 ? 0 : (point.x - 1) * ((width - pad * 2) / (points.length - 1)));
    const y = height - pad - ((point.y - min) / range) * (height - pad * 2);
    return `${index ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return `
    <svg class="svg-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Equity curve">
      <g class="grid-lines">
        <path d="M ${pad} ${pad} H ${width - pad} M ${pad} ${height / 2} H ${width - pad} M ${pad} ${height - pad} H ${width - pad}" />
      </g>
      <path class="axis-line" d="M ${pad} ${pad} V ${height - pad} H ${width - pad}" />
      <path class="equity-line" d="${path}" />
      <text x="${pad}" y="22">${money(max)}</text>
      <text x="${pad}" y="${height - 8}">${money(min)}</text>
    </svg>
  `;
}

function renderPieChart(stats) {
  const total = Math.max(1, stats.wins + stats.losses);
  const winPercent = (stats.wins / total) * 100;
  return `
    <div class="donut-wrap">
      <div class="donut" style="--win:${winPercent};">
        <div class="donut-hole">
          <strong>${stats.winRate.toFixed(1)}%</strong>
          <span>Win rate</span>
        </div>
      </div>
      <div class="legend">
        <span><i class="legend-dot win-dot"></i>Winning: ${stats.wins}</span>
        <span><i class="legend-dot loss-dot"></i>Losing: ${stats.losses}</span>
      </div>
    </div>
  `;
}

function groupByMonth(trades) {
  return trades.reduce((acc, trade) => {
    const key = String(trade.date || "").slice(0, 7) || "Unknown";
    acc[key] = acc[key] || [];
    acc[key].push(trade);
    return acc;
  }, {});
}

function renderMonthlyChart(trades) {
  const rows = getMonthlyRows(trades).slice(-8);
  const max = Math.max(1, ...rows.map((row) => Math.abs(row.pnl)));
  return `
    <div class="monthly-chart" aria-label="Monthly P&L chart">
      ${rows.map((row) => `
        <div class="monthly-bar-item">
          <div class="monthly-bar-track">
            <i class="${row.pnl < 0 ? "loss" : ""}" style="height:${Math.max(5, Math.abs(row.pnl) / max * 100)}%"></i>
          </div>
          <span>${escapeHtml(formatMonth(row.month))}</span>
          <strong class="${row.pnl < 0 ? "negative" : "positive"}">${money(row.pnl)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function normalizeEntryModel(setup) {
  const value = String(setup || "").trim().toUpperCase();
  const model = entryModels.find((item) => item.aliases.some((alias) => value.includes(alias)));
  return model?.key || "OTHER";
}

function renderSetupChart(trades) {
  const rows = getEntryModelRows(trades);
  const max = Math.max(1, ...rows.map((row) => row.trades));
  return `
    <div class="model-chart" aria-label="Entry model performance chart">
      ${rows.map((row) => `
        <div class="model-chart-row">
          <span>${escapeHtml(row.key)}</span>
          <div class="model-bars">
            <i class="trade-count" style="width:${Math.max(2, row.trades / max * 100)}%"></i>
            <i class="win-count" style="width:${Math.max(2, row.wins / max * 100)}%"></i>
          </div>
        </div>
      `).join("")}
      <div class="legend compact-legend">
        <span><i class="legend-dot trade-dot"></i>trades</span>
        <span><i class="legend-dot win-dot"></i>wins</span>
      </div>
    </div>
  `;
}

function getEntryModelRows(trades) {
  const rows = entryModels.map((model) => ({ ...model, trades: 0, wins: 0, pnl: 0, rrTotal: 0, grossProfit: 0, grossLoss: 0 }));
  const other = { key: "OTHER", label: "Other / Custom", aliases: [], trades: 0, wins: 0, pnl: 0, rrTotal: 0, grossProfit: 0, grossLoss: 0 };
  trades.forEach((trade) => {
    const key = normalizeEntryModel(trade.setup);
    const row = rows.find((item) => item.key === key) || other;
    const pnl = Number(trade.pnl || 0);
    row.trades += 1;
    row.wins += pnl > 0 ? 1 : 0;
    row.pnl += pnl;
    row.rrTotal += Number(trade.rr || 0);
    row.grossProfit += pnl > 0 ? pnl : 0;
    row.grossLoss += pnl < 0 ? Math.abs(pnl) : 0;
  });
  const finalRows = other.trades ? [...rows, other] : rows;
  return finalRows.map((row) => ({
    ...row,
    winRate: row.trades ? (row.wins / row.trades) * 100 : 0,
    averageRR: row.trades ? row.rrTotal / row.trades : 0,
    profitFactor: row.grossLoss ? row.grossProfit / row.grossLoss : row.grossProfit ? row.grossProfit : 0
  }));
}

function getMonthlyRows(trades) {
  return Object.entries(groupByMonth(trades)).sort().map(([month, monthTrades]) => {
    const wins = monthTrades.filter((trade) => Number(trade.pnl || 0) > 0);
    const losses = monthTrades.filter((trade) => Number(trade.pnl || 0) < 0);
    const pnl = monthTrades.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0);
    const grossProfit = wins.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0);
    const grossLoss = Math.abs(losses.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0));
    return {
      month,
      trades: monthTrades.length,
      wins: wins.length,
      winRate: monthTrades.length ? (wins.length / monthTrades.length) * 100 : 0,
      pnl,
      averageRR: monthTrades.length ? monthTrades.reduce((sum, trade) => sum + Number(trade.rr || 0), 0) / monthTrades.length : 0,
      profitFactor: grossLoss ? grossProfit / grossLoss : grossProfit ? grossProfit : 0
    };
  });
}

function formatMonth(month) {
  if (!/^\d{4}-\d{2}$/.test(month)) return month;
  const [year, monthNumber] = month.split("-");
  return `${monthNumber}/${year.slice(2)}`;
}

function renderEntryModelTable(trades) {
  const rows = getEntryModelRows(trades);
  return `
    <div class="table-wrap breakdown-table">
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Trades</th>
            <th>Wins</th>
            <th>Win Rate</th>
            <th>P&L</th>
            <th>Avg R:R</th>
            <th>PF</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${escapeHtml(row.label)}</td>
              <td>${row.trades}</td>
              <td>${row.wins}</td>
              <td class="${row.winRate >= 50 ? "positive" : row.trades ? "negative" : ""}">${row.trades ? `${row.winRate.toFixed(1)}%` : "-"}</td>
              <td class="${row.pnl >= 0 ? "positive" : "negative"}">${row.trades ? money(row.pnl) : "-"}</td>
              <td>${row.trades ? `${row.averageRR.toFixed(1)}R` : "-"}</td>
              <td>${row.trades ? row.profitFactor.toFixed(2) : "-"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderMonthlyTable(trades) {
  const rows = getMonthlyRows(trades);
  return `
    <div class="table-wrap breakdown-table">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Trades</th>
            <th>Win Rate</th>
            <th>P&L</th>
            <th>Avg R:R</th>
            <th>PF</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${escapeHtml(formatMonth(row.month))}</td>
              <td>${row.trades}</td>
              <td class="${row.winRate >= 50 ? "positive" : "negative"}">${row.winRate.toFixed(1)}%</td>
              <td class="${row.pnl >= 0 ? "positive" : "negative"}">${money(row.pnl)}</td>
              <td>${row.averageRR.toFixed(1)}R</td>
              <td>${row.profitFactor.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCalendar(trades) {
  const byDate = trades.reduce((acc, trade) => {
    acc[trade.date] = acc[trade.date] || [];
    acc[trade.date].push(trade);
    return acc;
  }, {});
  const dates = Object.keys(byDate).sort().slice(-28);
  return `
    ${renderHeader("Calendar")}
    <section class="panel">
      <div class="panel-header">
        <h2>Trading Days</h2>
        <span class="pill">${dates.length} active days</span>
      </div>
      ${dates.length ? `
        <div class="calendar-grid">
          ${dates.map((date) => {
            const dayTrades = byDate[date];
            const pnl = dayTrades.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0);
            return `<div class="day"><strong>${escapeHtml(date)}</strong><span class="${pnl >= 0 ? "positive" : "negative"}">${money(pnl)}</span><div class="small muted">${dayTrades.length} trades</div></div>`;
          }).join("")}
        </div>
      ` : emptyState("Calendar activity will appear after you save trades.")}
    </section>
  `;
}

function renderAdmin() {
  const settings = getSettings();
  const users = Object.values(getUsers());
  return `
    ${renderHeader("Administration")}
    <div class="admin-grid">
      <section class="panel">
        <div class="panel-header">
          <h2>Brand Control</h2>
          <span class="pill">Admin only</span>
        </div>
        <form class="form" id="adminSettingsForm">
          <div class="field">
            <label for="appName">Application Name</label>
            <input id="appName" name="appName" value="${escapeHtml(settings.appName)}" required />
          </div>
          <div class="field">
            <label for="quote">Dashboard Quote</label>
            <textarea id="quote" name="quote">${escapeHtml(settings.quote)}</textarea>
          </div>
          <div class="field">
            <label for="logoUpload">Upload Logo</label>
            <input id="logoUpload" name="logoUpload" type="file" accept="image/*" />
          </div>
          <div class="logo-preview">${settings.logoDataUrl ? `<img src="${settings.logoDataUrl}" alt="Current logo" />` : `<span>No uploaded logo yet</span>`}</div>
          <button class="primary-btn" type="submit">${icons.upload}Save Brand</button>
        </form>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h2>User Management</h2>
          <span class="pill">${users.length} users</span>
        </div>
        <form class="form" id="adminResetForm">
          <div class="field">
            <label for="resetUser">User</label>
            <select id="resetUser" name="resetUser">
              ${users.map((user) => `<option value="${escapeHtml(user.username)}">${escapeHtml(user.username)} · ${escapeHtml(user.email || "no email")} · ${escapeHtml(user.role || "trader")}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="newPassword">New Password</label>
            <input id="newPassword" name="newPassword" type="password" minlength="4" required />
          </div>
          <button class="primary-btn" type="submit">${icons.lock}Reset User Password</button>
          <div class="message" id="adminMessage"></div>
        </form>
        <div class="table-wrap admin-users">
          <table>
            <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Trades</th></tr></thead>
            <tbody>
              ${users.map((user) => `<tr><td>${escapeHtml(user.username)}</td><td>${escapeHtml(user.email || "-")}</td><td>${escapeHtml(user.role || "trader")}</td><td>${loadTrades(user.username).length}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function saveAdminSettings(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  setSettings({
    appName: String(form.get("appName")).trim() || defaultSettings.appName,
    quote: String(form.get("quote")).trim() || defaultSettings.quote
  });
  render();
}

function uploadLogo(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    setSettings({ logoDataUrl: String(reader.result) });
    render();
  });
  reader.readAsDataURL(file);
}

async function adminResetPassword(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const username = String(form.get("resetUser"));
  const password = String(form.get("newPassword"));
  const users = getUsers();
  const account = users[username.toLowerCase()];
  const message = document.getElementById("adminMessage");
  if (!account) {
    message.textContent = "User not found.";
    return;
  }
  const salt = makeSalt();
  account.salt = salt;
  account.passwordHash = await hashPassword(password, salt);
  account.updatedAt = new Date().toISOString();
  users[username.toLowerCase()] = account;
  setUsers(users);
  message.textContent = "Password updated.";
  message.classList.add("positive");
}

function emptyState(text) {
  return `<div class="empty-state"><div>${icons.book}<p>${text}</p></div></div>`;
}

render();
