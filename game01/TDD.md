# Technical Design Document (TDD)
## 찌익(Choice): 행복을 찾아서

**버전:** 1.0
**작성일:** 2025-10-21
**대상 독자:** 개발자, 기술 아키텍트

---

## 1. 시스템 아키텍처 개요

### 1.1 아키텍처 패턴
**선택:** MVC (Model-View-Controller) 변형 + Event-Driven Architecture

```
┌─────────────────────────────────────────────┐
│              User Interface                 │
│  (HTML/CSS + Event Handlers)               │
└────────────────┬────────────────────────────┘
                 │ User Actions
                 ▼
┌────────────────────────────────────────────┐
│          Controller Layer                  │
│  ┌──────────────┐  ┌──────────────┐       │
│  │ UIController │  │ GameController│       │
│  └──────────────┘  └──────────────┘       │
└────────────────┬────────────────────────────┘
                 │ Commands
                 ▼
┌────────────────────────────────────────────┐
│           Core Game Logic                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Story    │ │  State   │ │  Save    │  │
│  │ Engine   │ │ Manager  │ │ Manager  │  │
│  └──────────┘ └──────────┘ └──────────┘  │
└────────────────┬────────────────────────────┘
                 │ State Changes
                 ▼
┌────────────────────────────────────────────┐
│             Data Layer                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Story    │ │  Game    │ │ Local    │  │
│  │ Data     │ │  State   │ │ Storage  │  │
│  └──────────┘ └──────────┘ └──────────┘  │
└────────────────────────────────────────────┘

        ┌──────────────┐
        │ Audio/Visual │
        │   Services   │
        └──────────────┘
```

### 1.2 핵심 설계 원칙
1. **Separation of Concerns**: UI, 로직, 데이터 계층 분리
2. **Single Responsibility**: 각 모듈은 하나의 명확한 책임
3. **Event-Driven**: 느슨한 결합을 위한 이벤트 시스템
4. **Immutable State**: 상태 변경은 새 객체 생성으로 처리
5. **Progressive Enhancement**: 기본 기능 우선, 고급 기능은 점진적 추가

---

## 2. 핵심 모듈 설계

### 2.1 StoryEngine (스토리 엔진)

**책임:**
- 스토리 데이터 로딩 및 관리
- 현재 노드 추적
- 선택지 처리 및 다음 노드 결정
- 조건부 분기 평가

**주요 메서드:**
```javascript
class StoryEngine {
  constructor(storyData) {
    this.storyData = storyData;
    this.currentNode = null;
    this.history = [];
  }

  // 스토리 시작
  start() {
    this.currentNode = this.storyData.startNode;
    this.history = [];
    return this.getCurrentNode();
  }

  // 현재 노드 가져오기
  getCurrentNode() {
    return this.storyData.nodes[this.currentNode];
  }

  // 선택 처리
  makeChoice(choiceIndex) {
    const node = this.getCurrentNode();
    const choice = node.choices[choiceIndex];

    // 히스토리 저장
    this.history.push({
      nodeId: this.currentNode,
      choiceIndex: choiceIndex,
      timestamp: Date.now()
    });

    // 다음 노드로 이동
    this.currentNode = choice.nextNode;

    return {
      effects: choice.effects,
      flags: choice.flags,
      nextNode: this.getCurrentNode()
    };
  }

  // 조건 평가 (엔딩 분기용)
  evaluateCondition(condition, gameState) {
    // condition: { type: 'hp_greater', value: 50 }
    switch(condition.type) {
      case 'hp_greater':
        return gameState.hp > condition.value;
      case 'sp_less':
        return gameState.sp < condition.value;
      case 'flag_exists':
        return gameState.flags.includes(condition.value);
      case 'choice_made':
        return this.history.some(h =>
          h.nodeId === condition.nodeId &&
          h.choiceIndex === condition.choiceIndex
        );
      default:
        return false;
    }
  }

  // 엔딩 결정
  determineEnding(gameState) {
    const endings = this.storyData.endings;

    for (const ending of endings) {
      const allConditionsMet = ending.conditions.every(
        cond => this.evaluateCondition(cond, gameState)
      );

      if (allConditionsMet) {
        return ending;
      }
    }

    // 기본 엔딩 (fallback)
    return endings.find(e => e.isDefault);
  }

  // 진행률 계산
  getProgress() {
    const totalNodes = Object.keys(this.storyData.nodes).length;
    const visitedNodes = new Set(this.history.map(h => h.nodeId)).size;
    return (visitedNodes / totalNodes) * 100;
  }
}
```

**데이터 의존성:**
- `storyData`: 전체 스토리 JSON 데이터
- `gameState`: StateManager가 관리하는 현재 상태

---

### 2.2 StateManager (상태 관리자)

**책임:**
- HP/SP 수치 관리
- 플래그 관리 (이벤트 발생 여부)
- 수집 아이템 추적
- 달성 엔딩 기록

**주요 메서드:**
```javascript
class StateManager {
  constructor() {
    this.state = this.getInitialState();
    this.listeners = [];
  }

  getInitialState() {
    return {
      hp: 50,           // 행복 지수 (0~100)
      sp: 20,           // 스트레스 지수 (0~100)
      flags: [],        // 이벤트 플래그 ['met_navi', 'ate_cheese']
      items: [],        // 수집 아이템 ['cheese', 'photo']
      endings: [],      // 달성 엔딩 ['ending_a']
      metadata: {
        playCount: 0,
        totalPlayTime: 0,
        lastPlayed: null
      }
    };
  }

  // 상태 변경 (불변성 유지)
  setState(updates) {
    const oldState = { ...this.state };
    this.state = {
      ...this.state,
      ...updates,
      hp: this.clamp(updates.hp ?? this.state.hp, 0, 100),
      sp: this.clamp(updates.sp ?? this.state.sp, 0, 100)
    };

    this.notifyListeners(oldState, this.state);
  }

  // 효과 적용 (선택지 결과)
  applyEffects(effects) {
    const updates = {};

    if (effects.hp !== undefined) {
      updates.hp = this.state.hp + effects.hp;
    }

    if (effects.sp !== undefined) {
      updates.sp = this.state.sp + effects.sp;
    }

    this.setState(updates);
  }

  // 플래그 추가
  addFlag(flag) {
    if (!this.state.flags.includes(flag)) {
      this.setState({
        flags: [...this.state.flags, flag]
      });
    }
  }

  // 아이템 수집
  collectItem(itemId) {
    if (!this.state.items.includes(itemId)) {
      this.setState({
        items: [...this.state.items, itemId]
      });
      return true; // 새로운 아이템
    }
    return false; // 이미 보유
  }

  // 엔딩 달성
  unlockEnding(endingId) {
    if (!this.state.endings.includes(endingId)) {
      this.setState({
        endings: [...this.state.endings, endingId]
      });
    }
  }

  // 상태 리스너 등록 (Observer 패턴)
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners(oldState, newState) {
    this.listeners.forEach(listener => {
      listener(newState, oldState);
    });
  }

  // 유틸리티
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // 위험 상태 확인
  isInDanger() {
    return this.state.sp > 80;
  }

  isCritical() {
    return this.state.sp > 90;
  }
}
```

---

### 2.3 SaveManager (저장 관리자)

**책임:**
- LocalStorage CRUD 작업
- 게임 진행 상황 직렬화/역직렬화
- 버전 호환성 관리
- 데이터 검증

**주요 메서드:**
```javascript
class SaveManager {
  constructor() {
    this.SAVE_KEY = 'countrymouse_save';
    this.VERSION = '1.0';
  }

  // 저장
  save(storyEngine, stateManager) {
    const saveData = {
      version: this.VERSION,
      timestamp: Date.now(),
      story: {
        currentNode: storyEngine.currentNode,
        history: storyEngine.history
      },
      state: stateManager.state
    };

    try {
      const serialized = JSON.stringify(saveData);
      localStorage.setItem(this.SAVE_KEY, serialized);
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  }

  // 불러오기
  load() {
    try {
      const serialized = localStorage.getItem(this.SAVE_KEY);
      if (!serialized) return null;

      const saveData = JSON.parse(serialized);

      // 버전 검증
      if (!this.isCompatible(saveData.version)) {
        console.warn('Save version incompatible');
        return null;
      }

      return saveData;
    } catch (error) {
      console.error('Load failed:', error);
      return null;
    }
  }

  // 세이브 파일 존재 확인
  hasSaveData() {
    return localStorage.getItem(this.SAVE_KEY) !== null;
  }

  // 삭제
  deleteSave() {
    localStorage.removeItem(this.SAVE_KEY);
  }

  // 버전 호환성 체크
  isCompatible(saveVersion) {
    // 현재는 단순 비교, 추후 마이그레이션 로직 추가 가능
    return saveVersion === this.VERSION;
  }

  // 자동 저장
  enableAutoSave(storyEngine, stateManager, interval = 30000) {
    return setInterval(() => {
      this.save(storyEngine, stateManager);
    }, interval);
  }

  // 내보내기 (백업용)
  exportSave() {
    const saveData = localStorage.getItem(this.SAVE_KEY);
    if (!saveData) return null;

    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `countrymouse_save_${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  // 가져오기
  importSave(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const saveData = JSON.parse(e.target.result);
          if (this.isCompatible(saveData.version)) {
            localStorage.setItem(this.SAVE_KEY, e.target.result);
            resolve(saveData);
          } else {
            reject(new Error('Incompatible version'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }
}
```

---

### 2.4 UIRenderer (UI 렌더러)

**책임:**
- DOM 조작
- 애니메이션 트리거
- 사용자 입력 처리
- 화면 전환 관리

**주요 메서드:**
```javascript
class UIRenderer {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentScreen = null;
    this.animationQueue = [];
  }

  // 노드 렌더링
  renderNode(node) {
    const nodeHTML = `
      <div class="story-node" data-node-id="${node.id}">
        <div class="background" style="background-image: url('${node.background}')">
          ${node.character ? `<img src="${node.character}" class="character" alt="">` : ''}
        </div>
        <div class="text-area">
          <p class="story-text">${node.text}</p>
        </div>
        <div class="choices">
          ${node.choices.map((choice, index) => `
            <button class="choice-btn" data-choice-index="${index}">
              ${choice.text}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    this.container.innerHTML = nodeHTML;
    this.animateNodeEntry();
  }

  // 상태바 업데이트
  updateStatusBar(hp, sp) {
    const hpBar = document.getElementById('hp-bar');
    const spBar = document.getElementById('sp-bar');

    // 애니메이션 적용
    this.animateBar(hpBar, hp, 'hp');
    this.animateBar(spBar, sp, 'sp');
  }

  animateBar(element, value, type) {
    // 색상 변화
    const color = this.getBarColor(value, type);
    element.style.backgroundColor = color;

    // 너비 변화
    element.style.width = `${value}%`;
    element.style.transition = 'width 0.8s ease-out, background-color 0.3s';

    // 수치 표시
    element.setAttribute('data-value', value);
  }

  getBarColor(value, type) {
    if (type === 'hp') {
      if (value > 70) return '#4CAF50'; // 녹색
      if (value > 40) return '#FFC107'; // 노랑
      return '#F44336'; // 빨강
    } else { // sp
      if (value < 40) return '#2196F3'; // 파랑
      if (value < 70) return '#9C27B0'; // 보라
      return '#F44336'; // 빨강
    }
  }

  // 노드 진입 애니메이션
  animateNodeEntry() {
    const node = this.container.querySelector('.story-node');
    node.style.opacity = '0';
    node.style.transform = 'translateY(20px)';

    requestAnimationFrame(() => {
      node.style.transition = 'opacity 0.5s, transform 0.5s';
      node.style.opacity = '1';
      node.style.transform = 'translateY(0)';
    });
  }

  // 선택 피드백
  highlightChoice(button) {
    button.classList.add('selected');
    button.disabled = true;

    // 다른 버튼들 비활성화
    const allButtons = this.container.querySelectorAll('.choice-btn');
    allButtons.forEach(btn => {
      if (btn !== button) {
        btn.disabled = true;
        btn.classList.add('disabled');
      }
    });
  }

  // 화면 전환
  transitionTo(newScreen, duration = 500) {
    return new Promise((resolve) => {
      this.container.style.transition = `opacity ${duration}ms`;
      this.container.style.opacity = '0';

      setTimeout(() => {
        this.container.innerHTML = newScreen;
        this.container.style.opacity = '1';
        resolve();
      }, duration);
    });
  }

  // 효과 표시 (HP/SP 변화)
  showEffect(type, value) {
    const effect = document.createElement('div');
    effect.className = `effect-popup ${type}`;
    effect.textContent = value > 0 ? `+${value}` : value;

    document.body.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, 2000);
  }

  // 위험 경고
  showDangerWarning() {
    const warning = document.createElement('div');
    warning.className = 'danger-warning';
    warning.innerHTML = '⚠️ 스트레스가 위험 수준입니다!';

    document.body.appendChild(warning);

    // 화면 흔들림 효과
    document.body.classList.add('shake');
    setTimeout(() => {
      document.body.classList.remove('shake');
      warning.remove();
    }, 3000);
  }

  // 갤러리 렌더링
  renderGallery(endings, items) {
    const galleryHTML = `
      <div class="gallery">
        <h2>엔딩 컬렉션</h2>
        <div class="endings-grid">
          ${this.renderEndingSlots(endings)}
        </div>

        <h2>수집 아이템</h2>
        <div class="items-grid">
          ${this.renderItemSlots(items)}
        </div>
      </div>
    `;

    this.container.innerHTML = galleryHTML;
  }

  renderEndingSlots(unlockedEndings) {
    const allEndings = ['ending_a', 'ending_b', 'ending_c', 'ending_hidden'];

    return allEndings.map(endingId => {
      const unlocked = unlockedEndings.includes(endingId);
      return `
        <div class="ending-slot ${unlocked ? 'unlocked' : 'locked'}">
          ${unlocked
            ? `<img src="assets/endings/${endingId}.webp" alt="${endingId}">`
            : '<div class="lock-icon">🔒</div>'
          }
        </div>
      `;
    }).join('');
  }

  renderItemSlots(collectedItems) {
    const allItems = ['cheese', 'cap', 'photo', 'grain', 'cake', 'pipe', 'letter', 'leaf'];

    return allItems.map(itemId => {
      const collected = collectedItems.includes(itemId);
      return `
        <div class="item-slot ${collected ? 'collected' : 'missing'}">
          ${collected
            ? `<img src="assets/items/${itemId}.webp" alt="${itemId}">`
            : '<div class="silhouette"></div>'
          }
        </div>
      `;
    }).join('');
  }
}
```

---

### 2.5 AudioManager (오디오 관리자)

**책임:**
- BGM 재생 및 페이드 인/아웃
- 효과음 재생
- 볼륨 관리
- 오디오 프리로딩

**주요 메서드:**
```javascript
class AudioManager {
  constructor() {
    this.bgm = null;
    this.bgmVolume = 0.5;
    this.sfxVolume = 0.7;
    this.sfxPool = new Map();
  }

  // BGM 재생
  playBGM(trackName, loop = true) {
    if (this.bgm) {
      this.fadeOut(this.bgm, 1000, () => {
        this.bgm.pause();
        this.loadAndPlayBGM(trackName, loop);
      });
    } else {
      this.loadAndPlayBGM(trackName, loop);
    }
  }

  loadAndPlayBGM(trackName, loop) {
    this.bgm = new Audio(`assets/audio/bgm/${trackName}.mp3`);
    this.bgm.loop = loop;
    this.bgm.volume = 0;
    this.bgm.play();

    this.fadeIn(this.bgm, this.bgmVolume, 1000);
  }

  // 페이드 인/아웃
  fadeIn(audio, targetVolume, duration) {
    const steps = 20;
    const interval = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, targetVolume);

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
      }
    }, interval);
  }

  fadeOut(audio, duration, callback) {
    const steps = 20;
    const interval = duration / steps;
    const volumeStep = audio.volume / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(audio.volume - volumeStep, 0);

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        if (callback) callback();
      }
    }, interval);
  }

  // 효과음 재생
  playSFX(sfxName) {
    const audio = new Audio(`assets/audio/sfx/${sfxName}.mp3`);
    audio.volume = this.sfxVolume;
    audio.play();
  }

  // 효과음 프리로드
  preloadSFX(sfxNames) {
    sfxNames.forEach(name => {
      const audio = new Audio(`assets/audio/sfx/${name}.mp3`);
      this.sfxPool.set(name, audio);
    });
  }

  // 볼륨 설정
  setBGMVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    if (this.bgm) {
      this.bgm.volume = this.bgmVolume;
    }
  }

  setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  // 전체 음소거
  muteAll() {
    if (this.bgm) this.bgm.muted = true;
    this.sfxPool.forEach(audio => audio.muted = true);
  }

  unmuteAll() {
    if (this.bgm) this.bgm.muted = false;
    this.sfxPool.forEach(audio => audio.muted = false);
  }
}
```

---

## 3. 데이터 모델

### 3.1 게임 상태 (GameState)
```typescript
interface GameState {
  hp: number;              // 0~100
  sp: number;              // 0~100
  flags: string[];         // ['met_navi', 'ate_cheese']
  items: string[];         // ['cheese', 'photo']
  endings: string[];       // ['ending_a']
  metadata: {
    playCount: number;
    totalPlayTime: number; // milliseconds
    lastPlayed: number;    // timestamp
  };
}
```

### 3.2 스토리 노드 (StoryNode)
```typescript
interface StoryNode {
  id: string;
  chapter: number;         // 1~5
  background: string;      // 이미지 경로
  character?: string;      // 캐릭터 이미지 (선택사항)
  text: string;           // 대사/내레이션
  choices: Choice[];
  bgm?: string;           // BGM 변경 (선택사항)
  onEnter?: {             // 노드 진입 시 실행
    addFlag?: string;
    collectItem?: string;
    sfx?: string;
  };
}

interface Choice {
  text: string;
  effects: {
    hp?: number;          // 변화량 (-100 ~ +100)
    sp?: number;
  };
  flags?: string[];       // 추가할 플래그
  nextNode: string;       // 다음 노드 ID
  condition?: {           // 선택지 표시 조건 (선택사항)
    type: string;
    value: any;
  };
}
```

### 3.3 엔딩 정의 (Ending)
```typescript
interface Ending {
  id: string;
  name: string;
  description: string;
  image: string;
  conditions: Condition[];
  isDefault?: boolean;    // 기본 엔딩 여부
}

interface Condition {
  type: 'hp_greater' | 'hp_less' | 'sp_greater' | 'sp_less' |
        'flag_exists' | 'choice_made' | 'item_collected';
  value: any;
  nodeId?: string;        // choice_made 조건용
  choiceIndex?: number;
}
```

---

## 4. 이벤트 시스템

### 4.1 이벤트 타입
```javascript
const GameEvents = {
  // 스토리 이벤트
  NODE_ENTERED: 'node_entered',
  CHOICE_MADE: 'choice_made',
  CHAPTER_CHANGED: 'chapter_changed',

  // 상태 이벤트
  HP_CHANGED: 'hp_changed',
  SP_CHANGED: 'sp_changed',
  FLAG_ADDED: 'flag_added',
  ITEM_COLLECTED: 'item_collected',

  // 시스템 이벤트
  GAME_SAVED: 'game_saved',
  GAME_LOADED: 'game_loaded',
  ENDING_REACHED: 'ending_reached',

  // UI 이벤트
  MENU_OPENED: 'menu_opened',
  SETTINGS_CHANGED: 'settings_changed'
};
```

### 4.2 이벤트 버스 구현
```javascript
class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // Unsubscribe 함수 반환
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      );
    };
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(data);
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

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      );
    }
  }
}
```

---

## 5. 성능 최적화 전략

### 5.1 이미지 최적화
```javascript
// 레이지 로딩
const imageLoader = {
  preloadedImages: new Map(),

  preload(imageUrls) {
    return Promise.all(
      imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            this.preloadedImages.set(url, img);
            resolve(img);
          };
          img.onerror = reject;
          img.src = url;
        });
      })
    );
  },

  // 현재 챕터 + 다음 챕터 이미지 미리 로딩
  preloadChapter(chapterNumber, storyData) {
    const nodes = Object.values(storyData.nodes)
      .filter(node => node.chapter === chapterNumber ||
                     node.chapter === chapterNumber + 1);

    const imageUrls = nodes.flatMap(node =>
      [node.background, node.character].filter(Boolean)
    );

    return this.preload(imageUrls);
  }
};
```

### 5.2 애니메이션 최적화
```javascript
// requestAnimationFrame 활용
class AnimationController {
  constructor() {
    this.animations = [];
    this.isRunning = false;
  }

  add(animation) {
    this.animations.push(animation);
    if (!this.isRunning) {
      this.start();
    }
  }

  start() {
    this.isRunning = true;
    this.tick();
  }

  tick() {
    this.animations = this.animations.filter(anim => {
      return anim.update(); // false면 완료
    });

    if (this.animations.length > 0) {
      requestAnimationFrame(() => this.tick());
    } else {
      this.isRunning = false;
    }
  }
}
```

### 5.3 메모리 관리
```javascript
// 사용하지 않는 리소스 해제
class ResourceManager {
  cleanup() {
    // 이전 노드 이미지 제거
    const oldImages = document.querySelectorAll('.story-node img');
    oldImages.forEach(img => {
      img.src = '';
      img.remove();
    });

    // 오디오 정리
    audioManager.bgm?.pause();
    audioManager.bgm = null;
  }
}
```

---

## 6. 에러 처리 및 폴백

### 6.1 에러 핸들링 전략
```javascript
class ErrorHandler {
  static handleStoryLoadError(error) {
    console.error('Story load failed:', error);
    // 사용자에게 친화적 메시지
    alert('게임 데이터를 불러오는 데 실패했습니다. 페이지를 새로고침해주세요.');
  }

  static handleSaveError(error) {
    console.error('Save failed:', error);
    // LocalStorage 용량 초과 가능성
    if (error.name === 'QuotaExceededError') {
      alert('저장 공간이 부족합니다. 브라우저 데이터를 정리해주세요.');
    }
  }

  static handleAudioError(error) {
    console.warn('Audio playback failed:', error);
    // 오디오 없이도 게임 진행 가능
  }
}
```

### 6.2 폴백 메커니즘
```javascript
// WebP 지원 체크 및 PNG 폴백
async function checkWebPSupport() {
  const webpData = 'UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  const blob = await fetch(`data:image/webp;base64,${webpData}`).then(r => r.blob());
  return await createImageBitmap(blob).then(() => true, () => false);
}

const imageFormat = await checkWebPSupport() ? 'webp' : 'png';
```

---

## 7. 보안 고려사항

### 7.1 XSS 방지
```javascript
// 사용자 입력은 없지만, 스토리 텍스트 표시 시 안전하게 처리
function sanitizeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### 7.2 LocalStorage 보안
```javascript
// 세이브 데이터 무결성 검증
class SaveValidator {
  static validate(saveData) {
    // 기본 구조 검증
    if (!saveData.version || !saveData.story || !saveData.state) {
      return false;
    }

    // 값 범위 검증
    if (saveData.state.hp < 0 || saveData.state.hp > 100) {
      return false;
    }

    if (saveData.state.sp < 0 || saveData.state.sp > 100) {
      return false;
    }

    return true;
  }
}
```

---

## 8. 테스트 전략

### 8.1 단위 테스트
```javascript
// StoryEngine 테스트 예시
describe('StoryEngine', () => {
  test('should start at initial node', () => {
    const engine = new StoryEngine(mockStoryData);
    engine.start();
    expect(engine.currentNode).toBe('chapter1_node1');
  });

  test('should process choice correctly', () => {
    const engine = new StoryEngine(mockStoryData);
    engine.start();
    const result = engine.makeChoice(0);

    expect(result.effects).toBeDefined();
    expect(result.nextNode).toBeDefined();
    expect(engine.history.length).toBe(1);
  });
});
```

### 8.2 통합 테스트
```javascript
// 전체 게임 플로우 테스트
describe('Game Flow', () => {
  test('should reach ending A with correct choices', () => {
    const game = new Game();
    game.start();

    // Chapter 1~4 선택 시뮬레이션
    game.makeChoice(0);
    // ...

    const ending = game.getEnding();
    expect(ending.id).toBe('ending_a');
  });
});
```

### 8.3 E2E 테스트
```javascript
// Playwright를 활용한 E2E 테스트
test('complete game playthrough', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 새 게임 시작
  await page.click('button:has-text("새 게임")');

  // 첫 선택
  await page.click('.choice-btn:first-child');

  // HP 변화 확인
  const hpBar = await page.locator('#hp-bar');
  const width = await hpBar.evaluate(el => el.style.width);
  expect(parseInt(width)).toBeGreaterThan(0);
});
```

---

## 9. 배포 체크리스트

### 9.1 빌드 최적화
```bash
# 이미지 압축
imagemin assets/images/**/*.{jpg,png} --out-dir=dist/assets/images

# CSS/JS 최소화
terser main.js -o dist/main.min.js -c -m
csso styles.css -o dist/styles.min.css

# Gzip 압축
gzip -k dist/*.{js,css}
```

### 9.2 성능 체크
- Lighthouse 점수 >90 (Performance, Accessibility)
- 초기 로딩 <3초 (3G 네트워크)
- FCP (First Contentful Paint) <1.5초

### 9.3 브라우저 호환성 테스트
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+
- Firefox Mobile 88+

---

## 10. 부록

### 10.1 기술 스택 버전
```json
{
  "html": "HTML5",
  "css": "CSS3 (Flexbox, Grid)",
  "javascript": "ES2020+",
  "imageFormat": "WebP (fallback: PNG)",
  "audioFormat": "MP3/OGG",
  "fonts": "Pretendard Variable"
}
```

### 10.2 권장 개발 도구
- **에디터:** VS Code
- **디버깅:** Chrome DevTools
- **테스트:** Jest + Playwright
- **번들러:** Vite (개발 서버 + 빌드)
- **버전 관리:** Git

### 10.3 참고 라이브러리 (선택사항)
```javascript
// 상태 관리 (필요 시)
import { createStore } from 'zustand/vanilla';

// 애니메이션 (고급 효과 필요 시)
import gsap from 'gsap';

// 유틸리티
import { debounce, throttle } from 'lodash-es';
```

---

**문서 작성:** 개발팀
**최종 검토:** 2025-10-21
**다음 문서:** [IMPLEMENTATION.md](./IMPLEMENTATION.md)
