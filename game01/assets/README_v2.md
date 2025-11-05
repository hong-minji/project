# Assets Directory v2.0
## 찌익(Choice): 행복을 찾아서 - 미니멀 에셋 폴더

**버전:** 2.0 (간소화)
**총 파일:** 28개 (v1.0 74개 대비 62% 감소)
**총 용량:** ~6.7MB (v1.0 50MB 대비 87% 감소)

---

## 📁 간소화된 폴더 구조

```
assets/
├── images/              # 이미지 에셋 (15개, 920KB)
│   ├── backgrounds/     # 배경 이미지 (3장)
│   ├── characters/      # 캐릭터 일러스트 (4장)
│   ├── endings/         # 엔딩 일러스트 (2장)
│   └── ui/              # UI 아이콘 (6개)
│
├── videos/              # 영상 컷신 (2개, 2MB)
│
├── audio/               # 오디오 에셋 (10개, 3.4MB)
│   ├── bgm/             # 배경음악 (2곡)
│   └── sfx/             # 효과음 (8개)
│
└── fonts/               # 폰트 파일 (1개, 400KB)
```

---

## 📋 필요한 파일 목록 (28개)

### 이미지 (15개)

#### backgrounds/ (3개)
- [ ] countryside.webp (120KB) - Chapter 1, Ending A
- [ ] seoul_city.webp (120KB) - Chapter 2, Ending B
- [ ] seoul_luxury.webp (120KB) - Chapter 3, 4

#### characters/ (4개)
- [ ] countryside_neutral.webp (60KB) - 평화/호기심/행복
- [ ] countryside_worried.webp (60KB) - 불안/공포/성찰
- [ ] seoul_neutral.webp (60KB) - 자신감/자랑
- [ ] seoul_serious.webp (60KB) - 짜증/진지

#### endings/ (2개)
- [ ] ending_good.webp (150KB) - Ending A, B, C
- [ ] ending_bad.webp (150KB) - Ending Hidden

#### ui/ (6개)
- [ ] icon_menu.svg (3KB) - ☰
- [ ] icon_settings.svg (3KB) - ⚙️
- [ ] icon_close.svg (3KB) - ✕
- [ ] icon_heart.svg (3KB) - ❤️
- [ ] icon_stress.svg (3KB) - 😰
- [ ] icon_lock.svg (3KB) - 🔒

---

### 영상 (2개)

#### videos/ (2개)
- [ ] opening.mp4 (1MB, 5초) - 게임 시작
- [ ] ending.mp4 (1MB, 5초) - 엔딩 크레딧

---

### 오디오 (10개)

#### bgm/ (2곡)
- [ ] main_theme.mp3 (1.5MB) - 평화 테마
- [ ] tension_theme.mp3 (1.5MB) - 긴장 테마

#### sfx/ (8개)
- [ ] click.mp3 (20KB) - 버튼 클릭
- [ ] choice.mp3 (30KB) - 선택지 선택
- [ ] page_turn.mp3 (25KB) - 화면 전환
- [ ] warning.mp3 (40KB) - 위험 경고
- [ ] success.mp3 (30KB) - HP 상승
- [ ] fail.mp3 (30KB) - 부정 결과
- [ ] ambient_city.mp3 (80KB) - 도시 환경음
- [ ] ambient_rain.mp3 (80KB) - 빗소리

---

### 폰트 (1개)

#### fonts/ (1개)
- [ ] Pretendard-Variable.woff2 (400KB)

---

## ✅ 진행 상황

### 전체 진행률
```
이미지:  0/15 (0%)
영상:    0/2  (0%)
오디오:  0/10 (0%)
폰트:    0/1  (0%)
---
총계:    0/28 (0%)
```

### 용량 현황
```
목표 용량: 6.7MB
현재 용량: 0MB
---
진행률: 0%
```

---

## 📖 상세 가이드

전체 에셋 제작 가이드는 [ASSETS_GUIDE_v2.md](../ASSETS_GUIDE_v2.md)를 참고하세요.

**포함 내용:**
- 각 에셋별 상세 사양
- **Midjourney 프롬프트** (햄스터 기반 재작성)
- 영상 제작 스토리보드 (5초)
- 오디오 제작 가이드
- 최적화 방법 및 명령어

---

## 🎯 v1.0 대비 변경사항

| 항목 | v1.0 | v2.0 | 감소율 |
|------|------|------|--------|
| **배경 이미지** | 8개 | 3개 | -62% |
| **캐릭터** | 12개 | 4개 | -67% |
| **엔딩 일러스트** | 4개 | 2개 | -50% |
| **영상** | 5개 (63초) | 2개 (10초) | -80% |
| **UI 아이콘** | 15개 | 6개 | -60% |
| **아이템** | 8개 | 0개 | -100% |
| **BGM** | 5곡 | 2곡 | -60% |
| **SFX** | 15개 | 8개 | -47% |
| **폰트** | 2개 | 1개 | -50% |
| **총 파일 수** | **74개** | **28개** | **-62%** |
| **총 용량** | **50MB** | **6.7MB** | **-87%** |

---

## 💰 제작 비용 & 일정

### 예산
```
Midjourney: $30
영상 외주: $100
BGM 라이브러리: $15
---
총계: $145 (v1.0 대비 85% 절감)
```

### 일정
```
Week 1: 이미지 15개
Week 2: 영상 2개 + 오디오 10개
---
총 2주 (v1.0 대비 50% 단축)
```

---

## 🔧 빠른 시작 가이드

### 1. Midjourney로 이미지 생성
```bash
# ASSETS_GUIDE_v2.md의 프롬프트 복사
# Midjourney에서 생성 (--ar 9:16 또는 1:1)
# PNG로 다운로드
```

### 2. WebP 변환
```bash
cwebp -q 85 input.png -o output.webp
```

### 3. 파일 배치
```bash
# 이 폴더 구조에 맞게 배치
mv countryside.webp images/backgrounds/
mv countryside_neutral.webp images/characters/
# ...
```

### 4. 용량 확인
```bash
du -sh images/ videos/ audio/ fonts/
```

---

## 📝 제작 노트

### CSS 필터 활용 (배경 재사용)
```css
/* Chapter 4 (어두운 분위기) */
.chapter4-bg {
  background-image: url('seoul_luxury.webp');
  filter: brightness(0.6) contrast(1.1);
}

/* Ending A (세피아 느낌) */
.ending-a-bg {
  background-image: url('countryside.webp');
  filter: sepia(0.3) brightness(1.1);
}

/* Ending B (밝은 도시) */
.ending-b-bg {
  background-image: url('seoul_city.webp');
  filter: brightness(1.2) saturate(1.1);
}
```

### 캐릭터 재사용 전략
```javascript
// 4개 캐릭터로 모든 표정 커버
const characterMap = {
  happy: 'countryside_neutral.webp',
  curious: 'countryside_neutral.webp',
  excited: 'countryside_neutral.webp',
  worried: 'countryside_worried.webp',
  scared: 'countryside_worried.webp',
  sad: 'countryside_worried.webp',
  // ...
};
```

---

**최종 업데이트:** 2025-10-21
**버전:** 2.0 (간소화)
**이전 버전:** [README.md](./README.md) (v1.0, 74개 파일)
