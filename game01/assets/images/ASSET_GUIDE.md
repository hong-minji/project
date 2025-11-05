# Image Assets Guide

## Required Images (15 total)

### Backgrounds (5 images)

1. **countryside.webp** (1080x1920px, ~120KB)
   - 평화로운 한국 시골 풍경
   - 논밭, 전통 마을, 따뜻한 햇살
   - Midjourney prompt: "peaceful korean countryside landscape, rice fields, traditional village, warm sunlight, anime style illustration, vertical composition --ar 9:16"

2. **seoul_city.webp** (1080x1920px, ~120KB)
   - 현대적인 서울 도심 야경
   - 네온사인, 빌딩, 번화한 거리
   - Midjourney prompt: "modern seoul city skyline at night, neon lights, busy streets, urban landscape, anime style, vertical composition --ar 9:16"

3. **seoul_luxury.webp** (1080x1920px, ~120KB)
   - 고급 호텔 연회장 또는 레스토랑
   - 화려하고 세련된 분위기
   - Midjourney prompt: "luxury hotel banquet hall, elegant restaurant interior, chandelier lighting, anime style illustration, vertical composition --ar 9:16"

4. **ending_good.webp** (1080x1920px, ~150KB)
   - 시골과 도시의 조화로운 풍경
   - 따뜻하고 희망적인 분위기
   - Midjourney prompt: "harmonious blend of countryside and city, peaceful sunset, hopeful atmosphere, anime style illustration, vertical composition --ar 9:16"

5. **ending_bad.webp** (1080x1920px, ~150KB)
   - 어둡고 쓸쓸한 풍경
   - 비 내리는 거리 또는 황량한 배경
   - Midjourney prompt: "dark lonely street in rain, melancholic atmosphere, empty urban landscape, anime style illustration, vertical composition --ar 9:16"

### Characters (4 images)

6. **countryside_neutral.webp** (800x800px, ~60KB)
   - 시골쥐 캐릭터 - 평범한 표정
   - 귀여운 애니메이션 스타일
   - Midjourney prompt: "cute mouse character in countryside outfit, neutral expression, friendly appearance, anime style, transparent background, character portrait --ar 1:1"

7. **countryside_worried.webp** (800x800px, ~60KB)
   - 시골쥐 캐릭터 - 걱정스러운 표정
   - Midjourney prompt: "cute mouse character in countryside outfit, worried expression, concerned look, anime style, transparent background, character portrait --ar 1:1"

8. **seoul_neutral.webp** (800x800px, ~60KB)
   - 서울쥐 캐릭터 - 평범한 표정
   - 세련된 도시 스타일 옷
   - Midjourney prompt: "stylish mouse character in urban outfit, confident expression, modern appearance, anime style, transparent background, character portrait --ar 1:1"

9. **seoul_serious.webp** (800x800px, ~60KB)
   - 서울쥐 캐릭터 - 진지한 표정
   - Midjourney prompt: "stylish mouse character in urban outfit, serious expression, thoughtful look, anime style, transparent background, character portrait --ar 1:1"

## Image Specifications

### Format
- **WebP format** for optimal file size
- Fallback to PNG if WebP not supported

### Size Guidelines
- Backgrounds: 1080x1920px (mobile portrait)
- Characters: 800x800px (square)
- Target compression: Quality 80-85

### Color Palette
- **Countryside**: Warm tones (greens, browns, yellows)
- **Seoul City**: Cool tones (blues, purples, neon colors)
- **Endings**: Match the mood (warm for good, cool/dark for bad)

## Production Tools

### AI Image Generation
1. **Midjourney** ($30/month)
   - Best quality for illustrations
   - Use provided prompts above
   - Request: --ar 9:16 for vertical, --ar 1:1 for square

2. **Stable Diffusion** (Free)
   - Local installation
   - Use LoRA models for anime style

3. **DALL-E 3** (via ChatGPT Plus)
   - Good for concept art
   - Easier prompting

### Image Editing
- **Photoshop**: Professional editing
- **GIMP** (Free): Open-source alternative
- **Photopea** (Free): Web-based editor

### Optimization
```bash
# Convert to WebP
cwebp -q 85 input.png -o output.webp

# Resize images
convert input.png -resize 1080x1920 output.png
```

## Quick Start with Placeholders

For immediate testing, you can use:
1. Solid color backgrounds (CSS)
2. Emoji characters (🐭 🏙️ 🌾)
3. Free stock images from:
   - [Unsplash](https://unsplash.com)
   - [Pexels](https://pexels.com)
   - [Pixabay](https://pixabay.com)

## Current Status

- [ ] countryside.webp
- [ ] seoul_city.webp
- [ ] seoul_luxury.webp
- [ ] ending_good.webp
- [ ] ending_bad.webp
- [ ] countryside_neutral.webp
- [ ] countryside_worried.webp
- [ ] seoul_neutral.webp
- [ ] seoul_serious.webp
