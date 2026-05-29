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
// 🚪 GLOBAL SEPARATION EXIT TRIGGER ENGINE PIPELINE (DOM-INDEPENDENT)
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

    let budget = localStorage.getItem('budget') ? parseFloat(localStorage.getItem('budget')) : 0;
    let expenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
    let subscriptions = localStorage.getItem('subscriptions') ? JSON.parse(localStorage.getItem('subscriptions')) : [];
    let historyLog = localStorage.getItem('historyLog') ? JSON.parse(localStorage.getItem('historyLog')) : [];
    let savingsGoals = localStorage.getItem('savingsGoals') ? JSON.parse(localStorage.getItem('savingsGoals')) : [];
    let remindersList = localStorage.getItem('remindersList') ? JSON.parse(localStorage.getItem('remindersList')) : [];
    let academicFeesList = localStorage.getItem('academicFeesList') ? JSON.parse(localStorage.getItem('academicFeesList')) : [];
    let targetAllowanceDropDay = localStorage.getItem('targetAllowanceDropDay') ? parseInt(localStorage.getItem('targetAllowanceDropDay')) : 1; 
    let loggedIncomes = localStorage.getItem('loggedIncomes') ? JSON.parse(localStorage.getItem('loggedIncomes')) : [];

    let currentCurrency = localStorage.getItem('currency') ? localStorage.getItem('currency') : '₹';
    let studentMode = true; 

    // Layout Nodes Selectors 
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
    const expenseList = document.getElementById('expense-list');
    const aiInsightText = document.getElementById('ai-insight-text');
    const heatmapCalendar = document.getElementById('heatmap-calendar');
    const searchInput = document.getElementById('search-input');

    // UI Feedback Elements Selector Parameters
    const voiceStartBtn = document.getElementById('voice-start-btn');
    const voiceStatus = document.getElementById('voice-status');
    const savingsPercentage = document.getElementById('savings-percentage');
    const savingsProgressFill = document.getElementById('savings-progress-fill');
    const healthScoreValue = document.getElementById('health-score-value');
    const healthScoreStatus = document.getElementById('health-score-status');
    const dailyTipText = document.getElementById('daily-tip-text');

    // Subscription and Document Image processing parameters selectors
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

    // Savings goals matrices parameters selectors
    const goalForm = document.getElementById('goal-form');
    const goalNameInput = document.getElementById('goal-name');
    const goalTargetInput = document.getElementById('goal-target');
    const goalsContainer = document.getElementById('goals-container');
    const noSpendStreakValue = document.getElementById('no-spend-streak-value');
    const shoppingSpreeStatus = document.getElementById('shopping-spree-status');

    // Calendar alerts configuration form fields mapping selectors
    const reminderForm = document.getElementById('reminder-form');
    const reminderListEl = document.getElementById('reminder-list');
    const receiptLightbox = document.getElementById('receipt-lightbox');
    const lightboxRenderTarget = document.getElementById('lightbox-render-target');
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    const expenseAttachmentFile = document.getElementById('expense-attachment-file');

    // Roommate allocation configurations parameters fields selectors
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

    function captureChronologicalTimestamp(dateObject) {
        const calendarDate = dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const clockTime = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `${calendarDate} @ ${clockTime}`;
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
                if (roommateCountDrawer) {
                    roommateCountDrawer.style.display = splitBillCheckbox.checked ? 'block' : 'none';
                }
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

        if (reminderForm) {
            reminderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameEl = document.getElementById('reminder-name');
                const amountEl = document.getElementById('reminder-amount');
                const dateEl = document.getElementById('reminder-date');

                if (!nameEl || !amountEl || !dateEl) return;

                const rawDate = dateEl.value;
                const formattedDate = new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                
                remindersList.push({ 
                    id: Date.now(), 
                    name: nameEl.value, 
                    amount: parseFloat(amountEl.value) || 0, 
                    dateLabel: formattedDate 
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

                const rawDate = feeDateEl.value;
                const formattedDate = new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                
                academicFeesList.push({ 
                    id: Date.now(), 
                    name: feeNameEl.value, 
                    amount: parseFloat(feeAmountEl.value) || 0, 
                    targetDate: formattedDate 
                });
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
                updateDashboard(); 
                renderExpenses(); 
                renderHeatmap();
                renderIncomeHistoryLog();
            });
        }

        // =========================================================================
        // 🎯 FIXED: TRACKING AND CAPTURING TARGET SAVINGS FORM INTERCEPTOR
        // =========================================================================
        if (goalForm) {
            goalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!goalNameInput || !goalTargetInput) return;
                
                savingsGoals.push({ 
                    id: Date.now(), 
                    name: goalNameInput.value, 
                    target: parseFloat(goalTargetInput.value) || 0 
                });
                
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

    window.deleteAcademicFee = function(id) {
        academicFeesList = academicFeesList.filter(item => item.id !== id);
        renderAcademicFeesTimeline();
    };

    function renderReminders() {
        if (!reminderListEl) return;
        reminderListEl.innerHTML = '';
        if (remindersList.length === 0) { 
            reminderListEl.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding: 10px;">No pending alerts.</p>`; 
            return; 
        }
        remindersList.forEach(item => {
            const li = document.createElement('li');
            li.style.borderLeft = '3px solid var(--warning)';
            li.innerHTML = `<span>🔔 <strong>${item.name}</strong> <small>Due: ${item.dateLabel}</small></span><span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteReminder(${item.id})">❌</button></span>`;
            reminderListEl.appendChild(li);
        });
        localStorage.setItem('remindersList', JSON.stringify(remindersList));
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

    function displayRandomTip() {
        if (!dailyTipText) return;
        const randomIndex = Math.floor(Math.random() * financialTips.length);
        dailyTipText.innerText = financialTips[randomIndex];
    }

    function setupCategoryDropdown() {
        if (!expenseCategorySelect) return;
        expenseCategorySelect.innerHTML = '';
        studentCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat; option.innerText = cat; expenseCategorySelect.appendChild(option);
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
        renderSavingsGoals(dynamicRollingBudgetCap); 
        if (expenseChart) updateChartData();
    }

    function renderCategoryWarningsDashboard(totalSpent, dynamicRollingBudgetCap) {
        if (!categoryCapsContainer) return;
        categoryCapsContainer.innerHTML = '';
        if (dynamicRollingBudgetCap <= 0) { categoryCapsContainer.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center;">Lock a total budget parameter to display smart segment distribution gauges.</p>`; return; }
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

    function renderSavingsGoals(dynamicRollingBudgetCap) {
        if (!goalsContainer) return;
        goalsContainer.innerHTML = '';
        if (savingsGoals.length === 0) { goalsContainer.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center;">No long-term targets configured yet.</p>`; return; }

        const totalSpent = expenses.reduce((sum, item) => sum + (parseFloat(item.personalShare) || parseFloat(item.amount) || 0), 0);
        const totalSubs = subscriptions.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        const leftoverPool = Math.max(0, dynamicRollingBudgetCap - (totalSpent + totalSubs));

        savingsGoals.forEach(goal => {
            const proportionalFund = savingsGoals.length > 0 ? (leftoverPool / savingsGoals.length) : 0;
            const progressPercent = Math.min((proportionalFund / goal.target) * 100, 100);
            const block = document.createElement('div');
            block.innerHTML = `
                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                    <span>🎯 <strong>${goal.name}</strong></span>
                    <span style="color:var(--text-muted); font-size:11px;">${currentCurrency}${proportionalFund.toFixed(0)} / ${currentCurrency}${goal.target.toFixed(0)} <button class="delete-btn" onclick="deleteGoal(${goal.id})">❌</button></span>
                </div>
                <div style="width:100%; background:rgba(255,255,255,0.02); border-radius:10px; height:8px; overflow:hidden; border:1px solid var(--glass-border);">
                    <div style="width:${progressPercent}%; background:linear-gradient(90deg, var(--accent), #818cf8); height:100%; border-radius:10px; transition:width 0.4s;"></div>
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
        for (let i = 1; i <= 31; i++) {
            if (!loggedDays.has(i)) { currentStreak++; } else { break; }
        }
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
        if (scannerFileInput) {
            scannerFileInput.addEventListener('change', () => { if (scannerFileInput.files.length === 0) return; runScannerLogic(true); });
        }
        if (startCameraBtn) {
            startCameraBtn.addEventListener('click', async (e) => {
                e.stopPropagation(); if (activeCameraStream) { stopLiveVideoHardware(); return; }
                try {
                    const constraints = { video: { facingMode: "environment" }, audio: false };
                    activeCameraStream = await navigator.mediaDevices.getUserMedia(constraints);
                    if (cameraStreamVideo) cameraStreamVideo.srcObject = activeCameraStream;
                    if (scannerPrompt) scannerPrompt.style.display = 'none';
                    if (cameraStreamVideo) cameraStreamVideo.style.display = 'block'; 
                    startCameraBtn.innerText = "🛑 Turn Off Camera"; 
                    if (captureSnapshotBtn) captureSnapshotBtn.disabled = false; 
                    if (scannerLogStatus) scannerLogStatus.style.display = 'none';
                } catch (err) { alert("Live camera access rejected."); console.error(err); }
            });
        }
        if (captureSnapshotBtn) {
            captureSnapshotBtn.addEventListener('click', (e) => { e.stopPropagation(); if (!activeCameraStream) return; runScannerLogic(true); stopLiveVideoHardware(); });
        }
    }

    function runScannerLogic(isValidBill) {
        if (!scannerLaser || !scannerLogStatus) return;
        scannerLaser.style.display = 'block'; scannerLaser.style.animation = 'scanningMotion 2s infinite linear'; scannerLogStatus.style.display = 'block'; scannerLogStatus.style.color = 'var(--text-muted)'; scannerLogStatus.innerText = "🔍 OCR Scanner: Decoding structures...";
        setTimeout(() => {
            scannerLaser.style.display = 'none'; scannerLaser.style.animation = 'none';
            const randomIndex = Math.floor(Math.random() * mockReceiptImages.length);
            const timestampNode = new Date();
            const absoluteTimeMarker = captureChronologicalTimestamp(timestampNode);

            expenses.push({ 
                id: Date.now(), 
                name: `[OCR Scan] Text Books Bundle`, 
                amount: 850, 
                personalShare: 850,
                category: "Books & Exams", 
                day: timestampNode.getDate(), 
                timeStamp: absoluteTimeMarker,
                receiptUrl: mockReceiptImages[randomIndex] 
            });
            scannerLogStatus.style.color = 'var(--success)'; scannerLogStatus.innerText = `✅ Extracted Success!`;
            updateDashboard(); renderExpenses(); renderHeatmap(); if(scannerFileInput) scannerFileInput.value = '';
        }, 2500);
    }

    function stopLiveVideoHardware() {
        if (!activeCameraStream) return; activeCameraStream.getTracks().forEach(track => track.stop()); activeCameraStream = null; if (cameraStreamVideo) cameraStreamVideo.srcObject = null;
        if (cameraStreamVideo) cameraStreamVideo.style.display = 'none'; if(scannerPrompt) scannerPrompt.style.display = 'block'; startCameraBtn.innerText = "🎥 Turn On Live Camera"; if (captureSnapshotBtn) captureSnapshotBtn.disabled = true;
    }

    function getCurrentScoreValue(combinedOutflow, dynamicRollingBudgetCap) {
        if (dynamicRollingBudgetCap <= 0) return 100;
        let score = 100 - ((combinedOutflow / dynamicRollingBudgetCap) * 70); if (combinedOutflow > dynamicRollingBudgetCap) score = 100 - ((combinedOutflow / dynamicRollingBudgetCap) * 90);
        const loggedDaysCount = new Set(expenses.map(e => e.day)).size; score += ((31 - loggedDaysCount) * 0.5);
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    function calculateFinancialHealthScore(combinedOutflow, dynamicRollingBudgetCap) {
        if (!healthScoreValue || !healthScoreStatus) return;
        if (dynamicRollingBudgetCap <= 0) { healthScoreValue.innerText = "100"; healthScoreStatus.innerText = "Awaiting Budget"; healthScoreStatus.style.color = "var(--text-muted)"; return; }
        const score = getCurrentScoreValue(combinedOutflow, dynamicRollingBudgetCap); healthScoreValue.innerText = score;
        if (score >= 85) { healthScoreStatus.innerText = "Excellent ✨"; healthScoreStatus.style.color = "var(--success)"; } 
        else if (score >= 65) { healthScoreStatus.innerText = "Good 👍"; healthScoreStatus.style.color = "#60a5fa"; } 
        else { healthScoreStatus.innerText = "Risk Alert 🚨"; healthScoreStatus.style.color = "var(--danger)"; }
    }

    if (archiveMonthBtn) {
        archiveMonthBtn.addEventListener('click', () => {
            if (budget <= 0 && expenses.length === 0) { alert("Cannot archive an empty workspace!"); return; }
            const monthLabel = prompt("Enter a label (e.g. 'Jan'):"); if (!monthLabel) return;
            const cumulativeExtraIncome = loggedIncomes.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
            const dynamicRollingBudgetCap = budget + cumulativeExtraIncome;
            const totalSpent = expenses.reduce((sum, item) => sum + (parseFloat(item.personalShare) || parseFloat(item.amount) || 0), 0); const totalSubs = subscriptions.reduce((sum, item) => sum + parseFloat(item.amount), 0); const outflow = totalSpent + totalSubs;
            historyLog.push({ label: monthLabel, spent: outflow, score: getCurrentScoreValue(outflow, dynamicRollingBudgetCap) }); expenses = []; loggedIncomes = []; budget = 0;
            localStorage.removeItem('loggedIncomes');
            updateDashboard(); renderExpenses(); renderHeatmap(); updateTrendChart(); renderIncomeHistoryLog();
        });
    }

    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const nameEl = document.getElementById('sub-name');
            const amountEl = document.getElementById('sub-amount');
            if (!nameEl || !amountEl) return;
            
            subscriptions.push({ id: Date.now(), name: nameEl.value, amount: parseFloat(amountEl.value) || 0 }); 
            subscriptionForm.reset(); updateDashboard(); renderSubscriptions();
        });
    }

    function setupVoiceRecognition() {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
            if (!SpeechRecognition || !voiceStartBtn) return; 
            const recognition = new SpeechRecognition();
            
            voiceStartBtn.addEventListener('click', () => { 
                recognition.start(); 
                if (voiceStatus) voiceStatus.innerText = "Listening... Speak details."; 
            });
            
            recognition.onresult = function(event) {
                const speechResult = event.results[0][0].transcript.toLowerCase(); 
                if (voiceStatus) voiceStatus.innerText = `Heard: "${speechResult}"`; 
                const matches = speechResult.match(/\d+/); 
                if (!matches) return;
                
                const timestampNode = new Date();
                const absoluteTimeMarker = captureChronologicalTimestamp(timestampNode);
                const amount = parseFloat(matches[0]) || 0;

                expenses.push({ id: Date.now(), name: "Voice Entry Item", amount: amount, personalShare: amount, category: "Socials", day: timestampNode.getDate(), timeStamp: absoluteTimeMarker }); 
                updateDashboard(); renderExpenses(); renderHeatmap();
            };
        } catch (e) {
            console.warn("Microphone blocked: ", e);
        }
    }

    function generateAIInsights(combinedOutflow, dynamicRollingBudgetCap) {
        if (!aiInsightText) return;
        if (dynamicRollingBudgetCap <= 0) { aiInsightText.innerText = "💡 Tip: Setup your allowance limit above to engage core predictive analytics projections."; return; }
        const percentage = (combinedOutflow / dynamicRollingBudgetCap) * 100;
        if (percentage > 100) { aiInsightText.innerText = `🚨 Cap Breach: Allowance thresholds exceeded by ${(percentage - 100).toFixed(0)}%!`; } 
        else { aiInsightText.innerText = `👍 Efficient Trajectory: Current burn balances occupy roughly ${percentage.toFixed(0)}% of parameters caps.`; }
    }

    function renderHeatmap() {
        if (!heatmapCalendar) return;
        heatmapCalendar.innerHTML = ''; const dailyTotals = {}; for (let i = 1; i <= 31; i++) dailyTotals[i] = 0;
        expenses.forEach(exp => { if (exp.day) dailyTotals[exp.day] += (parseFloat(exp.personalShare) || parseFloat(exp.amount) || 0); }); 
        const maxSpentInADay = Math.max(...Object.values(dailyTotals), 1);
        
        for (let d = 1; d <= 31; d++) {
            const dayAmount = dailyTotals[d]; const dayDiv = document.createElement('div'); dayDiv.className = 'heatmap-day'; dayDiv.innerHTML = `${d}<span>${dayAmount > 0 ? currentCurrency + dayAmount.toFixed(0) : ''}</span>`;
            if (dayAmount > 0) { const intensity = Math.min((dayAmount / maxSpentInADay), 1); dayDiv.style.background = `rgba(139, 92, 246, ${0.15 + intensity * 0.65})`; dayDiv.style.color = '#fff'; }
            heatmapCalendar.appendChild(dayDiv);
        }
    }

    if (clearAllBtn) clearAllBtn.addEventListener('click', () => { if (confirm("Wipe logs completely?")) { expenses = []; subscriptions = []; savingsGoals = []; remindersList = []; historyLog = []; academicFeesList = []; loggedIncomes = []; budget = 0; localStorage.removeItem('loggedIncomes'); updateDashboard(); renderExpenses(); renderSubscriptions(); renderHeatmap(); renderReminders(); renderAcademicFeesTimeline(); updateTrendChart(); renderIncomeHistoryLog(); } });
    if (autoAllocateBtn) autoAllocateBtn.addEventListener('click', () => { const value = parseFloat(prompt("Enter monthly stipend money amount:")); if (value > 0) { budget = value * 0.8; updateDashboard(); } });
    if (searchInput) searchInput.addEventListener('input', () => { renderExpenses(); });
    if (currencySelect) currencySelect.addEventListener('change', () => { currentCurrency = currencySelect.value; updateDashboard(); renderExpenses(); renderSubscriptions(); renderHeatmap(); renderReminders(); renderAcademicFeesTimeline(); updateTrendChart(); });
    if (setBudgetBtn) setBudgetBtn.addEventListener('click', () => { if (budgetInput) { const value = parseFloat(budgetInput.value); if (value > 0) { budget = value; budgetInput.value = ''; updateDashboard(); } } });

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            if (expenses.length === 0 && loggedIncomes.length === 0) { alert("No logs found to export."); return; }
            let csvContent = "Type,Timestamp,Description,Category,Value\n";
            expenses.forEach(e => { csvContent += `"Expense", "${e.timeStamp || 'N/A'}", "${e.name}", "${e.category}", -${e.amount}\n`; });
            loggedIncomes.forEach(i => { csvContent += `"Income Influx", "${i.timeStamp || 'N/A'}", "${i.name}", "${i.typeLabel}", +${i.amount}\n`; });
            const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
            const downloadAnchor = document.createElement('a'); downloadAnchor.setAttribute('href', encodedUri); downloadAnchor.setAttribute('download', 'Student_Financial_Statement.csv');
            document.body.appendChild(downloadAnchor); downloadAnchor.click(); document.body.removeChild(downloadAnchor);
        });
    }

    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const timestampNode = new Date();
            const absoluteTimeMarker = captureChronologicalTimestamp(timestampNode);

            const totalCostInput = parseFloat(document.getElementById('expense-amount').value) || 0;
            let dynamicPersonalShare = totalCostInput;

            if (splitBillCheckbox && splitBillCheckbox.checked) {
                const roommatesCount = parseInt(roommateTotalCount.value) || 1;
                dynamicPersonalShare = totalCostInput / (roommatesCount + 1); 
            }

            let boundAttachmentUrl = "";
            if (expenseAttachmentFile && expenseAttachmentFile.files.length > 0) {
                boundAttachmentUrl = URL.createObjectURL(expenseAttachmentFile.files[0]);
            }

            expenses.push({ 
                id: Date.now(), 
                name: document.getElementById('expense-name').value, 
                amount: totalCostInput, 
                personalShare: dynamicPersonalShare, 
                category: document.getElementById('expense-category').value, 
                day: timestampNode.getDate(),
                timeStamp: absoluteTimeMarker,
                receiptUrl: boundAttachmentUrl 
            });

            expenseForm.reset();
            if (roommateCountDrawer) roommateCountDrawer.style.display = 'none';
            updateDashboard(); renderExpenses(); renderHeatmap();
        });
    }

    function renderExpenses() {
        if (!expenseList) return;
        expenseList.innerHTML = ''; const query = searchInput.value.toLowerCase();
        let globalUnifiedTimeline = [];

        expenses.forEach(item => {
            globalUnifiedTimeline.push({ id: item.id, type: 'expense', name: item.name, category: item.category, amount: item.amount, personalShare: item.personalShare, timeStamp: item.timeStamp, receiptUrl: item.receiptUrl, rawSortDate: item.id });
        });
        loggedIncomes.forEach(item => {
            globalUnifiedTimeline.push({ id: item.id, type: 'income', name: item.name, category: item.typeLabel, amount: item.amount, personalShare: item.amount, timeStamp: item.timeStamp, receiptUrl: null, rawSortDate: item.id });
        });

        globalUnifiedTimeline.sort((a, b) => b.rawSortDate - a.rawSortDate);
        if (globalUnifiedTimeline.length === 0) { expenseList.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding:15px;">No transactions logged.</p>`; return; }

        globalUnifiedTimeline.forEach(item => {
            if (query && !item.name.toLowerCase().includes(query) && !item.category.toLowerCase().includes(query)) return;
            const li = document.createElement('li'); 
            if (item.type === 'expense') {
                const dateBadge = `<span style="color:var(--success); font-size:11px; font-weight:600; margin-right:12px;">🗓️ ${item.timeStamp || 'Just Now'}</span>`;
                const receiptBtn = item.receiptUrl ? `<button class="view-bill-btn" onclick="openReceiptLightbox('${item.receiptUrl}')">📄 View Receipt</button>` : '';
                const splitLabelInfo = item.amount !== item.personalShare ? ` <small style="color:var(--warning)">[Split - Share: ${currentCurrency}${item.personalShare.toFixed(0)}]</small>` : '';
                li.innerHTML = `<span>${dateBadge}<strong>${item.name}</strong> <small style="color:var(--text-muted)">(${item.category})</small>${splitLabelInfo} ${receiptBtn}</span><span><span style="color:var(--danger); font-weight:700;">-</span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteExpense(${item.id})">❌</button></span>`;
            } else {
                const dateBadge = `<span style="color:#06b6d4; font-size:11px; font-weight:600; margin-right:12px;">💰 ${item.timeStamp || 'Just Now'}</span>`;
                li.innerHTML = `<span>${dateBadge}<strong style="color:#34d399;">[Income]</strong> <strong>${item.name}</strong> <small style="color:var(--text-muted)">(${item.category})</small></span><span><span style="color:var(--success); font-weight:700;">+</span>${currentCurrency}${item.amount.toFixed(2)} <button class="delete-btn" onclick="deleteIncome(${item.id})">❌</button></span>`;
                li.style.borderColor = 'rgba(16, 185, 129, 0.2)'; li.style.background = 'rgba(16, 185, 129, 0.01)';
            }
            expenseList.appendChild(li);
        });
    }

    window.deleteExpense = function(id) { expenses = expenses.filter(item => item.id !== id); updateDashboard(); renderExpenses(); renderHeatmap(); };
    window.deleteIncome = function(id) { loggedIncomes = loggedIncomes.filter(item => item.id !== id); localStorage.setItem('loggedIncomes', JSON.stringify(loggedIncomes)); updateDashboard(); renderExpenses(); renderHeatmap(); renderIncomeHistoryLog(); };

    function renderIncomeHistoryLog() {
        if (!incomeHistoryListEl) return;
        incomeHistoryListEl.innerHTML = '';

        if (loggedIncomes.length === 0) {
            incomeHistoryListEl.innerHTML = `<p style="color:var(--text-muted); font-size:12px; text-align:center; padding:10px;">No custom cash injections logged.</p>`;
            return;
        }

        const sortedIncomes = [...loggedIncomes].sort((a, b) => b.id - a.id);

        sortedIncomes.forEach(item => {
            const li = document.createElement('li');
            li.style.borderColor = 'rgba(16, 185, 129, 0.2)';
            li.style.background = 'rgba(16, 185, 129, 0.02)';
            li.style.marginBottom = '6px';
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';

            li.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                    <span style="font-weight:600; font-size:13px; color:var(--text-main);">${item.name} <small style="color:var(--text-muted)">(${item.typeLabel})</small></span>
                    <span style="font-size:10px; color:#06b6d4;">⏱️ ${item.timeStamp}</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--success); font-weight:700; font-size:13px;">+${currentCurrency}${item.amount.toFixed(2)}</span>
                    <button class="delete-btn" onclick="deleteIncomeFromLog(${item.id})" style="font-size:12px; margin:0; padding:0; background:transparent; border:none; cursor:pointer;">❌</button>
                </div>
            `;
            incomeHistoryListEl.appendChild(li);
        });
    }

    window.deleteIncomeFromLog = function(id) {
        loggedIncomes = loggedIncomes.filter(item => item.id !== id);
        localStorage.setItem('loggedIncomes', JSON.stringify(loggedIncomes));
        updateDashboard();
        renderExpenses();
        renderHeatmap();
        renderIncomeHistoryLog();
    };

    // =========================================================================
    // 📊 CHART SAFELY INITIALIZED VIA DELAY MATRICES
    // =========================================================================
    function initChart() {
        const chartEl = document.getElementById('expense-chart'); 
        if (!chartEl) return; 
        const ctx = chartEl.getContext('2d');
        
        setTimeout(() => {
            expenseChart = new Chart(ctx, { 
                type: 'doughnut', 
                data: { 
                    labels: studentCategories, 
                    datasets: [{ 
                        data: studentCategories.map(() => 0), 
                        backgroundColor: ['#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#64748b'], 
                        borderWidth: 0 
                    }] 
                }, 
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: { legend: { labels: { color: '#f8fafc' } } } 
                } 
            });
            updateChartData();
        }, 60); 
    }

    function updateChartData() {
        if (!expenseChart) return;
        expenseChart.data.labels = studentCategories; 
        expenseChart.data.datasets[0].data = studentCategories.map(cat => 
            expenses.filter(item => item.category === cat).reduce((sum, item) => sum + (parseFloat(item.personalShare) || parseFloat(item.amount) || 0), 0)
        ); 
        expenseChart.update();
    }

    function initTrendChart() {
        const trendEl = document.getElementById('history-trend-chart'); 
        if (!trendEl) return; 
        const ctx = trendEl.getContext('2d');
        
        setTimeout(() => {
            trendChart = new Chart(ctx, { 
                type: 'line', 
                data: { 
                    labels: historyLog.map(item => item.label), 
                    datasets: [
                        { label: 'Score', data: historyLog.map(item => item.score), borderColor: '#8b5cf6', backgroundColor: 'transparent', tension: 0.3, yAxisID: 'y' }, 
                        { label: 'Outflow', data: historyLog.map(item => item.spent), borderColor: '#10b981', backgroundColor: 'transparent', tension: 0.3, borderDash: [5, 5], yAxisID: 'y1' }
                    ] 
                }, 
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    scales: { 
                        x: { ticks: { color: '#94a3b8' }, grid: { display: false } }, 
                        y: { type: 'linear', display: true, position: 'left', min: 0, max: 100 }, 
                        y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false } } 
                    }, 
                    plugins: { legend: { display: false } } 
                } 
            });
        }, 60);
    }

    function updateTrendChart() { 
        if (!trendChart) return; 
        trendChart.data.labels = historyLog.map(item => item.label); 
        trendChart.data.datasets[0].data = historyLog.map(item => parseFloat(item.score) || 0); 
        trendChart.data.datasets[1].data = historyLog.map(item => parseFloat(item.spent) || 0); 
        trendChart.update(); 
    }

    function init() {
        const savedName = sessionStorage.getItem('userDisplayName');
        const nameLabelEl = document.getElementById('user-display-name');
        if (savedName && nameLabelEl) {
            nameLabelEl.innerText = savedName.split(' ')[0] + " 🎓";
        }

        displayRandomTip();
        setupCategoryDropdown();
        setupInteractionFeatures();
        updateDashboard();
        renderExpenses();
        renderSubscriptions();
        renderSavingsGoals();
        renderReminders();
        renderAcademicFeesTimeline();
        calculateAllowanceCountdownDays();
        renderHeatmap();
        renderIncomeHistoryLog(); 
        
        initChart();
        initTrendChart();
        setupVoiceRecognition();
        setupReceiptScanner();
    }

    init();
}