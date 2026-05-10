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

## 공개 전 입력/교체 필요 항목
- 실제 이메일
- 단일 캠페인 최대 발송 규모
- 공개 가능한 CTR/CVR/GMV/도달률/바이어 수치
- 네이버 인플루언서 구독자 수
- 네이버 블로그 콘텐츠 수
- 익명화된 카카오톡 플러스친구, 앱푸시, LMS, DM 이메일 대표 이미지
- 경쟁사/타 브랜드 CRM 메시지 모니터링 보드 이미지
- 자격증 보유 여부와 취득 연도

## 민감 자료 관리
- `참고(절대git올림안됨)/` 폴더는 `.gitignore`에 포함되어 있습니다.
- 회사 내부 시스템명, 캠페인 ID, 담당자명, 고객 정보, 트래킹 URL, 쿠폰 코드, 상세 매출 원본은 공개 이미지에서 제거하거나 블러 처리해야 합니다.

## 기술 메모
- React 18 (CDN UMD) + Babel Standalone — 빌드 없이 .jsx를 브라우저에서 변환
- 폰트: Pretendard (jsDelivr CDN), Inter (Google Fonts)
- 이미지·소스 외에 외부 의존성 없음
