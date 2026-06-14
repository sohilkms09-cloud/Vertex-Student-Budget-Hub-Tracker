// =========================================================================
// 🚀 DYNAMIC TAB VIEW ROUTING SWITCH ENGINE (GLOBAL TO FIX CLICK ERROR)
// =========================================================================
window.switchActiveTab = function(event, tabId) {
    // 1. Hide all active content sections
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active-content');
    });
    
    // 2. Remove the active styling button flags from all tabs
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.classList.remove('active');
    });
    
    // 3. Mount active parameters to current selection targets
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active-content');
    }
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
};

// =========================================================================
// 📅 DYNAMIC GRID-BASED CALENDAR ENGINE ADJUSTER
// =========================================================================
window.adjustCalendarMonth = function(direction) {
    if (typeof activeCalendarDate !== 'undefined') {
        activeCalendarDate.setMonth(activeCalendarDate.getMonth() + direction);
        if (typeof renderReminders === 'function') {
            renderReminders();
        }
    }
};

// =========================================================================
// 🛡️ SECURITY NAVIGATION GUARD: INTERCEPT ANONYMOUS SESSIONS LIVE
// =========================================================================
function checkNavigationAccessRights() {
    const isVerified = sessionStorage.getItem('userAuthenticated');
    if (isVerified !== 'true') {
        window.location.replace('index.html');
        return false;
    }
    return true;
}

// =========================================================================
// 🚪 GLOBAL EXIT ROUTING LOGOUT PIPELINE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById('google-logout-trigger-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('userAuthenticated');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userDisplayName');
            window.location.replace('index.html');
        });
    }
});

// Run application layers only if active authenticated token session passes
if (checkNavigationAccessRights()) {

    var budget = localStorage.getItem('budget') ? parseFloat(localStorage.getItem('budget')) : 0;
    var expenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
    var subscriptions = localStorage.getItem('subscriptions') ? JSON.parse(localStorage.getItem('subscriptions')) : [];
    var historyLog = localStorage.getItem('historyLog') ? JSON.parse(localStorage.getItem('historyLog')) : [];
    var savingsGoals = localStorage.getItem('savingsGoals') ? JSON.parse(localStorage.getItem('savingsGoals')) : [];
    var remindersList = localStorage.getItem('remindersList') ? JSON.parse(localStorage.getItem('remindersList')) : [];
    var academicFeesList = localStorage.getItem('academicFeesList') ? JSON.parse(localStorage.getItem('academicFeesList')) : [];
    var targetAllowanceDropDay = localStorage.getItem('targetAllowanceDropDay') ? parseInt(localStorage.getItem('targetAllowanceDropDay')) : 1; 
    var loggedIncomes = localStorage.getItem('loggedIncomes') ? JSON.parse(localStorage.getItem('loggedIncomes')) : [];

    var currentCurrency = localStorage.getItem('currency') ? localStorage.getItem('currency') : '₹';
    var studentMode = true; 

    // Internal Grid State Parameters
    window.activeCalendarDate = new Date();

    // DOM Target Field Bindings
    const currencySelect = document.getElementById('currency-select');
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
    const expenseList = document.getElementById('expense-list');
    const aiInsightText = document.getElementById('ai-insight-text');
    const heatmapCalendar = document.getElementById('heatmap-calendar');
    const searchInput = document.getElementById('search-input');

    const voiceStartBtn = document.getElementById('voice-start-btn');
    const voiceStatus = document.getElementById('voice-status');
    const savingsPercentage = document.getElementById('savings-percentage');
    const savingsProgressFill = document.getElementById('savings-progress-fill');
    const healthScoreValue = document.getElementById('health-score-value');
    const healthScoreStatus = document.getElementById('health-score-status');
    const dailyTipText = document.getElementById('daily-tip-text');

    const subscriptionForm = document.getElementById('subscription-form');
    const subscriptionList = document.getElementById('subscription-list');
    const totalSubscriptionsEl = document.getElementById('total-subscriptions');
    const scannerArea = document.getElementById('scanner-area');
    const scannerPrompt = document.getElementById('scanner-prompt');
    const scannerFileInput = document.getElementById('scanner-file-input');
    const scannerLaser = document.getElementById('scanner-laser');
    const scannerLogStatus = document.getElementById('scanner-log-status');
    const categoryCapsContainer = document.getElementById('category-caps-container');
    const cameraStreamVideo = document.getElementById('camera-stream');
    const startCameraBtn = document.getElementById('start-camera-btn');
    const captureSnapshotBtn = document.getElementById('capture-snapshot-btn');

    const goalForm = document.getElementById('goal-form');
    const goalNameInput = document.getElementById('goal-name');
    const goalTargetInput = document.getElementById('goal-target');
    const goalsContainer = document.getElementById('goals-container');
    const noSpendStreakValue = document.getElementById('no-spend-streak-value');
    const shoppingSpreeStatus = document.getElementById('shopping-spree-status');

    const quickGoalSelect = document.getElementById('quick-allocate-goal-select');
    const quickGoalAmount = document.getElementById('quick-allocate-amount');
    const quickGoalBtn = document.getElementById('quick-allocate-btn');

    const reminderForm = document.getElementById('reminder-form');
    const reminderListEl = document.getElementById('reminder-list');
    const fullGridCalendarBody = document.getElementById('full-grid-calendar-body');
    const calendarMonthLabel = document.getElementById('calendar-month-label');
    const receiptLightbox = document.getElementById('receipt-lightbox');
    const lightboxRenderTarget = document.getElementById('lightbox-render-target');
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    const expenseAttachmentFile = document.getElementById('expense-attachment-file');

    const splitBillCheckbox = document.getElementById('split-bill-checkbox');
    const roommateCountDrawer = document.getElementById('roommate-count-drawer');
    const roommateTotalCount = document.getElementById('roommate-total-count');
    const roommatesOweTotal = document.getElementById('roommates-owe-total');
    const allowanceDaysCounter = document.getElementById('allowance-days-counter');
    const setAllowanceDayBtn = document.getElementById('set-allowance-day-btn');
    const academicFeeForm = document.getElementById('academic-fee-form');
    const academicFeesListEl = document.getElementById('academic-fees-list');
    const academicFeesTotalSum = document.getElementById('academic-fees-total-sum');
    const incomeForm = document.getElementById('income-form-element');
    const incomeHistoryListEl = document.getElementById('income-history-list');

    let expenseChart, trendChart;
    let activeCameraStream = null;

    const studentCategories = ['Hostel/Rent', 'Mess & Food', 'Books & Exams', 'Travel', 'Socials'];

    const financialTips = [
        "💡 Tip: Track your campus micro-transactions. Small coffees and daily snacks can quietly drain your allowance balance.",
        "💡 Tip: Roommate debts add up! Make sure to log splits right away so you don't end up funding shared items alone."
    ];

    const mockReceiptImages = [
        "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500&q=80",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80"
    ];

    function populateQuickGoalDropdown() {
        if (!quickGoalSelect) return;
        quickGoalSelect.innerHTML = '';
        if (savingsGoals.length === 0) {
            const opt = document.createElement('option');
            opt.innerText = "No goals configured yet";
            quickGoalSelect.appendChild(opt);
            return;
        }
        savingsGoals.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.id;
            opt.innerText = `🎯 ${g.name}`;
            quickGoalSelect.appendChild(opt);
        });
    }

    function setupInteractionFeatures() {
        if (closeLightboxBtn) {
            closeLightboxBtn.addEventListener('click', () => { receiptLightbox.style.display = 'none'; });
        }
        if (receiptLightbox) {
            receiptLightbox.addEventListener('click', (e) => { if (e.target === receiptLightbox) receiptLightbox.style.display = 'none'; });
        }
        if (splitBillCheckbox) {
            splitBillCheckbox.addEventListener('change', () => {
                if (roommateCountDrawer) roommateCountDrawer.style.display = splitBillCheckbox.checked ? 'block' : 'none';
            });
        }
        if (setAllowanceDayBtn) {
            setAllowanceDayBtn.addEventListener('click', () => {
                const val = parseInt(prompt("Enter the day of the month your pocket money arrives (1-31):", targetAllowanceDropDay));
                if (val >= 1 && val <= 31) {
                    targetAllowanceDropDay = val;
                    localStorage.setItem('targetAllowanceDropDay', targetAllowanceDropDay);
                    calculateAllowanceCountdownDays();
                }
            });
        }

        if (quickGoalBtn) {
            quickGoalBtn.addEventListener('click', () => {
                if (!quickGoalSelect || !quickGoalAmount) return;
                const targetId = parseInt(quickGoalSelect.value);
                const fundingValue = parseFloat(quickGoalAmount.value) || 0;
                
                if (fundingValue <= 0) {
                    alert("Please enter a valid deposit value.");
                    return;
                }
                
                let goalInstance = savingsGoals.find(g => g.id === targetId);
                if (goalInstance) {
                    if (typeof goalInstance.current === 'undefined') goalInstance.current = 0;
                    goalInstance.current += fundingValue;

                    const timestampNode = new Date();
                    const absoluteTimeMarker = captureChronologicalTimestamp(timestampNode);
                    
                    expenses.push({
                        id: Date.now(),
                        name: `💰 Goal Deposit: ${goalInstance.name}`,
                        amount: fundingValue,
                        personalShare: fundingValue,
                        category: "Socials",
                        day: timestampNode.getDate(),
                        timeStamp: absoluteTimeMarker,
                        receiptUrl: ""
                    });
                    
                    localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
                    quickGoalAmount.value = '';
                    
                    updateDashboard();
                    renderExpenses();
                    renderHeatmap();
                }
            });
        }

        if (reminderForm) {
            reminderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameEl = document.getElementById('reminder-name');
                const amountEl = document.getElementById('reminder-amount');
                const dateEl = document.getElementById('reminder-date');
                if (!nameEl || !amountEl || !dateEl) return;

                const rawDateVal = dateEl.value;
                const formattedDate = new Date(rawDateVal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                
                remindersList.push({ 
                    id: Date.now(), 
                    name: nameEl.value, 
                    amount: parseFloat(amountEl.value) || 0, 
                    dateLabel: formattedDate,
                    rawDate: rawDateVal
                });
                reminderForm.reset(); 
                updateDashboard(); 
                renderReminders();
            });
        }

        if (academicFeeForm) {
            academicFeeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const feeNameEl = document.getElementById('fee-name');
                const feeAmountEl = document.getElementById('fee-amount');
                const feeDateEl = document.getElementById('fee-date');
                if (!feeNameEl || !feeAmountEl || !feeDateEl) return;

                const formattedDate = new Date(feeDateEl.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                academicFeesList.push({ id: Date.now(), name: feeNameEl.value, amount: parseFloat(feeAmountEl.value) || 0, targetDate: formattedDate });
                academicFeeForm.reset();
                renderAcademicFeesTimeline();
            });
        }

        if (incomeForm) {
            incomeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const incName = document.getElementById('income-name').value;
                const incAmount = parseFloat(document.getElementById('income-amount').value) || 0;
                const incType = document.getElementById('income-source-type').value;
                const timestampNode = new Date();
                const absoluteTimeMarker = captureChronologicalTimestamp(timestampNode);

                loggedIncomes.push({ id: Date.now(), name: incName, amount: incAmount, typeLabel: incType, day: timestampNode.getDate(), timeStamp: absoluteTimeMarker });
                localStorage.setItem('loggedIncomes', JSON.stringify(loggedIncomes));
                incomeForm.reset();
                updateDashboard(); renderExpenses(); renderHeatmap(); renderIncomeHistoryLog();
            });
        }

        if (goalForm) {
            goalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const initialSaved = parseFloat(document.getElementById('goal-current').value) || 0;
                if (!goalNameInput || !goalTargetInput) return;
                
                savingsGoals.push({ id: Date.now(), name: goalNameInput.value, target: parseFloat(goalTargetInput.value) || 0, current: initialSaved });
                goalForm.reset(); 
                updateDashboard();
            });
        }
    }

    window.openReceiptLightbox = function(imageUrl) {
        if (lightboxRenderTarget && receiptLightbox) {
            lightboxRenderTarget.src = imageUrl; 
            receiptLightbox.style.display = 'flex';
        }
    };

    function calculateAllowanceCountdownDays() {
        if (!allowanceDaysCounter) return;
        const today = new Date();
        const currentDay = today.getDate();
        let daysRemaining = 0;
        if (currentDay <= targetAllowanceDropDay) {
            daysRemaining = targetAllowanceDropDay - currentDay;
        } else {
            const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            daysRemaining = (daysInCurrentMonth - currentDay) + targetAllowanceDropDay;
        }
        allowanceDaysCounter.innerText = daysRemaining;
    }

    function renderAcademicFeesTimeline() {
        if (!academicFeesListEl) return;
        academicFeesListEl.innerHTML = '';
        let totalSumOverhead = 0;
        if (academicFeesList.length === 0) {
            academicFeesListEl.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding:10px;">No upcoming tuition/exam fees logged.</p>`;
            if (academicFeesTotalSum) academicFeesTotalSum.innerText = `${currentCurrency}0.00`;
            return;
        }
        academicFeesList.forEach(item => {
            totalSumOverhead += item.amount;
            const li = document.createElement('li');
            li.innerHTML = `<span>🎓 <strong>${item.name}</strong> <small style="color:var(--danger)">Due: ${item.targetDate}</small></span><span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteAcademicFee(${item.id})">❌</button></span>`;
            academicFeesListEl.appendChild(li);
        });
        if (academicFeesTotalSum) academicFeesTotalSum.innerText = `${currentCurrency}${totalSumOverhead.toFixed(2)}`;
        localStorage.setItem('academicFeesList', JSON.stringify(academicFeesList));
    }

    window.deleteAcademicFee = function(id) { academicFeesList = academicFeesList.filter(item => item.id !== id); renderAcademicFeesTimeline(); };

    // =========================================================================
    // 📅 DYNAMIC GRID-BASED CALENDAR RENDERING ENGINE
    // =========================================================================
    window.renderReminders = function() {
        if (!reminderListEl || !fullGridCalendarBody || !calendarMonthLabel) return;
        
        reminderListEl.innerHTML = '';
        if (remindersList.length === 0) { 
            reminderListEl.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding: 10px;">No pending alerts.</p>`; 
        } else {
            remindersList.forEach(item => {
                const li = document.createElement('li');
                li.style.borderLeft = '3px solid var(--warning)';
                const costText = item.amount > 0 ? `${currentCurrency}${item.amount.toFixed(2)}` : `<small>Task Tracker</small>`;
                li.innerHTML = `<span>📅 <strong>${item.name}</strong> <small>Target: ${item.dateLabel}</small></span><span>${costText} <button class="delete-btn" onclick="deleteReminder(${item.id})">❌</button></span>`;
                reminderListEl.appendChild(li);
            });
        }
        localStorage.setItem('remindersList', JSON.stringify(remindersList));

        fullGridCalendarBody.innerHTML = '';
        const year = activeCalendarDate.getFullYear();
        const month = activeCalendarDate.getMonth();

        calendarMonthLabel.innerText = activeCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDayIdx = new Date(year, month, 1).getDay();
        const totalDaysCount = new Date(year, month + 1, 0).getDate();
        const prevMonthTotalDays = new Date(year, month, 0).getDate();

        for (let x = firstDayIdx; x > 0; x--) {
            const block = document.createElement('div');
            block.className = 'calendar-day-node inactive-day';
            block.innerText = prevMonthTotalDays - x + 1;
            fullGridCalendarBody.appendChild(block);
        }

        for (let currentDayNum = 1; currentDayNum <= totalDaysCount; currentDayNum++) {
            const block = document.createElement('div');
            block.className = 'calendar-day-node';
            
            const nodeTitle = document.createElement('div');
            nodeTitle.className = 'day-node-number';
            nodeTitle.innerText = currentDayNum;
            block.appendChild(nodeTitle);

            const dayString = String(currentDayNum).padStart(2, '0');
            const monthString = String(month + 1).padStart(2, '0');
            const matchKey = `${year}-${monthString}-${dayString}`;

            const systemToday = new Date();
            if (currentDayNum === systemToday.getDate() && month === systemToday.getMonth() && year === systemToday.getFullYear()) {
                block.classList.add('today-highlight');
            }

            const matchedReminders = remindersList.filter(item => item.rawDate === matchKey);
            if (matchedReminders.length > 0) {
                matchedReminders.forEach(task => {
                    const pill = document.createElement('div');
                    pill.className = 'calendar-task-pill';
                    pill.title = `${task.name} (${currentCurrency}${task.amount})`;
                    pill.innerText = task.amount > 0 ? `₹ ${task.name}` : task.name;
                    block.appendChild(pill);
                });
            }

            fullGridCalendarBody.appendChild(block);
        }

        const filledCellsCount = firstDayIdx + totalDaysCount;
        const tailFillerNeeded = filledCellsCount % 7 === 0 ? 0 : 7 - (filledCellsCount % 7);
        for (let trailingDay = 1; trailingDay <= tailFillerNeeded; trailingDay++) {
            const block = document.createElement('div');
            block.className = 'calendar-day-node inactive-day';
            block.innerText = trailingDay;
            fullGridCalendarBody.appendChild(block);
        }
    }

    window.deleteReminder = function(id) { remindersList = remindersList.filter(item => item.id !== id); renderReminders(); };

    function renderSubscriptions() {
        if (!subscriptionList) return;
        subscriptionList.innerHTML = '';
        subscriptions.forEach(item => {
            const li = document.createElement('li'); li.innerHTML = `<span>🔄 <strong>${item.name}</strong></span><span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteSubscription(${item.id})">❌</button></span>`; subscriptionList.appendChild(li);
        });
    }

    window.deleteSubscription = function(id) { subscriptions = subscriptions.filter(item => item.id !== id); updateDashboard(); renderSubscriptions(); };
    function displayRandomTip() { if (dailyTipText) dailyTipText.innerText = financialTips[Math.floor(Math.random() * financialTips.length)]; }

    function setupCategoryDropdown() {
        if (!expenseCategorySelect) return;
        expenseCategorySelect.innerHTML = '';
        studentCategories.forEach(cat => {
            const option = document.createElement('option'); option.value = cat; option.innerText = cat; expenseCategorySelect.appendChild(option);
        });
    }

    function updateDashboard() {
        const cumulativeExtraIncome = loggedIncomes.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        const dynamicRollingBudgetCap = budget + cumulativeExtraIncome;
        const totalSpent = expenses.reduce((sum, item) => sum + (parseFloat(item.personalShare) || parseFloat(item.amount) || 0), 0); 
        const totalSubs = subscriptions.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        const combinedOutflow = totalSpent + totalSubs;
        const balance = dynamicRollingBudgetCap - combinedOutflow;

        const totalRoommatesOweYou = expenses.reduce((sum, item) => sum + ((parseFloat(item.amount) || 0) - (parseFloat(item.personalShare) || parseFloat(item.amount) || 0)), 0);
        if (roommatesOweTotal) roommatesOweTotal.innerText = `${currentCurrency}${totalRoommatesOweYou.toFixed(2)}`;
        if (totalBudgetEl) totalBudgetEl.innerText = `${currentCurrency}${dynamicRollingBudgetCap.toFixed(2)}`;
        if (totalExpensesEl) totalExpensesEl.innerText = `${currentCurrency}${combinedOutflow.toFixed(2)}`;
        if (balanceLeftEl) balanceLeftEl.innerText = `${currentCurrency}${balance.toFixed(2)}`;
        if (totalSubscriptionsEl) totalSubscriptionsEl.innerText = `${currentCurrency}${totalSubs.toFixed(2)}`;

        if (budgetCard) {
            budgetCard.className = 'metric-card';
            if (dynamicRollingBudgetCap > 0) {
                const percentSpent = (combinedOutflow / dynamicRollingBudgetCap) * 100;
                if (percentSpent >= 90) budgetCard.classList.add('status-danger');
                else if (percentSpent >= 70) budgetCard.classList.add('status-warning');
                else budgetCard.classList.add('status-good');
            } else { budgetCard.classList.add('status-good'); }
        }

        if (dynamicRollingBudgetCap > 0) {
            let remainingPercent = (balance / dynamicRollingBudgetCap) * 100;
            if (remainingPercent < 0) remainingPercent = 0;
            if (savingsPercentage) savingsPercentage.innerText = `${remainingPercent.toFixed(0)}% Remaining`;
            if (savingsProgressFill) {
                savingsProgressFill.style.width = `${remainingPercent}%`;
                if (remainingPercent < 20) savingsProgressFill.style.background = 'var(--danger)';
                else if (remainingPercent < 40) savingsProgressFill.style.background = 'var(--warning)';
                else savingsProgressFill.style.background = 'linear-gradient(90deg, var(--success), #34d399)';
            }
        } else {
            if (savingsPercentage) savingsPercentage.innerText = '100% Left';
            if (savingsProgressFill) savingsProgressFill.style.width = '100%';
        }

        localStorage.setItem('budget', budget);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        localStorage.setItem('historyLog', JSON.stringify(historyLog));
        localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
        localStorage.setItem('currency', currentCurrency);

        calculateFinancialHealthScore(combinedOutflow, dynamicRollingBudgetCap);
        generateAIInsights(combinedOutflow, dynamicRollingBudgetCap);
        renderCategoryWarningsDashboard(totalSpent, dynamicRollingBudgetCap);
        analyzeUserHabitsStreaks();
        renderSavingsGoals(); 
        if (expenseChart) updateChartData();
    }

    function renderCategoryWarningsDashboard(totalSpent, dynamicRollingBudgetCap) {
        if (!categoryCapsContainer) return;
        categoryCapsContainer.innerHTML = '';
        if (dynamicRollingBudgetCap <= 0) { categoryCapsContainer.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center;">Lock budget parameters to display gauges.</p>`; return; }
        const MathCapShares = [0.35, 0.25, 0.15, 0.15, 0.10]; 

        studentCategories.forEach((cat, index) => {
            const catSpent = expenses.filter(e => e.category === cat).reduce((sum, item) => sum + (parseFloat(item.personalShare) || parseFloat(item.amount) || 0), 0);
            const catCapCeiling = dynamicRollingBudgetCap * MathCapShares[index];
            const percentUsed = Math.min((catSpent / catCapCeiling) * 100, 100);
            let progressColor = percentUsed >= 90 ? "var(--danger)" : (percentUsed >= 70 ? "var(--warning)" : "var(--success)");

            const block = document.createElement('div');
            block.innerHTML = `
                <div style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-main); margin-bottom:4px;">
                    <span><strong>${cat}</strong> <span style="color:var(--text-muted)">(Limit: ${currentCurrency}${catCapCeiling.toFixed(0)})</span></span>
                    <span style="font-weight:bold; color:${progressColor}">${currentCurrency}${catSpent.toFixed(0)} (${percentUsed.toFixed(0)}%)</span>
                </div>
                <div style="width:100%; background:rgba(255,255,255,0.03); border-radius:10px; height:6px; overflow:hidden;">
                    <div style="width:${percentUsed}%; background:${progressColor}; height:100%; transition:width 0.4s;"></div>
                </div>
            `;
            categoryCapsContainer.appendChild(block);
        });
    }

    function renderSavingsGoals() {
        if (!goalsContainer) return;
        goalsContainer.innerHTML = '';
        populateQuickGoalDropdown();
        if (savingsGoals.length === 0) { 
            goalsContainer.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center;">No milestones configured yet.</p>`; 
            return; 
        }
        savingsGoals.forEach(goal => {
            const currentSavedAmount = goal.current || 0;
            const progressPercent = Math.min((currentSavedAmount / goal.target) * 100, 100);
            const block = document.createElement('div');
            block.innerHTML = `
                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                    <span>🎯 <strong>${goal.name}</strong></span>
                    <span style="color:var(--text-muted); font-size:11px;">${currentCurrency}${currentSavedAmount.toFixed(0)} / ${currentCurrency}${goal.target.toFixed(0)} <button class="delete-btn" onclick="deleteGoal(${goal.id})">❌</button></span>
                </div>
                <div style="width:100%; background:rgba(255,255,255,0.02); border-radius:10px; height:8px; overflow:hidden; border:1px solid var(--glass-border);">
                    <div style="width:${progressPercent}%; background:linear-gradient(90deg, #10b981, #818cf8); height:100%; border-radius:10px; transition:width 0.4s;"></div>
                </div>
            `;
            goalsContainer.appendChild(block);
        });
    }

    window.deleteGoal = function(id) { savingsGoals = savingsGoals.filter(g => g.id !== id); updateDashboard(); };

    function analyzeUserHabitsStreaks() {
        if (!noSpendStreakValue) return;
        const loggedDays = new Set(expenses.map(e => e.day));
        let currentStreak = 0;
        for (let i = 1; i <= 31; i++) { if (!loggedDays.has(i)) { currentStreak++; } else { break; } }
        noSpendStreakValue.innerText = `${currentStreak} Days`;

        if (!shoppingSpreeStatus) return;
        const shoppingLogsCount = expenses.filter(e => e.category === 'Socials').length;
        if (shoppingLogsCount >= 5) { shoppingSpreeStatus.innerText = "Spree Alert 🛍️"; shoppingSpreeStatus.style.color = "var(--danger)"; } 
        else if (shoppingLogsCount >= 3) { shoppingSpreeStatus.innerText = "Moderate ⚠️"; shoppingSpreeStatus.style.color = "var(--warning)"; } 
        else { shoppingSpreeStatus.innerText = "Disciplined 🛡️"; shoppingSpreeStatus.style.color = "var(--success)"; }
    }

    function setupReceiptScanner() {
        if (!scannerArea) return;
        scannerArea.addEventListener('click', (e) => {
            if (!activeCameraStream && e.target !== startCameraBtn && e.target !== captureSnapshotBtn) { if (scannerFileInput) scannerFileInput.click(); }
        });
        if (scannerFileInput) scannerFileInput.addEventListener('change', () => { if (scannerFileInput.files.length > 0) runScannerLogic(true); });
        if (startCameraBtn) {
            startCameraBtn.addEventListener('click', async (e) => {
                e.stopPropagation(); if (activeCameraStream) { stopLiveVideoHardware(); return; }
                try {
                    activeCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
                    if (cameraStreamVideo) cameraStreamVideo.srcObject = activeCameraStream;
                    if (scannerPrompt) scannerPrompt.style.display = 'none';
                    if (cameraStreamVideo) cameraStreamVideo.style.display = 'block'; 
                    startCameraBtn.innerText = "🛑 Turn Off Camera"; 
                    if (captureSnapshotBtn) captureSnapshotBtn.disabled = false; 
                } catch (err) { alert("Live camera access rejected."); }
            });
        }
        if (captureSnapshotBtn) {
            captureSnapshotBtn.addEventListener('click', (e) => { e.stopPropagation(); runScannerLogic(true); stopLiveVideoHardware(); });
        }
    }

    function runScannerLogic(isValidBill) {
        if (!scannerLaser || !scannerLogStatus) return;
        scannerLaser.style.display = 'block'; scannerLaser.style.animation = 'scanningMotion 2s infinite linear'; scannerLogStatus.style.display = 'block'; scannerLogStatus.innerText = "🔍 OCR Scanner: Decoding structures...";
        setTimeout(() => {
            scannerLaser.style.display = 'none';
            const timestampNode = new Date();
            expenses.push({ id: Date.now(), name: `[OCR Scan] Text Books Bundle`, amount: 850, personalShare: 850, category: "Books & Exams", day: timestampNode.getDate(), timeStamp: captureChronologicalTimestamp(timestampNode), receiptUrl: mockReceiptImages[Math.floor(Math.random() * mockReceiptImages.length)] });
            scannerLogStatus.innerText = `✅ Extracted Success!`;
            updateDashboard(); renderExpenses(); renderHeatmap();
        }, 2500);
    }

    function stopLiveVideoHardware() {
        if (!activeCameraStream) return; activeCameraStream.getTracks().forEach(track => track.stop()); activeCameraStream = null; 
        if (cameraStreamVideo) cameraStreamVideo.style.display = 'none'; if(scannerPrompt) scannerPrompt.style.display = 'block'; startCameraBtn.innerText = "🎥 Turn On Live Camera"; if (captureSnapshotBtn) captureSnapshotBtn.disabled = true;
    }

    function getCurrentScoreValue(combinedOutflow, dynamicRollingBudgetCap) {
        if (dynamicRollingBudgetCap <= 0) return 100;
        let score = 100 - ((combinedOutflow / dynamicRollingBudgetCap) * 70);
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    function calculateFinancialHealthScore(combinedOutflow, dynamicRollingBudgetCap) {
        if (!healthScoreValue || !healthScoreStatus) return;
        if (dynamicRollingBudgetCap <= 0) { healthScoreValue.innerText = "100"; healthScoreStatus.innerText = "Awaiting Budget"; return; }
        const score = getCurrentScoreValue(combinedOutflow, dynamicRollingBudgetCap); healthScoreValue.innerText = score;
        if (score >= 85) healthScoreStatus.innerText = "Excellent ✨";
        else if (score >= 65) healthScoreStatus.innerText = "Good 👍";
        else healthScoreStatus.innerText = "Risk Alert 🚨";
    }

    if (archiveMonthBtn) {
        archiveMonthBtn.addEventListener('click', () => {
            if (budget <= 0 && expenses.length === 0) { alert("Cannot archive empty space!"); return; }
            const monthLabel = prompt("Enter a label (e.g. 'Jan'):"); if (!monthLabel) return;
            const outflow = expenses.reduce((sum, item) => sum + (item.personalShare || item.amount), 0) + subscriptions.reduce((sum, item) => sum + item.amount, 0);
            historyLog.push({ label: monthLabel, spent: outflow, score: getCurrentScoreValue(outflow, budget) }); 
            expenses = []; loggedIncomes = []; budget = 0; localStorage.removeItem('loggedIncomes');
            updateDashboard(); renderExpenses(); renderHeatmap(); updateTrendChart(); renderIncomeHistoryLog();
        });
    }

    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', (e) => {
            e.preventDefault(); const nameEl = document.getElementById('sub-name'); const amountEl = document.getElementById('sub-amount');
            subscriptions.push({ id: Date.now(), name: nameEl.value, amount: parseFloat(amountEl.value) || 0 }); 
            subscriptionForm.reset(); updateDashboard(); renderSubscriptions();
        });
    }

    function setupVoiceRecognition() {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SpeechRecognition || !voiceStartBtn) return; 
            const recognition = new SpeechRecognition();
            voiceStartBtn.addEventListener('click', () => { recognition.start(); if (voiceStatus) voiceStatus.innerText = "Listening..."; });
            recognition.onresult = function(event) {
                const result = event.results[0][0].transcript.toLowerCase(); const matches = result.match(/\d+/); if (!matches) return;
                const timestampNode = new Date(); expenses.push({ id: Date.now(), name: "Voice Entry Item", amount: parseFloat(matches[0]), personalShare: parseFloat(matches[0]), category: "Socials", day: timestampNode.getDate(), timeStamp: captureChronologicalTimestamp(timestampNode) }); 
                updateDashboard(); renderExpenses(); renderHeatmap();
            };
        } catch (e) {}
    }

    function generateAIInsights(combinedOutflow, dynamicRollingBudgetCap) {
        if (!aiInsightText) return;
        if (dynamicRollingBudgetCap <= 0) { aiInsightText.innerText = "💡 Tip: Setup parameters limit baseline."; return; }
        const percentage = (combinedOutflow / dynamicRollingBudgetCap) * 100;
        aiInsightText.innerText = percentage > 100 ? `🚨 Cap Breach: Exceeded by ${(percentage - 100).toFixed(0)}%!` : `👍 Trajectory Safe: Balances look standard.`;
    }

    function renderHeatmap() {
        if (!heatmapCalendar) return; heatmapCalendar.innerHTML = ''; const dailyTotals = {}; for (let i = 1; i <= 31; i++) dailyTotals[i] = 0;
        expenses.forEach(exp => { if (exp.day) dailyTotals[exp.day] += (parseFloat(exp.personalShare) || parseFloat(exp.amount) || 0); }); 
        const maxSpent = Math.max(...Object.values(dailyTotals), 1);
        for (let d = 1; d <= 31; d++) {
            const amt = dailyTotals[d]; const dayDiv = document.createElement('div'); dayDiv.className = 'heatmap-day'; dayDiv.innerHTML = `${d}<span>${amt > 0 ? currentCurrency + amt.toFixed(0) : ''}</span>`;
            if (amt > 0) dayDiv.style.background = `rgba(139, 92, 246, ${0.15 + (amt / maxSpent) * 0.65})`;
            heatmapCalendar.appendChild(dayDiv);
        }
    }

    if (clearAllBtn) clearAllBtn.addEventListener('click', () => { if (confirm("Wipe logs?")) { expenses = []; subscriptions = []; savingsGoals = []; remindersList = []; historyLog = []; academicFeesList = []; loggedIncomes = []; budget = 0; localStorage.removeItem('loggedIncomes'); updateDashboard(); renderExpenses(); renderSubscriptions(); renderHeatmap(); renderReminders(); renderAcademicFeesTimeline(); updateTrendChart(); renderIncomeHistoryLog(); } });
    if (autoAllocateBtn) autoAllocateBtn.addEventListener('click', () => { const value = parseFloat(prompt("Stipend value:")); if (value > 0) { budget = value * 0.8; updateDashboard(); } });
    if (searchInput) searchInput.addEventListener('input', renderExpenses);
    if (setBudgetBtn) setBudgetBtn.addEventListener('click', () => { if (budgetInput && parseFloat(budgetInput.value) > 0) { budget = parseFloat(budgetInput.value); budgetInput.value = ''; updateDashboard(); } });

    if (currencySelect) {
        currencySelect.addEventListener('change', () => {
            currentCurrency = currencySelect.value;
            updateDashboard(); renderExpenses(); renderSubscriptions(); renderHeatmap(); renderReminders(); renderAcademicFeesTimeline(); if (trendChart) updateTrendChart();
        });
    }

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            let csvContent = "Type,Timestamp,Description,Category,Value\n";
            expenses.forEach(e => { csvContent += `"Expense", "${e.timeStamp || 'N/A'}", "${e.name}", "${e.category}", -${e.amount}\n`; });
            loggedIncomes.forEach(i => { csvContent += `"Income", "${i.timeStamp || 'N/A'}", "${i.name}", "${i.typeLabel}", +${i.amount}\n`; });
            const downloadAnchor = document.createElement('a'); downloadAnchor.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURI(csvContent)); downloadAnchor.setAttribute('download', 'Statements.csv'); downloadAnchor.click();
        });
    }

    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault(); const timestampNode = new Date(); const totalCostInput = parseFloat(document.getElementById('expense-amount').value) || 0;
            let share = totalCostInput; if (splitBillCheckbox && splitBillCheckbox.checked) share = totalCostInput / ((parseInt(roommateTotalCount.value) || 1) + 1);
            let url = expenseAttachmentFile && expenseAttachmentFile.files.length > 0 ? URL.createObjectURL(expenseAttachmentFile.files[0]) : "";

            expenses.push({ id: Date.now(), name: document.getElementById('expense-name').value, amount: totalCostInput, personalShare: share, category: document.getElementById('expense-category').value, day: timestampNode.getDate(), timeStamp: captureChronologicalTimestamp(timestampNode), receiptUrl: url });
            expenseForm.reset(); if (roommateCountDrawer) roommateCountDrawer.style.display = 'none';
            updateDashboard(); renderExpenses(); renderHeatmap();
        });
    }

    function renderExpenses() {
        if (!expenseList) return; expenseList.innerHTML = ''; const query = searchInput.value.toLowerCase(); let timeline = [];
        expenses.forEach(e => timeline.push({ ...e, type: 'expense', sort: e.id }));
        loggedIncomes.forEach(i => timeline.push({ ...i, type: 'income', category: i.typeLabel, personalShare: i.amount, sort: i.id }));
        timeline.sort((a, b) => b.sort - a.sort);

        if (timeline.length === 0) { expenseList.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding:15px;">No logs.</p>`; return; }
        timeline.forEach(item => {
            if (query && !item.name.toLowerCase().includes(query) && !item.category.toLowerCase().includes(query)) return;
            const li = document.createElement('li');
            if (item.type === 'expense') {
                const receiptBtn = item.receiptUrl ? `<button class="view-bill-btn" onclick="openReceiptLightbox('${item.receiptUrl}')">📄 View</button>` : '';
                li.innerHTML = `<span><span style="color:var(--success); font-size:11px; margin-right:12px;">🗓️ ${item.timeStamp}</span><strong>${item.name}</strong> <small>(${item.category})</small> ${receiptBtn}</span><span><span style="color:var(--danger); font-weight:700;">-</span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteExpense(${item.id})">❌</button></span>`;
            } else {
                li.innerHTML = `<span><span style="color:#06b6d4; font-size:11px; margin-right:12px;">💰 ${item.timeStamp}</span><strong style="color:#34d399;">[Income]</strong> <strong>${item.name}</strong></span><span><span style="color:var(--success); font-weight:700;">+</span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteIncome(${item.id})">❌</button></span>`;
            }
            expenseList.appendChild(li);
        });
    }

    function renderIncomeHistoryLog() {
        if (!incomeHistoryListEl) return; incomeHistoryListEl.innerHTML = '';
        if (loggedIncomes.length === 0) { incomeHistoryListEl.innerHTML = `<p style="color:var(--text-muted); font-size:12px; text-align:center;">No custom logs.</p>`; return; }
        loggedIncomes.forEach(item => {
            const li = document.createElement('li'); li.style.marginBottom = '6px';
            li.innerHTML = `<div><strong>${item.name}</strong><br><small style="color:#06b6d4;">${item.timeStamp}</small></div><div><span style="color:var(--success);">+${currentCurrency}${item.amount.toFixed(2)}</span> <button class="delete-btn" onclick="deleteIncomeFromLog(${item.id})">❌</button></div>`;
            incomeHistoryListEl.appendChild(li);
        });
    }

    window.deleteIncomeFromLog = function(id) { loggedIncomes = loggedIncomes.filter(i => i.id !== id); localStorage.setItem('loggedIncomes', JSON.stringify(loggedIncomes)); updateDashboard(); renderExpenses(); renderHeatmap(); renderIncomeHistoryLog(); };

    function initChart() {
        const chartEl = document.getElementById('expense-chart'); if (!chartEl) return;
        setTimeout(() => {
            expenseChart = new Chart(chartEl.getContext('2d'), { type: 'doughnut', data: { labels: studentCategories, datasets: [{ data: studentCategories.map(() => 0), backgroundColor: ['#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#64748b'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#f8fafc' } } } } });
            updateChartData();
        }, 60); 
    }

    var updateChartData = function() {
        if (!expenseChart) return;
        expenseChart.data.datasets[0].data = studentCategories.map(cat => expenses.filter(item => item.category === cat).reduce((sum, item) => sum + (item.personalShare || item.amount), 0));
        expenseChart.update();
    }

    function initTrendChart() {
        const trendEl = document.getElementById('history-trend-chart'); if (!trendEl) return;
        setTimeout(() => {
            trendChart = new Chart(trendEl.getContext('2d'), { type: 'line', data: { labels: historyLog.map(i => i.label), datasets: [{ label: 'Score', data: historyLog.map(i => i.score), borderColor: '#8b5cf6', yAxisID: 'y' }, { label: 'Outflow', data: historyLog.map(i => i.spent), borderColor: '#10b981', borderDash: [5, 5], yAxisID: 'y1' }] }, options: { responsive: true, maintainAspectRatio: false, scales: { x: { ticks: { color: '#94a3b8' } }, y: { min: 0, max: 100 }, y1: { position: 'right' } } } });
        }, 60);
    }

    var updateTrendChart = function() { if (trendChart) { trendChart.data.labels = historyLog.map(i => i.label); trendChart.data.datasets[0].data = historyLog.map(i => i.score); trendChart.data.datasets[1].data = historyLog.map(i => i.spent); trendChart.update(); } }

    function init() {
        const savedName = sessionStorage.getItem('userDisplayName');
        if (savedName && document.getElementById('user-display-name')) document.getElementById('user-display-name').innerText = savedName.split(' ')[0] + " 🎓";
        displayRandomTip(); setupCategoryDropdown(); setupInteractionFeatures(); updateDashboard(); renderExpenses(); renderSubscriptions(); renderSavingsGoals(); renderReminders(); renderAcademicFeesTimeline(); calculateAllowanceCountdownDays(); renderHeatmap(); renderIncomeHistoryLog(); initChart(); initTrendChart(); setupVoiceRecognition(); setupReceiptScanner();
    }
    init();
}