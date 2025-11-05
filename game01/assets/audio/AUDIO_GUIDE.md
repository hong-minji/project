# Audio Assets Guide

## Required Audio Files (10 total)

### BGM (2 files)

#### 1. main_theme.mp3 (~1.5MB)

**Usage**: Chapter 1, 2, 4, Ending A, C
**Mood**: Peaceful, contemplative, hopeful
**Duration**: 2-3 minutes (loopable)
**Style**: Light piano, acoustic guitar, gentle strings

**Sources**:
- [Epidemic Sound](https://epidemicsound.com) - "Peaceful Countryside"
- [Artlist](https://artlist.io) - "Calm Reflection"
- [YouTube Audio Library](https://youtube.com/audiolibrary) - Search: "peaceful piano"

**Free Alternatives**:
- Kevin MacLeod - "Wallpaper" (CC)
- Bensound - "Summer" (CC)

#### 2. tension_theme.mp3 (~1.5MB)

**Usage**: Chapter 3, Hidden Ending
**Mood**: Tense, uncertain, dramatic
**Duration**: 2-3 minutes (loopable)
**Style**: Suspense strings, light percussion, minor key

**Sources**:
- Epidemic Sound - "Urban Tension"
- YouTube Audio Library - Search: "tension suspense"

**Free Alternatives**:
- Kevin MacLeod - "Volatile Reaction" (CC)
- Bensound - "The Elevator" (CC)

### SFX (8 files)

#### 3. click.mp3 (~20KB)

**Usage**: Button clicks
**Type**: UI sound effect
**Duration**: <0.5 seconds
**Style**: Soft click, tap

**Sources**:
- [Freesound](https://freesound.org) - Search: "button click"
- [Zapsplat](https://zapsplat.com) - UI category

#### 4. choice.mp3 (~30KB)

**Usage**: When player selects a choice
**Type**: Decision sound
**Duration**: 0.5-1 second
**Style**: Confirmation tone, positive feedback

**Sources**:
- Freesound - Search: "select confirm"
- Zapsplat - Game UI

#### 5. page_turn.mp3 (~25KB)

**Usage**: Scene transitions
**Type**: Transition sound
**Duration**: 0.5-1 second
**Style**: Page flip, whoosh

**Sources**:
- Freesound - Search: "page turn"
- Zapsplat - Paper sounds

#### 6. warning.mp3 (~40KB)

**Usage**: Low HP/SP alerts
**Type**: Alert sound
**Duration**: 0.5-1 second
**Style**: Subtle warning tone

**Sources**:
- Freesound - Search: "warning beep"
- Notification sounds

#### 7. success.mp3 (~30KB)

**Usage**: Positive choice outcomes
**Type**: Feedback sound
**Duration**: 0.5-1 second
**Style**: Cheerful chime, win sound

**Sources**:
- Freesound - Search: "success chime"
- Game achievement sounds

#### 8. fail.mp3 (~30KB)

**Usage**: Negative choice outcomes
**Type**: Feedback sound
**Duration**: 0.5-1 second
**Style**: Disappointed tone, minor chord

**Sources**:
- Freesound - Search: "fail buzzer"
- Game failure sounds

#### 9. ambient_city.mp3 (~80KB)

**Usage**: Chapter 2, 3 background
**Type**: Ambient loop
**Duration**: 10-30 seconds (loopable)
**Style**: City traffic, distant sirens, urban ambience

**Sources**:
- Freesound - Search: "city ambience"
- Environmental sounds

#### 10. ambient_rain.mp3 (~80KB)

**Usage**: Certain dramatic scenes
**Type**: Ambient loop
**Duration**: 10-30 seconds (loopable)
**Style**: Rain, thunder (optional)

**Sources**:
- Freesound - Search: "rain ambient"
- Nature sounds

## Audio Specifications

### BGM
- **Format**: MP3
- **Bitrate**: 128-192 kbps
- **Sample Rate**: 44.1 kHz
- **Channels**: Stereo
- **Looping**: Must loop seamlessly

### SFX
- **Format**: MP3
- **Bitrate**: 64-128 kbps
- **Sample Rate**: 44.1 kHz
- **Channels**: Mono (acceptable for UI sounds)
- **Normalization**: -3dB peak

## Production Workflow

### 1. Finding Music

**Paid Sources** (Licensed):
- **Epidemic Sound** ($15-30/month)
  - Unlimited downloads
  - Commercial license
  - High quality

- **Artlist** ($15-30/month)
  - Unlimited downloads
  - Perpetual license
  - Professional quality

**Free Sources** (Attribution Required):
- **YouTube Audio Library**
  - No attribution needed
  - Limited selection

- **FreePD** (Public Domain)
  - No attribution
  - Classical music

- **Incompetech** (Kevin MacLeod)
  - Free with attribution
  - Wide variety

### 2. Creating Custom Music

**Tools**:
- **GarageBand** (Mac, Free): Easy loops
- **FL Studio** (Paid): Professional DAW
- **LMMS** (Free): Open-source DAW
- **Soundtrap** (Web): Online DAW

**AI Music Generation**:
- **Suno AI**: Text-to-music
- **AIVA**: AI composition
- **Soundraw**: Customizable AI music

### 3. Editing Audio

**Tools**:
- **Audacity** (Free): Basic editing
- **Adobe Audition** (Paid): Professional
- **WavePad** (Free): Simple editor

**Common Edits**:
```bash
# Trim silence
# Normalize volume
# Fade in/out
# Loop optimization
```

### 4. Optimization

**Compress Audio**:
```bash
# Using FFmpeg
ffmpeg -i input.wav -b:a 128k output.mp3

# For SFX (lower bitrate)
ffmpeg -i input.wav -b:a 64k output.mp3
```

**Online Tools**:
- [Online Audio Converter](https://online-audio-converter.com)
- [MP3Smaller](https://mp3smaller.com)

## Licensing

### Commercial Use Checklist
- [ ] Have proper license for BGM
- [ ] Have proper license for SFX
- [ ] Attribution provided where required
- [ ] License allows web distribution
- [ ] License allows modification (if edited)

### Attribution Template
```
Music:
- "Track Name" by Artist Name (License)
- Source: [Website]

Sound Effects:
- UI sounds from Freesound.org (CC0)
- Ambient sounds by [Artist] (CC-BY)
```

## Integration Tips

### Volume Levels
- **BGM**: 70% default (adjustable)
- **SFX**: 80% default (adjustable)
- **Ambient**: 50% (quieter than BGM)

### Looping
- Use `.loop = true` for BGM and ambient
- Ensure seamless loop points
- Test loop transitions

### Mobile Considerations
- Auto-play may be blocked
- User interaction required first
- Provide mute/volume controls
- Test on iOS Safari specifically

## Placeholder Solution

For immediate testing:

1. **Skip audio**: Game works without sound
2. **Browser beeps**: Use Web Audio API to generate tones
3. **Text feedback**: Show "[Click]" "[Success]" text

## Quality Checklist

- [ ] All files in MP3 format
- [ ] Proper volume normalization
- [ ] Seamless loops for BGM/ambient
- [ ] Under target file size
- [ ] Tested on mobile browsers
- [ ] Tested on desktop browsers
- [ ] No clipping or distortion
- [ ] Proper attribution documented

## Current Status

- [ ] main_theme.mp3
- [ ] tension_theme.mp3
- [ ] click.mp3
- [ ] choice.mp3
- [ ] page_turn.mp3
- [ ] warning.mp3
- [ ] success.mp3
- [ ] fail.mp3
- [ ] ambient_city.mp3
- [ ] ambient_rain.mp3

## Quick Start Resources

### Free SFX Collections
1. [Freesound](https://freesound.org)
2. [Zapsplat](https://zapsplat.com)
3. [SoundBible](https://soundbible.com)
4. [Mixkit](https://mixkit.co/free-sound-effects/)

### Free Music
1. [YouTube Audio Library](https://youtube.com/audiolibrary)
2. [FreePD](https://freepd.com)
3. [Incompetech](https://incompetech.com)
4. [Bensound](https://bensound.com)

### AI Generation (Emerging)
1. [Suno](https://suno.ai)
2. [AIVA](https://aiva.ai)
3. [Soundraw](https://soundraw.io)
