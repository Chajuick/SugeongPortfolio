// Shared portfolio data + small primitives both portfolio concepts use.

const PERSON = {
  nameKo: '정수정',
  nameEn: 'Sujeong Jeong',
  role: 'CRM Marketer',
  email: 'clearlcrystal@gmail.com',
  yearsExp: null,
};

const CAREER = [
  {
    period: '2025.06 — 현재',
    company: '㈜지마켓',
    role: 'CRM 마케터',
    meta: {
      channels: 'App Push · KakaoTalk Plus Friend · LMS · DM Email',
      scale: '단일 앱푸시 캠페인 발송 규모: 150만+ · 발송 후 CTR/CVR/GMV 추적',
      tools: '사내 CRM 운영 시스템 · Spreadsheet / Excel · Photoshop / Illustrator',
    },
    bullets: [
      'G마켓 앱푸시 광고 메시지 문구와 배너 메시지를 프로모션 성격, 타겟 조건, 상품 카테고리에 맞춰 기획 및 운영',
      '카카오톡 플러스친구 와이드형, 리스트형, 캐러셀형 메시지의 제목·본문·버튼 CTA 구조 설계',
      'LMS와 DM 이메일 캠페인의 문구 등록, 파라미터 입력, 발송 시간 지정, 타겟 조건 확인, 최종 발행 관리',
      '오탈자, 링크, 랜딩 페이지, 트래킹 파라미터, 소재 일치 여부를 발송 전 체크리스트 기준으로 검수',
      '도달률, CTR, CVR, 바이어, GMV 등 성과 지표를 확인하고 캠페인 리포트와 다음 운영 포인트로 정리',
      '광고주, 대행사, 내부 영업 조직과 일정, 소재, 수정 사항, 성과 기준을 맞추며 발송 품질 관리',
    ],
  },
  {
    period: '2022.01 — 2023.09',
    company: '강동구청 도시경관과',
    role: '홍보 / 문화사업 운영',
    meta: {
      channels: 'SNS · Local Campaign · Offline Program · Public Communication',
      scale: '강풀만화거리 문화거리 조성 프로젝트',
      tools: 'Instagram · Facebook · 촬영/편집 도구 · Spreadsheet / Excel',
    },
    bullets: [
      '강동구 특화사업 강풀만화거리 문화거리 조성 프로젝트 운영 지원 및 홍보',
      '유관기관, 참여 작가, 지역 커뮤니티와 협업하며 사업 일정과 행사 운영 실무 지원',
      '인스타그램과 페이스북 채널의 주요 사업 홍보 콘텐츠 기획, 촬영, 편집, 운영',
      '문화 프로그램 참여자 모집 전략 수립, 포스터·보도자료 등 홍보물 제작, 결과 리포트 작성',
      '방문자 수 전년 대비 60% 이상 증가 성과를 바탕으로 온·오프라인 홍보 효과 확인',
    ],
  },
  {
    period: '2023.03 — 2024.08',
    company: '천하일미',
    role: '브랜드 / 콘텐츠 활동',
    meta: {
      channels: 'SNS · Review Content · Short-form · Product Story',
      scale: '제품 리뷰 및 홍보 콘텐츠 제작',
      tools: '촬영/편집 도구 · Photoshop / Illustrator · CapCut',
    },
    bullets: [
      '제품 마케팅 콘텐츠와 SNS 홍보 콘텐츠 기획',
      '신제품 및 기존 제품 시식 기반 리뷰 콘텐츠 제작',
      '제품 홍보 영상 촬영, 편집, 숏폼 콘텐츠 제작',
      '제품의 강점과 소비자 반응 포인트를 콘텐츠 구조로 정리',
    ],
  },
  {
    period: '2023.07 — 2024.06',
    company: '카페베네 홍보 서포터즈',
    role: '블로그 / 브랜드 콘텐츠',
    meta: {
      channels: 'Naver Blog · Brand News · Review Content',
      scale: '신메뉴 리뷰 및 브랜드 소식 홍보',
      tools: 'Naver Blog · 촬영/편집 도구 · Spreadsheet / Excel',
    },
    bullets: [
      '블로그 기반 브랜드 소식 홍보와 신메뉴 리뷰형 콘텐츠 제작',
      '검색 노출과 유입을 고려한 제목, 썸네일, 본문 구조 기획',
      '맛 평가, 이미지 구성, 영상 촬영 및 편집을 포함한 콘텐츠 운영',
    ],
  },
  {
    period: 'Ongoing',
    company: '네이버 푸드 인플루언서 / 블로그',
    role: 'SEO Content Marketing',
    meta: {
      channels: 'Naver Blog · SEO Content · Review Content · Branded Content',
      scale: '콘텐츠 1,000+ · 팬 4,843 · 이웃 5,150',
      tools: 'Naver Blog · Keyword Research · Thumbnail · Photo / Video Editing',
    },
    bullets: [
      '네이버 푸드 인플루언서 활동을 통해 검색 의도, 제목 후킹, 썸네일 구성, 콘텐츠 체류 흐름을 실험',
      '블로그, 리뷰, 브랜디드 콘텐츠를 제작하며 소비자 반응과 유입 구조를 확인',
      '콘텐츠 경험을 CRM 메시지의 클릭 이유, 상품 장점 정리, 고객 언어 선택으로 연결',
    ],
  },
];

const EDUCATION = [
  {
    period: '2024.01 — 2024.02',
    title: 'GTQ 그래픽 전문가 과정',
    org: '진주직업전문학교',
    details: [
      'Photoshop, Illustrator 실무 교육',
      '사진 편집, 합성, 이미지 보정 기초',
      '포스터, CI, 편집, 웹, 캐릭터 디자인 제작 실습',
      '140시간 실무 교육 이수',
    ],
  },
  {
    period: '2023.09',
    title: '디지털마케팅 직무교육',
    org: '에이블런',
    details: [
      '디지털 마케팅 및 퍼포먼스 전략 수립',
      '광고 소재 기획과 콘텐츠 제작 실습',
      '검색/SNS 광고 등 채널별 마케팅 툴 이해',
      '데이터 기반 타깃 설정과 성과 개선 실습',
      '100시간 교육 이수',
    ],
  },
];

const HERO_COPY = {
  eyebrow: 'CRM · Campaign Operation · Performance',
  headlineKo: '고객의 하루에 스며드는 메시지를 설계합니다',
  headlineEn: 'Designing messages that belong in a customer\u2019s day',
  sub: '감으로 보내지 않습니다. 브랜드의 톤, 고객의 맥락, 세그먼트와 성과 데이터를 함께 읽고 한 줄의 메시지가 행동으로 이어지도록 설계합니다.',
  competencies: [
    { k: 'Segment', v: '고객 맥락과 타겟 조건을 먼저 정의합니다.' },
    { k: 'Message', v: '브랜드 톤과 행동 유도 구조를 함께 설계합니다.' },
    { k: 'Insight', v: '발송 후 성과를 확인하고 다음 캠페인에 반영합니다.' },
  ],
  stats: [
    { text: '4', unit: 'Channels', label: 'CRM 운영 채널', sub: 'App Push · KakaoTalk · LMS · DM Email' },
    { text: '150만+', unit: 'App Push', label: '단일 캠페인 발송 규모', sub: '대규모 타겟 세팅 · QA · 발송 후 리포트 확인' },
    { text: '3+', unit: 'KPI', label: '주요 성과 관리 지표', sub: 'CTR · CVR · GMV · 도달률 · 바이어' },
    { text: '1,000+', unit: 'Contents', label: '네이버 인플루언서 콘텐츠 경험', sub: '팬 4,843 · 이웃 5,150 · SEO 콘텐츠 제작' },
  ],
};

const ABOUT_PARAGRAPHS = [
  '저는 CRM을 발송 업무가 아니라 설계 업무라고 믿습니다. 누가, 어떤 상황에서, 왜 이 메시지를 받아야 하는지를 먼저 정의해야 같은 혜택도 행동으로 이어질 수 있습니다.',
  '문구, 타겟, 발송 시간, 랜딩 링크, 파라미터와 성과 지표까지 한 번에 보며 캠페인을 운영합니다. 발송 후에는 CTR·CVR·GMV와 세그먼트별 반응을 정리해 다음 캠페인의 기준으로 남깁니다.',
];

const SERVICES = [
  { k: '01', t: 'Campaign Context', d: '캠페인의 목적, 브랜드 톤, 상품 특성, 고객 상황을 먼저 정리합니다.' },
  { k: '02', t: 'Message Design', d: '제목·본문·CTA·버튼 구조를 채널과 세그먼트에 맞게 설계합니다.' },
  { k: '03', t: 'Setup & QA', d: '파라미터, 타겟 조건, 발송 시간, 링크·랜딩, 소재를 체크리스트 기반으로 검수합니다.' },
  { k: '04', t: 'Performance Review', d: 'CTR·CVR·GMV·도달률·바이어 지표를 확인하고 리포트와 인사이트로 정리합니다.' },
  { k: '05', t: 'Benchmarking', d: '경쟁사와 타 브랜드 CRM 메시지를 모니터링해 문구와 CTA 패턴을 축적합니다.' },
];

const PROJECTS = [
  {
    id: 'p1',
    image: 'assets/01_brand_crm.png',
    cat: 'Brand CRM · Targeting',
    period: 'Gmarket · 2025 — 현재',
    role: '기존 남성 중심 타겟을 여성 35~59세로 전환 제안해 동일 모수 기준 매출 2배를 확인했습니다.',
    title: '정수기 브랜드 타겟 전환 CRM 메시지 개선',
    problem: '기존 남성 중심 타겟과 푸른색 배너 톤을 재검토하고, 실제 구매 가능성이 높은 여성 타겟 중심으로 메시지 방향을 바꿨습니다.',
    segment: '정수기 브랜드 · 여성 35~59세 · 동일 모수 매출 비교',
    actions: [
      '여성 35~59세 타겟 제안',
      '타겟에 맞춘 배너 톤앤매너와 CTA 구조 조정',
      '동일 모수 기준 매출 성과 비교',
      '이후 분홍 테마 홍보 확장 흐름 확인',
    ],
    compare: {
      title: 'Sales Impact',
      summary: {
        value: '200%+',
        label: '동일 모수 대비 매출 증가',
        caption: '여성 35~59세 타겟 전환 후',
      },
      before: { copy: '남성 중심 타겟 · 푸른색 배너 톤', primary: '1.0x', secondary: '기존 매출' },
      after: { copy: '여성 35~59세 타겟 · 부드러운 배너 톤', primary: '2.0x', secondary: '동일 모수 매출' },
      note: '이후 분홍 테마 홍보로 확장되었습니다.',
    },
    channels: ['KakaoTalk Plus Friend', 'Brand Message', 'Target Proposal'],
    baseline: '브랜드별 메시지 방향 제안',
    metrics: [
      { v: '타겟 제안', label: 'Target', base: '연령층/고객층 기준' },
      { v: '톤 설계', label: 'Message', base: '브랜드 톤앤매너' },
      { v: '소재 검수', label: 'Creative', base: '배너/CTA 구조' },
    ],
    learn: '타겟을 재정의하자 배너 방향과 성과 기준이 더 명확해졌습니다.',
  },
  {
    id: 'p2',
    image: 'assets/02_promotion.png',
    cat: 'Big Promotion · App Push',
    period: 'Gmarket · 2025 — 현재',
    role: '빅스마일데이 등 대형 프로모션에서 앱푸시 발송 세팅, 타겟 조건, 발송 시간, QA를 관리했습니다.',
    title: '빅스마일데이 CRM 발송 운영',
    problem: '대형 프로모션은 발송 규모와 일정 변수가 큽니다. 타겟, 링크, 랜딩, 파라미터를 사전에 맞춰 발송 품질을 관리했습니다.',
    segment: '빅스마일데이 · 대규모 타겟 · 앱푸시 · 발송 QA',
    actions: [
      '행사 목적, 발송 일정, 타겟 조건, 랜딩 흐름 확인',
      '앱푸시 문구와 배너 메시지를 프로모션 맥락에 맞춰 정리',
      '파라미터, 링크, 랜딩 페이지, 발송 시간, 대상 조건 사전 검수',
      '최대 150만+ 규모 앱푸시 발송 후 리포트 확인',
    ],
    compare: {
      title: 'GMV Scale',
      summary: {
        value: '150만+',
        label: '단일 앱푸시 발송 규모',
        caption: '빅스마일데이 발송 세팅 · QA · 리포트 확인',
      },
      beforeLabel: 'Before',
      afterLabel: 'Big Smile Day',
      before: { copy: '일반 프로모션 캠페인 기준', primary: '[기준 GMV]', secondary: '[기준 구매자]' },
      after: { copy: '빅스마일데이 대형 행사 발송 기준', primary: '[행사 GMV]', secondary: '[행사 구매자]' },
      note: '매출 규모는 공개 가능한 범위로 익명화해 입력합니다.',
    },
    channels: ['App Push', 'Big Promotion', 'QA Checklist'],
    baseline: '대규모 발송 운영 안정성',
    metrics: [
      { v: '150만+', label: 'Scale', base: '단일 앱푸시 발송' },
      { v: 'QA 관리', label: 'Quality', base: '링크/랜딩/파라미터' },
      { v: '리포트 확인', label: 'Follow-up', base: '발송 후 결과 확인' },
    ],
    learn: '대규모 발송은 문구보다 세팅 정확도와 사전 QA가 먼저 무너지면 안 됩니다.',
  },
  {
    id: 'p3',
    image: 'assets/03_insight.png',
    cat: 'Performance · Insight',
    period: 'Gmarket · 2025 — 현재',
    role: '발송 후 CTR, CVR, GMV 등 성과를 추적하고 캠페인별 반응 차이를 다음 운영 기준으로 정리했습니다.',
    title: 'CRM 캠페인 실적 추적 및 관리',
    problem: '캠페인은 발송 후 지표를 확인해야 다음 메시지의 기준이 생깁니다. 채널, 타겟 방식, 메시지 구조별 반응을 비교해 개선 포인트를 정리했습니다.',
    segment: '성과 리포트 · CTR/CVR/GMV · 캠페인별 반응 비교',
    actions: [
      '발송 후 CTR, CVR, GMV, 도달률, 바이어 등 주요 지표 확인',
      '캠페인 유형별 클릭 반응과 구매 성과 비교',
      '성과 리포트와 구조 변경 참고본을 익명화/모자이크 가능한 형태로 정리',
      '다음 캠페인에서 조정할 메시지 구조와 운영 포인트 도출',
    ],
    compare: {
      title: 'Performance Signal',
      summary: {
        value: '2.7x',
        label: '대표 캠페인 CTR 차이',
        caption: 'Audience 대비 Scenario 클릭 반응',
      },
      beforeLabel: 'Audience',
      afterLabel: 'Scenario',
      before: { copy: 'Audience 캠페인 기준 CTR', primary: '1.0x', secondary: 'CTR 기준' },
      after: { copy: 'Scenario 캠페인 CTR', primary: '2.7x', secondary: 'Audience 대비' },
      note: '대표 사례로 Scenario 캠페인의 CTR이 Audience 대비 2.7배 높았습니다.',
    },
    channels: ['Performance Report', 'Message Structure', 'Insight'],
    baseline: '성과 추적 기반 개선 루프',
    metrics: [
      { v: 'CTR/CVR', label: 'Click / Conversion', base: '문구·랜딩 반응' },
      { v: 'GMV/바이어', label: 'Purchase', base: '구매 성과 확인' },
      { v: '구조 개선', label: 'Learning', base: '다음 캠페인 반영' },
    ],
    learn: '성과 추적은 단순 보고가 아니라 다음 캠페인의 타겟, 문구, 발송 기준을 조정하는 근거가 됩니다.',
  },
  {
    id: 'p4',
    image: 'assets/04_monotoring.png',
    cat: 'Benchmarking · Insight · CRM Pattern',
    period: 'Ongoing',
    role: '여러 브랜드의 CRM 메시지를 직접 구독하며 메시지 구조, 혜택 표현, CTA, 세그먼트 방식을 비교했습니다.',
    title: 'CRM 메시지 모니터링 & 인사이트 정리',
    problem: '좋은 CRM 메시지는 꾸준한 관찰에서 나옵니다. 타 브랜드의 혜택 표현, CTA, 톤을 비교해 메시지 가설로 정리했습니다.',
    segment: '다이소 · 롯데마트 · 테무 · 롯데리아 등 구독 메시지',
    actions: [
      '플러스친구, 알림톡, 앱푸시를 직접 구독하며 메시지 수집',
      '혜택 표현, 제목 구조, CTA, 이미지 사용 방식 비교',
      '연령/성별/관심사별 문구 톤과 행동 유도 방식 관찰',
      '자사 캠페인에 적용 가능한 패턴과 가설로 정리',
    ],
    compare: {
      title: 'Reference Board',
      summary: {
        value: '4+',
        label: '브랜드 CRM 메시지 비교',
        caption: '혜택 표현 · CTA · 톤앤매너 패턴 정리',
      },
      beforeLabel: 'Before',
      afterLabel: 'After',
      before: { copy: '브랜드별 메시지를 개별 캡처로만 확인', primary: '수집', secondary: '개별 메시지' },
      after: { copy: '혜택 표현, CTA, 톤을 비교 가능한 보드로 정리', primary: '정리', secondary: '패턴/가설' },
      note: '개인 수신 정보와 쿠폰번호는 블러 처리합니다.',
    },
    channels: ['Benchmarking', 'KakaoTalk', 'App Push'],
    baseline: '브랜드별 CRM 패턴 비교',
    metrics: [
      { v: '브랜드 비교', label: 'Brands', base: '모니터링 대상' },
      { v: '메시지 수집', label: 'Messages', base: '구독 메시지' },
      { v: '가설 정리', label: 'Insights', base: '적용 가능 패턴' },
    ],
    learn: '레퍼런스를 많이 보는 것은 단순 참고가 아니라, 다음 메시지의 가설을 더 정교하게 만드는 과정입니다.',
  },
];

const ROUTINE = [
  {
    k: 'Plan', t: '맥락을 먼저 본다',
    d: '문제, 고객, 브랜드, 성공 지표를 먼저 정리합니다. 메시지를 쓰기 전에 누구에게, 왜 지금, 어떤 행동을 기대하는지 정의합니다.',
    sub: ['캠페인 목적 확인', '브랜드 톤앤매너 확인', '타겟/세그먼트 조건 확인', '주요 KPI 정의', '고객 행동 흐름 가설 수립'],
    artifact: '캠페인 브리프',
  },
  {
    k: 'Do', t: '쓰고, 검수하고, 보낸다',
    d: '카피를 쓰고, 소재를 점검하고, 발송 시각과 조건을 확인합니다. 발송 전 체크리스트로 오탈자, 링크, 랜딩, 파라미터, 타겟 조건을 확인합니다.',
    sub: ['메시지/CTA 작성', '이미지 및 소재 검수', '링크/랜딩 확인', '파라미터 확인', '발송 시간 및 대상 확인', '최종 발행'],
    artifact: 'QA 체크리스트',
  },
  {
    k: 'Check', t: '데이터로 다시 본다',
    d: '오픈, 클릭, 전환, 이탈, 응답률을 기준으로 캠페인 결과를 확인합니다. 가설이 맞았는지, 어떤 타겟과 문구에서 반응이 달랐는지 비교합니다.',
    sub: ['도달률 확인', 'CTR 확인', 'CVR 확인', 'GMV/바이어 확인', '세그먼트별 반응 비교', '발송 시간별 반응 확인'],
    artifact: '성과 리포트',
  },
  {
    k: 'Refine', t: '다음 한 줄로 옮긴다',
    d: '잘된 메시지의 패턴은 라이브러리에 남기고, 아쉬웠던 지점은 다음 캠페인의 가설로 바꿉니다.',
    sub: ['Win pattern 정리', '실패 원인 기록', '레퍼런스 보드 업데이트', '다음 캠페인 인사이트 전달'],
    artifact: '패턴 라이브러리',
  },
];

// f: 3=Daily, 2=Weekly, 1=Occasional
const SKILLS = [
  { g: 'CRM Operation', d: '캠페인 운영 · 채널 · 발송', items: [
    { n: 'App Push 운영', f: 3 },
    { n: '카카오톡 플러스친구 운영', f: 3 },
    { n: 'LMS / DM Email 운영', f: 3 },
    { n: '발송 세팅 / 검수', f: 3 },
    { n: '성과 리포트 관리', f: 3 },
    { n: '사내 CRM 운영 시스템', f: 3 },
  ]},
  { g: 'Message & Creative', d: '카피 · 톤 · 소재', items: [
    { n: 'CRM 카피라이팅', f: 3 },
    { n: '제목/본문/CTA 구조 설계', f: 3 },
    { n: '브랜드 톤앤매너 반영', f: 3 },
    { n: '광고 소재 기획', f: 2 },
    { n: '이미지 제작 요청 및 검수', f: 3 },
    { n: 'Photoshop / Illustrator', f: 2 },
    { n: 'CapCut / 숏폼 편집', f: 2 },
  ]},
  { g: 'Data & Insight', d: '성과 · 세그먼트 · 개선', items: [
    { n: 'CTR / CVR / GMV 분석', f: 3 },
    { n: '도달률 / 바이어 지표 확인', f: 3 },
    { n: '세그먼트별 반응 비교', f: 3 },
    { n: '캠페인 리포트 정리', f: 3 },
    { n: '경쟁사 CRM 메시지 모니터링', f: 2 },
    { n: 'Spreadsheet / Excel', f: 3 },
  ]},
  { g: 'Content Marketing', d: 'SEO · 블로그 · 브랜디드 콘텐츠', items: [
    { n: '네이버 인플루언서 운영', f: 2 },
    { n: 'SEO 콘텐츠 기획', f: 2 },
    { n: '리뷰형 콘텐츠 제작', f: 2 },
    { n: '브랜디드 콘텐츠 제작', f: 2 },
    { n: '촬영 / 편집 / 썸네일 구성', f: 2 },
    { n: '숏폼 콘텐츠 제작', f: 2 },
  ]},
  { g: 'Collaboration', d: '협업 · 문서 · 커뮤니케이션', items: [
    { n: '광고주 커뮤니케이션', f: 3 },
    { n: '대행사 커뮤니케이션', f: 3 },
    { n: '영업 조직 협업', f: 3 },
    { n: '제작 요청서 작성', f: 2 },
    { n: '피드백 정리', f: 3 },
    { n: '결과 리포트 공유', f: 3 },
  ]},
];

const VALUES = [
  {
    n: '01',
    t: '고객의 맥락을 먼저 봅니다.',
    d: '누가, 어떤 상황에서, 왜 이 메시지를 받아야 하는지 먼저 정의합니다. 쿠폰보다 사람을 먼저 떠올리고, 메시지를 받는 순간의 고객 상태를 생각합니다.',
  },
  {
    n: '02',
    t: '브랜드의 말투를 지킵니다.',
    d: '혜택을 강조하되 브랜드 이미지와 고객층에 맞는 표현을 선택합니다. 같은 할인 메시지도 브랜드의 색상, 상품군, 연령층, 주 고객층에 따라 다르게 설계합니다.',
  },
  {
    n: '03',
    t: '성과로 판단합니다.',
    d: '문구, 타겟, 발송 시간별 반응을 비교하고 다음 캠페인에 반영합니다. 느낌상 좋다에서 끝내지 않고 CTR, CVR, GMV 등 성과 지표로 다시 확인합니다.',
  },
  {
    n: '04',
    t: '한 번의 캠페인을 다음 자산으로 남깁니다.',
    d: '발송 후 리포트와 인사이트를 정리해 반복 가능한 운영 기준으로 만듭니다. 잘된 메시지의 패턴과 아쉬웠던 지점을 다음 캠페인의 출발선으로 옮깁니다.',
  },
];

const I18N = {
  contactCta:    { ko: '연락하기 →', en: 'Contact →' },
  langToggleAria:{ ko: '언어 변경', en: 'Switch language' },
  enBanner:      { en: 'English version is in preparation — body copy is still in Korean for now. The Profile Q&A on the right is fully bilingual.' },
  enBannerCta:   { en: 'Switch back to Korean' },
};

const CHATBOT_QA = {
  ui: {
    panelTitle:    { ko: '정수정에게 묻기',         en: 'Ask Sujeong' },
    panelSubtitle: { ko: 'CRM Marketer',           en: 'CRM Marketer' },
    bubble:        { ko: '궁금한 점이 있나요?',      en: 'Curious about my work?' },
    greeting:      { ko: '안녕하세요. 아래 질문 중 궁금한 걸 골라보세요.', en: 'Hi — pick a question below and I’ll answer.' },
    closeAria:     { ko: '닫기',                    en: 'Close' },
    askAnother:    { ko: '다른 질문도 골라보세요',   en: 'Pick another question' },
  },
  items: [
    {
      id: 'q1',
      q: { ko: '어떤 CRM 마케터인가요?', en: 'What kind of CRM marketer are you?' },
      a: {
        ko: '저는 메시지를 단순히 발송하는 것이 아니라, 고객의 상황과 브랜드의 말투, 캠페인의 목표를 함께 보고 설계하는 CRM 마케터입니다.\n\nApp Push, 카카오톡 플러스친구, LMS, DM Email을 운영하며 CTR, CVR, GMV 등 성과 지표를 확인하고 다음 캠페인에 반영하는 방식으로 일해왔습니다.',
        en: 'I design CRM campaigns by connecting customer context, brand tone, segments, messages, and performance data.\n\nMy work covers copy planning, setup, QA, and reporting across App Push, KakaoTalk Plus Friend, LMS, and DM Email.',
      },
      jump: { id: 'about', label: { ko: 'About 섹션에서 더 보기', en: 'See full About' } },
    },
    {
      id: 'q2',
      q: { ko: '가장 자신 있는 CRM 채널은 무엇인가요?', en: 'Which CRM channel are you most confident in?' },
      a: {
        ko: '앱푸시와 카카오톡 플러스친구 운영 경험이 가장 많습니다. 짧은 문장 안에서 고객이 지금 확인해야 하는 이유를 설계하고, 브랜드별 톤앤매너에 맞춰 제목, 본문, CTA 구조를 다르게 구성하는 일을 해왔습니다.',
        en: 'KakaoTalk Plus Friend and App Push. I’m used to balancing brand tone, benefit, and CTA in short copy, then reading CTR, CVR, and GMV after send.',
      },
      jump: { id: 'work', label: { ko: 'Featured Work에서 보기', en: 'See Featured Work' } },
    },
    {
      id: 'q3',
      q: { ko: '캠페인을 기획할 때 무엇을 먼저 보나요?', en: 'What do you check first when planning a campaign?' },
      a: {
        ko: '먼저 캠페인의 목적과 고객 맥락을 봅니다. 누구에게 보내는 메시지인지, 고객이 어떤 상황에서 메시지를 받는지, 어떤 행동을 기대하는지 확인한 뒤 문구와 CTA를 설계합니다.',
        en: 'I first define who receives the message, in what situation, and why. Then I check brand tone, product context, benefit structure, landing flow, and KPIs together.',
      },
      jump: { id: 'approach', label: { ko: 'Approach에서 자세히', en: 'See method in Approach' } },
    },
    {
      id: 'q4',
      q: { ko: '브랜드별 메시지는 어떻게 다르게 설계하나요?', en: 'How do you adapt messages by brand?' },
      a: {
        ko: '상품 카테고리, 주 고객층, 브랜드 이미지, 혜택의 성격을 함께 봅니다. 같은 할인 메시지라도 생필품, 식품, 뷰티, 가전 등 카테고리에 따라 강조해야 할 포인트와 말투가 달라진다고 생각합니다.',
        en: 'The same benefit reads differently by brand image and audience. I adjust title, body, and CTA by product strength, expected tone, and the right level of urgency.',
      },
      jump: { id: 'work', label: { ko: '브랜드별 케이스 보기', en: 'See brand cases' } },
    },
    {
      id: 'q5',
      q: { ko: '성과가 낮았던 캠페인은 어떻게 개선하나요?', en: 'How do you improve weak campaigns?' },
      a: {
        ko: 'CTR, CVR, GMV, 도달률, 바이어 수 등 지표를 확인하고 문구, 발송 시간, 세그먼트, CTA 중 어떤 요소가 영향을 줬는지 나눠서 봅니다. 이후 비슷한 캠페인에서 메시지 구조나 타겟 조건을 조정해 다시 테스트합니다.',
        en: 'I separate send time, targeting, copy, landing, and benefit expression. Low CTR points me to hook and CTA; low CVR makes me inspect landing and product context.',
      },
      jump: { id: 'approach', label: { ko: 'Approach에서 자세히', en: 'See more in Approach' } },
    },
    {
      id: 'q6',
      q: { ko: '콘텐츠/인플루언서 경험은 CRM과 어떻게 연결되나요?', en: 'How does content experience connect to CRM?' },
      a: {
        ko: '블로그와 인플루언서 활동을 통해 소비자가 어떤 제목에 반응하고, 어떤 이미지와 구조에서 오래 머무는지 직접 경험했습니다. 이 경험은 CRM 메시지에서도 고객의 클릭 이유와 행동 흐름을 설계하는 데 도움이 됩니다.',
        en: 'SEO and review content trained me to notice what language customers respond to. That helps me connect product benefits with customer language in CRM copy.',
      },
      jump: { id: 'career', label: { ko: 'Career에서 보기', en: 'See Career' } },
    },
    {
      id: 'q7',
      q: { ko: '협업할 때 어떤 방식으로 일하나요?', en: 'How do you collaborate?' },
      a: {
        ko: '요청사항을 그대로 전달하기보다 캠페인 목적, 일정, 수정 포인트, 의사결정 기준을 정리해 공유하려고 합니다. 광고주, 대행사, 영업 조직이 각자 중요하게 보는 지점이 다르기 때문에 공통 목표를 먼저 맞추고 커뮤니케이션합니다.',
        en: 'I align schedule, assets, copy, and performance criteria with advertisers, agencies, and sales teams. Before send I use QA checklists; after send I summarize the next action through reporting.',
      },
      jump: { id: 'contact', label: { ko: 'Contact로 이동', en: 'Jump to Contact' } },
    },
    {
      id: 'q8',
      q: { ko: '연락하려면 어떻게 하나요?', en: 'How can I contact you?' },
      a: {
        ko: '아래 이메일 또는 네이버 인플루언서 링크를 통해 연락하실 수 있습니다.\n\nclearlcrystal@gmail.com',
        en: 'You can contact me through the email or Naver Influencer link below.\n\nclearlcrystal@gmail.com',
      },
      jump: { id: 'contact', label: { ko: 'Contact로 이동', en: 'Jump to Contact' } },
    },
  ],
};

// ---------- small reusable hooks/components ----------

function useInView(threshold = 0.2) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold, root: null });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold, seen]);
  return [ref, seen];
}

function CountUp({ to, suffix = '', duration = 1400, prefix = '' }) {
  const [ref, seen] = useInView(0.4);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}

function Reveal({ children, delay = 0, y = 14, as: Tag = 'div', style, ...rest }) {
  const [ref, seen] = useInView(0.15);
  return (
    <Tag
      ref={ref}
      style={{
        ...style,
        transform: seen ? 'translateY(0)' : `translateY(${y}px)`,
        opacity: 1,
        transition: `transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, opacity 700ms ease ${delay}ms`,
        willChange: 'transform, opacity',
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Photo placeholder — striped, with mono explainer text.
function PhotoSlot({ ratio = '4 / 5', label = 'Portrait — 인물 사진', radius = 16, accent = '#c9a87a', bg = '#f3ead8' }) {
  return (
    <div style={{
      width: '100%', aspectRatio: ratio, borderRadius: radius,
      background: `repeating-linear-gradient(135deg, ${bg}, ${bg} 18px, ${bg}cc 18px, ${bg}cc 36px)`,
      border: `1px dashed ${accent}88`,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
      padding: 16, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
        letterSpacing: '0.08em', color: '#5b524a',
        background: '#ffffffcc', padding: '6px 10px', borderRadius: 999,
        border: `1px solid ${accent}55`,
      }}>{label}</div>
    </div>
  );
}

window.PORTFOLIO_DATA = { PERSON, HERO_COPY, ABOUT_PARAGRAPHS, SERVICES, PROJECTS, ROUTINE, SKILLS, VALUES, CAREER, EDUCATION, I18N, CHATBOT_QA };
window.useInView = useInView;
window.CountUp = CountUp;
window.Reveal = Reveal;
window.PhotoSlot = PhotoSlot;
