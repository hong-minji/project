// State Manager - Handles game state and save/load
class StateManager {
    constructor() {
        this.currentNode = 'chapter1_start';
        this.hp = CONFIG.INITIAL_HP;
        this.sp = CONFIG.INITIAL_SP;
        this.visitedNodes = new Set();
        this.unlockedEndings = new Set();
        this.playthrough = 1;
        this.loadUnlockedEndings();
    }

    // Stats Management
    updateStats(effect) {
        if (effect.hp) {
            this.hp = Math.max(0, Math.min(CONFIG.MAX_HP, this.hp + effect.hp));
        }
        if (effect.sp) {
            this.sp = Math.max(0, Math.min(CONFIG.MAX_SP, this.sp + effect.sp));
        }
    }

    getHP() {
        return this.hp;
    }

    getSP() {
        return this.sp;
    }

    // Node Management
    setCurrentNode(nodeId) {
        this.currentNode = nodeId;
        this.visitedNodes.add(nodeId);
    }

    getCurrentNode() {
        return this.currentNode;
    }

    hasVisited(nodeId) {
        return this.visitedNodes.has(nodeId);
    }

    // Ending Management
    unlockEnding(endingId) {
        this.unlockedEndings.add(endingId);
        this.saveUnlockedEndings();
    }

    isEndingUnlocked(endingId) {
        return this.unlockedEndings.has(endingId);
    }

    getUnlockedEndings() {
        return Array.from(this.unlockedEndings);
    }

    saveUnlockedEndings() {
        const endings = Array.from(this.unlockedEndings);
        localStorage.setItem(CONFIG.ENDINGS_KEY, JSON.stringify(endings));
    }

    loadUnlockedEndings() {
        const saved = localStorage.getItem(CONFIG.ENDINGS_KEY);
        if (saved) {
            const endings = JSON.parse(saved);
            this.unlockedEndings = new Set(endings);
        }
    }

    // Save/Load System
    saveGame() {
        const saveData = {
            currentNode: this.currentNode,
            hp: this.hp,
            sp: this.sp,
            visitedNodes: Array.from(this.visitedNodes),
            playthrough: this.playthrough,
            timestamp: Date.now()
        };
        localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(saveData));
        return true;
    }

    loadGame() {
        const saved = localStorage.getItem(CONFIG.SAVE_KEY);
        if (!saved) {
            return false;
        }

        try {
            const saveData = JSON.parse(saved);
            this.currentNode = saveData.currentNode;
            this.hp = saveData.hp;
            this.sp = saveData.sp;
            this.visitedNodes = new Set(saveData.visitedNodes);
            this.playthrough = saveData.playthrough || 1;
            return true;
        } catch (error) {
            console.error('Failed to load save:', error);
            return false;
        }
    }

    hasSaveData() {
        return localStorage.getItem(CONFIG.SAVE_KEY) !== null;
    }

    deleteSave() {
        localStorage.removeItem(CONFIG.SAVE_KEY);
    }

    resetProgress() {
        this.deleteSave();
        localStorage.removeItem(CONFIG.ENDINGS_KEY);
        this.currentNode = 'chapter1_start';
        this.hp = CONFIG.INITIAL_HP;
        this.sp = CONFIG.INITIAL_SP;
        this.visitedNodes = new Set();
        this.unlockedEndings = new Set();
        this.playthrough = 1;
    }

    newGame() {
        this.currentNode = 'chapter1_start';
        this.hp = CONFIG.INITIAL_HP;
        this.sp = CONFIG.INITIAL_SP;
        this.visitedNodes = new Set();
        this.playthrough++;
    }

    // Stats checking for endings
    meetsEndingRequirements(endingId) {
        const ending = CONFIG.ENDINGS.find(e => e.id === endingId);
        if (!ending || !ending.requiredStats) {
            return true;
        }

        const { hp, sp } = ending.requiredStats;
        return this.hp >= hp && this.sp >= sp;
    }
}
