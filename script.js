class WorkshopTimer {
    constructor() {
        this.mainTimer = {
            duration: 7200, // 2시간 (초)
            remaining: 7200,
            interval: null,
            running: false
        };

        this.sessions = {
            opening: { name: '오프닝', duration: 1200, details: '<p><strong>자기소개 및 아이스브레이킹:</strong> 15분</p><p><strong>목적 소개:</strong> 5분</p>' },
            swot: { name: '나의 SWOT 분석', duration: 1800, details: '<p><strong>개인 SWOT 작성:</strong> 10분</p><p><strong>그룹 코칭 및 피드백:</strong> 20분</p>' },
            action: { name: '액션 플랜 도출', duration: 1200, details: '<p><strong>전략 설계:</strong> 10분</p><p><strong>액션 플랜 작성:</strong> 10분</p>' },
            discussion: { name: '카드 토론', duration: 1800, details: '<p><strong>자유 토론:</strong> 30분</p>' },
            closing: { name: '마무리', duration: 600, details: '<p><strong>한 문장 공유:</strong> 8분</p><p><strong>네트워킹 안내:</strong> 2분</p>' }
        };

        this.currentSession = 'opening';
        this.sessionTimer = {
            duration: this.sessions[this.currentSession].duration,
            remaining: this.sessions[this.currentSession].duration,
            interval: null,
            running: false
        };

        this.speakerTimer = {
            duration: 180, // 3분
            remaining: 180,
            interval: null,
            running: false,
            alertsTriggered: { cat: false, dog: false }
        };

        this.sounds = {};
        this.initializeElements();
        this.bindEvents();
        this.loadSounds();
        this.updateAllDisplays();
    }

    initializeElements() {
        // 메인 타이머 요소들
        this.mainTimerDisplay = document.getElementById('mainTimer');
        this.mainTimerCircle = document.getElementById('mainTimerCircle');

        // 세션 타이머 요소들
        this.sessionTimerDisplay = document.getElementById('sessionTimer');
        this.sessionTimerCircle = document.getElementById('sessionTimerCircle');
        this.currentSessionName = document.getElementById('currentSessionName');
        this.sessionDetails = document.getElementById('sessionDetails');

        // 발언자 타이머 요소들
        this.speakerTimerDisplay = document.getElementById('speakerTimer');
        this.speakerTimerCircle = document.getElementById('speakerTimerCircle');
        this.catAlert = document.getElementById('catAlert');
        this.dogAlert = document.getElementById('dogAlert');

        // 버튼들
        this.startSessionBtn = document.getElementById('startSession');
        this.pauseSessionBtn = document.getElementById('pauseSession');
        this.resetSessionBtn = document.getElementById('resetSession');
        this.startSpeakerBtn = document.getElementById('startSpeaker');
        this.stopSpeakerBtn = document.getElementById('stopSpeaker');

        // 세션 아이템들
        this.sessionItems = document.querySelectorAll('.session-item');
        
        // 반응 버튼들
        this.reactionButtons = document.querySelectorAll('.reaction-btn');
    }

    bindEvents() {
        // 세션 버튼 이벤트
        this.startSessionBtn.addEventListener('click', () => this.startSession());
        this.pauseSessionBtn.addEventListener('click', () => this.pauseSession());
        this.resetSessionBtn.addEventListener('click', () => this.resetSession());

        // 발언자 타이머 이벤트
        this.startSpeakerBtn.addEventListener('click', () => this.startSpeakerTimer());
        this.stopSpeakerBtn.addEventListener('click', () => this.stopSpeakerTimer());

        // 세션 선택 이벤트
        this.sessionItems.forEach(item => {
            item.addEventListener('click', () => {
                const sessionKey = item.dataset.session;
                this.selectSession(sessionKey);
            });
        });

        // 반응 버튼 이벤트
        this.reactionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const sound = btn.dataset.sound;
                this.playSound(sound);
                this.animateButton(btn);
            });
        });
    }

    loadSounds() {
        // 같은 폴더의 MP3 파일들을 사용한 오디오 객체 생성
        this.sounds = {
            cat: new Audio('./cat.mp3'),
            dog: new Audio('./dog.mp3'),
            clap: new Audio('./clap.mp3'),
            wow: new Audio('./wow.mp3')
        };

        // 각 오디오의 볼륨 설정
        Object.values(this.sounds).forEach(audio => {
            audio.volume = 0.7;
            audio.preload = 'auto';
        });
    }

    playSound(soundName) {
        if (this.sounds[soundName]) {
            // 오디오 재생 전에 현재 재생 중인 것이 있다면 처음부터 다시 재생
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(e => {
                console.log('오디오 재생 실패:', e);
            });
        }
    }

    animateButton(button) {
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    selectSession(sessionKey) {
        if (this.sessionTimer.running) {
            this.pauseSession();
        }
        
        this.currentSession = sessionKey;
        this.sessionTimer.duration = this.sessions[sessionKey].duration;
        this.sessionTimer.remaining = this.sessions[sessionKey].duration;
        
        // UI 업데이트
        this.sessionItems.forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-session="${sessionKey}"]`).classList.add('active');
        
        this.currentSessionName.textContent = this.sessions[sessionKey].name;
        this.sessionDetails.innerHTML = this.sessions[sessionKey].details;
        
        this.updateSessionDisplay();
    }

    startSession() {
        if (!this.mainTimer.running) {
            this.startMainTimer();
        }
        
        if (!this.sessionTimer.running) {
            this.sessionTimer.running = true;
            this.sessionTimer.interval = setInterval(() => {
                this.sessionTimer.remaining--;
                this.updateSessionDisplay();
                
                if (this.sessionTimer.remaining <= 0) {
                    this.sessionComplete();
                }
            }, 1000);
            
            this.startSessionBtn.textContent = '진행중';
            this.startSessionBtn.disabled = true;
        }
    }

    pauseSession() {
        if (this.sessionTimer.running) {
            this.sessionTimer.running = false;
            clearInterval(this.sessionTimer.interval);
            this.startSessionBtn.textContent = '시작';
            this.startSessionBtn.disabled = false;
        }
    }

    resetSession() {
        this.pauseSession();
        this.sessionTimer.remaining = this.sessionTimer.duration;
        this.updateSessionDisplay();
    }

    sessionComplete() {
        this.pauseSession();
        alert(`${this.sessions[this.currentSession].name} 세션이 완료되었습니다!`);
        
        // 다음 세션으로 자동 이동
        const sessionKeys = Object.keys(this.sessions);
        const currentIndex = sessionKeys.indexOf(this.currentSession);
        if (currentIndex < sessionKeys.length - 1) {
            const nextSession = sessionKeys[currentIndex + 1];
            this.selectSession(nextSession);
        }
    }

    startMainTimer() {
        if (!this.mainTimer.running) {
            this.mainTimer.running = true;
            this.mainTimer.interval = setInterval(() => {
                this.mainTimer.remaining--;
                this.updateMainDisplay();
                
                if (this.mainTimer.remaining <= 0) {
                    this.mainTimerComplete();
                }
            }, 1000);
        }
    }

    mainTimerComplete() {
        clearInterval(this.mainTimer.interval);
        this.mainTimer.running = false;
        alert('워크숍이 완료되었습니다!');
    }

    startSpeakerTimer() {
        if (!this.speakerTimer.running) {
            this.speakerTimer.running = true;
            this.speakerTimer.remaining = this.speakerTimer.duration;
            this.speakerTimer.alertsTriggered = { cat: false, dog: false };
            
            this.speakerTimer.interval = setInterval(() => {
                this.speakerTimer.remaining--;
                this.updateSpeakerDisplay();
                this.checkSpeakerAlerts();
                
                if (this.speakerTimer.remaining <= 0) {
                    this.stopSpeakerTimer();
                }
            }, 1000);
            
            this.startSpeakerBtn.textContent = '진행중';
            this.startSpeakerBtn.disabled = true;
        }
    }

    stopSpeakerTimer() {
        if (this.speakerTimer.running) {
            this.speakerTimer.running = false;
            clearInterval(this.speakerTimer.interval);
            this.speakerTimer.remaining = this.speakerTimer.duration;
            this.speakerTimer.alertsTriggered = { cat: false, dog: false };
            
            this.updateSpeakerDisplay();
            this.resetSpeakerAlerts();
            
            this.startSpeakerBtn.textContent = '발언 시작';
            this.startSpeakerBtn.disabled = false;
        }
    }

    checkSpeakerAlerts() {
        const elapsed = this.speakerTimer.duration - this.speakerTimer.remaining;
        
        // 2분 경과 시 고양이 소리
        if (elapsed >= 120 && !this.speakerTimer.alertsTriggered.cat) {
            this.speakerTimer.alertsTriggered.cat = true;
            this.playSound('cat');
            this.catAlert.classList.add('active');
        }
        
        // 3분 경과 시 강아지 소리
        if (elapsed >= 180 && !this.speakerTimer.alertsTriggered.dog) {
            this.speakerTimer.alertsTriggered.dog = true;
            this.playSound('dog');
            this.dogAlert.classList.add('active');
        }
    }

    resetSpeakerAlerts() {
        this.catAlert.classList.remove('active');
        this.dogAlert.classList.remove('active');
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    }

    updateCircularProgress(element, remaining, total) {
        const progress = ((total - remaining) / total) * 360;
        element.style.background = `conic-gradient(#fff ${progress}deg, #333 ${progress}deg)`;
    }

    updateMainDisplay() {
        this.mainTimerDisplay.textContent = this.formatTime(this.mainTimer.remaining);
        this.updateCircularProgress(this.mainTimerCircle, this.mainTimer.remaining, this.mainTimer.duration);
    }

    updateSessionDisplay() {
        this.sessionTimerDisplay.textContent = this.formatTime(this.sessionTimer.remaining);
        this.updateCircularProgress(this.sessionTimerCircle, this.sessionTimer.remaining, this.sessionTimer.duration);
    }

    updateSpeakerDisplay() {
        this.speakerTimerDisplay.textContent = this.formatTime(this.speakerTimer.remaining);
        this.updateCircularProgress(this.speakerTimerCircle, this.speakerTimer.remaining, this.speakerTimer.duration);
    }

    updateAllDisplays() {
        this.updateMainDisplay();
        this.updateSessionDisplay();
        this.updateSpeakerDisplay();
        
        // 초기 세션 세팅
        this.currentSessionName.textContent = this.sessions[this.currentSession].name;
        this.sessionDetails.innerHTML = this.sessions[this.currentSession].details;
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new WorkshopTimer();
});