# Video Assets Guide

## Required Videos (2 total)

### 1. opening.mp4 (5 seconds, ~1MB)

**Purpose**: Game opening sequence

**Content**:
- 0-2s: Fade in from black to game title "찌익(Choice)"
- 2-4s: Subtitle appears: "행복을 찾아서"
- 4-5s: Simple mouse character animation (countryside mouse appears)

**Specifications**:
- Duration: 5 seconds
- Resolution: 1080x1920 (mobile portrait)
- Format: MP4 (H.264)
- Target size: ~1MB
- FPS: 24-30fps

**Production Tools**:
- **After Effects**: Professional animation
- **Premiere Pro**: Simple edits
- **Canva Video** (Free): Template-based
- **Clipchamp** (Free): Online editor

**Simple Alternative**:
Create a title card with:
1. Background gradient (countryside colors)
2. Game title text with fade animation
3. Mouse emoji or simple illustration
4. Export as MP4

### 2. ending.mp4 (5 seconds, ~1MB)

**Purpose**: Credits roll after endings

**Content**:
- 0-3s: "Thank you for playing" message
- 3-5s: Credits scroll (Game by..., Art by..., Music by...)

**Specifications**:
- Duration: 5 seconds
- Resolution: 1080x1920 (mobile portrait)
- Format: MP4 (H.264)
- Target size: ~1MB
- FPS: 24-30fps

**Production Tools**: Same as opening

**Simple Alternative**:
Create a credits card with:
1. Dark background
2. White text with credits
3. Simple scroll animation
4. Export as MP4

## Production Workflow

### Option 1: After Effects (Professional)

1. Create new composition (1080x1920, 5s, 30fps)
2. Design title card or credits
3. Add animation (fade, slide, scale)
4. Export:
   - Format: H.264
   - Preset: Match Source - High bitrate
   - Target: 1MB (adjust bitrate accordingly)

### Option 2: Canva (Easy)

1. Go to [Canva.com](https://canva.com)
2. Create custom size: 1080x1920
3. Choose "Video" format
4. Add text, animations
5. Set duration: 5 seconds
6. Download as MP4

### Option 3: PowerPoint/Keynote (Quick)

1. Set slide size: Custom (9:16 ratio)
2. Design slide with title/credits
3. Add animations
4. Export as video (5s duration)
5. Use video converter if needed

## Optimization

### Compress Video
```bash
# Using FFmpeg
ffmpeg -i input.mp4 -vcodec h264 -b:v 1600k -s 1080x1920 output.mp4

# Reduce file size further
ffmpeg -i input.mp4 -vcodec h264 -crf 23 -preset slow output.mp4
```

### Online Tools
- [CloudConvert](https://cloudconvert.com): Video compression
- [HandBrake](https://handbrake.fr): Desktop encoder
- [ezgif.com](https://ezgif.com): Web-based tools

## Placeholder Solution

For immediate testing without videos:

1. **Skip videos entirely**: Game starts directly
2. **Static images**: Use JPEG as video substitute
3. **CSS animations**: Create title screen with CSS

## Credits Template

**Suggested credits text**:
```
찌익(Choice): 행복을 찾아서

Game Design & Development
[Your Name]

Story
Original: Aesop's Fables
Adaptation: [Your Name]

Art
Backgrounds: [Artist/AI Tool]
Characters: [Artist/AI Tool]

Music & Sound
BGM: [Source]
SFX: [Source]

Special Thanks
[Names or inspiration sources]

© 2025 [Your Name]
```

## File Naming Convention

- Use lowercase
- No spaces (use underscores)
- Include version if iterating:
  - `opening_v1.mp4`
  - `opening_v2.mp4`
  - `opening_final.mp4`

## Quality Checklist

- [ ] Correct resolution (1080x1920)
- [ ] Correct duration (5 seconds)
- [ ] File size under 1.5MB
- [ ] Playable on mobile browsers
- [ ] Audio (optional but recommended)
- [ ] Smooth transitions
- [ ] Readable text on mobile

## Current Status

- [ ] opening.mp4
- [ ] ending.mp4

## Tips

1. **Keep it simple**: 5 seconds is very short
2. **Readable text**: Large fonts for mobile
3. **Test on mobile**: Ensure it looks good on small screens
4. **Skip button works**: Users can skip if desired
5. **Auto-play compatible**: Use muted video for auto-play on mobile
