# Implementation Guide
## 찌익(Choice): 행복을 찾아서 - 구현 가이드

**버전:** 1.0
**작성일:** 2025-10-21
**대상 독자:** 프론트엔드 개발자

---

## 1. 개발 환경 설정

### 1.1 필수 요구사항
```bash
# Node.js (개발 서버용)
node --version  # v18.0.0 이상

# 패키지 매니저
npm --version   # v9.0.0 이상
```

### 1.2 프로젝트 초기화
```bash
# 프로젝트 디렉토리 생성
mkdir countrymouse-game
cd countrymouse-game

# package.json 생성
npm init -y

# 개발 의존성 설치
npm install -D vite

# package.json 스크립트 추가
```

**package.json:**
```json
{
  "name": "countrymouse-game",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### 1.3 에디터 설정 (VS Code)

**.vscode/settings.json:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "[javascript]": {
    "editor.tabSize": 2
  },
  "[css]": {
    "editor.tabSize": 2
  }
}
```

**.prettierrc:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

---

## 2. 프로젝트 구조

### 2.1 디렉토리 구조
```
countrymouse-game/
├── index.html              # 메인 HTML
├── package.json
├── vite.config.js
│
├── src/
│   ├── main.js             # 앱 진입점
│   ├── game.js             # 게임 메인 클래스
│   │
│   ├── core/               # 핵심 게임 로직
│   │   ├── StoryEngine.js
│   │   ├── StateManager.js
│   │   ├── SaveManager.js
│   │   └── EventBus.js
│   │
│   ├── ui/                 # UI 관련
│   │   ├── UIRenderer.js
│   │   ├── MenuScreen.js
│   │   ├── GameScreen.js
│   │   ├── GalleryScreen.js
│   │   └── SettingsScreen.js
│   │
│   ├── audio/              # 오디오 관리
│   │   └── AudioManager.js
│   │
│   ├── utils/              # 유틸리티
│   │   ├── ImageLoader.js
│   │   ├── AnimationController.js
│   │   └── helpers.js
│   │
│   └── data/               # 게임 데이터
│       ├── story.json      # 스토리 데이터
│       ├── endings.json    # 엔딩 데이터
│       └── config.json     # 게임 설정
│
├── assets/                 # 리소스
│   ├── images/
│   │   ├── backgrounds/    # 배경 이미지
│   │   ├── characters/     # 캐릭터 일러스트
│   │   ├── endings/        # 엔딩 일러스트
│   │   ├── items/          # 수집 아이템
│   │   └── ui/             # UI 아이콘
│   │
│   ├── audio/
│   │   ├── bgm/            # 배경음악
│   │   └── sfx/            # 효과음
│   │
│   └── fonts/              # 폰트 파일
│       └── Pretendard-Variable.woff2
│
├── styles/                 # CSS
│   ├── main.css            # 전역 스타일
│   ├── game.css            # 게임 화면
│   ├── menu.css            # 메뉴 화면
│   ├── gallery.css         # 갤러리
│   └── mobile.css          # 모바일 최적화
│
└── dist/                   # 빌드 출력 (생성됨)
```

### 2.2 파일 생성 스크립트
```bash
# 디렉토리 구조 생성
mkdir -p src/{core,ui,audio,utils,data}
mkdir -p assets/{images/{backgrounds,characters,endings,items,ui},audio/{bgm,sfx},fonts}
mkdir -p styles

# 기본 파일 생성
touch src/main.js src/game.js
touch src/core/{StoryEngine,StateManager,SaveManager,EventBus}.js
touch src/ui/{UIRenderer,MenuScreen,GameScreen,GalleryScreen,SettingsScreen}.js
touch src/audio/AudioManager.js
touch src/utils/{ImageLoader,AnimationController,helpers}.js
touch src/data/{story,endings,config}.json
touch styles/{main,game,menu,gallery,mobile}.css
```

---

## 3. 개발 단계별 가이드

### Phase 1: 기본 프레임워크 구축 (Week 1)

#### Step 1.1: HTML 기본 구조
**index.html:**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#4A90E2">
  <title>찌익(Choice): 행복을 찾아서</title>

  <!-- Preload critical resources -->
  <link rel="preload" href="/assets/fonts/Pretendard-Variable.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Styles -->
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="stylesheet" href="/styles/game.css">
  <link rel="stylesheet" href="/styles/menu.css">
  <link rel="stylesheet" href="/styles/gallery.css">
  <link rel="stylesheet" href="/styles/mobile.css">
</head>
<body>
  <div id="app">
    <!-- 로딩 스크린 -->
    <div id="loading-screen" class="loading-screen">
      <div class="loader"></div>
      <p>게임을 불러오는 중...</p>
    </div>

    <!-- 상태바 (게임 중에만 표시) -->
    <div id="status-bar" class="status-bar hidden">
      <div class="stat">
        <span class="label">행복</span>
        <div class="bar-container">
          <div id="hp-bar" class="bar hp-bar" data-value="50"></div>
        </div>
      </div>
      <div class="stat">
        <span class="label">스트레스</span>
        <div class="bar-container">
          <div id="sp-bar" class="bar sp-bar" data-value="20"></div>
        </div>
      </div>
    </div>

    <!-- 메인 컨테이너 (화면 전환) -->
    <div id="game-container" class="game-container">
      <!-- 동적으로 렌더링됨 -->
    </div>

    <!-- 하단 네비게이션 (게임 중에만 표시) -->
    <nav id="bottom-nav" class="bottom-nav hidden">
      <button id="menu-btn" class="nav-btn" aria-label="메뉴">
        <span class="icon">☰</span>
      </button>
      <button id="settings-btn" class="nav-btn" aria-label="설정">
        <span class="icon">⚙️</span>
      </button>
      <button id="gallery-btn" class="nav-btn" aria-label="갤러리">
        <span class="icon">🖼️</span>
      </button>
    </nav>
  </div>

  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

#### Step 1.2: 전역 CSS
**styles/main.css:**
```css
/* CSS 변수 정의 */
:root {
  --color-primary: #4A90E2;
  --color-secondary: #7B68EE;
  --color-success: #4CAF50;
  --color-warning: #FFC107;
  --color-danger: #F44336;

  --color-bg: #FAFAFA;
  --color-text: #333333;
  --color-text-light: #666666;

  --font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  --border-radius: 12px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* 폰트 로드 */
@font-face {
  font-family: 'Pretendard Variable';
  src: url('/assets/fonts/Pretendard-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}

/* 리셋 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* 로딩 스크린 */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 상태바 */
.status-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-md);
  background: white;
  box-shadow: var(--shadow);
  display: flex;
  gap: var(--spacing-md);
  z-index: 100;
}

.status-bar.hidden {
  display: none;
}

.stat {
  flex: 1;
}

.stat .label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-light);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.bar-container {
  height: 8px;
  background: #E0E0E0;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  height: 100%;
  transition: width 0.8s ease-out, background-color 0.3s;
  position: relative;
}

.bar::after {
  content: attr(data-value) '%';
  position: absolute;
  right: 4px;
  top: -18px;
  font-size: 10px;
  font-weight: 600;
}

.hp-bar { background: var(--color-success); }
.sp-bar { background: var(--color-primary); }

/* 게임 컨테이너 */
.game-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 하단 네비게이션 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: var(--spacing-sm);
  background: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.bottom-nav.hidden {
  display: none;
}

.nav-btn {
  padding: var(--spacing-md);
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-btn:active {
  transform: scale(0.95);
}

/* 데스크톱 대응 */
@media (min-width: 769px) {
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/assets/images/pattern.png') repeat;
  }

  .game-container {
    max-width: 480px;
    height: 100vh;
    box-shadow: var(--shadow-lg);
  }

  .status-bar,
  .bottom-nav {
    max-width: 480px;
    left: 50%;
    transform: translateX(-50%);
  }
}

/* 유틸리티 */
.hidden { display: none !important; }
.fade-in {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 진동 효과 (위험 경고) */
.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
```

#### Step 1.3: 메인 진입점
**src/main.js:**
```javascript
import Game from './game.js';
import './utils/polyfills.js'; // 필요 시

// 앱 초기화
async function init() {
  try {
    // 로딩 스크린 표시
    const loadingScreen = document.getElementById('loading-screen');

    // 게임 인스턴스 생성
    const game = new Game();

    // 게임 데이터 로드
    await game.init();

    // 로딩 스크린 숨김
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);

    // 게임 시작 (메인 메뉴 표시)
    game.showMainMenu();

  } catch (error) {
    console.error('Game initialization failed:', error);
    alert('게임을 시작할 수 없습니다. 페이지를 새로고침해주세요.');
  }
}

// DOM 로드 완료 후 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

#### Step 1.4: 게임 메인 클래스
**src/game.js:**
```javascript
import StoryEngine from './core/StoryEngine.js';
import StateManager from './core/StateManager.js';
import SaveManager from './core/SaveManager.js';
import EventBus from './core/EventBus.js';
import UIRenderer from './ui/UIRenderer.js';
import AudioManager from './audio/AudioManager.js';
import MenuScreen from './ui/MenuScreen.js';
import GameScreen from './ui/GameScreen.js';

export default class Game {
  constructor() {
    this.eventBus = new EventBus();
    this.saveManager = new SaveManager();
    this.audioManager = new AudioManager();
    this.uiRenderer = new UIRenderer(document.getElementById('game-container'));

    this.storyEngine = null;
    this.stateManager = null;

    this.currentScreen = null;

    this.setupEventListeners();
  }

  async init() {
    // 스토리 데이터 로드
    const storyData = await this.loadStoryData();

    // 엔진 초기화
    this.storyEngine = new StoryEngine(storyData, this.eventBus);
    this.stateManager = new StateManager(this.eventBus);

    // 오디오 프리로드
    await this.audioManager.preloadSFX(['click', 'choice', 'collect', 'warning']);

    console.log('Game initialized successfully');
  }

  async loadStoryData() {
    try {
      const response = await fetch('/src/data/story.json');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to load story data');
    }
  }

  setupEventListeners() {
    // 하단 네비게이션
    document.getElementById('menu-btn')?.addEventListener('click', () => {
      this.showMainMenu();
    });

    document.getElementById('settings-btn')?.addEventListener('click', () => {
      this.showSettings();
    });

    document.getElementById('gallery-btn')?.addEventListener('click', () => {
      this.showGallery();
    });

    // 게임 이벤트 리스닝
    this.eventBus.on('choice_made', ({ choice, effects }) => {
      this.audioManager.playSFX('choice');
      this.stateManager.applyEffects(effects);
    });

    this.eventBus.on('hp_changed', ({ oldValue, newValue }) => {
      this.uiRenderer.updateStatusBar(newValue, this.stateManager.state.sp);
    });

    this.eventBus.on('sp_changed', ({ oldValue, newValue }) => {
      this.uiRenderer.updateStatusBar(this.stateManager.state.hp, newValue);

      if (newValue > 80) {
        this.uiRenderer.showDangerWarning();
        this.audioManager.playSFX('warning');
      }
    });
  }

  showMainMenu() {
    this.hideStatusBar();
    const menuScreen = new MenuScreen(this);
    this.currentScreen = menuScreen;
    menuScreen.render();
  }

  startNewGame() {
    this.storyEngine.start();
    this.stateManager.reset();
    this.showGameScreen();
  }

  continueGame() {
    const saveData = this.saveManager.load();
    if (saveData) {
      this.storyEngine.restore(saveData.story);
      this.stateManager.restore(saveData.state);
      this.showGameScreen();
    }
  }

  showGameScreen() {
    this.showStatusBar();
    const gameScreen = new GameScreen(this);
    this.currentScreen = gameScreen;
    gameScreen.render();

    // BGM 재생
    this.audioManager.playBGM('main_theme');
  }

  showGallery() {
    // 구현 예정
  }

  showSettings() {
    // 구현 예정
  }

  showStatusBar() {
    document.getElementById('status-bar').classList.remove('hidden');
    document.getElementById('bottom-nav').classList.remove('hidden');
  }

  hideStatusBar() {
    document.getElementById('status-bar').classList.add('hidden');
    document.getElementById('bottom-nav').classList.add('hidden');
  }

  saveGame() {
    this.saveManager.save(this.storyEngine, this.stateManager);
    this.audioManager.playSFX('save');
  }
}
```

---

### Phase 2: 핵심 로직 구현 (Week 1 계속)

#### Step 2.1: EventBus 구현
**src/core/EventBus.js:**
```javascript
export default class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    return () => this.off(eventName, callback);
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      );
    }
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event handler for ${eventName}:`, error);
        }
      });
    }
  }

  once(eventName, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }

  clear() {
    this.events = {};
  }
}
```

#### Step 2.2: StateManager 구현
**src/core/StateManager.js:**
```javascript
export default class StateManager {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      hp: 50,
      sp: 20,
      flags: [],
      items: [],
      endings: [],
      metadata: {
        playCount: 0,
        totalPlayTime: 0,
        lastPlayed: null,
        startTime: Date.now()
      }
    };
  }

  reset() {
    this.state = this.getInitialState();
  }

  restore(savedState) {
    this.state = { ...savedState };
  }

  applyEffects(effects) {
    const oldState = { ...this.state };

    if (effects.hp !== undefined) {
      const newHP = this.clamp(this.state.hp + effects.hp, 0, 100);
      this.state.hp = newHP;

      this.eventBus.emit('hp_changed', {
        oldValue: oldState.hp,
        newValue: newHP,
        delta: effects.hp
      });
    }

    if (effects.sp !== undefined) {
      const newSP = this.clamp(this.state.sp + effects.sp, 0, 100);
      this.state.sp = newSP;

      this.eventBus.emit('sp_changed', {
        oldValue: oldState.sp,
        newValue: newSP,
        delta: effects.sp
      });
    }

    if (effects.flags) {
      effects.flags.forEach(flag => this.addFlag(flag));
    }

    if (effects.item) {
      this.collectItem(effects.item);
    }
  }

  addFlag(flag) {
    if (!this.state.flags.includes(flag)) {
      this.state.flags.push(flag);
      this.eventBus.emit('flag_added', { flag });
    }
  }

  collectItem(itemId) {
    if (!this.state.items.includes(itemId)) {
      this.state.items.push(itemId);
      this.eventBus.emit('item_collected', { itemId });
      return true;
    }
    return false;
  }

  unlockEnding(endingId) {
    if (!this.state.endings.includes(endingId)) {
      this.state.endings.push(endingId);
      this.eventBus.emit('ending_unlocked', { endingId });
    }
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  isInDanger() {
    return this.state.sp > 80;
  }

  isCritical() {
    return this.state.sp > 90;
  }
}
```

---

## 4. 코딩 컨벤션

### 4.1 JavaScript 스타일
```javascript
// 1. 명명 규칙
// - 클래스: PascalCase
class StoryEngine {}

// - 함수/변수: camelCase
const gameState = {};
function updateScore() {}

// - 상수: UPPER_SNAKE_CASE
const MAX_HP = 100;

// - Private 필드: _ prefix (convention)
class Game {
  _privateMethod() {}
}

// 2. 파일 구조
// - 임포트 먼저
import Something from './somewhere.js';

// - 클래스/함수 정의
class MyClass {}

// - Export는 마지막
export default MyClass;

// 3. 주석
/**
 * 함수에 대한 JSDoc 주석
 * @param {string} nodeId - 노드 ID
 * @returns {Object} 노드 객체
 */
function getNode(nodeId) {}

// 4. 에러 핸들링
try {
  // 위험한 작업
} catch (error) {
  console.error('Context:', error);
  // 복구 로직
}
```

### 4.2 CSS 스타일
```css
/* BEM 방법론 사용 */
.block {}
.block__element {}
.block--modifier {}

/* 예시 */
.story-node {}
.story-node__text {}
.story-node--ending {}

/* 중첩 최소화 (최대 3단계) */
.parent {
  .child {
    .grandchild {
      /* 여기까지 */
    }
  }
}
```

---

## 5. 개발 체크리스트

### Week 1: 프레임워크
- [ ] 프로젝트 초기화
- [ ] 디렉토리 구조 생성
- [ ] HTML/CSS 기본 구조
- [ ] 핵심 클래스 뼈대 (Game, StoryEngine, StateManager)
- [ ] EventBus 구현
- [ ] SaveManager 기본 기능

### Week 2: 스토리 시스템
- [ ] story.json 데이터 구조 확정
- [ ] StoryEngine 완성 (노드 탐색, 선택 처리)
- [ ] GameScreen 구현
- [ ] 선택지 UI 및 애니메이션
- [ ] HP/SP 바 업데이트
- [ ] Chapter 1~2 테스트 데이터 작성

### Week 3: 콘텐츠 & 기능
- [ ] Chapter 3~5 데이터 작성
- [ ] 엔딩 시스템 구현
- [ ] 갤러리 화면
- [ ] 수집 시스템
- [ ] AudioManager 구현
- [ ] 설정 화면

### Week 4: 폴리싱
- [ ] 모바일 터치 최적화
- [ ] 애니메이션 개선
- [ ] 효과음/BGM 통합
- [ ] 버그 수정
- [ ] 성능 최적화 (이미지 로딩)

---

## 6. 디버깅 팁

### 6.1 개발자 도구 활용
```javascript
// 게임 상태 확인 (콘솔에서)
window.game = game; // main.js에서 전역 노출

// 콘솔에서:
game.stateManager.state        // 현재 상태
game.storyEngine.currentNode   // 현재 노드
game.storyEngine.history       // 선택 히스토리
```

### 6.2 로깅 유틸리티
**src/utils/logger.js:**
```javascript
const DEBUG = import.meta.env.MODE === 'development';

export const logger = {
  info: (msg, data) => {
    if (DEBUG) console.log(`[INFO] ${msg}`, data);
  },
  warn: (msg, data) => {
    if (DEBUG) console.warn(`[WARN] ${msg}`, data);
  },
  error: (msg, data) => {
    console.error(`[ERROR] ${msg}`, data);
  }
};
```

### 6.3 치트 모드
```javascript
// 개발 중 빠른 테스트용
if (import.meta.env.MODE === 'development') {
  window.cheat = {
    setHP: (value) => game.stateManager.state.hp = value,
    setSP: (value) => game.stateManager.state.sp = value,
    jumpToNode: (nodeId) => game.storyEngine.currentNode = nodeId,
    unlockAllEndings: () => {
      game.stateManager.state.endings = ['ending_a', 'ending_b', 'ending_c', 'ending_hidden'];
    }
  };
}
```

---

## 7. 빌드 & 배포

### 7.1 개발 서버 실행
```bash
npm run dev
# http://localhost:5173 접속
```

### 7.2 프로덕션 빌드
```bash
npm run build
# dist/ 폴더에 최적화된 파일 생성
```

### 7.3 빌드 최적화 설정
**vite.config.js:**
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 프로덕션에서 console 제거
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'story-data': ['./src/data/story.json']
        }
      }
    }
  },
  assetsInclude: ['**/*.webp', '**/*.mp3', '**/*.ogg']
});
```

### 7.4 배포 (Netlify/Vercel)
```bash
# Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# 또는 Vercel
npm install -g vercel
vercel --prod
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 8. 트러블슈팅

### 8.1 일반적인 문제

**문제: LocalStorage 저장 실패**
```javascript
// 해결: 용량 확인 및 예외 처리
try {
  localStorage.setItem(key, value);
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    alert('저장 공간이 부족합니다.');
  }
}
```

**문제: 이미지 로딩 느림**
```javascript
// 해결: Lazy loading + Preloading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
```

**문제: 모바일 스크롤 이슈**
```css
/* 해결: 전체 스크롤 방지 */
body {
  overflow: hidden;
  touch-action: none;
}

.scrollable-area {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

---

## 9. 참고 자료

### 9.1 공식 문서
- [Vite 공식 문서](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev Performance](https://web.dev/performance/)

### 9.2 유용한 도구
- **Chrome DevTools**: 성능 프로파일링
- **Lighthouse**: 성능 측정
- **Can I Use**: 브라우저 호환성 체크

### 9.3 디자인 리소스
- [Figma Community](https://www.figma.com/community)
- [Freepik](https://www.freepik.com/) (일러스트)
- [Freesound](https://freesound.org/) (효과음)

---

**다음 문서:** [STORY_SCHEMA.md](./STORY_SCHEMA.md) - 스토리 데이터 작성 가이드
