# Assets Production Guide
## 찌익(Choice): 행복을 찾아서 - 에셋 제작 가이드

**버전:** 1.0
**작성일:** 2025-10-21
**대상 독자:** 그래픽 디자이너, 일러스트레이터, 영상 제작자, 사운드 디자이너

---

## 📋 목차
1. [에셋 개요](#1-에셋-개요)
2. [이미지 에셋](#2-이미지-에셋)
3. [영상 에셋 (신규)](#3-영상-에셋)
4. [오디오 에셋](#4-오디오-에셋)
5. [폰트 에셋](#5-폰트-에셋)
6. [Midjourney 프롬프트](#6-midjourney-프롬프트)
7. [제작 체크리스트](#7-제작-체크리스트)

---

## 1. 에셋 개요

### 1.1 아트 스타일 정의
- **전체 톤:** 따뜻한 수채화풍, 감성적이고 서정적
- **색상 팔레트:**
  - **시골:** 파스텔톤 (연두 #B8E994, 하늘 #A8D8EA, 베이지 #FAE5D3)
  - **서울:** 네온 + 회색 대비 (네온핑크 #FF006E, 사이버블루 #00F5FF, 콘크리트 #6C757D)
- **캐릭터 디자인:** 의인화 쥐, 귀엽지만 감정 표현 명확
- **배경 스타일:** 디테일보다 분위기 중심, 피사계 심도 효과

### 1.2 기술 사양 요약
| 에셋 타입 | 포맷 | 해상도 | 용량 목표 |
|-----------|------|--------|-----------|
| 배경 이미지 | WebP | 1080x1920px | 150KB 이하 |
| 캐릭터 일러스트 | WebP (투명) | 800x800px | 80KB 이하 |
| UI 아이콘 | SVG | Responsive | 5KB 이하 |
| 엔딩 일러스트 | WebP | 1080x1920px | 200KB 이하 |
| 아이템 아이콘 | WebP (투명) | 256x256px | 20KB 이하 |
| **영상 (신규)** | MP4 (H.264) | 1080x1920px | 2MB 이하 |
| BGM | MP3 | 192kbps | 2MB 이하 |
| 효과음 | MP3 | 128kbps | 50KB 이하 |

---

## 2. 이미지 에셋

### 2.1 배경 이미지 (Backgrounds)

#### 📁 경로: `assets/images/backgrounds/`

#### 필요 파일 (총 8장)

| 파일명 | 장면 | 챕터 | 설명 |
|--------|------|------|------|
| `countryside_field.webp` | 시골 들판 (낮) | 1 | 황금빛 곡식, 푸른 하늘, 평화로운 분위기 |
| `countryside_sunset.webp` | 시골 석양 | 1 | 따뜻한 오렌지빛, 실루엣, 감성적 |
| `seoul_station.webp` | 서울역 | 2 | 붐비는 사람들, 네온사인, 압도적 |
| `seoul_street_night.webp` | 서울 밤거리 | 2 | 화려한 네온, 차량 불빛, 도시적 |
| `kitchen_day.webp` | 주방 (낮) | 2-3 | 깨끗한 대리석, 고급 식재료 |
| `kitchen_night.webp` | 주방 (밤) | 3 | 어둡고 긴장감 있는 조명 |
| `rainy_alley.webp` | 비 오는 뒷골목 | 4 | 쓰레기통, 빗소리, 우울한 분위기 |
| `pipe_inside.webp` | 파이프 내부 | 3 | 좁고 어두운 공간, 금속 질감 |

#### 기술 사양
```yaml
dimensions: 1080x1920px (세로 화면)
format: WebP
quality: 85%
color_profile: sRGB
target_size: 150KB 이하
optimization: TinyPNG or Squoosh
```

---

### 2.2 캐릭터 일러스트 (Characters)

#### 📁 경로: `assets/images/characters/`

#### 필요 파일 (총 12장)

**시골이 (Countryside Mouse):**
| 파일명 | 표정/상태 | 사용 장면 |
|--------|-----------|-----------|
| `countryside_happy.webp` | 행복한 미소 | Chapter 1 시작 |
| `countryside_curious.webp` | 호기심 가득 | 편지 읽기 |
| `countryside_nervous.webp` | 불안한 | 서울 도착 |
| `countryside_excited.webp` | 설렘 | 고급 음식 발견 |
| `countryside_scared.webp` | 공포 | 고양이 추격 |
| `countryside_relieved.webp` | 안도 | 탈출 성공 |
| `countryside_contemplating.webp` | 성찰 중 | Chapter 4 고민 |
| `countryside_peaceful.webp` | 평화로운 | Ending A |

**서울이 (Seoul Mouse):**
| 파일명 | 표정/상태 | 사용 장면 |
|--------|-----------|-----------|
| `seoul_confident.webp` | 자신감 넘침 | 서울 소개 |
| `seoul_proud.webp` | 자랑스러운 | 치즈 보상 |
| `seoul_annoyed.webp` | 짜증 | 시골이 불평 |
| `seoul_understanding.webp` | 이해하는 | Ending C |

#### 기술 사양
```yaml
dimensions: 800x800px
format: WebP with alpha channel
quality: 90%
background: transparent
target_size: 80KB 이하
positioning: center-bottom (하단 정렬용)
```

---

### 2.3 엔딩 일러스트 (Endings)

#### 📁 경로: `assets/images/endings/`

#### 필요 파일 (총 4장)

| 파일명 | 엔딩 | 설명 |
|--------|------|------|
| `ending_a.webp` | 소박한 삶의 행복 | 시골이가 들판에서 곡식을 먹으며 평화롭게 미소 짓는 장면 |
| `ending_b.webp` | 도시 속 나만의 행복 | 조용한 도서관 구석, 시골이가 책장 뒤에서 빵 부스러기를 먹는 장면 |
| `ending_c.webp` | 함께 찾는 새로운 터전 | 근교 공원, 시골이와 서울이가 나란히 앉아 석양을 보는 장면 |
| `ending_hidden.webp` | 노이로제 | 어두운 구석, 시골이가 떨며 웅크리고 있는 장면 (강렬한 대비) |

#### 기술 사양
```yaml
dimensions: 1080x1920px
format: WebP
quality: 88%
target_size: 200KB 이하
composition: 세로형 전체 화면 일러스트
mood: 각 엔딩 감정에 최적화
```

---

### 2.4 수집 아이템 아이콘 (Items)

#### 📁 경로: `assets/images/items/`

#### 필요 파일 (총 8개)

| 파일명 | 아이템명 | 설명 |
|--------|----------|------|
| `letter.webp` | 서울이의 편지 | 봉투, 우표, 손글씨 느낌 |
| `cheese.webp` | 고급 치즈 조각 | 황금빛, 구멍 뚫린 치즈 |
| `photo.webp` | 사진 | 폴라로이드 스타일, 네온사인 배경 |
| `grain.webp` | 곡식 알 | 익은 밀 또는 벼 알갱이 |
| `cake.webp` | 케이크 조각 | 화려한 데코레이션 |
| `pipe.webp` | 파이프 | 금속 파이프, 약간 녹슨 |
| `cap.webp` | 반짝이는 병뚜껑 | 메탈릭 반짝임 |
| `leaf.webp` | 나뭇잎 | 마른 낙엽, 가을 느낌 |

#### 기술 사양
```yaml
dimensions: 256x256px
format: WebP with alpha
quality: 90%
background: transparent
target_size: 20KB 이하
style: 아이소메트릭 또는 플랫 아이콘
```

---

### 2.5 UI 아이콘 (UI)

#### 📁 경로: `assets/images/ui/`

#### 필요 파일 (총 15개)

| 파일명 | 용도 | 아이콘 |
|--------|------|--------|
| `icon_menu.svg` | 메뉴 버튼 | ☰ |
| `icon_settings.svg` | 설정 버튼 | ⚙️ |
| `icon_gallery.svg` | 갤러리 버튼 | 🖼️ |
| `icon_save.svg` | 저장 | 💾 |
| `icon_load.svg` | 불러오기 | 📂 |
| `icon_volume_on.svg` | 볼륨 켜짐 | 🔊 |
| `icon_volume_off.svg` | 볼륨 꺼짐 | 🔇 |
| `icon_play.svg` | 재생 | ▶️ |
| `icon_pause.svg` | 일시정지 | ⏸️ |
| `icon_lock.svg` | 잠금 (미달성) | 🔒 |
| `icon_unlock.svg` | 잠금 해제 | 🔓 |
| `icon_heart.svg` | HP 아이콘 | ❤️ |
| `icon_stress.svg` | SP 아이콘 | 😰 |
| `icon_back.svg` | 뒤로 가기 | ← |
| `icon_close.svg` | 닫기 | ✕ |

#### 기술 사양
```yaml
format: SVG (벡터)
viewBox: 0 0 24 24
stroke_width: 2px
color: currentColor (CSS로 제어 가능)
target_size: 5KB 이하
optimization: SVGO
```

---

## 3. 영상 에셋 (신규)

### 3.1 영상 컷신 개요
**목적:** 주요 챕터 전환 시 몰입도 향상 및 시네마틱 경험 제공

#### 📁 경로: `assets/videos/`

#### 필요 영상 (총 5개)

| 파일명 | 길이 | 타이밍 | 내용 |
|--------|------|--------|------|
| `opening.mp4` | 15초 | 게임 시작 | 타이틀 로고 → 시골 풍경 파노라마 → 시골이 등장 |
| `chapter2_transition.mp4` | 10초 | Chapter 1→2 | 기차 여행 → 서울 도착 몽타주 |
| `chapter3_chase.mp4` | 8초 | 고양이 추격 직전 | 긴장감 있는 주방 슬로우모션 → 나비 눈빛 클로즈업 |
| `chapter4_rain.mp4` | 10초 | Chapter 3→4 | 빗소리 ASMR → 뒷골목 → 시골이 젖은 모습 |
| `ending_credits.mp4` | 20초 | 엔딩 후 | 엔딩 장면 슬라이드쇼 → 제작진 크레딧 롤 |

---

### 3.2 영상별 상세 스펙

#### 3.2.1 오프닝 영상 (`opening.mp4`)
**컨셉:** 동화책이 열리는 느낌, 따뜻한 시작

**스토리보드:**
```
[0-3초]   검은 화면 → "찌익(Choice)" 타이틀 페이드인 (손글씨 폰트)
[3-8초]   시골 들판 파노라마 (좌→우 패닝)
          - 황금빛 곡식이 바람에 흔들림
          - 파스텔 하늘, 구름 흐름
[8-12초]  시골이 등장 애니메이션
          - 곡식 사이에서 고개 내밈
          - 카메라 줌인 (호기심 가득한 표정)
[12-15초] 서브타이틀 "행복을 찾아서" 페이드인
          - 배경 블러 처리
          - "터치하여 시작" 버튼 등장
```

**기술 사양:**
```yaml
resolution: 1080x1920px (세로)
framerate: 30fps
codec: H.264
bitrate: 2Mbps
duration: 15초
file_size: 5MB 이하
audio: 잔잔한 BGM (countryside_theme 도입부)
```

**Midjourney 프롬프트 (키프레임용):**
```
Frame 1: "Storybook opening scene, watercolor style, warm pastel colors, golden wheat field under soft blue sky, gentle wind motion, countryside atmosphere, cozy and peaceful, illustrated children's book aesthetic --ar 9:16 --v 6.0 --style raw"

Frame 2: "Cute anthropomorphic mouse character peeking through wheat stalks, curious big eyes, soft fur texture, watercolor illustration, warm lighting, innocent and friendly expression, Studio Ghibli inspired --ar 9:16 --v 6.0"
```

---

#### 3.2.2 Chapter 2 전환 영상 (`chapter2_transition.mp4`)
**컨셉:** 여행 몽타주, 시골→도시 대비

**스토리보드:**
```
[0-3초]   기차 창문 (시골 풍경 지나감)
          - 빠른 속도감
[3-6초]   터널 진입 (검은 화면)
          - 덜컹거리는 소리
[6-8초]   터널 탈출 → 서울 스카이라인
          - 네온 불빛, 빌딩 숲
[8-10초]  서울역 내부 (빠른 페이드)
          - 사람들 발걸음 (흐릿한 모션블러)
```

**기술 사양:**
```yaml
resolution: 1080x1920px
framerate: 30fps
duration: 10초
file_size: 3MB 이하
audio: 기차 소리 + 도시 소음 전환
effects: 속도감 있는 컷 전환, 모션블러
```

**Midjourney 프롬프트:**
```
"View from moving train window, countryside blurring into city skyline, motion blur effect, cinematic transition, warm rural colors transforming into neon urban lights, dramatic contrast, film photography style --ar 9:16 --v 6.0"
```

---

#### 3.2.3 Chapter 3 추격 영상 (`chapter3_chase.mp4`)
**컨셉:** 긴장감, 서스펜스

**스토리보드:**
```
[0-3초]   주방 슬로우모션 (그릇 떨어지는 순간)
          - 시간이 천천히 흐르는 느낌
[3-5초]   시골이 뒷모습 (경직된 자세)
          - 심장 박동 사운드
[5-8초]   고양이 '나비' 눈빛 클로즈업
          - 노란 눈동자 반짝임
          - 낮은 으르렁 소리
```

**기술 사양:**
```yaml
resolution: 1080x1920px
framerate: 60fps (슬로우모션용)
duration: 8초
file_size: 2.5MB 이하
audio: 심장 박동 + 긴장감 있는 현악기
effects: 슬로우모션 (0.3x), 색상 desaturation
```

**Midjourney 프롬프트:**
```
"Cinematic close-up of cat's glowing yellow eyes in dark kitchen, dramatic lighting, suspenseful atmosphere, shallow depth of field, film noir style, high contrast, threatening presence --ar 9:16 --v 6.0"
```

---

#### 3.2.4 Chapter 4 빗소리 영상 (`chapter4_rain.mp4`)
**컨셉:** 성찰, 우울, ASMR

**스토리보드:**
```
[0-4초]   빗방울 떨어지는 클로즈업
          - 물웅덩이 파장
          - ASMR 빗소리
[4-7초]   뒷골목 전경 (위에서 아래로 틸트)
          - 쓰레기통, 젖은 골목
[7-10초]  시골이 젖은 모습 (측면 샷)
          - 고개 숙인 자세
          - 배경 흐릿하게
```

**기술 사양:**
```yaml
resolution: 1080x1920px
framerate: 30fps
duration: 10초
file_size: 2MB 이하
audio: ASMR 빗소리 (스테레오)
effects: 색상 desaturation, 비네팅
```

**Midjourney 프롬프트:**
```
"Rainy alley scene, water droplets falling in puddles, melancholic atmosphere, dark and moody lighting, wet concrete texture, cinematic composition, emotional storytelling, desaturated colors --ar 9:16 --v 6.0"
```

---

#### 3.2.5 엔딩 크레딧 영상 (`ending_credits.mp4`)
**컨셉:** 따뜻한 마무리, 감사 인사

**스토리보드:**
```
[0-5초]   달성한 엔딩 일러스트 (슬라이드쇼)
          - 부드러운 켄번즈 효과
[5-12초]  제작진 크레딧 스크롤
          - 기획, 개발, 아트, 사운드
[12-18초] 주요 장면 하이라이트 몽타주
          - 빠른 컷 전환
[18-20초] "플레이해주셔서 감사합니다" + SNS 링크
```

**기술 사양:**
```yaml
resolution: 1080x1920px
framerate: 30fps
duration: 20초
file_size: 3MB 이하
audio: 엔딩 테마 BGM (감성적)
effects: 켄번즈 효과, 페이드 전환
```

---

### 3.3 영상 제작 가이드

#### 제작 방법 옵션
1. **After Effects 애니메이션**
   - 일러스트 레이어 애니메이션
   - 모션그래픽 효과 추가
   - 권장 툴: Adobe After Effects CC

2. **3D 애니메이션 (선택)**
   - Blender로 간단한 3D 씬 제작
   - NPR (Non-Photorealistic Rendering)로 수채화 느낌

3. **AI 비디오 생성 (실험적)**
   - Runway Gen-2 또는 Pika Labs
   - Midjourney 이미지를 기반으로 모션 생성

#### 최적화 가이드
```bash
# FFmpeg를 사용한 최적화 예시
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
  -c:a aac -b:a 128k -movflags +faststart output.mp4
```

---

## 4. 오디오 에셋

### 4.1 배경음악 (BGM)

#### 📁 경로: `assets/audio/bgm/`

#### 필요 파일 (총 5곡)

| 파일명 | 무드 | 사용 장면 | 템포 |
|--------|------|-----------|------|
| `countryside_theme.mp3` | 평화로운, 목가적 | Chapter 1, Ending A | 느림 (60-80 BPM) |
| `journey_theme.mp3` | 희망찬, 설렘 | Chapter 2 초반 | 중간 (100-120 BPM) |
| `danger_theme.mp3` | 긴장감, 서스펜스 | Chapter 3 추격 | 빠름 (140-160 BPM) |
| `contemplation_theme.mp3` | 우울, 성찰 | Chapter 4 고민 | 느림 (70-90 BPM) |
| `new_beginning_theme.mp3` | 희망, 감동 | Ending C | 중간 (90-110 BPM) |

#### 기술 사양
```yaml
format: MP3
bitrate: 192kbps
sample_rate: 44.1kHz
channels: Stereo
duration: 2-3분 (루프 가능)
target_size: 2MB 이하
fade: 페이드 인/아웃 2초
```

#### 악기 구성 추천
```yaml
시골 테마:
  - 어쿠스틱 기타
  - 플루트
  - 심벌 (부드러운)

도시 테마:
  - 신디사이저
  - 일렉트릭 베이스
  - 드럼 머신

위험 테마:
  - 스트링 (저음)
  - 피아노 (스타카토)
  - 퍼커션 (빠른 비트)
```

---

### 4.2 효과음 (SFX)

#### 📁 경로: `assets/audio/sfx/`

#### 필요 파일 (총 15개)

| 파일명 | 용도 | 설명 |
|--------|------|------|
| `click.mp3` | 버튼 클릭 | 부드러운 "탁" |
| `choice.mp3` | 선택지 선택 | "띠링" (긍정적) |
| `page_turn.mp3` | 화면 전환 | 종이 넘기는 소리 |
| `collect.mp3` | 아이템 수집 | 반짝이는 "칭~" |
| `warning.mp3` | 위험 경고 | 긴급 알림음 |
| `save.mp3` | 저장 완료 | 확인 사운드 |
| `unlock.mp3` | 엔딩 해금 | 성취 사운드 |
| `hp_up.mp3` | HP 증가 | 밝은 톤 상승 |
| `hp_down.mp3` | HP 감소 | 어두운 톤 하강 |
| `sp_up.mp3` | SP 증가 | 불안한 톤 |
| `sp_down.mp3` | SP 감소 | 안도의 톤 |
| `letter_open.mp3` | 편지 열기 | 봉투 뜯는 소리 |
| `cat_meow.mp3` | 고양이 울음 | 위협적인 "냐옹~" |
| `rain.mp3` | 빗소리 | ASMR 스타일 (루프) |
| `heartbeat.mp3` | 심장 박동 | 긴장 상황용 |

#### 기술 사양
```yaml
format: MP3
bitrate: 128kbps
sample_rate: 44.1kHz
channels: Mono (일부 Stereo)
duration: 0.5~3초
target_size: 50KB 이하
normalization: -3dB peak
```

---

## 5. 폰트 에셋

#### 📁 경로: `assets/fonts/`

#### 필요 파일

| 파일명 | 용도 | 포맷 |
|--------|------|------|
| `Pretendard-Variable.woff2` | 본문 텍스트 | Variable Font |
| `Gmarket Sans Bold.woff2` | 타이틀, 강조 | Web Font |

#### 기술 사양
```yaml
format: WOFF2 (최적 압축)
subset: 한글 2350자 + 영문 + 숫자 + 특수문자
weight_range: 100-900 (Variable)
target_size: 500KB 이하
```

#### 폰트 로딩 최적화
```css
@font-face {
  font-family: 'Pretendard Variable';
  src: url('/assets/fonts/Pretendard-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap; /* FOUT 방지 */
}
```

---

## 6. Midjourney 프롬프트

### 6.1 배경 이미지 프롬프트

#### 시골 들판 (낮)
```
Peaceful countryside wheat field under golden hour sunlight, soft watercolor painting style, pastel colors (mint green, sky blue, cream), warm and cozy atmosphere, gentle breeze, idyllic rural landscape, Studio Ghibli inspired, illustrated children's book aesthetic, no characters, vertical composition --ar 9:16 --v 6.0 --style raw --s 250
```

#### 시골 석양
```
Countryside sunset landscape, warm orange and pink sky, silhouette of wheat field, peaceful and nostalgic mood, watercolor illustration style, soft gradients, emotional storytelling, minimalist composition --ar 9:16 --v 6.0 --s 200
```

#### 서울역
```
Busy Seoul Station interior, crowded with blurred people, neon signs, overwhelming urban atmosphere, cinematic photography style, motion blur, high contrast between warm and cool lights, sense of isolation in crowd --ar 9:16 --v 6.0 --style raw
```

#### 서울 밤거리
```
Seoul city street at night, vibrant neon signs (pink, cyan, purple), reflections on wet pavement, cyberpunk aesthetic mixed with watercolor painting, electric atmosphere, sense of luxury and danger, vertical composition --ar 9:16 --v 6.0 --s 300
```

#### 주방 (낮)
```
Luxurious modern kitchen interior, marble countertops, abundant high-end food ingredients, bright natural lighting from window, clean and elegant, sense of abundance, photorealistic with soft watercolor filter --ar 9:16 --v 6.0
```

#### 주방 (밤)
```
Dark kitchen at night, dramatic shadows, tense atmosphere, selective lighting on surfaces, cinematic suspense mood, cold blue tones, sense of danger lurking, mystery thriller aesthetic --ar 9:16 --v 6.0 --style raw
```

#### 비 오는 뒷골목
```
Rainy back alley scene, garbage bins, wet concrete ground with puddles, melancholic and lonely atmosphere, desaturated colors with blue-grey tones, cinematic mood, emotional storytelling, gentle rain effect --ar 9:16 --v 6.0 --s 150
```

#### 파이프 내부
```
Inside of narrow metal pipe, claustrophobic view, rusty texture, dim lighting with light coming from one end, sense of escape and refuge, industrial aesthetic, tight space --ar 9:16 --v 6.0
```

---

### 6.2 캐릭터 일러스트 프롬프트

#### 시골이 (기본)
```
Cute anthropomorphic countryside mouse character, white and beige fur, big innocent eyes, soft watercolor illustration style, friendly and curious expression, wearing simple natural-colored vest, wholesome and pure vibes, Studio Ghibli character design, transparent background --ar 1:1 --v 6.0 --s 250
```

#### 표정 변형 (프롬프트 끝에 추가)
```
행복: ", joyful smile, sparkling eyes, cheerful"
호기심: ", curious wide eyes, head slightly tilted, innocent wonder"
불안: ", nervous expression, worried eyes, fidgeting"
설렘: ", excited expression, bright eyes, anticipation"
공포: ", scared wide eyes, trembling, panic"
안도: ", relieved sigh, closed eyes, peaceful"
성찰: ", contemplative expression, looking down, thoughtful"
평화: ", serene smile, eyes closed, content"
```

#### 서울이
```
Sophisticated anthropomorphic city mouse character, sleek grey fur, confident posture, wearing stylish modern outfit (tiny jacket), sharp intelligent eyes, urban and trendy aesthetic, watercolor illustration, charismatic personality, transparent background --ar 1:1 --v 6.0 --s 250
```

---

### 6.3 엔딩 일러스트 프롬프트

#### Ending A: 소박한 삶의 행복
```
Heartwarming countryside scene, cute mouse character eating grain in golden wheat field, peaceful sunset lighting, watercolor painting style, warm pastel colors, sense of contentment and simple happiness, full vertical composition with character in foreground and endless field in background --ar 9:16 --v 6.0 --s 300
```

#### Ending B: 도시 속 나만의 행복
```
Cozy corner of quiet library, cute mouse character hiding behind books with bread crumbs, soft warm lighting through window, sense of peaceful solitude in urban environment, watercolor illustration, finding happiness in small things --ar 9:16 --v 6.0 --s 250
```

#### Ending C: 함께 찾는 새로운 터전
```
Two mouse characters sitting together on park bench watching sunset, suburban park setting with both nature and distant city skyline, sense of compromise and understanding, warm emotional atmosphere, friendship and new beginnings, watercolor painting --ar 9:16 --v 6.0 --s 300
```

#### Ending Hidden: 노이로제
```
Dark dramatic scene, mouse character curled up trembling in corner, harsh shadows, stressed and overwhelmed expression, cold desaturated colors with high contrast, sense of mental breakdown, emotional impact, watercolor with dark tones --ar 9:16 --v 6.0 --style raw --s 400
```

---

### 6.4 아이템 아이콘 프롬프트

#### 공통 베이스 프롬프트
```
[아이템 설명], isometric icon style, clean and simple design, watercolor texture, warm colors, transparent background, game asset, high quality render --ar 1:1 --v 6.0 --s 200
```

**아이템별 설명:**
- 편지: "Handwritten letter in envelope with vintage stamp"
- 치즈: "Golden cheese wedge with holes, gourmet quality"
- 사진: "Polaroid photo with neon sign background"
- 곡식: "Ripe wheat grain, golden and natural"
- 케이크: "Fancy decorated cake slice with frosting"
- 파이프: "Metal pipe with rusty texture"
- 병뚜껑: "Shiny metallic bottle cap with sparkles"
- 나뭇잎: "Dried autumn leaf, nostalgic feeling"

---

## 7. 제작 체크리스트

### 7.1 이미지 에셋 (35개)
#### 배경 (8개)
- [ ] countryside_field.webp
- [ ] countryside_sunset.webp
- [ ] seoul_station.webp
- [ ] seoul_street_night.webp
- [ ] kitchen_day.webp
- [ ] kitchen_night.webp
- [ ] rainy_alley.webp
- [ ] pipe_inside.webp

#### 캐릭터 (12개)
- [ ] countryside_happy.webp
- [ ] countryside_curious.webp
- [ ] countryside_nervous.webp
- [ ] countryside_excited.webp
- [ ] countryside_scared.webp
- [ ] countryside_relieved.webp
- [ ] countryside_contemplating.webp
- [ ] countryside_peaceful.webp
- [ ] seoul_confident.webp
- [ ] seoul_proud.webp
- [ ] seoul_annoyed.webp
- [ ] seoul_understanding.webp

#### 엔딩 (4개)
- [ ] ending_a.webp
- [ ] ending_b.webp
- [ ] ending_c.webp
- [ ] ending_hidden.webp

#### 아이템 (8개)
- [ ] letter.webp
- [ ] cheese.webp
- [ ] photo.webp
- [ ] grain.webp
- [ ] cake.webp
- [ ] pipe.webp
- [ ] cap.webp
- [ ] leaf.webp

#### UI 아이콘 (15개)
- [ ] icon_menu.svg
- [ ] icon_settings.svg
- [ ] icon_gallery.svg
- [ ] icon_save.svg
- [ ] icon_load.svg
- [ ] icon_volume_on.svg
- [ ] icon_volume_off.svg
- [ ] icon_play.svg
- [ ] icon_pause.svg
- [ ] icon_lock.svg
- [ ] icon_unlock.svg
- [ ] icon_heart.svg
- [ ] icon_stress.svg
- [ ] icon_back.svg
- [ ] icon_close.svg

---

### 7.2 영상 에셋 (5개)
- [ ] opening.mp4 (15초)
- [ ] chapter2_transition.mp4 (10초)
- [ ] chapter3_chase.mp4 (8초)
- [ ] chapter4_rain.mp4 (10초)
- [ ] ending_credits.mp4 (20초)

---

### 7.3 오디오 에셋 (20개)
#### BGM (5곡)
- [ ] countryside_theme.mp3
- [ ] journey_theme.mp3
- [ ] danger_theme.mp3
- [ ] contemplation_theme.mp3
- [ ] new_beginning_theme.mp3

#### SFX (15개)
- [ ] click.mp3
- [ ] choice.mp3
- [ ] page_turn.mp3
- [ ] collect.mp3
- [ ] warning.mp3
- [ ] save.mp3
- [ ] unlock.mp3
- [ ] hp_up.mp3
- [ ] hp_down.mp3
- [ ] sp_up.mp3
- [ ] sp_down.mp3
- [ ] letter_open.mp3
- [ ] cat_meow.mp3
- [ ] rain.mp3
- [ ] heartbeat.mp3

---

### 7.4 폰트 에셋 (2개)
- [ ] Pretendard-Variable.woff2
- [ ] Gmarket Sans Bold.woff2

---

## 8. 제작 일정 예시

### Week 1-2: 이미지 제작
- Day 1-3: Midjourney로 배경 8장 생성 및 편집
- Day 4-7: 캐릭터 일러스트 12장 제작
- Day 8-10: 엔딩 일러스트 4장 제작
- Day 11-12: 아이템 아이콘 8개 제작
- Day 13-14: UI 아이콘 15개 제작 및 최적화

### Week 3: 영상 제작
- Day 1-2: 오프닝 영상 (15초)
- Day 3: Chapter 2 전환 영상 (10초)
- Day 4: Chapter 3 추격 영상 (8초)
- Day 5: Chapter 4 빗소리 영상 (10초)
- Day 6-7: 엔딩 크레딧 영상 (20초)

### Week 4: 오디오 제작
- Day 1-3: BGM 5곡 작곡/구매 및 편집
- Day 4-5: SFX 15개 제작/수집
- Day 6-7: 오디오 최적화 및 테스트

---

## 9. 외주/구매 옵션

### 9.1 이미지
- **Midjourney**: 월 $30 (Basic Plan) - 무제한 생성
- **Fiverr 일러스트레이터**: $50-200/장 (커스텀 작업)
- **Stock 이미지**: Freepik, Adobe Stock (라이선스 주의)

### 9.2 영상
- **After Effects 템플릿**: Envato Elements ($16.50/월)
- **AI 비디오**: Runway Gen-2 ($12/월, 125 credits)
- **외주 영상 작가**: $200-500/영상

### 9.3 오디오
- **BGM 라이브러리**: Epidemic Sound ($15/월), Artlist ($16.60/월)
- **SFX**: Freesound (무료, CC 라이선스), Zapsplat (무료)
- **작곡가 외주**: $100-300/곡

---

## 10. 최종 제출 포맷

### 제출 파일 구조
```
assets_delivery/
├── images/
│   ├── backgrounds/ (8 files)
│   ├── characters/ (12 files)
│   ├── endings/ (4 files)
│   ├── items/ (8 files)
│   └── ui/ (15 files)
├── videos/ (5 files)
├── audio/
│   ├── bgm/ (5 files)
│   └── sfx/ (15 files)
├── fonts/ (2 files)
└── README.txt (에셋 목록 및 라이선스 정보)
```

### README.txt 예시
```
=== 찌익(Choice) 게임 에셋 패키지 ===
제작일: 2025-10-21
총 파일 수: 69개
총 용량: ~50MB

[이미지] 47개 (WebP, SVG)
[영상] 5개 (MP4)
[오디오] 20개 (MP3)
[폰트] 2개 (WOFF2)

라이선스:
- 이미지: 전용 라이선스 (게임 내 사용 허가)
- 음악: Epidemic Sound Standard License
- 폰트: SIL Open Font License

문의: [이메일 주소]
```

---

**문서 작성:** 아트 디렉터
**최종 검토:** 2025-10-21
**관련 문서:** [PRD.md](./PRD.md), [TDD.md](./TDD.md)
