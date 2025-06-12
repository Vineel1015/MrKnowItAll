document.addEventListener('DOMContentLoaded', () => {
    const shakeButton = document.getElementById('shake-button');
    const goalText = document.getElementById('goal-text');
    const eightBall = document.querySelector('.eight-ball');

    let isAnimating = false;

    // Check if we already have a goal for today
    checkDailyGoal();

    function getTodayDate() {
        const today = new Date();
        return today.toDateString();
    }

    function checkDailyGoal() {
        chrome.storage.sync.get(['lastGoalDate', 'currentGoal'], (result) => {
            const today = getTodayDate();
            
            if (result.lastGoalDate === today && result.currentGoal) {
                // Show existing goal for today
                goalText.textContent = result.currentGoal;
            } else {
                // No goal yet today, show default message
                goalText.textContent = "Shake for your daily goal";
            }
        });
    }

    function setDailyGoal(goal) {
        const today = getTodayDate();
        chrome.storage.sync.set({
            lastGoalDate: today,
            currentGoal: goal
        });
    }

    shakeButton.addEventListener('click', () => {
        if (isAnimating) return;
        
        chrome.storage.sync.get(['lastGoalDate', 'currentGoal'], (result) => {
            const today = getTodayDate();
            
            if (result.lastGoalDate === today && result.currentGoal) {
                // Already have a goal for today, just show it
                goalText.textContent = result.currentGoal;
                return;
            }
            
            // Generate new goal for today
            isAnimating = true;
            goalText.textContent = "Shaking...";
            
            // Add shake animation class
            eightBall.classList.add('shaking');
            
            // Simulate shake animation
            setTimeout(() => {
                // Remove shake animation class
                eightBall.classList.remove('shaking');
                
                // Get random goal from goals-data.js
                const randomGoal = getRandomGoal();
                
                // Save goal for today
                setDailyGoal(randomGoal);
                
                // Update goal text
                goalText.textContent = randomGoal;
                
                isAnimating = false;
            }, 2000);
        });
    });
}); 