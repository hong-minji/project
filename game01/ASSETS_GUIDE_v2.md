# Assets Production Guide v2.0
## 찌익(Choice): 행복을 찾아서 - 미니멀 에셋 가이드

**버전:** 2.0 (간소화)
**작성일:** 2025-10-21
**총 파일 수:** 28개 (v1.0 74개 대비 62% 감소)

---

## 📋 에셋 개요

### 간소화 목표 달성
- ✅ **에셋 62% 감소**: 74개 → 28개
- ✅ **용량 87% 감소**: 50MB → 6.7MB
- ✅ **제작 비용 85% 절감**: $1,000+ → $145
- ✅ **제작 기간 50% 단축**: 4주 → 2주

### 전체 에셋 목록
```
이미지: 15개 (920KB)
  ├─ 배경: 3개
  ├─ 캐릭터: 4개
  ├─ 엔딩: 2개
  └─ UI 아이콘: 6개

영상: 2개 (2MB)
  ├─ 오프닝: 1개 (5초)
  └─ 엔딩: 1개 (5초)

오디오: 10개 (3.4MB)
  ├─ BGM: 2개
  └─ SFX: 8개

폰트: 1개 (400KB)

총계: 28개 파일, ~6.7MB
```

---

## 1. 이미지 에셋 (15개)

### 1.1 배경 이미지 (3개)

#### 📁 경로: `assets/images/backgrounds/`

| 파일명 | 규격 | 용량 목표 | 사용처 | CSS 필터 활용 |
|--------|------|----------|--------|---------------|
| `countryside.webp` | 1080x1920 | 120KB | Chapter 1, Ending A | sepia(0.3) for ending |
| `seoul_city.webp` | 1080x1920 | 120KB | Chapter 2, Ending B | brightness(1.2) for ending |
| `seoul_luxury.webp` | 1080x1920 | 120KB | Chapter 3, 4 | brightness(0.6) for Chapter 4 |

**기술 사양:**
```yaml
format: WebP
quality: 82%
dimensions: 1080x1920px
target_size: 120KB
optimization: TinyPNG + manual crop
```

---

### 1.2 Midjourney 프롬프트 (배경)

#### 📁 `assets/images/backgrounds/countryside.webp`
```
A serene countryside landscape with a golden wheat field swaying in gentle breeze, a chubby white golden hamster sitting peacefully among wheat stalks, soft watercolor painting style, warm pastel colors (mint green #B8E994, sky blue #A8D8EA, cream #FAE5D3), afternoon golden hour lighting, cozy and nostalgic atmosphere, Studio Ghibli inspired aesthetic, illustrated children's book style, vertical composition, no humans, peaceful rural scenery --ar 9:16 --v 6.0 --style raw --s 250
```

**프롬프트 구조 분석:**
1. **주제/대상**: 시골 풍경 + 황금 햄스터
2. **외형 디테일**: 황금빛 밀밭, 뚱뚱한 흰색 햄스터
3. **조명**: 오후 황금빛 시간대, 따뜻한 조명
4. **렌즈 효과**: 부드러운 수채화 느낌
5. **배경**: 평화로운 시골 풍경
6. **스타일/톤**: 지브리 스타일, 일러스트 동화책 느낌

#### 📁 `assets/images/backgrounds/seoul_city.webp`
```
Bustling Seoul city street at night viewed from ground level, neon signs in Korean (pink #FF006E, cyan #00F5FF), blurred crowd of people walking fast, a tiny chubby white hamster character standing overwhelmed in the center looking up, cinematic urban photography style, high contrast lighting, motion blur on background, sense of being small in a big city, cyberpunk meets watercolor aesthetic, vertical composition --ar 9:16 --v 6.0 --style raw --s 300
```

**프롬프트 구조:**
1. **주제/대상**: 서울 밤거리 + 압도당한 햄스터
2. **외형 디테일**: 네온 사인, 빠르게 움직이는 군중, 작은 햄스터
3. **조명**: 네온 불빛, 고대비 시네마틱 조명
4. **렌즈 효과**: 배경 모션 블러, 얕은 심도
5. **배경**: 붐비는 도시 거리
6. **스타일/톤**: 사이버펑크 + 수채화 믹스, 영화 같은 분위기

#### 📁 `assets/images/backgrounds/seoul_luxury.webp`
```
Luxurious modern kitchen interior at night, marble countertops with gourmet cheese and cake, a chubby white hamster reaching for food with tiny paws, dramatic side lighting from refrigerator glow, cinematic atmosphere with soft shadows, sense of abundance and temptation, high-end kitchen aesthetic, watercolor painting style with photorealistic details, vertical composition, moody and slightly tense mood --ar 9:16 --v 6.0 --s 280
```

**프롬프트 구조:**
1. **주제/대상**: 고급 주방 + 음식 앞 햄스터
2. **외형 디테일**: 대리석, 고메 치즈, 케이크, 작은 앞발
3. **조명**: 냉장고 빛, 드라마틱 측면 조명
4. **렌즈 효과**: 부드러운 그림자, 시네마틱
5. **배경**: 고급 주방
6. **스타일/톤**: 수채화 + 사실적 디테일, 약간 긴장감

---

### 1.3 캐릭터 일러스트 (4개)

#### 📁 경로: `assets/images/characters/`

| 파일명 | 표정 | 사용처 | 용량 |
|--------|------|--------|------|
| `countryside_neutral.webp` | 평화/호기심/행복 | Chapter 1, 2, Ending A | 60KB |
| `countryside_worried.webp` | 불안/공포/성찰 | Chapter 3, 4, Ending Hidden | 60KB |
| `seoul_neutral.webp` | 자신감/자랑 | Chapter 2, 3 | 60KB |
| `seoul_serious.webp` | 짜증/진지 | Chapter 4, Ending C | 60KB |

**기술 사양:**
```yaml
format: WebP with alpha
quality: 88%
dimensions: 800x800px
background: transparent
target_size: 60KB
positioning: center-bottom
```

---

### 1.4 Midjourney 프롬프트 (캐릭터)

#### 📁 `assets/images/characters/countryside_neutral.webp`
```
A chubby white golden hamster character, full body standing pose, neatly groomed silky white fur with glossy shine, clearly visible pink blush on both cheeks like makeup, big round innocent eyes with sparkle, small paws clasped together, gentle curious smile, wearing tiny natural beige vest, wholesome and friendly expression, soft watercolor illustration style, Studio Ghibli character design, warm gentle lighting, transparent background, ultra-cute, hyper-detailed fur texture --ar 1:1 --v 6.0 --s 250
```

**프롬프트 구조:**
1. **주제/대상**: 뚱뚱한 흰색 골든 햄스터, 전신, 서 있는 포즈
2. **외형 디테일**: 깔끔하게 다듬어진 윤기 나는 흰 털, 양 볼에 분홍 블러쉬, 크고 순수한 눈망울
3. **조명**: 부드럽고 따뜻한 조명
4. **렌즈 효과**: 털 질감 초고화질
5. **배경**: 투명 배경
6. **스타일/톤**: 지브리 캐릭터 디자인, 수채화, 매우 귀여움

#### 📁 `assets/images/characters/countryside_worried.webp`
```
A chubby white golden hamster character, full body standing pose, neatly groomed white fur, pink blush on cheeks, big worried eyes with tears forming, small paws held nervously to chest, anxious trembling expression, same beige vest, scared and uncertain mood, soft watercolor style, emotional storytelling, gentle lighting with subtle shadows, transparent background, ultra-cute despite worried expression --ar 1:1 --v 6.0 --s 250
```

**차이점**: 표정 변화 (호기심 → 걱정), 눈물, 떨림, 불안

#### 📁 `assets/images/characters/seoul_neutral.webp`
```
A sleek grey hamster character, full body standing pose, smooth shiny grey fur, confident posture with chest out, wearing stylish tiny modern jacket (dark grey), sharp intelligent eyes, small paws on hips, charismatic smirk, urban and trendy aesthetic, pink blush subtle, watercolor illustration with clean lines, sophisticated personality, transparent background, slightly cooler lighting --ar 1:1 --v 6.0 --s 250
```

**차이점**: 회색 털, 날씬한 체형, 재킷, 자신감 있는 포즈

#### 📁 `assets/images/characters/seoul_serious.webp`
```
A sleek grey hamster character, full body pose, grey fur, same jacket, serious furrowed brow expression, small paws crossed, disappointed or annoyed look, same sophisticated style, slightly darker mood lighting, watercolor illustration, transparent background --ar 1:1 --v 6.0 --s 250
```

**차이점**: 찌푸린 표정, 팔짱, 짜증/실망 분위기

---

### 1.5 엔딩 일러스트 (2개)

#### 📁 경로: `assets/images/endings/`

| 파일명 | 용도 | 용량 |
|--------|------|------|
| `ending_good.webp` | Ending A, B, C | 150KB |
| `ending_bad.webp` | Ending Hidden | 150KB |

#### 📁 `assets/images/endings/ending_good.webp`
```
Heartwarming happy ending scene, a chubby white hamster sitting contentedly in countryside wheat field at sunset, golden warm lighting, sense of peace and fulfillment, or alternatively sitting in cozy library corner, or park bench with grey hamster friend, watercolor painting style, emotional storytelling, warm colors (orange, yellow, soft pink), full vertical composition, sense of finding true happiness --ar 9:16 --v 6.0 --s 300
```

**활용:**
- Ending A: 원본 그대로 (시골)
- Ending B: 밝기 조정 + 도시 느낌
- Ending C: 두 캐릭터 함께

#### 📁 `assets/images/endings/ending_bad.webp`
```
Dramatic dark ending scene, a chubby white hamster curled up trembling in dark corner, stressed and overwhelmed expression, cold desaturated colors (blue-grey, dark purple), harsh shadows, sense of breakdown and despair, emotional impact, watercolor with dark tones, vertical composition, tragic atmosphere --ar 9:16 --v 6.0 --style raw --s 400
```

---

### 1.6 UI 아이콘 (6개)

#### 📁 경로: `assets/images/ui/`

| 파일명 | 아이콘 | SVG 코드 (간소화) |
|--------|--------|-------------------|
| `icon_menu.svg` | ☰ | `<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor"/></svg>` |
| `icon_settings.svg` | ⚙️ | `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M23 12h-6m-6 0H1"/></svg>` |
| `icon_close.svg` | ✕ | `<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor"/></svg>` |
| `icon_heart.svg` | ❤️ | `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="currentColor"/></svg>` |
| `icon_stress.svg` | 😰 | `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>` |
| `icon_lock.svg` | 🔒 | `<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>` |

**기술 사양:**
```yaml
format: SVG
viewBox: 0 0 24 24
stroke_width: 2px
color: currentColor (CSS 제어)
target_size: 2-5KB
optimization: SVGO 압축
```

---

## 2. 영상 에셋 (2개)

### 2.1 오프닝 영상 (`opening.mp4`)

#### 📁 경로: `assets/videos/opening.mp4`

**길이:** 5초
**컨셉:** 타이틀 → 시골이 등장

**스토리보드:**
```
[0-2초]   검은 화면 → "찌익(Choice)" 타이틀 페이드인
          - 손글씨 폰트
          - 부드러운 애니메이션

[2-4초]   시골 들판 배경으로 전환
          - 빠른 크로스 페이드
          - 황금빛 곡식 흔들림 (2프레임 루프)

[4-5초]   시골이 캐릭터 등장 (아래에서 위로)
          - 바운스 애니메이션
          - "터치하여 시작" 텍스트 페이드인
```

**기술 사양:**
```yaml
resolution: 1080x1920px
framerate: 30fps
codec: H.264
bitrate: 1.5Mbps
duration: 5초
file_size: 1MB 이하
audio: 짧은 BGM 페이드인 (main_theme 도입부)
```

**Midjourney 키프레임 (3장) for 📁 `assets/videos/opening.mp4`:**

Frame 1 (0초):
```
Minimalist title screen, hand-written style text "찌익(Choice)" in warm brown color, simple watercolor texture background, peaceful atmosphere, clean design --ar 9:16 --v 6.0 --s 150
```

Frame 2 (2초):
```
Golden wheat field swaying gently, watercolor painting style, warm afternoon lighting, simple and peaceful, illustrated children's book aesthetic --ar 9:16 --v 6.0 --s 200
```

Frame 3 (4초):
```
Cute white hamster character popping up from bottom, cheerful bounce pose, "Touch to Start" text below, watercolor style, friendly and inviting --ar 9:16 --v 6.0 --s 250
```

---

### 2.2 엔딩 크레딧 영상 (`ending.mp4`)

#### 📁 경로: `assets/videos/ending.mp4`

**길이:** 5초
**컨셉:** 간단한 크레딧 롤

**스토리보드:**
```
[0-2초]   달성한 엔딩 일러스트 디졸브
          - 부드러운 페이드
          - 엔딩 제목 표시

[2-4초]   제작진 크레딧 스크롤
          - 기획, 개발, 아트, 사운드
          - 간결한 텍스트

[4-5초]   "플레이해주셔서 감사합니다"
          - 페이드인
          - SNS 링크 (선택)
```

**기술 사양:**
```yaml
resolution: 1080x1920px
framerate: 30fps
codec: H.264
bitrate: 1.5Mbps
duration: 5초
file_size: 1MB 이하
audio: 엔딩 테마 BGM (fade out)
```

---

## 3. 오디오 에셋 (10개)

### 3.1 BGM (2곡)

#### 📁 경로: `assets/audio/bgm/`

| 파일명 | 무드 | 사용처 | 템포 | 용량 |
|--------|------|--------|------|------|
| `main_theme.mp3` | 평화로운, 따뜻한 | Chapter 1, 2, 4, Ending A, B, C | 느림 (70-90 BPM) | 1.5MB |
| `tension_theme.mp3` | 긴장감, 서스펜스 | Chapter 3, Ending Hidden | 빠름 (140-160 BPM) | 1.5MB |

**기술 사양:**
```yaml
format: MP3
bitrate: 192kbps
sample_rate: 44.1kHz
channels: Stereo
duration: 2분 (루프 가능)
fade: 페이드 인/아웃 2초
```

**추천 악기 구성:**
```yaml
main_theme:
  - 어쿠스틱 기타
  - 피아노 (부드러운 코드)
  - 심벌 (약하게)
  - 첼로 (따뜻한 베이스)

tension_theme:
  - 스트링 (저음, 트레몰로)
  - 피아노 (스타카토)
  - 심벌 (긴장감)
  - 일렉트릭 베이스 (빠른 비트)
```

---

### 3.2 효과음 (8개)

#### 📁 경로: `assets/audio/sfx/`

| 파일명 | 용도 | 길이 | 용량 |
|--------|------|------|------|
| `click.mp3` | 버튼 클릭 | 0.3초 | 20KB |
| `choice.mp3` | 선택지 선택 | 0.5초 | 30KB |
| `page_turn.mp3` | 화면 전환 | 0.8초 | 25KB |
| `warning.mp3` | SP 위험 경고 | 1.2초 | 40KB |
| `success.mp3` | HP 상승 | 0.7초 | 30KB |
| `fail.mp3` | HP/SP 부정 변화 | 0.8초 | 30KB |
| `ambient_city.mp3` | 도시 환경음 (루프) | 3초 | 80KB |
| `ambient_rain.mp3` | 빗소리 (루프) | 3초 | 80KB |

**기술 사양:**
```yaml
format: MP3
bitrate: 128kbps
sample_rate: 44.1kHz
channels: Mono (일부 Stereo)
normalization: -3dB peak
```

---

## 4. 폰트 에셋 (1개)

#### 📁 경로: `assets/fonts/`

| 파일명 | 용도 | 용량 |
|--------|------|------|
| `Pretendard-Variable.woff2` | 모든 텍스트 | 400KB |

**다운로드:** https://github.com/orioncactus/pretendard

**기술 사양:**
```yaml
format: WOFF2
subset: 한글 2350자 + 영문 + 숫자
weight_range: 400-700 (Variable)
license: SIL Open Font License
```

---

## 5. 제작 가이드

### 5.1 이미지 최적화 플로우
```bash
# Midjourney 생성 (PNG, ~3MB)
↓
# Photoshop/GIMP 크롭 및 조정
↓
# WebP 변환 (TinyPNG or Squoosh)
↓
# 품질 확인 (85% quality 기준)
↓
# 최종 파일 (< 120KB)
```

### 5.2 영상 제작 옵션
1. **After Effects** (권장)
   - Midjourney 이미지 임포트
   - 간단한 모션 (페이드, 슬라이드)
   - 5초 짧은 영상으로 집중

2. **Canva Pro**
   - 템플릿 활용
   - 드래그 앤 드롭
   - 빠른 제작

3. **CapCut** (모바일)
   - 무료 앱
   - 간단한 편집
   - MP4 export

### 5.3 최적화 명령어
```bash
# WebP 변환
cwebp -q 85 input.png -o output.webp

# 영상 최적화
ffmpeg -i input.mp4 -c:v libx264 -crf 23 \
  -preset slow -vf scale=1080:1920 \
  -c:a aac -b:a 128k -movflags +faststart output.mp4

# 오디오 최적화
ffmpeg -i input.wav -b:a 192k -ar 44100 output.mp3
```

---

## 6. 제작 체크리스트

### 이미지 (15개)
#### 배경 (3개)
- [ ] countryside.webp
- [ ] seoul_city.webp
- [ ] seoul_luxury.webp

#### 캐릭터 (4개)
- [ ] countryside_neutral.webp
- [ ] countryside_worried.webp
- [ ] seoul_neutral.webp
- [ ] seoul_serious.webp

#### 엔딩 (2개)
- [ ] ending_good.webp
- [ ] ending_bad.webp

#### UI (6개)
- [ ] icon_menu.svg
- [ ] icon_settings.svg
- [ ] icon_close.svg
- [ ] icon_heart.svg
- [ ] icon_stress.svg
- [ ] icon_lock.svg

### 영상 (2개)
- [ ] opening.mp4 (5초)
- [ ] ending.mp4 (5초)

### 오디오 (10개)
#### BGM (2개)
- [ ] main_theme.mp3
- [ ] tension_theme.mp3

#### SFX (8개)
- [ ] click.mp3
- [ ] choice.mp3
- [ ] page_turn.mp3
- [ ] warning.mp3
- [ ] success.mp3
- [ ] fail.mp3
- [ ] ambient_city.mp3
- [ ] ambient_rain.mp3

### 폰트 (1개)
- [ ] Pretendard-Variable.woff2

**총 진행률: 0/28 (0%)**

---

## 7. 예산 및 일정

### 제작 비용
```yaml
Midjourney Pro: $30 (1개월, 9개 이미지)
영상 외주: $100 (2개 × $50, 5초씩)
BGM 라이브러리: $15 (Epidemic Sound 1개월)
SFX: $0 (Freesound.org 무료)
폰트: $0 (Pretendard OFL)
---
총계: $145
```

### 제작 일정 (2주)
```
Week 1:
  Day 1-3: 배경 3장 (Midjourney)
  Day 4-5: 캐릭터 4장 (Midjourney)
  Day 6: 엔딩 2장 (Midjourney)
  Day 7: UI 아이콘 6개 (SVG)

Week 2:
  Day 8-9: 영상 2개 (After Effects)
  Day 10-11: BGM 2곡 (라이브러리)
  Day 12: SFX 8개 (Freesound)
  Day 13: 최적화 및 테스트
  Day 14: 최종 제출
```

---

## 8. 품질 기준

### 이미지
- 해상도: 명확하고 선명
- 색감: 일관된 팔레트
- 용량: 목표치 ±10% 이내
- 스타일: 수채화풍 통일

### 영상
- 프레임 드롭 없음
- 로딩 2초 이내
- 스킵 가능
- 오디오 싱크 정확

### 오디오
- 노이즈 없음
- 볼륨 일정 (-3dB 정규화)
- 루프 자연스러움 (ambient)
- 페이드 부드러움

---

**문서 버전:** 2.0 (간소화)
**이전 버전:** [ASSETS_GUIDE.md](./ASSETS_GUIDE.md) (v1.0, 74개 파일)
**관련 문서:** [PRD_v2.md](./PRD_v2.md), [GAME_REDESIGN.md](./GAME_REDESIGN.md)
