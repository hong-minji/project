# 에셋 연결 테스트 가이드

## ✅ 에셋 확인 완료

모든 필요한 에셋 파일이 존재합니다:

### 이미지 (9개)
- ✅ backgrounds/countryside.webp
- ✅ backgrounds/seoul_city.webp
- ✅ backgrounds/seoul_luxury.webp
- ✅ characters/countryside_neutral.webp
- ✅ characters/countryside_worried.webp
- ✅ characters/seoul_neutral.webp
- ✅ characters/seoul_serious.webp
- ✅ endings/ending_good.webp
- ✅ endings/ending_bad.webp

### 영상 (2개)
- ✅ videos/opening.mp4
- ✅ videos/ending.mp4

### 오디오 (10개)
- ✅ audio/bgm/main_theme.mp3
- ✅ audio/bgm/tension_theme.mp3
- ✅ audio/sfx/click.mp3
- ✅ audio/sfx/choice.mp3
- ✅ audio/sfx/page_turn.mp3
- ✅ audio/sfx/warning.mp3
- ✅ audio/sfx/success.mp3
- ✅ audio/sfx/fail.mp3
- ✅ audio/sfx/ambient_city.mp3
- ✅ audio/sfx/ambient_rain.mp3

### 폰트 (1개)
- ✅ fonts/Pretendard-Variable.woff2

**총 22개 에셋 모두 확인됨!**

---

## 🚀 테스트 방법

### 1. 에셋 연결 테스트

```bash
# 터미널에서 실행
cd "/Users/admin/Documents/게임/001"
python3 -m http.server 8000
```

브라우저에서 다음 페이지들을 열어보세요:

#### A. 에셋 테스트 페이지
```
http://localhost:8000/asset-test.html
```

이 페이지에서 확인할 수 있는 것:
- 모든 이미지가 정상 로드되는지
- 모든 영상이 재생 가능한지
- 모든 오디오가 재생 가능한지
- 로딩 성공률 (100% 목표)

#### B. 실제 게임
```
http://localhost:8000/
```

게임에서 확인할 것:
- 로딩 화면 표시
- 메인 메뉴 배경
- "새로운 게임" 클릭
- 오프닝 영상 재생 (5초)
- 게임 화면 진입
  - 배경 이미지 표시
  - 캐릭터 이미지 표시
  - HP/SP 바 작동
  - 대사 타이핑 효과
  - BGM 재생 (클릭 후 재생됨)
  - 선택지 클릭 시 SFX
  - 다음 장면 전환

---

## 🔍 체크리스트

### 에셋 로딩 확인
- [ ] 모든 배경 이미지 로드 (3개)
- [ ] 모든 캐릭터 이미지 로드 (4개)
- [ ] 모든 엔딩 이미지 로드 (2개)
- [ ] 오프닝 영상 재생
- [ ] 엔딩 영상 재생
- [ ] 메인 테마 BGM 재생
- [ ] 긴장 테마 BGM 재생
- [ ] 모든 SFX 재생 (8개)
- [ ] Pretendard 폰트 적용

### 게임 기능 확인
- [ ] 로딩 화면 → 메인 메뉴 전환
- [ ] 새로운 게임 시작
- [ ] 오프닝 영상 재생 또는 스킵
- [ ] Chapter 1 시작
  - [ ] 시골 배경 표시
  - [ ] 시골쥐 캐릭터 표시
  - [ ] 대사 타이핑
  - [ ] 선택지 표시
- [ ] 선택지 클릭
  - [ ] HP/SP 변화
  - [ ] 효과음 재생
  - [ ] 다음 노드 이동
- [ ] Chapter 2 진입
  - [ ] 서울 배경으로 변경
  - [ ] 캐릭터 변경
  - [ ] BGM 유지 또는 변경
  - [ ] 도시 환경음 재생
- [ ] 저장/불러오기
  - [ ] 게임 메뉴 (☰) 열기
  - [ ] 저장하기
  - [ ] 메인 메뉴로 돌아가기
  - [ ] 이어하기 버튼 활성화
  - [ ] 불러오기 작동
- [ ] 엔딩 도달
  - [ ] 엔딩 텍스트 표시
  - [ ] 엔딩 영상 재생
  - [ ] 메인 메뉴로 복귀
- [ ] 엔딩 갤러리
  - [ ] 달성한 엔딩 표시
  - [ ] 미달성 엔딩 잠김 (🔒)

---

## 🐛 문제 해결

### 이미지가 안 보여요
**원인**: 경로 문제 또는 파일 손상
**해결**:
1. 개발자 도구 (F12) → Console 탭 확인
2. 404 에러가 있는지 확인
3. asset-test.html에서 어떤 파일이 실패했는지 확인

### 오디오가 안 들려요
**원인**: 브라우저 자동재생 정책
**해결**:
1. 게임 시작 후 버튼을 한 번 클릭해야 재생됨
2. 모바일은 첫 터치 후 재생
3. 볼륨 설정 확인 (설정 메뉴)

### 영상이 재생 안 돼요
**원인**: 코덱 또는 브라우저 호환성
**해결**:
1. Chrome 또는 Safari에서 테스트
2. 영상 코덱 확인 (H.264 권장)
3. 파일 크기 확인 (너무 크면 로딩 느림)

### 폰트가 적용 안 돼요
**확인 방법**:
1. 개발자 도구 → Network 탭
2. Pretendard-Variable.woff2 로드 확인
3. CSS @font-face 정의 확인

---

## 📊 성능 확인

### Chrome DevTools로 측정

1. **로딩 시간** (목표: < 2초)
   - F12 → Network 탭
   - Ctrl+Shift+R (강력 새로고침)
   - DOMContentLoaded 시간 확인

2. **에셋 크기** (목표: < 7MB)
   - Network 탭 하단 확인
   - Transferred 크기 확인

3. **메모리 사용** (목표: < 80MB)
   - F12 → Performance 탭
   - 프로파일링 시작
   - 게임 플레이
   - 메모리 사용량 확인

4. **FPS** (목표: 60fps)
   - F12 → Performance monitor
   - Rendering FPS 확인

---

## ✨ 추가 테스트

### 모바일 테스트

1. **Chrome DevTools 모바일 모드**
   ```
   F12 → Cmd+Shift+M (Mac) / Ctrl+Shift+M (Win)
   iPhone SE 또는 Galaxy S20 선택
   ```

2. **실제 모바일 기기**
   ```
   같은 WiFi 연결
   컴퓨터 IP 확인: ifconfig (Mac) / ipconfig (Win)
   모바일에서 http://[IP]:8000 접속
   ```

### 다양한 브라우저

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 📝 테스트 결과 기록

### 에셋 로딩
- 이미지: ___/9 성공
- 영상: ___/2 성공
- 오디오: ___/10 성공
- 폰트: ___/1 성공

### 게임 기능
- 화면 전환: [ ] OK / [ ] 문제
- 스토리 진행: [ ] OK / [ ] 문제
- 저장/불러오기: [ ] OK / [ ] 문제
- 오디오 재생: [ ] OK / [ ] 문제
- 엔딩 시스템: [ ] OK / [ ] 문제

### 성능
- 로딩 시간: ___ 초
- 총 에셋 크기: ___ MB
- 메모리 사용: ___ MB
- FPS: ___ fps

---

## 🎉 완료 기준

모든 체크리스트 항목이 ✅ 되면 에셋 통합 완료!

다음 단계:
1. 스토리 밸런스 조정
2. 모바일 UX 개선
3. 최종 테스트
4. 배포 준비

---

**Happy Testing! 🎮**
