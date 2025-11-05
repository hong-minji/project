# Story Data Schema
## 찌익(Choice): 행복을 찾아서 - 스토리 데이터 설계

**버전:** 1.0
**작성일:** 2025-10-21
**대상 독자:** 콘텐츠 작가, 개발자

---

## 1. 데이터 구조 개요

### 1.1 파일 구성
```
src/data/
├── story.json       # 메인 스토리 데이터 (노드, 선택지)
├── endings.json     # 엔딩 정의 및 조건
├── items.json       # 수집 아이템 메타데이터
└── config.json      # 게임 설정 (밸런스 조정)
```

### 1.2 JSON 스키마 버전
- **Schema Version:** 1.0
- **Encoding:** UTF-8
- **Format:** Minified JSON for production, Pretty for development

---

## 2. story.json 스키마

### 2.1 전체 구조
```json
{
  "version": "1.0",
  "metadata": {
    "title": "찌익(Choice): 행복을 찾아서",
    "author": "Game Team",
    "totalNodes": 45,
    "totalChapters": 5
  },
  "startNode": "chapter1_start",
  "nodes": {
    "chapter1_start": { /* 노드 객체 */ },
    "chapter1_node2": { /* 노드 객체 */ }
    // ...
  }
}
```

### 2.2 노드 객체 스키마
```typescript
interface StoryNode {
  // 필수 필드
  id: string;                    // 고유 ID (예: "chapter1_start")
  chapter: number;               // 챕터 번호 (1~5)
  type: "story" | "choice" | "ending";  // 노드 타입

  // 시각적 요소
  background: string;            // 배경 이미지 경로
  character?: string;            // 캐릭터 이미지 (선택사항)
  characterPosition?: "left" | "center" | "right";  // 캐릭터 위치

  // 텍스트 콘텐츠
  narrator?: string;             // 내레이션 (3인칭 시점)
  speaker?: "countryside" | "seoul" | "narrator";  // 대사 화자
  text: string;                  // 메인 텍스트 (대사 또는 내레이션)

  // 오디오
  bgm?: string;                  // BGM 파일명 (변경 시에만 지정)
  sfx?: string;                  // 진입 시 효과음

  // 게임플레이
  choices?: Choice[];            // 선택지 배열 (type: "choice"일 때 필수)
  nextNode?: string;             // 자동 진행 노드 (선택지 없을 때)
  autoAdvance?: number;          // 자동 진행 시간 (ms, 선택사항)

  // 이벤트
  onEnter?: {
    addFlags?: string[];         // 진입 시 추가할 플래그
    collectItem?: string;        // 수집 아이템 ID
    achievement?: string;        // 업적 해금
  };

  // 메타데이터
  tags?: string[];               // 검색/분류용 태그
  notes?: string;                // 작가 노트 (개발용)
}
```

### 2.3 선택지 객체 스키마
```typescript
interface Choice {
  // 필수 필드
  text: string;                  // 선택지 텍스트 (80자 이내 권장)
  nextNode: string;              // 다음 노드 ID

  // 효과
  effects?: {
    hp?: number;                 // HP 변화량 (-100 ~ +100)
    sp?: number;                 // SP 변화량 (-100 ~ +100)
  };

  // 플래그 & 아이템
  addFlags?: string[];           // 추가할 플래그
  collectItem?: string;          // 수집 아이템 ID

  // 조건부 표시 (고급 기능)
  condition?: {
    type: "flag_exists" | "flag_not_exists" | "hp_greater" | "sp_less";
    value: any;
  };

  // UI 힌트
  icon?: string;                 // 선택지 아이콘 (이모지 또는 이미지)
  color?: "default" | "positive" | "negative" | "neutral";  // 선택지 색상 힌트

  // 메타데이터
  tags?: string[];               // 선택 타입 (예: "brave", "cautious", "empathetic")
}
```

---

## 3. 실제 예시

### 3.1 Chapter 1 시작 노드
```json
{
  "chapter1_start": {
    "id": "chapter1_start",
    "chapter": 1,
    "type": "story",
    "background": "/assets/images/backgrounds/countryside_field.webp",
    "character": "/assets/images/characters/countryside_happy.webp",
    "characterPosition": "center",
    "speaker": "narrator",
    "text": "평화로운 시골 들판. 따뜻한 햇살 아래, 시골이는 익은 곡식 알을 한 입 베어 물었다. '오늘도 참 좋은 날이야.'",
    "bgm": "countryside_theme",
    "nextNode": "chapter1_letter",
    "autoAdvance": 3000,
    "tags": ["intro", "peaceful"]
  },

  "chapter1_letter": {
    "id": "chapter1_letter",
    "chapter": 1,
    "type": "choice",
    "background": "/assets/images/backgrounds/countryside_field.webp",
    "character": "/assets/images/characters/countryside_curious.webp",
    "speaker": "narrator",
    "text": "그때, 멀리서 우편 배달원이 편지 한 통을 건넨다. 사촌 서울이에게서 온 편지다.\n\n'시골이! 서울엔 네가 상상도 못 할 맛있는 것들이 가득해. 한번 놀러 와!'\n\n시골이는 편지를 읽으며 생각에 잠긴다...",
    "sfx": "letter_open",
    "onEnter": {
      "collectItem": "letter",
      "addFlags": ["received_invitation"]
    },
    "choices": [
      {
        "text": "\"안전한 게 최고야. 여기 남을래.\"",
        "nextNode": "chapter1_refuse",
        "effects": {
          "hp": 5,
          "sp": -5
        },
        "addFlags": ["refused_invitation"],
        "icon": "🏡",
        "color": "neutral",
        "tags": ["cautious", "conservative"]
      },
      {
        "text": "\"새로운 경험을 하고 싶어! 서울로 가자!\"",
        "nextNode": "chapter2_journey",
        "effects": {
          "hp": 10,
          "sp": 10
        },
        "addFlags": ["accepted_invitation"],
        "icon": "🚂",
        "color": "positive",
        "tags": ["brave", "curious"]
      }
    ],
    "tags": ["turning_point", "major_choice"]
  },

  "chapter1_refuse": {
    "id": "chapter1_refuse",
    "chapter": 1,
    "type": "ending",
    "background": "/assets/images/backgrounds/countryside_sunset.webp",
    "character": "/assets/images/characters/countryside_peaceful.webp",
    "speaker": "narrator",
    "text": "시골이는 편지를 소중히 접어 넣고, 다시 들판으로 돌아간다.\n\n'나에겐 이곳이 최고야.'\n\n해가 지고, 별이 뜨고, 그렇게 평화로운 나날이 계속되었다.\n\n[BAD END - 모험을 시작하지 않음]",
    "bgm": "peaceful_ending",
    "nextNode": "game_over_screen",
    "onEnter": {
      "achievement": "homebody"
    },
    "tags": ["early_ending", "bad_end"]
  }
}
```

### 3.2 Chapter 3 위기 노드 (고양이 '나비')
```json
{
  "chapter3_cat_encounter": {
    "id": "chapter3_cat_encounter",
    "chapter": 3,
    "type": "choice",
    "background": "/assets/images/backgrounds/kitchen_night.webp",
    "character": "/assets/images/characters/countryside_scared.webp",
    "characterPosition": "left",
    "speaker": "narrator",
    "text": "갑자기 어둠 속에서 노란 두 눈이 빛난다. 고양이 '나비'다!\n\n'시골이, 빨리! 이 파이프로!' 서울이가 소리친다.\n\n하지만 당신의 다리는 떨려서 움직이지 않는다.",
    "bgm": "danger_theme",
    "sfx": "cat_meow",
    "onEnter": {
      "addFlags": ["met_navi"]
    },
    "choices": [
      {
        "text": "\"서울이를 믿고 파이프로 뛰어든다!\"",
        "nextNode": "chapter3_cat_escape_success",
        "effects": {
          "hp": 5,
          "sp": 15
        },
        "addFlags": ["trusted_seoul", "pipe_escape"],
        "icon": "💨",
        "color": "positive",
        "tags": ["brave", "trust"]
      },
      {
        "text": "\"내 방식대로 구석에 숨어 기다린다.\"",
        "nextNode": "chapter3_cat_hide",
        "effects": {
          "hp": -5,
          "sp": 5
        },
        "addFlags": ["hid_alone"],
        "icon": "🙈",
        "color": "negative",
        "tags": ["cautious", "independent"]
      }
    ],
    "tags": ["danger", "major_choice", "cat_chase"]
  },

  "chapter3_cat_escape_success": {
    "id": "chapter3_cat_escape_success",
    "chapter": 3,
    "type": "story",
    "background": "/assets/images/backgrounds/pipe_inside.webp",
    "character": "/assets/images/characters/countryside_relieved.webp",
    "speaker": "countryside",
    "text": "\"휴... 살았다!\"\n\n좁은 파이프 안은 답답하지만, 나비의 발소리가 점점 멀어진다.\n\n서울이가 어둠 속에서 웃으며 말한다. \"봤지? 이게 바로 도시 생활의 스릴이야!\"",
    "sfx": "safe_sound",
    "nextNode": "chapter3_cheese_reward",
    "onEnter": {
      "collectItem": "pipe"
    },
    "tags": ["success", "relief"]
  },

  "chapter3_cheese_reward": {
    "id": "chapter3_cheese_reward",
    "chapter": 3,
    "type": "choice",
    "background": "/assets/images/backgrounds/storage_room.webp",
    "character": "/assets/images/characters/seoul_proud.webp",
    "characterPosition": "right",
    "speaker": "seoul",
    "text": "\"자, 고생했으니까 특별한 걸 보여줄게!\"\n\n서울이가 안내한 곳에는 황금빛 고급 치즈가 있다. 지금껏 맛본 것과는 차원이 다른 향기...\n\n\"어때? 이런 게 바로 행복 아니겠어?\"",
    "onEnter": {
      "collectItem": "cheese"
    },
    "choices": [
      {
        "text": "\"이런 게 행복이구나! 매일 먹고 싶어!\"",
        "nextNode": "chapter4_luxury_path",
        "effects": {
          "hp": 15,
          "sp": 5
        },
        "addFlags": ["loves_luxury"],
        "icon": "🧀",
        "color": "positive",
        "tags": ["hedonistic", "ambitious"]
      },
      {
        "text": "\"맛있지만... 왠지 마음이 편치 않아.\"",
        "nextNode": "chapter4_doubt_path",
        "effects": {
          "hp": 5,
          "sp": 10
        },
        "addFlags": ["feels_uneasy"],
        "icon": "😰",
        "color": "neutral",
        "tags": ["cautious", "introspective"]
      }
    ],
    "tags": ["reward", "value_choice"]
  }
}
```

### 3.3 Chapter 4 엔딩 분기점
```json
{
  "chapter4_final_decision": {
    "id": "chapter4_final_decision",
    "chapter": 4,
    "type": "choice",
    "background": "/assets/images/backgrounds/rainy_alley.webp",
    "character": "/assets/images/characters/countryside_contemplating.webp",
    "speaker": "narrator",
    "text": "비에 젖은 뒷골목. 시골이는 쓰레기통 옆에 앉아 생각에 잠긴다.\n\n배는 부르지만 마음은 불안하다. 매일 위험을 감수하는 이 생활이... 정말 내가 원한 행복일까?\n\n서울이는 이런 시골이를 이해하지 못한다. \"용기가 없으면 행복을 누릴 자격도 없어.\"\n\n이제 결정할 때다.",
    "bgm": "contemplation_theme",
    "sfx": "rain",
    "choices": [
      {
        "text": "\"아무리 그래도... 이건 내가 원한 행복이 아니야. 집으로 돌아갈래.\"",
        "nextNode": "ending_a_intro",
        "effects": {
          "hp": -10,
          "sp": -30
        },
        "addFlags": ["chose_return"],
        "icon": "🏡",
        "color": "neutral",
        "tags": ["ending_a_path", "returning_home"]
      },
      {
        "text": "\"무섭긴 하지만... 이 화려함을 포기할 수 없어. 서울에서 버텨볼래.\"",
        "nextNode": "ending_b_intro",
        "effects": {
          "hp": 10,
          "sp": 15
        },
        "addFlags": ["chose_stay"],
        "icon": "🌃",
        "color": "positive",
        "tags": ["ending_b_path", "city_adaptation"],
        "condition": {
          "type": "hp_greater",
          "value": 40
        }
      },
      {
        "text": "\"서울이 너도 위험하잖아. 우리 함께 더 안전한 곳을 찾아보자.\"",
        "nextNode": "ending_c_intro",
        "effects": {
          "hp": 5,
          "sp": -10
        },
        "addFlags": ["chose_compromise"],
        "icon": "🤝",
        "color": "positive",
        "tags": ["ending_c_path", "compromise"],
        "condition": {
          "type": "flag_exists",
          "value": "trusted_seoul"
        }
      }
    ],
    "tags": ["final_choice", "ending_branch"]
  }
}
```

---

## 4. endings.json 스키마

### 4.1 전체 구조
```json
{
  "version": "1.0",
  "endings": [
    {
      "id": "ending_a",
      "name": "소박한 삶의 행복",
      "type": "good",
      "description": "시골이는 고향으로 돌아가 평화로운 삶을 되찾았습니다.",
      "image": "/assets/images/endings/ending_a.webp",
      "bgm": "countryside_ending",
      "unlockMessage": "엔딩 A: 소박한 삶의 행복을 발견했습니다.",
      "conditions": [
        {
          "type": "choice_made",
          "nodeId": "chapter4_final_decision",
          "choiceIndex": 0
        },
        {
          "type": "hp_greater",
          "value": 40
        }
      ],
      "achievements": ["simple_life"],
      "nextPlayMessage": "다른 선택을 해보시겠어요?"
    },
    {
      "id": "ending_b",
      "name": "도시 속 나만의 행복",
      "type": "good",
      "description": "시골이는 도시에서 자신만의 평화로운 장소를 찾았습니다.",
      "image": "/assets/images/endings/ending_b.webp",
      "bgm": "city_peaceful_ending",
      "unlockMessage": "엔딩 B: 도시형 행복을 발견했습니다.",
      "conditions": [
        {
          "type": "choice_made",
          "nodeId": "chapter4_final_decision",
          "choiceIndex": 1
        },
        {
          "type": "hp_greater_than_sp",
          "value": true
        }
      ],
      "achievements": ["city_dweller"],
      "nextPlayMessage": "시골로 돌아가는 엔딩도 보셨나요?"
    },
    {
      "id": "ending_c",
      "name": "함께 찾는 새로운 터전",
      "type": "true",
      "description": "시골이와 서울이는 타협점을 찾아 새로운 곳으로 떠났습니다.",
      "image": "/assets/images/endings/ending_c.webp",
      "bgm": "new_beginning_ending",
      "unlockMessage": "엔딩 C: 진정한 행복 - 타협과 이해를 발견했습니다!",
      "conditions": [
        {
          "type": "choice_made",
          "nodeId": "chapter4_final_decision",
          "choiceIndex": 2
        },
        {
          "type": "flag_exists",
          "value": "trusted_seoul"
        },
        {
          "type": "hp_range",
          "min": 40,
          "max": 70
        },
        {
          "type": "sp_less",
          "value": 60
        }
      ],
      "achievements": ["true_happiness", "compromise_master"],
      "nextPlayMessage": "축하합니다! 트루 엔딩을 달성하셨습니다."
    },
    {
      "id": "ending_hidden",
      "name": "노이로제",
      "type": "bad",
      "description": "시골이는 극심한 스트레스로 고향으로 도망치듯 돌아갔습니다.",
      "image": "/assets/images/endings/ending_hidden.webp",
      "bgm": "tragic_ending",
      "unlockMessage": "히든 엔딩: 스트레스 붕괴... 무리하지 마세요.",
      "conditions": [
        {
          "type": "sp_greater",
          "value": 90
        }
      ],
      "isHidden": true,
      "achievements": ["survivor"],
      "nextPlayMessage": "더 조심스럽게 선택해보시는 건 어떨까요?"
    }
  ]
}
```

### 4.2 조건 타입 정의
```typescript
type ConditionType =
  | "choice_made"          // 특정 선택지 선택
  | "flag_exists"          // 플래그 존재
  | "flag_not_exists"      // 플래그 부재
  | "hp_greater"           // HP > value
  | "hp_less"              // HP < value
  | "hp_range"             // min <= HP <= max
  | "sp_greater"           // SP > value
  | "sp_less"              // SP < value
  | "hp_greater_than_sp"   // HP > SP
  | "item_collected"       // 아이템 보유
  | "all_items_collected"; // 모든 아이템 수집
```

---

## 5. items.json 스키마

```json
{
  "version": "1.0",
  "items": [
    {
      "id": "letter",
      "name": "서울이의 편지",
      "description": "사촌 서울이가 보낸 초대 편지. 모든 시작이었다.",
      "image": "/assets/images/items/letter.webp",
      "icon": "✉️",
      "rarity": "common",
      "obtainCondition": "Chapter 1에서 자동 획득"
    },
    {
      "id": "cheese",
      "name": "고급 치즈 조각",
      "description": "서울의 부잣집에서 맛본 황금빛 치즈. 잊을 수 없는 맛이었다.",
      "image": "/assets/images/items/cheese.webp",
      "icon": "🧀",
      "rarity": "rare",
      "obtainCondition": "Chapter 3에서 고양이 탈출 후 획득"
    },
    {
      "id": "photo",
      "name": "서울이와의 사진",
      "description": "네온사인 앞에서 찍은 사진. 서울이는 자신감 넘치는 표정이다.",
      "image": "/assets/images/items/photo.webp",
      "icon": "📸",
      "rarity": "rare",
      "obtainCondition": "Chapter 2에서 특정 선택 시 획득"
    },
    {
      "id": "pipe",
      "name": "탈출용 파이프",
      "description": "고양이 나비를 피해 숨었던 좁은 파이프. 생명의 은인.",
      "image": "/assets/images/items/pipe.webp",
      "icon": "🔧",
      "rarity": "uncommon",
      "obtainCondition": "Chapter 3에서 파이프 탈출 성공 시"
    },
    {
      "id": "grain",
      "name": "시골의 곡식 알",
      "description": "고향 들판의 익은 곡식. 소박하지만 따뜻한 맛.",
      "image": "/assets/images/items/grain.webp",
      "icon": "🌾",
      "rarity": "common",
      "obtainCondition": "Ending A 달성 시 자동 획득"
    },
    {
      "id": "cake",
      "name": "생일 케이크 조각",
      "description": "부잣집 파티에서 몰래 가져온 케이크. 달콤한 유혹.",
      "image": "/assets/images/items/cake.webp",
      "icon": "🍰",
      "rarity": "rare",
      "obtainCondition": "Chapter 2에서 위험을 감수하고 획득"
    },
    {
      "id": "cap",
      "name": "반짝이는 병뚜껑",
      "description": "쓰레기통에서 발견한 반짝이는 보물. 도시의 화려함.",
      "image": "/assets/images/items/cap.webp",
      "icon": "✨",
      "rarity": "uncommon",
      "obtainCondition": "Chapter 3 특정 경로 탐색 시"
    },
    {
      "id": "leaf",
      "name": "고향의 나뭇잎",
      "description": "시골 숲에서 가져온 마른 나뭇잎. 향수를 불러일으킨다.",
      "image": "/assets/images/items/leaf.webp",
      "icon": "🍂",
      "rarity": "common",
      "obtainCondition": "Chapter 1 시작 시 자동 보유"
    }
  ]
}
```

---

## 6. config.json 스키마

```json
{
  "version": "1.0",
  "gameplay": {
    "initialHP": 50,
    "initialSP": 20,
    "maxHP": 100,
    "maxSP": 100,
    "criticalSP": 90,
    "dangerSP": 80
  },
  "ui": {
    "textSpeed": {
      "slow": 50,
      "normal": 30,
      "fast": 10
    },
    "autoAdvanceDefault": false,
    "showEffectNumbers": true,
    "animationDuration": 500
  },
  "audio": {
    "bgmVolume": 0.5,
    "sfxVolume": 0.7,
    "bgmFadeDuration": 1000
  },
  "achievements": [
    {
      "id": "simple_life",
      "name": "소박한 행복",
      "description": "시골에서의 평화를 선택했습니다.",
      "icon": "🏡"
    },
    {
      "id": "city_dweller",
      "name": "도시 적응자",
      "description": "도시에서 나만의 방식을 찾았습니다.",
      "icon": "🏙️"
    },
    {
      "id": "true_happiness",
      "name": "진정한 행복",
      "description": "트루 엔딩에 도달했습니다!",
      "icon": "🌟"
    },
    {
      "id": "survivor",
      "name": "생존자",
      "description": "극한의 스트레스를 경험했습니다.",
      "icon": "😰"
    },
    {
      "id": "collector",
      "name": "수집가",
      "description": "모든 아이템을 수집했습니다.",
      "icon": "🎒"
    },
    {
      "id": "completionist",
      "name": "완벽주의자",
      "description": "모든 엔딩을 달성했습니다!",
      "icon": "🏆"
    }
  ]
}
```

---

## 7. 스토리 작성 가이드라인

### 7.1 텍스트 작성 원칙
1. **간결성**: 노드당 50~150자 (모바일 가독성)
2. **명확성**: 복잡한 비유보다 직관적 표현
3. **일관성**: 캐릭터 보이스 유지
4. **감정 표현**: 이모지 적절히 활용 (과하지 않게)

### 7.2 선택지 디자인 원칙
```
좋은 선택지:
✅ "서울이를 믿고 파이프로 뛰어든다!"
✅ "내 방식대로 구석에 숨어 기다린다."

나쁜 선택지:
❌ "선택 1"
❌ "파이프로 간다 / 숨는다" (너무 짧음)
❌ "서울이를 믿고 그가 알려준 파이프로 재빠르게 뛰어들어 고양이를 피한다" (너무 김)
```

### 7.3 밸런스 조정 기준
```javascript
// HP 효과 가이드라인
+15~+20: 큰 행복 (최고급 음식, 안전한 휴식)
+5~+10:  소소한 기쁨 (작은 보상, 성공)
-5~-10:  실망 (실패, 위험 회피로 인한 기회 상실)
-15~-20: 큰 슬픔/좌절 (거의 사용 안 함)

// SP 효과 가이드라인
+15~+20: 극도의 위험 (고양이 추격, 쥐덫)
+5~+10:  긴장 상황 (소음, 불확실성)
-5~-10:  안정 회복 (위험 탈출, 휴식)
-15~-20: 큰 안정 (고향 복귀, 안전한 장소)
```

### 7.4 분기 설계 팁
```
챕터별 분기 복잡도:
- Chapter 1: 선형 (1~2개 분기)
- Chapter 2: 약간 분기 (2~3개 경로)
- Chapter 3: 중간 분기 (3~4개 경로)
- Chapter 4: 복잡 분기 (4~5개 경로 → 4개 엔딩)

분기 수렴 원칙:
- 너무 많은 분기는 콘텐츠 폭증
- 중요하지 않은 분기는 2~3노드 후 수렴
- 메이저 분기만 엔딩까지 유지
```

---

## 8. 데이터 검증 도구

### 8.1 JSON 유효성 검사 스크립트
**scripts/validate-story.js:**
```javascript
import fs from 'fs';

function validateStory(storyData) {
  const errors = [];

  // 1. startNode 존재 확인
  if (!storyData.nodes[storyData.startNode]) {
    errors.push(`Start node '${storyData.startNode}' not found`);
  }

  // 2. 각 노드 검증
  for (const [nodeId, node] of Object.entries(storyData.nodes)) {
    // 필수 필드
    if (!node.id || !node.chapter || !node.type || !node.text) {
      errors.push(`Node '${nodeId}' missing required fields`);
    }

    // 선택지 타입은 choices 필수
    if (node.type === 'choice' && !node.choices) {
      errors.push(`Choice node '${nodeId}' has no choices`);
    }

    // 선택지 검증
    if (node.choices) {
      node.choices.forEach((choice, idx) => {
        if (!choice.text || !choice.nextNode) {
          errors.push(`Choice ${idx} in '${nodeId}' invalid`);
        }

        // nextNode 존재 확인
        if (!storyData.nodes[choice.nextNode]) {
          errors.push(`Next node '${choice.nextNode}' not found (from ${nodeId})`);
        }
      });
    }

    // 자동 진행 노드는 nextNode 필수
    if (node.type === 'story' && !node.choices && !node.nextNode) {
      errors.push(`Story node '${nodeId}' has no next node`);
    }
  }

  return errors;
}

// 실행
const storyData = JSON.parse(fs.readFileSync('./src/data/story.json', 'utf-8'));
const errors = validateStory(storyData);

if (errors.length > 0) {
  console.error('❌ Validation failed:');
  errors.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('✅ Story data valid!');
}
```

### 8.2 플로우 시각화 도구
**scripts/visualize-flow.js:**
```javascript
// Mermaid 다이어그램 생성
function generateFlowDiagram(storyData) {
  let mermaid = 'graph TD\n';

  for (const [nodeId, node] of Object.entries(storyData.nodes)) {
    const label = `${nodeId}[${node.text.substring(0, 20)}...]`;
    mermaid += `  ${label}\n`;

    if (node.choices) {
      node.choices.forEach((choice, idx) => {
        mermaid += `  ${nodeId} -->|"${choice.text.substring(0, 15)}..."| ${choice.nextNode}\n`;
      });
    } else if (node.nextNode) {
      mermaid += `  ${nodeId} --> ${node.nextNode}\n`;
    }
  }

  return mermaid;
}
```

---

## 9. 콘텐츠 작성 체크리스트

### Chapter 1: 평화로운 나날 (7노드)
- [ ] 시작 노드 (시골 소개)
- [ ] 편지 도착 노드
- [ ] 초대 수락/거절 선택지
- [ ] 거절 시 초기 엔딩
- [ ] 수락 시 여행 준비
- [ ] 여행 중 내레이션
- [ ] Chapter 2 전환

### Chapter 2: 서울 상경 (10노드)
- [ ] 서울 도착 (압도적 풍경)
- [ ] 서울이 집 도착
- [ ] 고급 음식 경험
- [ ] 첫 위험 경고 (집주인 발소리)
- [ ] 작은 선택지 (숨기 vs 도망)
- [ ] 결과 노드
- [ ] 밤 대화 (서울이 철학)
- [ ] Chapter 3 전환

### Chapter 3: 위기 (12노드)
- [ ] 고양이 '나비' 등장
- [ ] 추격 장면
- [ ] 파이프 vs 숨기 선택
- [ ] 각 선택 결과 노드
- [ ] 치즈 보상 노드
- [ ] 스트레스 누적 묘사
- [ ] 서울이와 갈등 시작
- [ ] Chapter 4 전환

### Chapter 4: 갈등과 깨달음 (8노드)
- [ ] 비 오는 뒷골목
- [ ] 성찰 노드
- [ ] 서울이와 대화
- [ ] 최종 선택지 (3갈래)
- [ ] 각 엔딩 인트로 (3개)

### Endings (각 3~5노드)
- [ ] Ending A: 소박한 삶의 행복
- [ ] Ending B: 도시 속 나만의 행복
- [ ] Ending C: 함께 찾는 새로운 터전
- [ ] Ending Hidden: 노이로제 (조건부)

---

## 10. 테스트 데이터

### 10.1 최소 MVP 데이터
개발 초기에는 각 챕터당 3~4노드로 시작하여 전체 플로우 테스트
```
Chapter 1: 3노드
Chapter 2: 4노드
Chapter 3: 4노드
Chapter 4: 3노드
Endings: 2개 (A, B)
---
Total: ~16노드 (MVP)
```

### 10.2 전체 출시 버전
```
Chapter 1: 7노드
Chapter 2: 10노드
Chapter 3: 12노드
Chapter 4: 8노드
Endings: 4개 × 4노드 = 16노드
---
Total: ~53노드 (Full)
```

---

## 11. 부록: 노드 ID 네이밍 컨벤션

```
패턴: chapter{N}_{descriptor}

예시:
- chapter1_start
- chapter1_letter
- chapter2_arrival
- chapter3_cat_encounter
- chapter4_final_decision
- ending_a_intro
- ending_b_conclusion
- ending_hidden_breakdown

특수 노드:
- game_over_screen
- credits_roll
- achievement_popup
```

---

**문서 작성:** 콘텐츠 팀
**최종 검토:** 2025-10-21
**관련 문서:** [TDD.md](./TDD.md), [IMPLEMENTATION.md](./IMPLEMENTATION.md)
