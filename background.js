// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    // Initialize storage with default settings
    chrome.storage.sync.set({
        autoLaunch: true,
        lastGoalDate: null,
        currentGoal: null,
        goalsCompleted: 0
    });
});

// Handle alarm for daily goal reset
chrome.alarms.create('resetDailyGoal', {
    periodInMinutes: 1440 // 24 hours
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'resetDailyGoal') {
        // Reset the daily goal
        chrome.storage.sync.set({
            lastGoalDate: null,
            currentGoal: null
        });
    }
}); 