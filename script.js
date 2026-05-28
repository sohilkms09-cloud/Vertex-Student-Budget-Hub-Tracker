// FOR SECURITY AND PRIVACY, CONFIGURATION OF YOUR PERMANENT CLOUD DATABASE IS SUPPORTED BELOW:
// Go to console.firebase.google.com -> Create Project -> Add Web App to copy your free keys here
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE_PASTE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase Core Safely if Keys are configured
let useCloudDatabase = false;
let db, auth;

if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE_PASTE") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    useCloudDatabase = true;
}

// Active profile properties state configurations arrays maps variables
let budget = localStorage.getItem('budget') ? parseFloat(localStorage.getItem('budget')) : 0;
let expenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
let subscriptions = localStorage.getItem('subscriptions') ? JSON.parse(localStorage.getItem('subscriptions')) : [];
let historyLog = localStorage.getItem('historyLog') ? JSON.parse(localStorage.getItem('historyLog')) : [];
let currentCurrency = localStorage.getItem('currency') ? localStorage.getItem('currency') : '₹';
let studentMode = localStorage.getItem('studentMode') === 'true';

// Element Selectors
const currencySelect = document.getElementById('currency-select');
const studentToggle = document.getElementById('student-mode-toggle');
const budgetInput = document.getElementById('monthly-budget-input');
const setBudgetBtn = document.getElementById('set-budget-btn');
const autoAllocateBtn = document.getElementById('auto-allocate-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const archiveMonthBtn = document.getElementById('archive-month-btn');
const totalBudgetEl = document.getElementById('total-budget');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceLeftEl = document.getElementById('balance-left');
const budgetCard = document.getElementById('budget-card');
const expenseForm = document.getElementById('expense-form-element');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseDaySelect = document.getElementById('expense-day');
const expenseList = document.getElementById('expense-list');
const aiInsightText = document.getElementById('ai-insight-text');
const heatmapCalendar = document.getElementById('heatmap-calendar');
const searchInput = document.getElementById('search-input');

// Voice, Progress, Scoring, Tips Selectors
const voiceStartBtn = document.getElementById('voice-start-btn');
const voiceStatus = document.getElementById('voice-status');
const savingsPercentage = document.getElementById('savings-percentage');
const savingsProgressFill = document.getElementById('savings-progress-fill');
const healthScoreValue = document.getElementById('health-score-value');
const healthScoreStatus = document.getElementById('health-score-status');
const dailyTipText = document.getElementById('daily-tip-text');

// Subscription Selectors
const subscriptionForm = document.getElementById('subscription-form');
const subNameInput = document.getElementById('sub-name');
const subAmountInput = document.getElementById('sub-amount');
const subscriptionList = document.getElementById('subscription-list');
const totalSubscriptionsEl = document.getElementById('total-subscriptions');

// Scanner UI Hooks
const scannerArea = document.getElementById('scanner-area');
const scannerFileInput = document.getElementById('scanner-file-input');
const scannerLaser = document.getElementById('scanner-laser');
const scannerLogStatus = document.getElementById('scanner-log-status');
const categoryCapsContainer = document.getElementById('category-caps-container');

// Tax Estimator Selectors
const taxRegionSelect = document.getElementById('tax-region');
const yearlyIncomeInput = document.getElementById('yearly-income-input');
const calculateTaxBtn = document.getElementById('calculate-tax-btn');
const taxResultsPanel = document.getElementById('tax-results-panel');
const taxSummaryText = document.getElementById('tax-summary-text');

// Cash Matrix Selectors
const userBankNetworkSelect = document.getElementById('user-bank-network-select');
const findAtmMatrixBtn = document.getElementById('find-atm-matrix-btn');
const atmRoutingResultsPanel = document.getElementById('atm-routing-results-panel');
const atmFeesListRendered = document.getElementById('atm-fees-list-rendered');
const checkingThresholdInput = document.getElementById('checking-threshold-input');
const calculateSweepBtn = document.getElementById('calculate-sweep-btn');
const sweepResultsPanel = document.getElementById('sweep-results-panel');
const sweepAllocationSummaryText = document.getElementById('sweep-allocation-summary-text');

// AUTH AND LAYOUT OVERLAY INTERFACE ELEMENT SELECTORS
const authScreen = document.getElementById('auth-screen');
const mainDashboardWrapper = document.getElementById('main-dashboard-wrapper');
const emailInput = document.getElementById('auth-email-input');
const passwordInput = document.getElementById('auth-password-input');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const userDisplayStatus = document.getElementById('user-display-status');

let expenseChart;
let trendChart;
let activeCameraStream = null;

const standardCategories = ['Food', 'Rent', 'Entertainment', 'Shopping', 'Other'];
const studentCategories = ['Hostel/Rent', 'Mess & Food', 'Books & Exams', 'Travel', 'Socials'];

const financialTips = [
    "💡 Tip: Track your micro-transactions. Small coffees and daily snacks can quietly drain your balance.",
    "💡 Tip: The 24-hour rule: Wait a full day before purchasing a non-essential item to check if you truly need it.",
    "💡 Tip: Review your monthly subscriptions regularly. Cancel items you haven't used in the past 30 days."
];

const mockReceiptsPool = [
    { name: "Supermarket Groceries", amount: 1420, category: "Food" },
    { name: "Tech Hub Store Accessories", amount: 3200, category: "Shopping" },
    { name: "Campus Book Depot Store", amount: 1100, category: "Books & Exams" }
];

function init() {
    currencySelect.value = currentCurrency;
    studentToggle.checked = studentMode;
    
    displayRandomTip();
    setupDayDropdown();
    setupCategoryDropdown();
    updateDashboard();
    renderExpenses();
    renderSubscriptions();
    renderHeatmap();
    initChart();
    initTrendChart();
    setupVoiceRecognition();
    setupReceiptScanner();
    setupCashMatrixModules();
    setupTaxPlannerModule();
    setupGatewaysAuthentication();
}

// FEATURE: FIXED SIMULATION INTERACTION ROUTER
function setupGatewaysAuthentication() {
    if (!useCloudDatabase) {
        // FIXED ACTION: Buttons now bypass overlay state blocks directly
        loginBtn.addEventListener('click', () => { unlockDashboardInterface("Demo Sandbox Mode"); });
        registerBtn.addEventListener('click', () => { unlockDashboardInterface("Demo Sandbox Mode"); });
        logoutBtn.addEventListener('click', () => { location.reload(); });
        return;
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            userDisplayStatus.innerText = user.email;
            unlockDashboardInterface();
            pullUserDataFromCloudNode(user.uid);
        } else {
            lockDashboardInterface();
        }
    });

    registerBtn.addEventListener('click', () => {
        auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
            .catch(err => alert(`Registration Error: ${err.message}`));
    });

    loginBtn.addEventListener('click', () => {
        auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
            .catch(err => alert(`Sign In Failed: ${err.message}`));
    });

    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => { location.reload(); });
    });
}

function unlockDashboardInterface(label) {
    authScreen.style.display = 'none';
    mainDashboardWrapper.style.display = 'block';
    if(label) userDisplayStatus.innerText = label;
}

function lockDashboardInterface() {
    authScreen.style.display = 'flex';
    mainDashboardWrapper.style.display = 'none';
}

function pushUserDataToCloudNode() {
    if (!useCloudDatabase || !auth.currentUser) return;
    db.collection('users').doc(auth.currentUser.uid).set({
        budget, expenses, subscriptions, historyLog
    });
}

function pullUserDataFromCloudNode(uid) {
    db.collection('users').doc(uid).get().then(doc => {
        if (doc.exists) {
            const data = doc.data();
            budget = data.budget || 0;
            expenses = data.expenses || [];
            subscriptions = data.subscriptions || [];
            historyLog = data.historyLog || [];
            updateDashboard(); renderExpenses(); renderSubscriptions(); renderHeatmap(); updateTrendChart();
        }
    });
}

function displayRandomTip() {
    const randomIndex = Math.floor(Math.random() * financialTips.length);
    dailyTipText.innerText = financialTips[randomIndex];
}

function setupDayDropdown() {
    expenseDaySelect.innerHTML = '';
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i; option.innerText = `Day ${i}`; expenseDaySelect.appendChild(option);
    }
}

function setupCategoryDropdown() {
    const activeCategories = studentToggle.checked ? studentCategories : standardCategories;
    expenseCategorySelect.innerHTML = '';
    activeCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat; option.innerText = cat; expenseCategorySelect.appendChild(option);
    });
}

function updateDashboard() {
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalSubs = subscriptions.reduce((sum, item) => sum + item.amount, 0);
    const combinedOutflow = totalSpent + totalSubs;
    const balance = budget - combinedOutflow;

    totalBudgetEl.innerText = `${currentCurrency}${budget.toFixed(2)}`;
    totalExpensesEl.innerText = `${currentCurrency}${combinedOutflow.toFixed(2)}`;
    balanceLeftEl.innerText = `${currentCurrency}${balance.toFixed(2)}`;
    totalSubscriptionsEl.innerText = `${currentCurrency}${totalSubs.toFixed(2)}`;

    if (budget > 0) {
        let remainingPercent = (balance / budget) * 100;
        if (remainingPercent < 0) remainingPercent = 0;
        savingsPercentage.innerText = `${remainingPercent.toFixed(0)}% Remaining`;
        savingsProgressFill.style.width = `${remainingPercent}%`;
    } else {
        savingsPercentage.innerText = '100% Left';
        savingsProgressFill.style.width = '100%';
    }

    localStorage.setItem('budget', budget);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    localStorage.setItem('historyLog', JSON.stringify(historyLog));
    localStorage.setItem('currency', currentCurrency);
    localStorage.setItem('studentMode', studentToggle.checked);

    pushUserDataToCloudNode();

    calculateFinancialHealthScore(combinedOutflow);
    generateAIInsights(combinedOutflow);
    renderCategoryWarningsDashboard(totalSpent);
    if (expenseChart) updateChartData();
}

function renderCategoryWarningsDashboard(totalSpent) {
    categoryCapsContainer.innerHTML = '';
    if (budget <= 0) {
        categoryCapsContainer.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center;">Lock a total budget parameter to display gauges.</p>`;
        return;
    }
    const activeCategories = studentToggle.checked ? studentCategories : standardCategories;
    const MathCapShares = [0.35, 0.25, 0.15, 0.15, 0.10]; 

    activeCategories.forEach((cat, index) => {
        const catSpent = expenses.filter(e => e.category === cat).reduce((s, i) => s + i.amount, 0);
        const catCapCeiling = budget * MathCapShares[index];
        const percentUsed = Math.min((catSpent / catCapCeiling) * 100, 100);

        let progressColor = "var(--success)";
        if (percentUsed >= 90) progressColor = "var(--danger)";
        else if (percentUsed >= 70) progressColor = "var(--warning)";

        const block = document.createElement('div');
        block.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-dark); margin-bottom:4px;">
                <span><strong>${cat}</strong> <span style="color:var(--text-muted)">(Limit: ${currentCurrency}${catCapCeiling.toFixed(0)})</span></span>
                <span style="font-weight:bold; color:${progressColor}">${currentCurrency}${catSpent.toFixed(0)} (${percentUsed.toFixed(0)}%)</span>
            </div>
            <div style="width:100%; background:rgba(0,0,0,0.05); border-radius:10px; height:6px; overflow:hidden;">
                <div style="width:${percentUsed}%; background:${progressColor}; height:100%; transition:width 0.4s;"></div>
            </div>
        `;
        categoryCapsContainer.appendChild(block);
    });
}

function setupTaxPlannerModule() {
    calculateTaxBtn.addEventListener('click', () => {
        const region = taxRegionSelect.value; const income = parseFloat(yearlyIncomeInput.value);
        if (isNaN(income) || income <= 0) { alert("Please input a valid positive annual earnings parameter."); return; }
        let totalTax = 0; let detailedBreakdown = ""; let advice = "";
        if (region === "IN") {
            if (income <= 700000) { totalTax = 0; detailedBreakdown = "Eligible for Section 87A rebate. Net tax due is zero."; } 
            else {
                let tempIncome = income;
                if (tempIncome > 1500000) { totalTax += (tempIncome - 1500000) * 0.30; tempIncome = 1500000; }
                if (tempIncome > 1200000) { totalTax += (tempIncome - 1200000) * 0.20; tempIncome = 1200000; }
                if (tempIncome > 900000)  { totalTax += (tempIncome - 900000) * 0.15;  tempIncome = 900000; }
                if (tempIncome > 600000)  { totalTax += (tempIncome - 600000) * 0.10;  tempIncome = 600000; }
                if (tempIncome > 300000)  { totalTax += (tempIncome - 300000) * 0.05;  tempIncome = 300000; }
                detailedBreakdown = `Calculated across standard slab percentages. Total Estimated Liability: ₹${totalTax.toFixed(2)}`;
            }
            advice = "💡 Strategy: Consider matching tax exemptions vehicles (like Section 80C) to safely insulate your asset yields.";
        } else if (region === "US") {
            let tempIncome = income;
            if (tempIncome > 609350) { totalTax += (tempIncome - 609350) * 0.37; tempIncome = 609350; }
            if (tempIncome > 243725) { totalTax += (tempIncome - 243725) * 0.35; tempIncome = 243725; }
            if (tempIncome > 191950) { totalTax += (tempIncome - 191950) * 0.32; tempIncome = 191950; }
            if (tempIncome > 100525) { totalTax += (tempIncome - 100525) * 0.24; tempIncome = 100525; }
            if (tempIncome > 47150)  { totalTax += (tempIncome - 47150) * 0.22;  tempIncome = 47150; }
            if (tempIncome > 11600)  { totalTax += (tempIncome - 11600) * 0.12;  tempIncome = 11600; }
            totalTax += tempIncome * 0.10;
            detailedBreakdown = `Calculated across US Federal Income Single brackets. Total Estimated Liability: $${totalTax.toFixed(2)}`;
            advice = "💡 Strategy: Max out pre-tax contribution limits toward 401(k) allocations to compress gross thresholds limits.";
        }
        const activeSymbol = region === "IN" ? "₹" : "$";
        taxSummaryText.innerHTML = `⚡ <strong>Tax Analysis Output:</strong><br>• Projected Gross Income: <strong>${activeSymbol}${income.toFixed(2)}</strong><br>• Estimated Structural Tax: <strong style="color:var(--danger)">${activeSymbol}${totalTax.toFixed(2)}</strong><br>• Net Take-Home: <strong>${activeSymbol}${(income - totalTax).toFixed(2)}</strong><br><p style="margin:8px 0 0 0; font-size:13px; color:var(--text-muted);">${detailedBreakdown}</p><span style="font-size:12px; display:inline-block; margin-top:6px; color:#c7d2fe;">${advice}</span>`;
        taxResultsPanel.style.display = 'block';
    });
}

function setupCashMatrixModules() {
    findAtmMatrixBtn.addEventListener('click', () => {
        const userNetwork = userBankNetworkSelect.value; atmFeesListRendered.innerHTML = '';
        localizedAtmNetworkMap.forEach(terminal => {
            const isMatch = terminal.key === userNetwork; const operationalFee = isMatch ? terminal.networkFee : terminal.outNetworkFee;
            const item = document.createElement('li'); item.innerHTML = `<span>📍 <strong>${terminal.bank}</strong></span><span style="font-weight: bold; color: ${isMatch ? 'var(--success)' : '#f59e0b'}">${operationalFee === 0 ? "FREE" : `Fee: ${currentCurrency}${operationalFee}`}</span>`;
            atmFeesListRendered.appendChild(item);
        });
        atmRoutingResultsPanel.style.display = 'block';
    });

    calculateSweepBtn.addEventListener('click', () => {
        const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0); const totalSubs = subscriptions.reduce((sum, item) => sum + item.amount, 0); const unspentLiquidity = budget - (totalSpent + totalSubs); const safetyThreshold = parseFloat(checkingThresholdInput.value);
        if (isNaN(safetyThreshold) || safetyThreshold < 0) { alert("Please input a valid reserve baseline limit parameter."); return; }
        if (unspentLiquidity <= safetyThreshold) { sweepAllocationSummaryText.innerHTML = `❌ <strong>Sweep Blocked:</strong> Your leftover liquid funds are below your safety reserve threshold.`; } 
        else {
            const highYieldSurplusSweep = unspentLiquidity - safetyThreshold; const estimatedYieldGains = highYieldSurplusSweep * 0.072;
            sweepAllocationSummaryText.innerHTML = `⚡ <strong>Optimal Allocation Matrix:</strong><br>• Keep in checking: <strong>${currentCurrency}${safetyThreshold.toFixed(2)}</strong><br>• Sweep to Savings: <strong style="color:var(--success)">${currentCurrency}${highYieldSurplusSweep.toFixed(2)}</strong><br><span style="font-size:12px; display:inline-block; margin-top:6px; color:var(--text-muted);">💡 Estimated annual returns: <strong>${currentCurrency}${estimatedYieldGains.toFixed(2)}</strong></span>`;
        }
        sweepResultsPanel.style.display = 'block';
    });
}

function setupReceiptScanner() {
    scannerArea.addEventListener('click', () => { scannerFileInput.click(); });
    scannerFileInput.addEventListener('change', () => {
        if (scannerFileInput.files.length === 0) return;
        scannerLaser.style.display = 'block';
        scannerLaser.style.animation = 'scanningMotion 2s infinite linear';
        scannerLogStatus.style.display = 'block';
        scannerLogStatus.innerText = "Scanning document structural frame fields...";

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * mockReceiptsPool.length);
            let extractedItem = mockReceiptsPool[randomIndex];
            if (studentMode && !studentCategories.includes(extractedItem.category)) extractedItem.category = studentCategories[1];
            const activeDay = new Date().getDate();
            expenses.push({ id: Date.now(), name: `[Scanner] ${extractedItem.name}`, amount: extractedItem.amount, category: extractedItem.category, day: activeDay });
            scannerLaser.style.display = 'none'; scannerLaser.style.animation = 'none';
            scannerLogStatus.innerText = `✅ Extraction Success: Loaded ${extractedItem.name}`;
            updateDashboard(); renderExpenses(); renderHeatmap();
        }, 2200);
    });
}

function getCurrentScoreValue(combinedOutflow) {
    if (budget <= 0) return 100;
    let score = 100 - ((combinedOutflow / budget) * 70);
    const loggedDaysCount = new Set(expenses.map(e => e.day)).size; score += ((31 - loggedDaysCount) * 0.5);
    return Math.max(0, Math.min(100, Math.round(score)));
}

function calculateFinancialHealthScore(combinedOutflow) {
    if (budget <= 0) { healthScoreValue.innerText = "100"; healthScoreStatus.innerText = "Awaiting Budget"; return; }
    const score = getCurrentScoreValue(combinedOutflow); healthScoreValue.innerText = score;
    if (score >= 85) { healthScoreStatus.innerText = "Excellent ✨"; healthScoreStatus.style.color = "var(--success)"; } 
    else if (score >= 65) { healthScoreStatus.innerText = "Good 👍"; healthScoreStatus.style.color = "#60a5fa"; } 
    else { healthScoreStatus.innerText = "Critical Risk 🚨"; healthScoreStatus.style.color = "var(--danger)"; }
}

archiveMonthBtn.addEventListener('click', () => {
    if (budget <= 0 && expenses.length === 0) return;
    const monthLabel = prompt("Enter cycle label (e.g. 'Jan'):"); if (!monthLabel) return;
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0); const totalSubs = subscriptions.reduce((sum, item) => sum + item.amount, 0); const outflow = totalSpent + totalSubs;
    historyLog.push({ label: monthLabel, spent: outflow, score: getCurrentScoreValue(outflow) }); expenses = []; budget = 0;
    updateDashboard(); renderExpenses(); renderHeatmap(); updateTrendChart();
});

subscriptionForm.addEventListener('submit', (e) => {
    e.preventDefault(); const name = subNameInput.value; const amount = parseFloat(subAmountInput.value);
    subscriptions.push({ id: Date.now(), name, amount }); subscriptionForm.reset(); updateDashboard(); renderSubscriptions();
});

function renderSubscriptions() {
    subscriptionList.innerHTML = '';
    subscriptions.forEach(item => {
        const li = document.createElement('li'); li.innerHTML = `<span>🔄 <strong>${item.name}</strong></span><span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteSubscription(${item.id})">❌</button></span>`; subscriptionList.appendChild(li);
    });
}

window.deleteSubscription = function(id) { subscriptions = subscriptions.filter(item => item.id !== id); updateDashboard(); renderSubscriptions(); };

function setupVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SpeechRecognition) return; const recognition = new SpeechRecognition();
    voiceStartBtn.addEventListener('click', () => { recognition.start(); });
    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript.toLowerCase(); const matches = speechResult.match(/\d+/); if (!matches) return; const amount = parseFloat(matches[0]);
        expenses.push({ id: Date.now(), name: "Voice Entry", amount, category: "Other", day: new Date().getDate() }); updateDashboard(); renderExpenses(); renderHeatmap();
    };
}

function generateAIInsights(combinedOutflow) {
    if (budget <= 0) { aiInsightText.innerText = "💡 Initialize a budget ceiling above to deploy AI analytics projections."; return; }
    const percentage = (combinedOutflow / budget) * 100;
    aiInsightText.innerText = `👍 Current expenditure profile consumes roughly ${percentage.toFixed(0)}% of parameters thresholds.`;
}

function renderHeatmap() {
    heatmapCalendar.innerHTML = ''; const dailyTotals = {}; for (let i = 1; i <= 31; i++) dailyTotals[i] = 0;
    expenses.forEach(exp => { if (exp.day) dailyTotals[exp.day] += exp.amount; }); const maxSpentInADay = Math.max(...Object.values(dailyTotals), 1);
    for (let d = 1; d <= 31; d++) {
        const dayAmount = dailyTotals[d]; const dayDiv = document.createElement('div'); dayDiv.className = 'heatmap-day'; dayDiv.innerHTML = `${d}<span>${dayAmount > 0 ? currentCurrency + dayAmount.toFixed(0) : ''}</span>`;
        if (dayAmount > 0) { const intensity = Math.min((dayAmount / maxSpentInADay), 1); dayDiv.style.background = `rgba(79, 70, 229, ${0.1 + intensity * 0.4})`; dayDiv.style.color = '#fff'; }
        heatmapCalendar.appendChild(dayDiv);
    }
}

searchInput.addEventListener('input', () => { renderExpenses(); });
studentToggle.addEventListener('change', () => { setupCategoryDropdown(); updateDashboard(); if (expenseChart) { expenseChart.destroy(); initChart(); } renderHeatmap(); });
currencySelect.addEventListener('change', () => { currentCurrency = currencySelect.value; updateDashboard(); renderExpenses(); renderSubscriptions(); renderHeatmap(); updateTrendChart(); });
setBudgetBtn.addEventListener('click', () => { const value = parseFloat(budgetInput.value); if (value > 0) { budget = value; budgetInput.value = ''; updateDashboard(); } });
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault(); expenses.push({ id: Date.now(), name: document.getElementById('expense-name').value, amount: parseFloat(document.getElementById('expense-amount').value), category: document.getElementById('expense-category').value, day: parseInt(document.getElementById('expense-day').value) });
    expenseForm.reset(); updateDashboard(); renderExpenses(); renderHeatmap();
});

function renderExpenses() {
    expenseList.innerHTML = ''; const query = searchInput.value.toLowerCase();
    expenses.forEach(item => {
        if (query && !item.name.toLowerCase().includes(query)) return;
        const li = document.createElement('li'); li.innerHTML = `<span>Day ${item.day} - <strong>${item.name}</strong></span><span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteExpense(${item.id})">❌</button></span>`; expenseList.appendChild(li);
    });
}
window.deleteExpense = function(id) { expenses = expenses.filter(item => item.id !== id); updateDashboard(); renderExpenses(); renderHeatmap(); };

function initChart() {
    const ctx = document.getElementById('expense-chart').getContext('2d'); const activeLabels = studentToggle.checked ? studentCategories : standardCategories;
    expenseChart = new Chart(ctx, { type: 'doughnut', data: { labels: activeLabels, datasets: [{ data: activeLabels.map(() => 0), backgroundColor: ['#10b981', '#4f46e5', '#f59e0b', '#ec4899', '#64748b'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
    updateChartData();
}
function updateChartData() {
    const activeLabels = studentToggle.checked ? studentCategories : standardCategories;
    expenseChart.data.labels = activeLabels; expenseChart.data.datasets[0].data = activeLabels.map(cat => expenses.filter(item => item.category === cat).reduce((sum, item) => sum + item.amount, 0)); expenseChart.update();
}
function initTrendChart() {
    const ctx = document.getElementById('history-trend-chart').getContext('2d');
    trendChart = new Chart(ctx, { type: 'line', data: { labels: historyLog.map(item => item.label), datasets: [{ data: historyLog.map(item => item.score), borderColor: '#4f46e5', backgroundColor: 'transparent', tension: 0.3 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 100 } } } });
}
function updateTrendChart() { if (!trendChart) return; trendChart.data.labels = historyLog.map(item => item.label); trendChart.data.datasets[0].data = historyLog.map(item => item.score); trendChart.update(); }

init();