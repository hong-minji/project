// Main Game Initialization
class Game {
    constructor() {
        this.stateManager = null;
        this.audioManager = null;
        this.storyEngine = null;
        this.uiManager = null;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // Show loading screen
            this.showLoadingScreen();

            // Initialize managers
            this.stateManager = new StateManager();
            this.audioManager = new AudioManager();
            this.storyEngine = new StoryEngine(this.stateManager, this.audioManager);
            this.uiManager = new UIManager(this.stateManager, this.audioManager, this.storyEngine);

            // Simulate loading time for smooth UX
            await this.simulateLoading();

            // Update UI
            this.uiManager.updateContinueButton();

            // Hide loading, show main menu
            this.hideLoadingScreen();

            this.isInitialized = true;

            console.log('Game initialized successfully');
        } catch (error) {
            console.error('Failed to initialize game:', error);
            alert('게임 로딩 중 오류가 발생했습니다. 페이지를 새로고침해주세요.');
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('active');
    }

    async simulateLoading() {
        const progress = document.getElementById('loading-progress');
        const totalTime = CONFIG.INITIAL_LOAD_TIME;
        const steps = 20;
        const stepTime = totalTime / steps;

        for (let i = 0; i <= steps; i++) {
            const percentage = (i / steps) * 100;
            progress.style.width = `${percentage}%`;
            await this.sleep(stepTime);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainMenu = document.getElementById('main-menu');

        loadingScreen.classList.remove('active');
        mainMenu.classList.add('active');
    }
}

// Start the game when DOM is loaded
let game = null;

document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
    game.init();
});

// Prevent context menu on mobile
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle visibility change to pause audio when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (game && game.audioManager) {
        if (document.hidden) {
            // Pause audio when tab is hidden
            if (game.audioManager.bgmAudio) {
                game.audioManager.bgmAudio.pause();
            }
            if (game.audioManager.ambientAudio) {
                game.audioManager.ambientAudio.pause();
            }
        } else {
            // Resume audio when tab is visible
            if (game.audioManager.bgmAudio) {
                game.audioManager.bgmAudio.play().catch(() => {});
            }
            if (game.audioManager.ambientAudio) {
                game.audioManager.ambientAudio.play().catch(() => {});
            }
        }
    }
});
