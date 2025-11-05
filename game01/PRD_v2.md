# Product Requirements Document (PRD) v2.0
## 찌익(Choice): 행복을 찾아서 - 미니멀 버전

**버전:** 2.0 (간소화)
**작성일:** 2025-10-21
**프로젝트 코드명:** CountryMouse Mini
**플랫폼:** HTML5 Web Game (Mobile-first)

---

## 1. Executive Summary

### 1.1 제품 개요
'찌익(Choice): 행복을 찾아서'는 고전 우화 '시골쥐와 서울쥐'를 현대적으로 재해석한 **미니멀 모바일 스토리 게임**입니다. 15분 내외의 짧은 플레이타임으로 4가지 엔딩을 경험할 수 있습니다.

### 1.2 v2.0 간소화 목표
- **제작 부담 85% 감소**: 에셋 74개 → 28개
- **개발 기간 50% 단축**: 4주 → 2주
- **게임 용량 87% 감소**: 50MB → 6.5MB
- **핵심 경험 유지**: 선택 시스템, 4가지 엔딩, HP/SP 관리

### 1.3 성공 지표
| 지표 | 목표 (출시 후 3개월) |
|------|---------------------|
| 스토리 완료율 | 70% 이상 |
| 평균 플레이타임 | 12~15분 |
| 멀티 엔딩 도달 유저 | 40% 이상 |
| 재방문율 (7일) | 30% 이상 |
| 초기 로딩 시간 | < 2초 |

---

## 2. Core Features (간소화)

### F-1: 선택지 시스템 (P0)
**변경 없음** - 기존과 동일

### F-2: HP/SP 지수 관리 (P0)
**변경 없음** - 기존과 동일

### F-3: 스토리 진행 시스템 (P0)
**변경사항:**
- ~~5개 챕터, 30~40개 노드~~ → **4개 챕터, 18개 노드**
- ~~영상 컷신 5개~~ → **2개 (오프닝 5초, 엔딩 5초)**
- 각 노드: 배경 이미지 (재사용) + 캐릭터 일러스트 (4종) + 텍스트 + 선택지

### F-4: 멀티 엔딩 시스템 (P0)
**변경사항:**
- 4가지 엔딩 유지
- ~~각 엔딩 고유 일러스트~~ → **2개 일러스트 재사용 (good/bad)**
- 텍스트와 색상 필터로 차별화

### ~~F-5: 수집 시스템 (P1)~~ → **제거**
**이유:** 개발 부담 대비 핵심 경험에 미미한 영향

### F-6: 영상 컷신 (P1)
**대폭 축소:**
- 오프닝 (5초): 타이틀 → 시골이 등장
- 엔딩 (5초): 크레딧 롤
- 스킵 가능
- 챕터 전환 영상 제거 (텍스트로 대체)

### F-7: 세이브/로드 시스템 (P0)
**변경 없음** - 기존과 동일

---

## 3. Content Structure (간소화)

### 3.1 스토리 구조
```
Chapter 1 (시골) - 3개 노드
  └─ 배경: countryside.webp

Chapter 2 (서울 도착) - 4개 노드
  └─ 배경: seoul_city.webp

Chapter 3 (위기) - 4개 노드
  └─ 배경: seoul_luxury.webp

Chapter 4 (갈등) - 3개 노드
  └─ 배경: seoul_luxury.webp (어두운 필터)

Endings - 4개 (각 1노드)
  └─ 배경: countryside / seoul_city / ending_good / ending_bad
```

**총 18개 노드** (기존 45개 대비 60% 감소)

### 3.2 배경 재사용 전략
| 배경 이미지 | 사용 챕터 | CSS 필터 |
|-------------|----------|----------|
| countryside.webp | Chapter 1, Ending A | 없음 / sepia |
| seoul_city.webp | Chapter 2, Ending B | 없음 / brightness |
| seoul_luxury.webp | Chapter 3, 4 | 없음 / darken |
| ending_good.webp | Ending C | 없음 |
| ending_bad.webp | Ending Hidden | 없음 |

**총 3개 기본 배경 + 2개 엔딩 = 5개**

---

## 4. Asset Requirements (간소화)

### 4.1 이미지 에셋 (15개)
| 타입 | 수량 | 규격 | 용량 | 파일명 |
|------|------|------|------|--------|
| 배경 | 3 | 1080x1920px | 120KB | countryside, seoul_city, seoul_luxury |
| 캐릭터 | 4 | 800x800px | 60KB | countryside_neutral, countryside_worried, seoul_neutral, seoul_serious |
| 엔딩 | 2 | 1080x1920px | 150KB | ending_good, ending_bad |
| UI 아이콘 | 6 | 24x24px | 3KB | menu, settings, close, heart, stress, lock |

**총 이미지 용량: ~920KB**

### 4.2 영상 에셋 (2개)
| 파일명 | 길이 | 용도 | 용량 목표 |
|--------|------|------|----------|
| opening.mp4 | 5초 | 게임 시작 시 | 1MB |
| ending.mp4 | 5초 | 엔딩 후 | 1MB |

**총 영상 용량: 2MB**

### 4.3 오디오 에셋 (10개)
| 타입 | 파일명 | 용도 | 용량 |
|------|--------|------|------|
| BGM | main_theme.mp3 | 평화 테마 (Chapter 1,2,4, Ending A) | 1.5MB |
| BGM | tension_theme.mp3 | 긴장 테마 (Chapter 3) | 1.5MB |
| SFX | click.mp3 | 버튼 클릭 | 20KB |
| SFX | choice.mp3 | 선택지 선택 | 30KB |
| SFX | page_turn.mp3 | 화면 전환 | 25KB |
| SFX | warning.mp3 | 위험 경고 | 40KB |
| SFX | success.mp3 | 긍정 결과 | 30KB |
| SFX | fail.mp3 | 부정 결과 | 30KB |
| SFX | ambient_city.mp3 | 도시 환경음 (루프) | 80KB |
| SFX | ambient_rain.mp3 | 빗소리 (루프) | 80KB |

**총 오디오 용량: 3.4MB**

### 4.4 폰트 (1개)
- Pretendard-Variable.woff2 (400KB)

**전체 에셋 용량: ~6.7MB**

---

## 5. Technical Specifications

### 5.1 성능 목표
| 지표 | v2.0 목표 | v1.0 대비 |
|------|----------|----------|
| 초기 로딩 | < 2초 | -33% |
| 번들 사이즈 | < 400KB | -20% |
| 총 에셋 용량 | < 7MB | -86% |
| 메모리 사용 | < 80MB | -47% |

### 5.2 기술 스택
```yaml
language: HTML5, CSS3, ES6+
framework: Vanilla JS (Preact 제거)
video: HTML5 <video> tag
audio: Web Audio API
storage: LocalStorage
optimization: WebP, lazy loading, CSS filters
```

---

## 6. UI/UX Simplifications

### 6.1 화면 구성
```
┌─────────────────────┐
│ [HP ████] [SP ██]   │ 상태바
├─────────────────────┤
│                     │
│   [배경 이미지]      │
│   [캐릭터]          │
│                     │
├─────────────────────┤
│ "대사 텍스트..."    │ 텍스트
├─────────────────────┤
│ [선택지 1]          │
│ [선택지 2]          │ 선택지
│ [선택지 3]          │
└─────────────────────┘
```

### 6.2 UI 간소화 전략
- 하단 네비게이션 제거 → 우상단 햄버거 메뉴만
- 갤러리는 엔딩 4개만 표시
- ~~아이템 수집~~ 제거
- 아이콘 대신 이모지 적극 활용

---

## 7. Development Roadmap (2주)

### Week 1: 핵심 개발
- **Day 1-2**: 프로젝트 초기화, 기본 UI 구조
- **Day 3-4**: StoryEngine, StateManager 구현
- **Day 5-6**: 배경 3개 + 캐릭터 4개 제작 (Midjourney)
- **Day 7**: 테스트 데이터 (Chapter 1~2) 작성

### Week 2: 콘텐츠 & 폴리싱
- **Day 8-9**: Chapter 3~4 + 엔딩 구현
- **Day 10**: 영상 2개 제작 (After Effects)
- **Day 11-12**: BGM/SFX 통합
- **Day 13**: 엔딩 일러스트 2개 제작
- **Day 14**: 최종 테스트 & 배포

---

## 8. Cost Breakdown

### 8.1 제작 비용
```yaml
Midjourney: $30 (1개월)
영상 외주: $100 (2개 × $50)
BGM 라이브러리: $15 (Epidemic Sound 1개월)
SFX: $0 (Freesound 무료)
폰트: $0 (Pretendard OFL)
---
총계: $145 (v1.0 $1,000+ 대비 85% 절감)
```

### 8.2 개발 공수
- **개발자**: 2주 (v1.0 대비 50% 단축)
- **아티스트**: 1주 (Midjourney 활용)
- **사운드**: 3일 (라이브러리 활용)

---

## 9. Risk Management

### 9.1 간소화 리스크
| 리스크 | 영향 | 대응 |
|--------|------|------|
| 단조로운 비주얼 | 중 | CSS 필터, 애니메이션으로 다양성 확보 |
| 짧은 플레이타임 | 낮 | 재플레이 동기 강화 (4개 엔딩) |
| 영상 품질 우려 | 낮 | 5초 짧은 영상으로 집중도 높임 |

---

## 10. Success Metrics

### 10.1 핵심 지표
```yaml
제작 효율성:
  - 개발 기간: 2주 이하
  - 제작 비용: $150 이하
  - 에셋 용량: 7MB 이하

게임 품질:
  - 완료율: 70% 이상
  - 평균 평점: 4.0/5.0 이상
  - 재플레이율: 40% 이상

기술 성능:
  - 로딩 시간: 2초 이하
  - FPS: 60fps 유지
  - 에러율: 1% 이하
```

---

## 11. Appendix

### 11.1 변경 요약 (v1.0 → v2.0)
```diff
에셋:
- 배경 이미지: 8개 → 3개 (-62%)
- 캐릭터: 12개 → 4개 (-67%)
- 엔딩 일러스트: 4개 → 2개 (-50%)
- 영상: 5개 (63초) → 2개 (10초) (-80%)
- UI 아이콘: 15개 → 6개 (-60%)
- 아이템: 8개 → 0개 (-100%)
- BGM: 5곡 → 2곡 (-60%)
- SFX: 15개 → 8개 (-47%)
- 폰트: 2개 → 1개 (-50%)

콘텐츠:
- 챕터 수: 5개 → 4개 (-20%)
- 노드 수: 45개 → 18개 (-60%)
- 엔딩 수: 4개 (유지)
- 수집 시스템: 제거

결과:
+ 제작 부담 85% 감소
+ 개발 기간 50% 단축
+ 게임 용량 87% 감소
+ 핵심 경험 100% 유지
```

---

**문서 버전:** 2.0 (간소화)
**이전 버전:** [PRD.md](./PRD.md) (v1.0)
**관련 문서:** [GAME_REDESIGN.md](./GAME_REDESIGN.md)
