const goals = {
    productivity: [
        "Complete your most important task first",
        "Organize your workspace",
        "Create a to-do list for tomorrow",
        "Review and update your goals",
        "Declutter your digital workspace"
    ],
    health: [
        "Take a 30-minute walk",
        "Do 20 minutes of stretching",
        "Drink 8 glasses of water",
        "Eat a healthy breakfast",
        "Take the stairs instead of the elevator"
    ],
    learning: [
        "Learn a new word",
        "Read a chapter of a book",
        "Watch an educational video",
        "Practice a new skill for 30 minutes",
        "Research a topic you're curious about"
    ],
    mindfulness: [
        "Practice meditation for 10 minutes",
        "Write in your gratitude journal",
        "Take 5 deep breaths",
        "Do a body scan meditation",
        "Practice mindful eating"
    ],
    creativity: [
        "Draw something",
        "Write a short story",
        "Take a creative photo",
        "Learn a new craft",
        "Listen to a new genre of music"
    ]
};

/**
 * Get a random goal from a specific category
 * @param {string} category - The category to get a goal from
 * @returns {string} A random goal from the specified category
 */
function getRandomGoalFromCategory(category) {
    return goals[category][Math.floor(Math.random() * goals[category].length)];
}

/**
 * Get a random goal from any category
 * @returns {string} A random goal from any category
 */
function getRandomGoal() {
    const categories = Object.keys(goals);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return getRandomGoalFromCategory(randomCategory);
}

// Make functions available globally for Chrome extension
window.goals = goals;
window.getRandomGoal = getRandomGoal;
window.getRandomGoalFromCategory = getRandomGoalFromCategory; 