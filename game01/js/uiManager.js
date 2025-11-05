// UI Manager - Handles all UI interactions and screen transitions
class UIManager {
    constructor(stateManager, audioManager, storyEngine) {
        this.state = stateManager;
        this.audio = audioManager;
        this.story = storyEngine;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Main Menu
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.startNewGame();
        });

        document.getElementById('continue-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.continueGame();
        });

        document.getElementById('gallery-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.openGallery();
        });

        document.getElementById('settings-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.openSettings();
        });

        // Game Menu
        document.getElementById('game-menu-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.openGameMenu();
        });

        document.getElementById('close-menu-modal-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.closeGameMenu();
        });

        document.getElementById('save-game-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.saveGame();
        });

        document.getElementById('load-game-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.loadGame();
        });

        document.getElementById('back-to-menu-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.backToMainMenu();
        });

        // Gallery
        document.getElementById('close-gallery-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.closeGallery();
        });

        // Settings
        document.getElementById('close-settings-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.closeSettings();
        });

        const bgmVolume = document.getElementById('bgm-volume');
        const bgmValue = document.getElementById('bgm-value');
        bgmVolume.addEventListener('input', (e) => {
            const value = e.target.value / 100;
            this.audio.setBGMVolume(value);
            bgmValue.textContent = `${e.target.value}%`;
        });

        const sfxVolume = document.getElementById('sfx-volume');
        const sfxValue = document.getElementById('sfx-value');
        sfxVolume.addEventListener('input', (e) => {
            const value = e.target.value / 100;
            this.audio.setSFXVolume(value);
            sfxValue.textContent = `${e.target.value}%`;
        });

        document.getElementById('reset-progress-btn').addEventListener('click', () => {
            if (confirm('정말로 모든 진행 상황을 초기화하시겠습니까?')) {
                this.audio.playSFX('click');
                this.resetProgress();
            }
        });

        // Video skip
        document.getElementById('skip-video-btn').addEventListener('click', () => {
            this.audio.playSFX('click');
            this.skipVideo();
        });
    }

    // Screen Management
    switchScreen(fromScreen, toScreen) {
        document.getElementById(fromScreen).classList.remove('active');
        document.getElementById(toScreen).classList.add('active');
    }

    // Main Menu Actions
    startNewGame() {
        // Play opening video
        this.playOpeningVideo();
    }

    playOpeningVideo() {
        const video = document.getElementById('game-video');
        video.src = CONFIG.ASSETS.videos.opening;
        video.volume = this.audio.bgmVolume; // Use BGM volume for video

        // Stop all audio during video
        this.audio.stopAll();

        this.switchScreen('main-menu', 'video-screen');

        video.play().catch(err => {
            console.warn('Video autoplay prevented:', err);
            // If video fails, start game directly
            this.startGameDirectly();
        });

        video.onended = () => {
            this.startGameDirectly();
        };
    }

    startGameDirectly() {
        this.state.newGame();
        this.switchScreen('main-menu', 'game-screen');
        this.switchScreen('video-screen', 'game-screen');
        this.story.start();
    }

    continueGame() {
        if (this.state.loadGame()) {
            this.switchScreen('main-menu', 'game-screen');
            this.story.start();
        } else {
            alert('저장된 게임이 없습니다.');
        }
    }

    openGallery() {
        this.renderGallery();
        this.switchScreen('main-menu', 'gallery-screen');
    }

    closeGallery() {
        this.switchScreen('gallery-screen', 'main-menu');
    }

    renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = '';

        CONFIG.ENDINGS.forEach(ending => {
            const card = document.createElement('div');
            card.className = 'ending-card';

            const isUnlocked = this.state.isEndingUnlocked(ending.id);

            if (!isUnlocked) {
                card.classList.add('locked');
            }

            // Background image
            const img = document.createElement('img');
            if (isUnlocked) {
                const bgKey = ending.background;
                img.src = CONFIG.ASSETS.backgrounds[bgKey];
            } else {
                img.src = CONFIG.ASSETS.backgrounds.countryside;
            }
            card.appendChild(img);

            // Lock icon for locked endings
            if (!isUnlocked) {
                const lockIcon = document.createElement('div');
                lockIcon.className = 'lock-icon';
                lockIcon.textContent = '🔒';
                card.appendChild(lockIcon);
            }

            // Title
            const title = document.createElement('div');
            title.className = 'ending-title';
            title.textContent = isUnlocked ? ending.name : '???';
            card.appendChild(title);

            // Click handler for unlocked endings
            if (isUnlocked) {
                card.addEventListener('click', () => {
                    this.audio.playSFX('click');
                    alert(`${ending.name}\n\n${ending.description}`);
                });
            }

            galleryGrid.appendChild(card);
        });
    }

    openSettings() {
        // Update current volume values
        const bgmVolume = document.getElementById('bgm-volume');
        const sfxVolume = document.getElementById('sfx-volume');
        const bgmValue = document.getElementById('bgm-value');
        const sfxValue = document.getElementById('sfx-value');

        const currentBGM = Math.round(this.audio.bgmVolume * 100);
        const currentSFX = Math.round(this.audio.sfxVolume * 100);

        bgmVolume.value = currentBGM;
        sfxVolume.value = currentSFX;
        bgmValue.textContent = `${currentBGM}%`;
        sfxValue.textContent = `${currentSFX}%`;

        this.switchScreen('main-menu', 'settings-screen');
    }

    closeSettings() {
        this.switchScreen('settings-screen', 'main-menu');
    }

    resetProgress() {
        this.state.resetProgress();
        alert('진행 상황이 초기화되었습니다.');
        this.closeSettings();

        // Update continue button
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.disabled = true;
    }

    // Game Menu Actions
    openGameMenu() {
        const modal = document.getElementById('game-menu-modal');
        modal.classList.add('active');
    }

    closeGameMenu() {
        const modal = document.getElementById('game-menu-modal');
        modal.classList.remove('active');
    }

    saveGame() {
        if (this.state.saveGame()) {
            alert('게임이 저장되었습니다.');

            // Update continue button
            const continueBtn = document.getElementById('continue-btn');
            continueBtn.disabled = false;
        } else {
            alert('저장에 실패했습니다.');
        }
        this.closeGameMenu();
    }

    loadGame() {
        if (confirm('현재 진행 상황은 저장되지 않습니다. 불러오시겠습니까?')) {
            if (this.state.loadGame()) {
                this.story.start();
                this.closeGameMenu();
            } else {
                alert('저장된 게임이 없습니다.');
            }
        }
    }

    backToMainMenu() {
        if (confirm('메인 메뉴로 돌아가시겠습니까? (현재 진행은 저장되지 않습니다)')) {
            this.closeGameMenu();
            this.switchScreen('game-screen', 'main-menu');
            this.audio.stopAll();
        }
    }

    // Video Controls
    skipVideo() {
        const video = document.getElementById('game-video');
        video.pause();
        video.currentTime = video.duration;

        // Trigger onended manually
        if (video.onended) {
            video.onended();
        }
    }

    // Update continue button based on save data
    updateContinueButton() {
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.disabled = !this.state.hasSaveData();
    }
}
