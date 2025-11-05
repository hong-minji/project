# Quick Start Guide - 찌익(Choice): 행복을 찾아서

5분 안에 게임을 실행하고 테스트하는 방법

## 🚀 즉시 실행하기

### 방법 1: Python으로 실행 (가장 쉬움)

```bash
# 프로젝트 폴더로 이동
cd "/Users/admin/Documents/게임/001"

# Python 3 HTTP 서버 실행
python3 -m http.server 8000

# 브라우저에서 열기
# http://localhost:8000
```

### 방법 2: Node.js로 실행

```bash
# npx 사용 (설치 필요 없음)
npx http-server -p 8000

# 또는 live-server (자동 새로고침)
npx live-server --port=8000
```

### 방법 3: VS Code Live Server

1. VS Code에서 프로젝트 폴더 열기
2. [index.html](index.html) 파일 열기
3. 우클릭 → "Open with Live Server"

## 📱 모바일에서 테스트

### 1. 같은 WiFi 연결

컴퓨터와 모바일을 같은 WiFi에 연결

### 2. IP 주소 확인

```bash
# Mac/Linux
ifconfig | grep inet

# Windows
ipconfig
```

### 3. 모바일 브라우저로 접속

```
http://[YOUR-IP-ADDRESS]:8000
예: http://192.168.1.100:8000
```

## 🎮 게임 기능 체크리스트

### 초기 화면
- [x] 로딩 화면 표시 (2초)
- [x] 메인 메뉴로 전환
- [x] "새로운 게임" 버튼 작동
- [x] "이어하기" 버튼 (처음엔 비활성화)
- [x] "엔딩 갤러리" 버튼 작동
- [x] "설정" 버튼 작동

### 게임 플레이
- [x] HP/SP 바 표시
- [x] 배경 이미지 영역 (에셋 없으면 placeholder)
- [x] 캐릭터 영역 (에셋 없으면 숨김)
- [x] 대사 텍스트 타이핑 효과
- [x] 선택지 버튼 표시
- [x] 선택 시 HP/SP 변경
- [x] 다음 노드로 이동

### 저장/불러오기
- [x] 게임 메뉴 열기 (☰ 버튼)
- [x] 저장하기 기능
- [x] 불러오기 기능
- [x] 메인 메뉴로 돌아가기

### 엔딩 시스템
- [x] 4가지 엔딩 도달 가능
- [x] 엔딩 도달 시 잠금 해제
- [x] 엔딩 갤러리에 표시
- [x] 잠긴 엔딩은 🔒 표시

### 설정
- [x] BGM 볼륨 조절
- [x] SFX 볼륨 조절
- [x] 진행 상황 초기화

## 🎨 에셋 없이 테스트하기

게임은 에셋 없이도 작동합니다:

### 배경 이미지 없을 때
- CSS 그라데이션 배경으로 대체
- 각 챕터별 다른 색상

### 캐릭터 이미지 없을 때
- 캐릭터 영역 숨김
- 텍스트만으로 진행 가능

### 오디오 없을 때
- 콘솔에 경고만 표시
- 게임 플레이에 영향 없음

### 영상 없을 때
- 바로 게임 시작
- 엔딩 후 메인 메뉴로 복귀

## 🔧 문제 해결

### 페이지가 안 열려요
```bash
# 포트를 바꿔보세요
python3 -m http.server 3000
# http://localhost:3000
```

### 브라우저 캐시 문제
- 강력 새로고침: `Ctrl+Shift+R` (Win) / `Cmd+Shift+R` (Mac)
- 또는 개발자 도구에서 "Disable cache" 체크

### LocalStorage 오류
- 파일:// 프로토콜로 열면 안 됨
- 반드시 HTTP 서버로 실행
- 브라우저 시크릿 모드는 LocalStorage 제한 있음

### 모바일에서 음악 안 나와요
- 모바일은 사용자 상호작용 후 재생 가능
- 버튼 클릭 후 재생됨
- iOS Safari는 자동재생 제한이 엄격함

## 📊 개발자 도구로 테스트

### Chrome DevTools 열기
- `F12` 또는 `Cmd+Option+I` (Mac)

### 콘솔에서 상태 확인
```javascript
// 현재 게임 상태
game.stateManager.getHP()
game.stateManager.getSP()
game.stateManager.getCurrentNode()

// 강제로 HP/SP 변경
game.stateManager.hp = 100
game.stateManager.sp = 100
game.story.updateStatsDisplay()

// 특정 노드로 이동
game.story.loadNode('ending_c')

// 모든 엔딩 잠금 해제
game.stateManager.unlockEnding('ending_a')
game.stateManager.unlockEnding('ending_b')
game.stateManager.unlockEnding('ending_c')
game.stateManager.unlockEnding('ending_hidden')
```

### 모바일 뷰 테스트
1. DevTools 열기
2. `Cmd+Shift+M` (Toggle device toolbar)
3. iPhone SE 또는 Galaxy S20 선택
4. 화면 회전 테스트

## 🎯 스토리 테스트 경로

### 엔딩 A: 평온한 시골
1. chapter1_start → 오늘도 들판을 뛰어다니며 놀자
2. chapter1_peaceful → 편지를 읽어본다
3. chapter1_letter → 시골에 머무르기로 한다
4. ending_a 도달

### 엔딩 B: 서울의 성공
1. chapter1_start → 마을 어른들께 서울 이야기를 들어보자
2. chapter1_curious → 편지를 읽어본다
3. chapter1_letter → 서울로 떠나기로 결심한다
4. chapter2_arrival → 흥분된 마음으로 따라간다
5. chapter2_explore → 마음껏 먹는다
6. chapter2_feast → 서울쥐를 따라 빠르게 도망친다
7. chapter3_danger → 서울쥐에게 화려한 삶의 대가를 묻는다
8. chapter3_question → 그래도 도전할 가치가 있다고 생각한다
9. chapter4_ambition → 서울에서 계속 살기로 한다
10. ending_b 도달

### 엔딩 C: 진정한 행복
- HP와 SP를 모두 높게 유지하며 플레이
- chapter4_reflection 또는 chapter4_wisdom에서 균형 선택
- ending_c 도달

### 히든 엔딩
- HP와 SP를 낮게 떨어뜨리며 플레이
- chapter4_exhaustion에서 모든 것을 포기
- ending_hidden 도달

## 📝 다음 단계

### 1. 에셋 제작
- [assets/images/ASSET_GUIDE.md](assets/images/ASSET_GUIDE.md) 참조
- Midjourney로 이미지 생성
- 또는 무료 이미지 사용

### 2. 오디오 추가
- [assets/audio/AUDIO_GUIDE.md](assets/audio/AUDIO_GUIDE.md) 참조
- Epidemic Sound 또는 무료 음악 사용

### 3. 영상 제작
- [assets/videos/VIDEO_GUIDE.md](assets/videos/VIDEO_GUIDE.md) 참조
- Canva로 간단히 제작 가능

### 4. 스토리 수정
- [js/storyData.js](js/storyData.js) 파일 편집
- 대사, 선택지, 효과 조정

### 5. 배포
- GitHub Pages로 무료 호스팅
- Netlify 또는 Vercel 사용
- 커스텀 도메인 연결

## 🌐 온라인 배포

### GitHub Pages (추천)

```bash
# 1. Git 저장소 초기화
git init
git add .
git commit -m "Initial commit"

# 2. GitHub에 푸시
git remote add origin [YOUR-REPO-URL]
git branch -M main
git push -u origin main

# 3. GitHub Settings → Pages → Source: main branch
```

### Netlify (드래그 앤 드롭)

1. [Netlify.com](https://netlify.com) 가입
2. 프로젝트 폴더를 드래그 앤 드롭
3. 자동 배포 완료

## 💡 팁

### 개발 중
- Live Server로 실행하면 파일 수정 시 자동 새로고침
- 콘솔 로그로 디버깅
- 모바일 테스트는 자주!

### 성능 최적화
- 이미지를 WebP로 변환
- 오디오 비트레이트 128kbps로 제한
- 불필요한 console.log 제거

### 사용자 테스트
- 친구에게 플레이 요청
- 피드백 수집
- 스토리 밸런스 조정

## 🎊 완성되면

- 포트폴리오에 추가
- SNS에 공유
- 게임 커뮤니티에 게시
- 피드백 받고 v3.0 개발!

---

**즐거운 개발 되세요!** 🎮
