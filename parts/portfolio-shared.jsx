// Shared sample data + small primitives both portfolio concepts use.

const PERSON = {
  nameKo: '정수정',
  nameEn: 'Sujeong Jeong',
  role: 'CRM Marketer',
  email: 'sujeong.jeong@example.com',
  yearsExp: 5,
};

const CAREER = [
  {
    period: '2023 — 현재',
    company: '(주)리브앤룩 · Lifestyle Commerce',
    role: 'CRM Marketer · Senior', // TODO: 실제 직함 확인 후 조정
    meta: {
      channels: '알림톡 · 이메일 · 푸시 · 친구톡',
      scale: '월 40+ 캠페인 · VIP 12K',
      tools: 'Braze · GA4 · SQL · Spreadsheet',
    },
    bullets: [
      '월 40+ 캠페인 운영 · 라이프사이클 시퀀스 4종 설계',
      'VIP 12,400명 대상 1:1 큐레이션 운영 · 12M 잔존 +22%',
      '재구매 시퀀스 리뉴얼로 분기 GMV/발송 +18%',
    ],
  },
  {
    period: '2021 — 2023',
    company: '(주)포레스트 · Beauty D2C',
    role: 'CRM Marketer',
    meta: {
      channels: '카카오 알림톡 · 친구톡 · Email',
      scale: '월 25+ 캠페인 · 회원 320K',
      tools: 'CleverTap · Bizm · Amplitude · SQL',
    },
    bullets: [
      '신규 회원 온보딩 시퀀스 0→1 구축 · D14 첫구매 +31%',
      'SQL 세그먼트 운영 체계 도입 · 분기 캠페인 수 2.4배',
      '카카오 알림톡/친구톡 카피 가이드 정리 및 사내 표준화',
    ],
  },
  {
    period: '2020 — 2021',
    company: '(주)디어메이트 · Subscription',
    role: 'Marketing Associate',
    meta: {
      channels: 'Email · App Push',
      scale: '월 12+ 캠페인',
      tools: 'Stibee · Spreadsheet · GA',
    },
    bullets: [
      '이메일/푸시 발송 운영 및 결과 리포트 주간 업무',
      'A/B 테스트 5회 진행 · 평균 Open rate +9%p',
    ],
  },
  {
    period: '2019',
    company: '국민대학교 시각디자인학과 졸업',
    role: 'B.A. Visual Communication Design',
    meta: null,
    bullets: [],
  },
];

const HERO_COPY = {
  eyebrow: 'CRM · Lifecycle · Retention',
  // chosen final headline (also surfaced as Tweak option)
  headlineKo: '고객의 하루에 스며드는 메시지를 설계합니다.',
  headlineEn: 'Designing messages that belong in a customer\u2019s day.',
  sub: '감으로 보내지 않습니다. 세그먼트, 맥락, 카피, 성과까지 — 한 줄의 메시지 뒤에 있는 모든 것을 함께 다룹니다.',
  competencies: [
    { k: 'Segment', v: '쿼리 설계 · 행동 기반 타깃팅' },
    { k: 'Message', v: '카카오/이메일/푸시 카피' },
    { k: 'Insight', v: '성과 리포트 · 개선 루프' },
  ],
  stats: [
    { v: 142, suffix: '+', label: 'CRM Campaigns' },
    { v: 38, suffix: '%', label: 'Avg. Open Lift' },
    { v: 24, suffix: '%', label: 'Reactivation' },
  ],
};

const ABOUT_PARAGRAPHS = [
  '저는 CRM을 ‘발송 업무’가 아니라 고객 경험을 설계하는 일이라고 생각합니다. 같은 쿠폰이라도 누구에게, 언제, 어떤 문장으로 도착하는지에 따라 의미가 달라지니까요.',
  '데이터로 가설을 세우고, 문장으로 그 가설을 전합니다. 보낸 다음에는 반드시 돌아와서 무엇이 통했고 무엇이 통하지 않았는지 정리합니다. 그렇게 한 번의 캠페인이 다음 캠페인의 출발선이 됩니다.',
];

const SERVICES = [
  { k: '01', t: 'CRM Campaign Planning', d: '비즈니스 목표 → 가설 → 세그먼트 → 메시지 → 성과 지표까지 한 흐름으로 설계합니다.' },
  { k: '02', t: 'Customer Segmentation', d: 'RFM, 행동 이벤트, 라이프사이클 단계를 조합한 쿼리 기반 세그먼트를 운영합니다.' },
  { k: '03', t: 'Message Strategy', d: '카카오 알림톡·친구톡, 이메일, 앱 푸시 채널별 톤과 길이를 다르게 설계합니다.' },
  { k: '04', t: 'Reporting & Insight', d: 'Open · Click · Conversion · Reactivation을 캠페인 단위/주차 단위로 리포트하고 개선 포인트를 정리합니다.' },
  { k: '05', t: 'Cross-team Collaboration', d: '디자인·개발·CS·영업과 함께 메시지의 맥락과 운영 가능성을 맞춥니다.' },
];

const PROJECTS = [
  {
    id: 'p1',
    cat: 'Reactivation',
    period: '2024 Q3 · 4w',
    role: 'Lead · 시퀀스 설계 + 카피 + 운영',
    title: '슬리퍼 고객을 깨우는 7일 리텐션 시퀀스',
    problem: '최근 60일 무구매 회원의 재구매 전환이 분기별로 하락 중',
    segment: 'Last purchase 60–120d · 평균 LTV 상위 40%',
    actions: [
      '7일 4단계 시퀀스 설계 (앱푸시 → 알림톡 → 이메일 → 친구톡)',
      '구매 카테고리 기반 동적 추천 블록 적용',
      '쿠폰 노출은 시퀀스 후반에만 노출하여 마진 보호',
    ],
    channels: ['App Push', '알림톡', 'Email', '친구톡'],
    baseline: '60–120d 무구매 세그 · vs control group',
    metrics: [
      { v: '+24%', label: 'Reactivation', base: 'vs control' },
      { v: '+18%', label: 'GMV / 발송', base: 'vs prev quarter' },
      { v: '−12%', label: 'Unsubscribe', base: 'vs prev quarter' },
    ],
    learn: '쿠폰을 먼저 던지지 않는 시퀀스가 마진과 재구매를 동시에 끌어올렸습니다. 메시지 순서가 곧 전략이라는 걸 배웠어요.',
  },
  {
    id: 'p2',
    cat: 'Onboarding',
    period: '2024 Q1 · 6w',
    role: 'Lead · 시퀀스 0→1 + 카피 분기 설계',
    title: '첫 구매까지 3단계 — 신규 회원 온보딩 리뉴얼',
    problem: '가입 후 14일 내 첫 구매율 정체, 이탈은 D+3에 집중',
    segment: '가입 후 0–14d · 첫 구매 전 회원',
    actions: [
      '가입 직후 / D+1 / D+3 세 시점의 트리거 설계',
      '카테고리 관심사 기반 카피 분기 (3 variants)',
      'D+3 미반응자에게만 친구톡 후속 발송',
    ],
    channels: ['Email', 'App Push', '친구톡'],
    baseline: '신규 회원 0–14d · vs prev onboarding',
    metrics: [
      { v: '+31%', label: 'D14 First Purchase', base: 'vs prev onboarding' },
      { v: '+42%', label: 'Open Rate', base: 'vs prev avg' },
      { v: '+1.8x', label: 'CTR', base: 'vs control variant' },
    ],
    learn: '"환영합니다"보다 "당신이 본 카테고리에 새 상품이 들어왔어요"가 훨씬 잘 열렸습니다. 맥락이 곧 카피였어요.',
  },
  {
    id: 'p3',
    cat: 'Retention',
    period: '2023 Q4 — 2024 Q2 · 9mo',
    role: 'Owner · 큐레이션 + 회신 직접 운영',
    title: 'VIP 고객 케어 — 분기 단위 1:1 큐레이션 메시지',
    problem: 'VIP 등급 회원의 1년 잔존이 일반 등급 대비 큰 차이 없음',
    segment: 'VIP 등급 · 최근 90일 활동 있음 · 약 12,400명',
    actions: [
      '구매 카테고리·시즌·요일 패턴을 조합한 1:1 큐레이션',
      '판매 컨텍스트가 아닌 "당신의 취향 노트" 톤으로 카피 통일',
      '응답·답장 회신을 직접 운영하며 인사이트 수집',
    ],
    channels: ['Email', '친구톡'],
    baseline: 'VIP 12.4K · vs prev VIP CRM cohort',
    metrics: [
      { v: '+22%', label: '12M 잔존', base: 'vs prev VIP cohort' },
      { v: '+33%', label: 'VIP NPS', base: 'vs prev quarter' },
      { v: '6.4%', label: '회신율', base: 'industry CRM 평균 1–2%' },
    ],
    learn: '"팔지 않는 메시지"가 가장 잘 팔렸습니다. VIP에게 필요한 건 혜택 알림이 아니라 자기 취향을 정리해주는 사람이었어요.',
  },
];

const ROUTINE = [
  {
    k: 'Plan', t: '맥락을 먼저 본다',
    d: '문제·세그먼트·가설·성공 지표를 한 페이지로 정리합니다. 메시지를 쓰기 전에 "왜 지금, 왜 이 사람에게"를 답합니다.',
    sub: ['문제 정의 + 가설 노트', '타깃 세그먼트 설계 (SQL)', 'KPI · control 기준값 정의'],
    artifact: '1-pager 가설 노트',
  },
  {
    k: 'Do', t: '쓰고, 검수하고, 보낸다',
    d: '카피 → 변수 점검 → 발송 시각 검증 → 운영팀 컨펌 → 발송. 체크리스트로 사람의 실수를 줄입니다.',
    sub: ['메시지·채널 매칭', '변수 + 발송 시각 검증', '운영 리스크 점검'],
    artifact: '발송 체크리스트',
  },
  {
    k: 'Check', t: '데이터로 다시 본다',
    d: 'Open · CTR · 전환 · 이탈 · 응답을 24h / 7d 시점으로 비교합니다. 가설이 맞았는지부터 확인합니다.',
    sub: ['Open · CTR · CVR · Unsub', '24h vs 7d 시점 비교', '세그먼트별 반응 차이'],
    artifact: '24h / 7d 리포트',
  },
  {
    k: 'Refine', t: '다음 한 줄로 옮긴다',
    d: '잘된 메시지의 패턴을 라이브러리에 기록하고, 다음 캠페인의 출발선으로 사용합니다.',
    sub: ['Win pattern 라이브러리 기록', 'Fail 원인 정리', '다음 캠페인 입력값으로 전달'],
    artifact: 'Win patterns Library',
  },
];

// f: 3=Daily, 2=Weekly, 1=Occasional
const SKILLS = [
  { g: 'CRM Operation', d: '캠페인 운영 · 채널 · 발송', items: [
    { n: 'CRM 콘솔 운영', f: 3 },
    { n: 'Braze · CleverTap', f: 2 },
    { n: '카카오 알림톡 · 친구톡', f: 2 },
    { n: 'Email · App Push', f: 2 },
    { n: 'Bizm · Stibee', f: 2 },
  ]},
  { g: 'Data & Segmentation', d: '쿼리 설계 · 세그먼트 운영', items: [
    { n: 'SQL · 세그먼트 쿼리', f: 3 },
    { n: 'Spreadsheet pivot', f: 3 },
    { n: 'GA4', f: 2 },
    { n: 'Amplitude', f: 2 },
    { n: 'Looker', f: 1 },
  ]},
  { g: 'Message & Creative', d: '카피 · 톤 · 소재', items: [
    { n: 'Copywriting', f: 3 },
    { n: 'Figma (시안 협업)', f: 1 },
    { n: 'Photoshop (소재 수정)', f: 1 },
  ]},
  { g: 'Reporting & Insight', d: '결과 · 패턴 · 학습', items: [
    { n: '24h / 7d 리포트', f: 2 },
    { n: 'Win Pattern Library', f: 2 },
    { n: 'Sub-segment 분석', f: 2 },
  ]},
  { g: 'Collaboration', d: '협업 · 문서 · 정렬', items: [
    { n: 'Notion 문서화', f: 1 },
    { n: 'Cross-team brief', f: 2 },
    { n: 'CS · 영업 alignment', f: 2 },
  ]},
];

const VALUES = [
  { n: '01', t: '고객의 맥락을 먼저 본다.', d: '쿼리보다 사람을 먼저 떠올립니다. 누가, 어떤 상태에서, 왜 지금 이 메시지를 받게 되는지를 답한 다음에야 카피를 씁니다.' },
  { n: '02', t: '많이 보내지 않는다, 제때 보낸다.', d: '발송량이 아니라 도착의 의미를 셉니다. 한 번 더 보내는 것보다, 한 번을 더 잘 보내는 데 시간을 씁니다.' },
  { n: '03', t: '감이 아니라 데이터와 맥락으로 판단한다.', d: '"느낌"은 가설일 뿐, 결론은 숫자로 닫습니다. 단 숫자는 항상 control과 함께 봅니다.' },
  { n: '04', t: '한 번의 캠페인을 다음의 출발선으로.', d: '실행 → 기록 → 분석 → 개선의 루틴을 사람의 의지가 아닌 산출물로 강제합니다. 모든 캠페인은 라이브러리에 한 줄을 남기고 끝납니다.' },
];

// ---------- small reusable hooks/components ----------

function useInView(threshold = 0.2) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold, root: ref.current.closest('[data-scroll-root]') || null });
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
      // easeOutCubic
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
        opacity: seen ? 1 : 0,
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

window.PORTFOLIO_DATA = { PERSON, HERO_COPY, ABOUT_PARAGRAPHS, SERVICES, PROJECTS, ROUTINE, SKILLS, VALUES, CAREER };
window.useInView = useInView;
window.CountUp = CountUp;
window.Reveal = Reveal;
window.PhotoSlot = PhotoSlot;
