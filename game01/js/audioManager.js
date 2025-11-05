// Audio Manager
class AudioManager {
    constructor() {
        this.bgmVolume = CONFIG.DEFAULT_BGM_VOLUME;
        this.sfxVolume = CONFIG.DEFAULT_SFX_VOLUME;
        this.currentBGM = null;
        this.currentAmbient = null;
        this.bgmAudio = null;
        this.ambientAudio = null;
        this.loadSettings();
    }

    loadSettings() {
        const settings = localStorage.getItem(CONFIG.SETTINGS_KEY);
        if (settings) {
            const parsed = JSON.parse(settings);
            this.bgmVolume = parsed.bgmVolume || CONFIG.DEFAULT_BGM_VOLUME;
            this.sfxVolume = parsed.sfxVolume || CONFIG.DEFAULT_SFX_VOLUME;
        }
    }

    saveSettings() {
        const settings = {
            bgmVolume: this.bgmVolume,
            sfxVolume: this.sfxVolume
        };
        localStorage.setItem(CONFIG.SETTINGS_KEY, JSON.stringify(settings));
    }

    setBGMVolume(volume) {
        this.bgmVolume = volume;
        if (this.bgmAudio) {
            this.bgmAudio.volume = volume;
        }
        this.saveSettings();
    }

    setSFXVolume(volume) {
        this.sfxVolume = volume;
        this.saveSettings();
    }

    playBGM(bgmKey) {
        if (this.currentBGM === bgmKey && this.bgmAudio && !this.bgmAudio.paused) {
            return; // Already playing
        }

        // Stop current BGM
        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.bgmAudio.currentTime = 0;
        }

        // Create new BGM audio
        const bgmPath = CONFIG.ASSETS.bgm[bgmKey];
        if (!bgmPath) {
            console.warn(`BGM ${bgmKey} not found`);
            return;
        }

        this.bgmAudio = new Audio(bgmPath);
        this.bgmAudio.volume = this.bgmVolume;
        this.bgmAudio.loop = true;
        this.currentBGM = bgmKey;

        this.bgmAudio.play().catch(err => {
            console.warn('BGM autoplay prevented:', err);
        });
    }

    playAmbient(ambientKey) {
        if (this.currentAmbient === ambientKey && this.ambientAudio && !this.ambientAudio.paused) {
            return; // Already playing
        }

        // Stop current ambient
        if (this.ambientAudio) {
            this.ambientAudio.pause();
            this.ambientAudio.currentTime = 0;
        }

        if (!ambientKey) return;

        // Create new ambient audio
        const ambientPath = CONFIG.ASSETS.sfx[ambientKey];
        if (!ambientPath) {
            console.warn(`Ambient ${ambientKey} not found`);
            return;
        }

        this.ambientAudio = new Audio(ambientPath);
        this.ambientAudio.volume = this.sfxVolume * 0.5; // Ambient is quieter
        this.ambientAudio.loop = true;
        this.currentAmbient = ambientKey;

        this.ambientAudio.play().catch(err => {
            console.warn('Ambient autoplay prevented:', err);
        });
    }

    stopAmbient() {
        if (this.ambientAudio) {
            this.ambientAudio.pause();
            this.ambientAudio.currentTime = 0;
            this.ambientAudio = null;
            this.currentAmbient = null;
        }
    }

    playSFX(sfxKey) {
        const sfxPath = CONFIG.ASSETS.sfx[sfxKey];
        if (!sfxPath) {
            console.warn(`SFX ${sfxKey} not found`);
            return;
        }

        const audio = new Audio(sfxPath);
        audio.volume = this.sfxVolume;
        audio.play().catch(err => {
            console.warn('SFX play failed:', err);
        });
    }

    stopAll() {
        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.bgmAudio.currentTime = 0;
        }
        this.stopAmbient();
    }
}
