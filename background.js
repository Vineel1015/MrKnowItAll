// Debug logging
const DEBUG = true;
function log(...args) {
    if (DEBUG) {
        console.log('[MrKnowItAll Background]', ...args);
    }
}

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
    log('Extension installed/updated:', details.reason);
    
    // Initialize storage with default settings
    chrome.storage.sync.set({
        autoLaunch: true,
        lastGoalDate: null,
        currentGoal: null,
        goalsCompleted: 0,
        settings: {
            notifications: true,
            sound: true,
            theme: 'default'
        }
    }, () => {
        if (chrome.runtime.lastError) {
            log('Error initializing storage:', chrome.runtime.lastError);
        } else {
            log('Storage initialized successfully');
        }
    });

    // Create daily reset alarm
    createDailyResetAlarm();
});

// Handle startup
chrome.runtime.onStartup.addListener(() => {
    log('Browser started');
    checkAndLaunchPopup();
});

// Create daily reset alarm
function createDailyResetAlarm() {
    chrome.alarms.create('resetDailyGoal', {
        periodInMinutes: 1440 // 24 hours
    });
    log('Daily reset alarm created');
}

// Handle alarms
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'resetDailyGoal') {
        log('Daily reset alarm triggered');
        resetDailyGoal();
    }
});

// Reset daily goal
function resetDailyGoal() {
    chrome.storage.sync.set({
        lastGoalDate: null,
        currentGoal: null
    }, () => {
        if (chrome.runtime.lastError) {
            log('Error resetting daily goal:', chrome.runtime.lastError);
        } else {
            log('Daily goal reset successfully');
        }
    });
}

// Check and launch popup if auto-launch is enabled
function checkAndLaunchPopup() {
    chrome.storage.sync.get(['autoLaunch'], (result) => {
        if (chrome.runtime.lastError) {
            log('Error checking auto-launch setting:', chrome.runtime.lastError);
            return;
        }

        if (result.autoLaunch) {
            log('Auto-launch enabled, opening popup');
            chrome.action.openPopup();
        } else {
            log('Auto-launch disabled');
        }
    });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    log('Received message:', message);
    
    switch (message.type) {
        case 'GET_SETTINGS':
            chrome.storage.sync.get(['settings'], (result) => {
                sendResponse(result.settings || {});
            });
            break;
            
        case 'UPDATE_SETTINGS':
            chrome.storage.sync.set({ settings: message.settings }, () => {
                sendResponse({ success: !chrome.runtime.lastError });
            });
            break;
            
        case 'COMPLETE_GOAL':
            chrome.storage.sync.get(['goalsCompleted'], (result) => {
                const newCount = (result.goalsCompleted || 0) + 1;
                chrome.storage.sync.set({ goalsCompleted: newCount }, () => {
                    sendResponse({ success: !chrome.runtime.lastError, count: newCount });
                });
            });
            break;
    }
    
    return true; // Keep the message channel open for async response
}); 