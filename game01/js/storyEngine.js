// Story Engine - Handles story progression and rendering
class StoryEngine {
    constructor(stateManager, audioManager) {
        this.state = stateManager;
        this.audio = audioManager;
        this.currentNodeData = null;
    }

    // Load and display a story node
    loadNode(nodeId) {
        const nodeData = STORY_DATA[nodeId];
        if (!nodeData) {
            console.error(`Node ${nodeId} not found`);
            return;
        }

        this.currentNodeData = nodeData;
        this.state.setCurrentNode(nodeId);

        // Update audio
        if (nodeData.bgm) {
            this.audio.playBGM(nodeData.bgm);
        }
        if (nodeData.ambient) {
            this.audio.playAmbient(nodeData.ambient);
        } else {
            this.audio.stopAmbient();
        }

        // Render the node
        this.renderNode(nodeData);

        // Check if this is an ending
        if (nodeData.isEnding) {
            this.handleEnding(nodeData.endingId);
        }

        // Auto-save progress
        this.state.saveGame();
    }

    renderNode(nodeData) {
        // Update background
        const backgroundImg = document.getElementById('background-image');
        const bgKey = nodeData.background;
        if (CONFIG.ASSETS.backgrounds[bgKey]) {
            backgroundImg.src = CONFIG.ASSETS.backgrounds[bgKey];
        }

        // Apply filter
        backgroundImg.className = 'background-image';
        if (nodeData.filter) {
            backgroundImg.classList.add(`filter-${nodeData.filter}`);
        }

        // Update character
        const characterImg = document.getElementById('character-image');
        if (nodeData.character) {
            const charKey = nodeData.character;
            if (CONFIG.ASSETS.characters[charKey]) {
                characterImg.src = CONFIG.ASSETS.characters[charKey];
                characterImg.classList.add('active');
            }
        } else {
            characterImg.classList.remove('active');
        }

        // Update dialogue text with typewriter effect
        this.displayText(nodeData.text);

        // Update choices
        this.renderChoices(nodeData.choices);
    }

    displayText(text) {
        const dialogueText = document.getElementById('dialogue-text');
        dialogueText.textContent = ''; // Clear first

        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                dialogueText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, CONFIG.TEXT_SPEED);
            }
        };

        typeWriter();
    }

    renderChoices(choices) {
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';

        if (!choices || choices.length === 0) {
            // No choices means it's a continue node
            const continueBtn = document.createElement('button');
            continueBtn.className = 'choice-btn';
            continueBtn.textContent = '계속';
            continueBtn.addEventListener('click', () => {
                this.handleChoice({ nextNode: this.getNextNode() });
            });
            choicesContainer.appendChild(continueBtn);
            return;
        }

        choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('button');
            choiceBtn.className = 'choice-btn slide-up';
            choiceBtn.style.animationDelay = `${index * 0.1}s`;

            // Choice text
            const choiceText = document.createElement('div');
            choiceText.textContent = choice.text;
            choiceBtn.appendChild(choiceText);

            // Effect hint
            if (choice.effect) {
                const effectText = document.createElement('div');
                effectText.className = 'choice-effect';
                const effects = [];

                if (choice.effect.hp) {
                    const hpClass = choice.effect.hp > 0 ? 'positive' : 'negative';
                    effectText.classList.add(hpClass);
                    effects.push(`HP ${choice.effect.hp > 0 ? '+' : ''}${choice.effect.hp}`);
                }
                if (choice.effect.sp) {
                    const spClass = choice.effect.sp > 0 ? 'positive' : 'negative';
                    effectText.classList.add(spClass);
                    effects.push(`SP ${choice.effect.sp > 0 ? '+' : ''}${choice.effect.sp}`);
                }

                effectText.textContent = effects.join(' / ');
                choiceBtn.appendChild(effectText);
            }

            // Click handler
            choiceBtn.addEventListener('click', () => {
                this.handleChoice(choice);
            });

            choicesContainer.appendChild(choiceBtn);
        });
    }

    handleChoice(choice) {
        // Play choice sound
        if (choice.sfx) {
            this.audio.playSFX(choice.sfx);
        } else {
            this.audio.playSFX('choice');
        }

        // Update stats
        if (choice.effect) {
            this.state.updateStats(choice.effect);
            this.updateStatsDisplay();
        }

        // Load next node
        if (choice.nextNode) {
            setTimeout(() => {
                this.loadNode(choice.nextNode);
            }, 300);
        }
    }

    getNextNode() {
        // Auto-progress for nodes with single continue button
        return this.currentNodeData.choices?.[0]?.nextNode || 'chapter1_start';
    }

    updateStatsDisplay() {
        const hpBar = document.getElementById('hp-bar');
        const spBar = document.getElementById('sp-bar');
        const hpValue = document.getElementById('hp-value');
        const spValue = document.getElementById('sp-value');

        const hp = this.state.getHP();
        const sp = this.state.getSP();

        hpBar.style.width = `${hp}%`;
        spBar.style.width = `${sp}%`;
        hpValue.textContent = hp;
        spValue.textContent = sp;

        // Play warning sound if stats are low
        if (hp < 30 || sp < 30) {
            this.audio.playSFX('warning');
        }
    }

    handleEnding(endingId) {
        // Unlock ending
        this.state.unlockEnding(endingId);

        // Play ending video after a delay
        setTimeout(() => {
            this.playEndingVideo();
        }, 3000);
    }

    playEndingVideo() {
        const videoScreen = document.getElementById('video-screen');
        const gameScreen = document.getElementById('game-screen');
        const video = document.getElementById('game-video');

        video.src = CONFIG.ASSETS.videos.ending;
        video.volume = this.audio.bgmVolume; // Use BGM volume for video

        // Stop all audio during video
        this.audio.stopAll();

        gameScreen.classList.remove('active');
        videoScreen.classList.add('active');

        video.play().catch(err => {
            console.warn('Ending video play failed:', err);
            // If video fails, return to menu
            this.returnToMainMenu();
        });

        video.onended = () => {
            this.returnToMainMenu();
        };
    }

    returnToMainMenu() {
        const videoScreen = document.getElementById('video-screen');
        const mainMenu = document.getElementById('main-menu');

        videoScreen.classList.remove('active');
        mainMenu.classList.add('active');

        // Update continue button
        const continueBtn = document.getElementById('continue-btn');
        if (this.state.hasSaveData()) {
            continueBtn.disabled = false;
        }
    }

    // Initialize game
    start() {
        this.loadNode(this.state.getCurrentNode());
        this.updateStatsDisplay();
    }
}
