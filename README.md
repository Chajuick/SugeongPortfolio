# 정수정 · CRM Marketer Portfolio

정적 사이트입니다. 빌드 단계가 없습니다.

## Vercel 배포 방법

### A. Vercel 대시보드에서 (가장 쉬움)
1. <https://vercel.com/new> 접속
2. **Import Project** → **Browse all templates** 옆의 **deploy a folder** 선택
3. 이 폴더(`deploy/`)를 통째로 드래그앤드롭
4. Framework Preset: **Other** (자동 감지됨)
5. Build Command: 비워두기
6. Output Directory: `.` (현재 폴더)
7. **Deploy**

### B. Vercel CLI로
```bash
npm i -g vercel
cd deploy
vercel
# 안내에 따라 프로젝트 이름 입력 → 끝
```

## 파일 구조
```
deploy/
├── index.html              # 진입점
├── vercel.json             # 캐시·헤더 설정
├── assets/
│   └── portrait.png        # 인물 사진 (교체 가능)
└── parts/
    ├── portfolio-shared.jsx   # 데이터 (이름·경력·프로젝트)
    └── portfolio-warm.jsx     # UI 컴포넌트
```

## 콘텐츠 수정
- 이름·이메일·경력: `parts/portfolio-shared.jsx` 상단 `PERSON`, `CAREER`
- 프로젝트: 같은 파일 `PROJECTS`
- 인물 사진: `assets/portrait.png` 교체 (4:5 비율 권장, 배경 투명 PNG)

## 기술 메모
- React 18 (CDN UMD) + Babel Standalone — 빌드 없이 .jsx를 브라우저에서 변환
- 폰트: Pretendard (jsDelivr CDN), Inter (Google Fonts)
- 이미지·소스 외에 외부 의존성 없음
