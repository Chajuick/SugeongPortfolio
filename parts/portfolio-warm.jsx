// Concept A — Editorial Modern (v3, full overhaul addressing 15-point review).

const PortfolioWarm = ({ palette = 'ivoryCoral' }) => {
  const D = window.PORTFOLIO_DATA;
  const { Reveal, CountUp, PhotoSlot } = window;

  const palettes = {
    ivoryCoral:  { bg:'#f6f3ec', bgTint:'#f1ede3', paper:'#ffffff', ink:'#15110d', mute:'#6b6259', faint:'#a59c92', line:'#e7e0d2', accent:'#c0584a', accentSoft:'#f3dccf' },
    softPink:    { bg:'#faf2ed', bgTint:'#f4eae4', paper:'#ffffff', ink:'#1c1410', mute:'#7a6660', faint:'#a99891', line:'#eedcd1', accent:'#d97a86', accentSoft:'#f8dad8' },
    mustard:     { bg:'#f6efe0', bgTint:'#f0e8d6', paper:'#ffffff', ink:'#1a1610', mute:'#695e44', faint:'#a09879', line:'#e6dabd', accent:'#b88019', accentSoft:'#efdfa6' },
  };
  const c = palettes[palette] || palettes.ivoryCoral;

  // detect artboard width once on mount (mobile breakpoint)
  const rootRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = rootRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setIsMobile(el.clientWidth < 720));
    ro.observe(el); return () => ro.disconnect();
  }, []);

  const goTo = (id) => {
    const root = rootRef.current; if (!root) return;
    const el = root.querySelector(`[data-anchor="${id}"]`);
    if (!el) return;
    root.scrollTo({ top: el.offsetTop - (isMobile ? 56 : 64), behavior: 'smooth' });
  };

  const [active, setActive] = React.useState('home');
  React.useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const handler = () => {
      const ids = ['home','work','about','career','approach','contact'];
      const y = root.scrollTop + 120;
      let cur = 'home';
      for (const id of ids) { const el = root.querySelector(`[data-anchor="${id}"]`); if (el && el.offsetTop <= y) cur = id; }
      setActive(cur);
    };
    root.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => root.removeEventListener('scroll', handler);
  }, []);

  // ---- styles ----
  const root = {
    width: '100%', height: '100%', background: c.bg, color: c.ink,
    overflowY: 'auto', overflowX: 'hidden',
    fontFamily: "'Pretendard', 'Inter', sans-serif",
    fontWeight: 400, position: 'relative',
    wordBreak: 'keep-all', overflowWrap: 'break-word',
  };
  const wrap = isMobile
    ? { maxWidth: '100%', margin: '0 auto', padding: '0 24px' }
    : { maxWidth: 1200, margin: '0 auto', padding: '0 56px' };
  const eyebrow = { fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: c.mute };
  const cta = { background: c.ink, color: c.bg, padding: '12px 22px', borderRadius: 999, fontSize: 13.5, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none', fontWeight: 500, fontFamily: 'inherit' };
  const ctaGhost = { ...cta, background: 'transparent', color: c.ink, border: `1px solid ${c.ink}` };

  const navBar = { position: 'sticky', top: 0, zIndex: 5, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: c.bg + 'd9', borderBottom: `1px solid ${c.line}` };
  const navInner = { ...wrap, height: isMobile ? 56 : 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
  const logo = { fontSize: isMobile ? 14 : 16, fontWeight: 700, letterSpacing: '-0.02em' };
  const logoDot = { display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: c.accent, marginRight: 10, verticalAlign: 'middle' };
  const navLinks = { display: isMobile ? 'none' : 'flex', gap: 28, fontSize: 13.5, color: c.mute };
  const navLink = (id) => ({ cursor: 'pointer', color: active === id ? c.ink : c.mute, fontWeight: active === id ? 600 : 500, transition: 'color .2s ease' });

  // section heading — left title block, right lead aligned to baseline
  const secHead = isMobile
    ? { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }
    : { display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'end', marginBottom: 56, paddingBottom: 24, borderBottom: `1px solid ${c.line}` };
  const secNum = { fontSize: 12, fontWeight: 600, color: c.faint, letterSpacing: '0.06em', textTransform: 'uppercase' };
  const secTitle = { fontSize: isMobile ? 32 : 44, lineHeight: 1.2, margin: '8px 0 0', letterSpacing: '-0.025em', fontWeight: 700, maxWidth: 720 };
  const secLead = { fontSize: 15, color: c.mute, lineHeight: 1.7, margin: 0, textAlign: 'left', paddingBottom: 6 };
  const secWrap = { ...wrap, paddingTop: isMobile ? 64 : 112, paddingBottom: isMobile ? 64 : 112 };

  // hero — content-led; portrait reduced; breathing room between blocks; no white cards
  const heroWrap = { ...wrap, paddingTop: isMobile ? 40 : 72, paddingBottom: isMobile ? 40 : 64 };
  const heroGrid = { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.25fr 0.65fr', gap: isMobile ? 32 : 72, alignItems: 'center' };
  const heroH = { fontSize: isMobile ? 38 : 60, lineHeight: 1.08, margin: '18px 0 26px', letterSpacing: '-0.035em', fontWeight: 700 };
  const heroSub = { fontSize: isMobile ? 14.5 : 15.5, lineHeight: 1.7, color: c.mute, margin: '0 0 36px', maxWidth: 520, fontWeight: 400 };
  // competencies — borderless rule-line row, mirrors Selected Metrics language
  const competencyRow = {
    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`,
    marginBottom: 40,
  };
  const ctaText = { background: 'transparent', color: c.mute, padding: '12px 4px', fontSize: 13.5, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', fontWeight: 500, fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 4, textDecorationColor: c.line };

  return (
    <div ref={rootRef} data-scroll-root data-pwarm style={root}>
      <style>{`
        [data-pwarm] { word-break: keep-all !important; overflow-wrap: break-word !important; line-break: strict !important; }
        [data-pwarm] h1, [data-pwarm] h2, [data-pwarm] h3 { word-break: keep-all !important; }
        [data-warm-link]:hover { color: ${c.accent} !important; }
        [data-warm-tab]:hover { color: ${c.ink}; }
        [data-warm-chip]:hover { border-color: ${c.ink}; }
        [data-warm-srow]:hover { padding-left: 12px; }
        [data-warm-srow] { transition: padding-left .25s ease; }
        [data-warm-srow]:hover .warm-arrow { opacity: 1; transform: translateX(0); }
        .warm-arrow { opacity: 0; transform: translateX(-6px); transition: all .25s ease; color: ${c.accent}; display: inline-block; margin-left: 8px; }
        [data-warm-hscroll] { scrollbar-width: none; -ms-overflow-style: none; }
        [data-warm-hscroll]::-webkit-scrollbar { display: none; width: 0; height: 0; }
        [data-warm-shotcard] { transition: transform .35s ease, border-color .25s ease; }
        [data-warm-shotcard]:hover { transform: translateY(-3px); border-color: ${c.faint}; }
        @keyframes warmDragHint {
          0%, 100% { transform: translateX(0); opacity: 0.7; }
          50% { transform: translateX(4px); opacity: 1; }
        }
      `}</style>

      {/* nav — slim, 5 items */}
      <div style={navBar}>
        <div style={navInner}>
          <div style={logo}><span style={logoDot}></span>{D.PERSON.nameKo}</div>
          <div style={navLinks}>
            {[['home','Home'],['work','Work'],['about','About'],['career','Career'],['approach','Approach'],['contact','Contact']].map(([id,l]) => (
              <span key={id} style={navLink(id)} data-warm-link onClick={() => goTo(id)}>{l}</span>
            ))}
          </div>
          <button style={cta} onClick={() => goTo('contact')}>연락하기 →</button>
        </div>
      </div>

      {/* hero — content-led; portrait as smaller editorial anchor */}
      <section data-anchor="home" data-screen-label="01 Hero" style={heroWrap}>
        <div style={heroGrid}>
          <div>
            <Reveal>
              <div style={{...eyebrow, fontFamily: "'IBM Plex Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: c.mute}}>
                CRM MARKETER · SEOUL · 5 YEARS
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 style={heroH}>
                <span style={{whiteSpace: 'nowrap'}}>고객의 하루에</span><br/>
                <span style={{whiteSpace: 'nowrap'}}><span style={{color: c.accent}}>스며드는</span> 메시지를</span><br/>
                <span style={{whiteSpace: 'nowrap'}}>설계합니다.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p style={heroSub}>{D.HERO_COPY.sub}</p>
            </Reveal>

            {/* core competencies — borderless rule-line row, mirrors Selected Metrics language */}
            <Reveal delay={180}>
              <div style={competencyRow}>
                {D.HERO_COPY.competencies.map((cm, i) => (
                  <div key={cm.k} style={{
                    padding: isMobile ? '16px 0' : '18px 0',
                    paddingLeft: !isMobile && i > 0 ? 22 : 0,
                    paddingRight: !isMobile && i < 2 ? 22 : 0,
                    borderRight: !isMobile && i < 2 ? `1px solid ${c.line}` : 'none',
                    borderBottom: isMobile && i < 2 ? `1px solid ${c.line}` : 'none',
                  }}>
                    <div style={{display: 'flex', alignItems: 'baseline', gap: 8}}>
                      <span style={{fontSize: 11.5, fontWeight: 600, color: c.faint, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em'}}>0{i+1}</span>
                      <span style={{fontSize: 12.5, fontWeight: 700, color: c.accent, letterSpacing: '0.1em', textTransform: 'uppercase'}}>{cm.k}</span>
                    </div>
                    <div style={{fontSize: 14.5, color: c.ink, marginTop: 10, lineHeight: 1.5}}>{cm.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* CTAs — primary / secondary / tertiary */}
            <Reveal delay={220}>
              <div style={{display:'flex', gap:10, flexWrap:'wrap', alignItems: 'center'}}>
                <button style={cta} onClick={() => goTo('work')}>View Work →</button>
                <a href={`mailto:${D.PERSON.email}`} style={{...ctaGhost, textDecoration:'none'}}>Email</a>
                <a href="#" onClick={(e) => e.preventDefault()} style={ctaText}>Resume ↓</a>
              </div>
            </Reveal>
          </div>

          {/* portrait — magazine-tone, ~50% of previous footprint */}
          <Reveal delay={120}>
            <div style={{position: 'relative', width: '100%', maxWidth: isMobile ? 320 : 410, aspectRatio: '4/5', marginLeft: isMobile ? 0 : 'auto', marginRight: isMobile ? 'auto' : 0, transform: isMobile ? 'none' : 'translateX(-48px)'}}>
              <svg viewBox="0 0 400 500" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="warmCircle" cx="50%" cy="45%" r="58%">
                    <stop offset="0%" stopColor={c.accentSoft} stopOpacity="0.85"/>
                    <stop offset="100%" stopColor={c.accentSoft} stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="400" height="500" fill={c.bg}/>
                <circle cx="200" cy="240" r="180" fill="url(#warmCircle)"/>
              </svg>
              <img
                src="assets/portrait.png"
                alt={`${D.PERSON.nameKo} portrait`}
                style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  height: '100%', width: 'auto', objectFit: 'contain', objectPosition: 'bottom',
                  display: 'block',
                  filter: 'saturate(0.82) contrast(1.06) sepia(0.06) brightness(0.99)',
                }}
              />
              {/* editorial caption — mono, smaller */}
              <div style={{
                position: 'absolute', bottom: -10, left: 12, background: c.paper,
                padding: '8px 13px', border: `1px solid ${c.line}`, borderRadius: 3,
                fontSize: 11.5, color: c.ink, fontWeight: 500,
                boxShadow: '0 8px 24px -16px rgba(0,0,0,0.18)',
                fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>{D.PERSON.nameKo} · CRM @ Seoul</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Selected Metrics — bridge with explicit baselines (5-sec trust signal) */}
      <div style={{...wrap, paddingTop: isMobile ? 16 : 24, paddingBottom: isMobile ? 32 : 48}}>
        <Reveal>
          <div style={{fontSize: 12, fontWeight: 700, color: c.faint, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'IBM Plex Mono', monospace"}}>
            Selected metrics · 대표 성과
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`,
          }}>
            {[
              { v: 142, suffix: '+', l: 'CRM Campaigns shipped', sub: '2021 – 2025 · 4년 누적' },
              { v: 38, suffix: '%', l: 'Avg. open rate lift', sub: 'vs 직전 분기 평균' },
              { v: 24, suffix: '%', l: 'Reactivation lift', sub: '60–120일 무구매 · vs control' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: isMobile ? '20px 0' : '24px 24px 24px 0',
                borderRight: !isMobile && i < 2 ? `1px solid ${c.line}` : 'none',
                borderBottom: isMobile && i < 2 ? `1px solid ${c.line}` : 'none',
                paddingLeft: !isMobile && i > 0 ? 24 : 0,
              }}>
                <div style={{fontSize: isMobile ? 40 : 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: c.ink}}>
                  <CountUp to={s.v} suffix={s.suffix} />
                </div>
                <div style={{fontSize: 14, color: c.ink, marginTop: 12, fontWeight: 600}}>{s.l}</div>
                <div style={{fontSize: 12.5, color: c.faint, marginTop: 4, fontWeight: 500, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.02em'}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* WORK — single horizontal-scroll case study experience */}
      <section data-anchor="work" data-screen-label="02 Work" style={{...secWrap, paddingLeft: 0, paddingRight: 0}}>
        <div style={wrap}>
          <div style={secHead}>
            <div>
              <div style={secNum}>02 — Featured Work</div>
              <h2 style={secTitle}>지난 분기, 이런 메시지를 보냈습니다.</h2>
            </div>
            <p style={secLead}>각 케이스는 화면, 결과, 그리고 그 결과에서 배운 한 줄을 같이 보여줍니다.</p>
          </div>
        </div>

        <CaseStrip c={c} isMobile={isMobile} wrap={wrap} />
      </section>

      {/* ABOUT — pull quote + 4 working principles (operational, not emotional) */}
      {/* tinted bg (~2.5% darker) creates a subtle "thinking chapter" feel */}
      <section data-anchor="about" data-screen-label="03 About" style={{
        background: c.bgTint,
        paddingTop: isMobile ? 64 : 112,
        paddingBottom: isMobile ? 64 : 112,
      }}>
        <div style={wrap}>
          <div style={secHead}>
            <div>
              <div style={secNum}>03 — About</div>
              <h2 style={secTitle}>일하는 방식 4가지.</h2>
            </div>
            <p style={secLead}>CRM 마케터로 일을 잘하기 위해 매일 지키려고 하는 네 가지 원칙입니다.</p>
          </div>

          <Reveal>
            <p style={{
              fontSize: isMobile ? 22 : 30, lineHeight: 1.4, margin: '0 0 48px', fontWeight: 600,
              letterSpacing: '-0.025em', color: c.ink, maxWidth: 820,
            }}>
              CRM은 발송 업무가 아닌 <span style={{color: c.accent}}>설계 업무</span>라고 믿습니다.
              누구에게, 언제, 어떤 문장으로 도착하는지에 따라 같은 메시지의 의미는 달라지니까요.
            </p>
          </Reveal>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            borderTop: `1px solid ${c.line}`,
          }}>
            {D.VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 70}>
                <div style={{
                  padding: isMobile ? '24px 0' : '28px 0',
                  paddingRight: !isMobile && i % 2 === 0 ? 32 : 0,
                  paddingLeft: !isMobile && i % 2 === 1 ? 32 : 0,
                  borderRight: !isMobile && i % 2 === 0 ? `1px solid ${c.line}` : 'none',
                  borderBottom: `1px solid ${c.line}`,
                  minHeight: isMobile ? 'auto' : 200,
                }}>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14}}>
                    <span style={{fontSize: 12, fontWeight: 700, color: c.faint, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.06em'}}>{v.n}</span>
                    <span style={{flex: 1, height: 1, background: c.line}}></span>
                  </div>
                  <h3 style={{fontSize: isMobile ? 19 : 21, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.35, color: c.ink}}>
                    {v.t}
                  </h3>
                  <p style={{fontSize: 14.5, lineHeight: 1.7, color: c.mute, margin: 0}}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER — timeline */}
      <section data-anchor="career" data-screen-label="04 Career" style={secWrap}>
        <div style={secHead}>
          <div>
            <div style={secNum}>04 — Career</div>
            <h2 style={secTitle}>5년의 발자국,<br/>매달 보낸 메시지로 쌓였습니다.</h2>
          </div>
          <p style={secLead}>운영 → 기획 → 시퀀스 설계로 무게중심을 옮겨 왔습니다.</p>
        </div>
        <div>
          {D.CAREER.map((job, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '160px 1fr',
                gap: isMobile ? 12 : 40,
                padding: isMobile ? '28px 0' : '36px 0',
                borderTop: `1px solid ${c.line}`,
                borderBottom: i === D.CAREER.length - 1 ? `1px solid ${c.line}` : 'none',
                alignItems: 'start',
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 600, color: c.faint, letterSpacing: '0.04em',
                  fontFamily: "'IBM Plex Mono', monospace", paddingTop: 4,
                }}>{job.period}</div>

                <div>
                  {/* company + role row */}
                  <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 12, marginBottom: 4}}>
                    <span style={{fontSize: isMobile ? 18 : 19, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.35}}>{job.company}</span>
                    <span style={{fontSize: 13.5, color: c.accent, fontWeight: 600}}>{job.role}</span>
                  </div>

                  {/* meta strip — channels / scale / tools */}
                  {job.meta && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                      gap: isMobile ? 4 : 0,
                      margin: '14px 0 16px',
                      padding: '12px 0',
                      borderTop: `1px solid ${c.line}`,
                      borderBottom: `1px solid ${c.line}`,
                    }}>
                      {[
                        ['Channels', job.meta.channels],
                        ['Scale', job.meta.scale],
                        ['Tools', job.meta.tools],
                      ].map(([k, v], j) => (
                        <div key={k} style={{
                          paddingLeft: !isMobile && j > 0 ? 16 : 0,
                          paddingRight: !isMobile && j < 2 ? 16 : 0,
                          borderRight: !isMobile && j < 2 ? `1px solid ${c.line}` : 'none',
                        }}>
                          <div style={{fontSize: 11, fontWeight: 700, color: c.faint, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace", marginBottom: 5}}>{k}</div>
                          <div style={{fontSize: 13.5, color: c.ink, lineHeight: 1.5}}>{v}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* bullets */}
                  {job.bullets.length > 0 && (
                    <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
                      {job.bullets.map((b, j) => (
                        <li key={j} style={{fontSize: 14.5, lineHeight: 1.7, color: c.mute, paddingLeft: 14, position: 'relative', marginBottom: 6}}>
                          <span style={{position: 'absolute', left: 0, top: 12, width: 6, height: 1, background: c.faint}}></span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APPROACH — services + routine merged into one editorial flow with artifacts */}
      {/* tinted bg matches About — pairs as the two "thinking/method" chapters */}
      <section data-anchor="approach" data-screen-label="05 Approach" style={{
        background: c.bgTint,
        paddingTop: isMobile ? 64 : 112,
        paddingBottom: isMobile ? 64 : 112,
      }}>
        <div style={wrap}>
          <div style={secHead}>
            <div>
              <div style={secNum}>05 — Approach</div>
              <h2 style={secTitle}>한 번의 캠페인이<br/>다음 캠페인의 출발선이 되도록.</h2>
            </div>
            <p style={secLead}>가설 → 실행 → 검증 → 개선. 각 단계마다 산출물 한 가지를 남깁니다.</p>
          </div>
          <div>
          {D.ROUTINE.map((r, i) => (
            <Reveal key={r.k} delay={i * 80}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '240px 1fr 200px',
                gap: isMobile ? 16 : 40,
                padding: isMobile ? '28px 0' : '36px 0',
                borderTop: `1px solid ${c.line}`,
                borderBottom: i === D.ROUTINE.length - 1 ? `1px solid ${c.line}` : 'none',
                alignItems: 'start',
              }}>
                <div>
                  <div style={{fontSize: 12, fontWeight: 700, color: c.accent, letterSpacing: '0.08em', marginBottom: 10, fontFamily: "'IBM Plex Mono', monospace"}}>0{i+1} · {r.k.toUpperCase()}</div>
                  <h3 style={{fontSize: isMobile ? 22 : 24, fontWeight: 700, margin: 0, letterSpacing: '-0.025em', lineHeight: 1.3}}>{r.t}</h3>
                </div>
                <div style={{paddingTop: isMobile ? 0 : 4}}>
                  <p style={{fontSize: 15, lineHeight: 1.7, color: c.mute, margin: '0 0 16px'}}>{r.d}</p>
                  <ul style={{listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8}}>
                    {r.sub && r.sub.map((s, j) => (
                      <li key={j} style={{
                        fontSize: 14, color: c.ink, paddingLeft: 18, position: 'relative', lineHeight: 1.55,
                      }}>
                        <span style={{
                          position: 'absolute', left: 0, top: 10, width: 8, height: 1, background: c.accent,
                        }}></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{
                  fontSize: 12, padding: '12px 16px', background: c.bg, borderRadius: 4,
                  border: `1px solid ${c.line}`, color: c.mute, fontWeight: 500,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  justifySelf: isMobile ? 'start' : 'end',
                  marginTop: isMobile ? 0 : 4, whiteSpace: 'nowrap',
                  fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em',
                }}>
                  <span style={{color: c.faint}}>→ ARTIFACT</span>
                  <span style={{color: c.ink, fontWeight: 600}}>{r.artifact}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skills — function-based with frequency dots */}
        <div style={{marginTop: isMobile ? 56 : 96}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 8}}>
            <div style={{...secNum, fontSize: 13}}>Skills · 기능별 · 빈도 표시</div>
            <div style={{fontSize: 12, color: c.faint, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em', display: 'flex', gap: 16}}>
              <span><span style={{color: c.accent, fontWeight: 700}}>●●●</span> Daily</span>
              <span><span style={{color: c.accent, fontWeight: 700}}>●●</span><span style={{color: c.line}}>●</span> Weekly</span>
              <span><span style={{color: c.accent, fontWeight: 700}}>●</span><span style={{color: c.line}}>●●</span> Occasional</span>
            </div>
          </div>
          <SkillsGrid c={c} isMobile={isMobile} />
        </div>
        </div>
      </section>

      {/* CONTACT */}
      <section data-anchor="contact" data-screen-label="06 Contact" style={{...wrap, paddingTop: isMobile ? 80 : 140, paddingBottom: isMobile ? 80 : 140, textAlign: 'center'}}>
        <Reveal>
          <div style={{...secNum, marginBottom: 24}}>06 — Contact</div>
          <h2 style={{fontSize: isMobile ? 44 : 76, lineHeight: 1.05, margin: '0 0 28px', letterSpacing: '-0.035em', fontWeight: 700}}>
            <span style={{whiteSpace: 'nowrap'}}>같이 일해 볼까요?</span>
          </h2>
          <p style={{fontSize: isMobile ? 15 : 16.5, color: c.mute, margin: '0 0 36px', lineHeight: 1.7}}>
            제 메시지가 당신의 고객에게도<br/>자연스럽게 도착할 수 있도록.
          </p>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <a href={`mailto:${D.PERSON.email}`} style={{...cta, textDecoration:'none'}}>{D.PERSON.email} →</a>
            <a href="#" style={{...ctaGhost, textDecoration:'none'}} onClick={(e) => e.preventDefault()}>Resume.pdf ↓</a>
          </div>
          <div style={{marginTop: 48, fontSize: 14, color: c.mute, fontWeight: 500, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap'}}>
            <span data-warm-link style={{cursor:'pointer'}}>LinkedIn</span>
            <span data-warm-link style={{cursor:'pointer'}}>Brunch</span>
            <span data-warm-link style={{cursor:'pointer'}}>Notion Resume</span>
          </div>
        </Reveal>
      </section>

      <div style={{borderTop: `1px solid ${c.line}`, padding: isMobile ? '20px 24px' : '24px 56px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize: 13, color: c.faint, fontWeight: 500, paddingBottom: isMobile ? 88 : undefined}}>
        <span>© 2026 {D.PERSON.nameKo}</span>
        <span>v.2026.05</span>
      </div>

      {/* mobile sticky CTA — Email · Resume */}
      {isMobile && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: c.bg + 'ee', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderTop: `1px solid ${c.line}`,
          padding: '10px 16px',
          display: 'flex', gap: 8,
          paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
        }}>
          <a href={`mailto:${D.PERSON.email}`} style={{
            ...cta, flex: 1, justifyContent: 'center', textDecoration: 'none', padding: '12px 16px',
          }}>Email →</a>
          <a href="#" onClick={(e) => e.preventDefault()} style={{
            ...ctaGhost, flex: 1, justifyContent: 'center', textDecoration: 'none', padding: '12px 16px',
          }}>Resume ↓</a>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Skills — function-based grouping with frequency dots (Daily/Weekly/Occasional)
function SkillsGrid({ c, isMobile }) {
  const D = window.PORTFOLIO_DATA;
  const FreqDots = ({ f }) => (
    <span style={{
      fontSize: 12, letterSpacing: '0.1em', fontFamily: "'IBM Plex Mono', monospace",
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      <span style={{color: c.accent}}>{'●'.repeat(f)}</span>
      <span style={{color: c.line}}>{'●'.repeat(3 - f)}</span>
    </span>
  );
  return (
    <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 24 : 0}}>
      {D.SKILLS.map((g, i) => {
        const isRightCol = !isMobile && i % 2 === 1;
        const isLeftCol = !isMobile && i % 2 === 0;
        const hasRightNeighbor = isLeftCol && i + 1 < D.SKILLS.length;
        return (
          <div key={g.g} style={{
            paddingLeft: isRightCol ? 32 : 0,
            paddingRight: isLeftCol ? 32 : 0,
            paddingTop: !isMobile && i >= 2 ? 24 : 0,
            paddingBottom: 24,
            borderTop: !isMobile && i >= 2 ? `1px solid ${c.line}` : 'none',
            borderRight: hasRightNeighbor ? `1px solid ${c.line}` : 'none',
            borderBottom: isMobile && i < D.SKILLS.length - 1 ? `1px solid ${c.line}` : 'none',
          }}>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6}}>
              <span style={{fontSize: 12.5, fontWeight: 700, color: c.ink, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace"}}>{g.g}</span>
            </div>
            <div style={{fontSize: 12.5, color: c.faint, marginBottom: 14, letterSpacing: '0.01em'}}>{g.d}</div>
            <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
              {g.items.map((it) => (
                <li key={it.n} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  fontSize: 14.5, color: c.ink, padding: '10px 0',
                  borderBottom: `1px solid ${c.line}`,
                }}>
                  <span>{it.n}</span>
                  <FreqDots f={it.f} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Horizontal-scroll case strip — UNIFIED palette (paper + ink only, accent as small mark)
function CaseStrip({ c, isMobile, wrap }) {
  const D = window.PORTFOLIO_DATA;
  const scrollerRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [maxScroll, setMaxScroll] = React.useState(1);

  React.useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setMaxScroll(max || 1);
      setProgress(el.scrollLeft);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update); ro.observe(el);
    return () => { el.removeEventListener('scroll', update); ro.disconnect(); };
  }, []);

  const scrollBy = (dir) => {
    const el = scrollerRef.current; if (!el) return;
    el.scrollBy({ left: dir * (isMobile ? 320 : 480), behavior: 'smooth' });
  };

  // Bleed strip: starts at content padding, but cards extend out of right edge to signal more
  const sidePad = isMobile ? 24 : 56;
  const atStart = progress <= 8;
  const atEnd = progress >= maxScroll - 8;
  const totalCases = D.PROJECTS.length;
  const currentIdx = Math.min(totalCases, Math.round((progress / maxScroll) * (totalCases - 1)) + 1);

  return (
    <div style={{position: 'relative', marginTop: isMobile ? 0 : 8}}>
      {/* scroller + edge fade masks */}
      <div style={{position: 'relative'}}>
        <div
          ref={scrollerRef}
          data-warm-hscroll
          style={{
            display: 'flex', gap: 16, overflowX: 'auto', overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            padding: `8px ${sidePad}px 28px`,
            scrollPaddingLeft: sidePad,
          }}
        >
          {D.PROJECTS.map((p, i) => (
            <CaseCard key={p.id} c={c} project={p} index={i} isMobile={isMobile} />
          ))}
          <div style={{flex: `0 0 ${sidePad}px`}}></div>
        </div>

        {/* left fade — only after first scroll */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, bottom: 28, left: 0, width: isMobile ? 32 : 72,
          pointerEvents: 'none',
          background: `linear-gradient(to right, ${c.bg}, ${c.bg}00)`,
          opacity: atStart ? 0 : 1, transition: 'opacity .25s ease',
        }} />
        {/* right fade — until end; signals "more cases here" */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, bottom: 28, right: 0, width: isMobile ? 40 : 88,
          pointerEvents: 'none',
          background: `linear-gradient(to left, ${c.bg}, ${c.bg}00)`,
          opacity: atEnd ? 0 : 1, transition: 'opacity .25s ease',
        }} />
      </div>

      {/* control bar — drag hint · progress · counter · arrows */}
      <div style={{
        ...wrap, display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20, marginTop: 16,
      }}>
        {/* drag hint — fades after first interaction */}
        <div aria-hidden="true" style={{
          fontSize: 12, color: c.faint, fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap',
          opacity: atStart ? 1 : 0, transition: 'opacity .3s ease',
          display: isMobile ? 'none' : 'block',
        }}>
          <span style={{display: 'inline-block', animation: 'warmDragHint 1.6s ease-in-out infinite'}}>↔</span> drag
        </div>

        <div style={{flex: 1, height: 2, background: c.line, borderRadius: 999, overflow: 'hidden', minWidth: 40}}>
          <div style={{
            height: '100%', width: `${Math.max(8, (progress / maxScroll) * 100)}%`,
            background: c.ink, borderRadius: 999, transition: 'width .15s linear',
          }}></div>
        </div>

        {/* counter — n of total */}
        <div style={{
          fontSize: 12.5, color: c.mute, fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.04em', whiteSpace: 'nowrap',
        }}>{String(currentIdx).padStart(2, '0')} / {String(totalCases).padStart(2, '0')}</div>

        <div style={{display:'flex', gap:8}}>
          <button onClick={() => scrollBy(-1)} aria-label="이전" disabled={atStart} style={{
            width: 40, height: 40, borderRadius: 999, background: 'transparent',
            border: `1px solid ${c.line}`, cursor: atStart ? 'default' : 'pointer', fontSize: 16,
            color: atStart ? c.faint : c.ink, fontFamily: 'inherit', opacity: atStart ? 0.5 : 1,
            transition: 'opacity .2s ease, color .2s ease',
          }}>←</button>
          <button onClick={() => scrollBy(1)} aria-label="다음" disabled={atEnd} style={{
            width: 40, height: 40, borderRadius: 999, background: atEnd ? 'transparent' : c.ink,
            border: `1px solid ${atEnd ? c.line : c.ink}`, cursor: atEnd ? 'default' : 'pointer', fontSize: 16,
            color: atEnd ? c.faint : c.bg, fontFamily: 'inherit', opacity: atEnd ? 0.5 : 1,
            transition: 'opacity .2s ease, background .2s ease',
          }}>→</button>
        </div>
      </div>
    </div>
  );
}

// Numeric metric parser — handles "+24%", "−12%", "1.8x", "34.5%"
function _parseMetric(s) {
  const str = String(s);
  const m = str.match(/^([+\-−])?\s*(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { num: 0, sign: '', rest: str, dec: 0 };
  const numStr = m[2];
  const dec = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { num: parseFloat(numStr), sign: m[1] || '', rest: m[3] || '', dec };
}

// Animates between Before and After when showAfter changes.
// playKey increments to force a snap-reset (no backwards animation on viewport re-entry).
function MorphMetric({ before, after, showAfter, playKey = 0, duration = 900 }) {
  const b = React.useMemo(() => _parseMetric(before), [before]);
  const a = React.useMemo(() => _parseMetric(after), [after]);
  const target = showAfter ? a.num : b.num;
  const dec = Math.max(b.dec, a.dec);
  const sign = showAfter ? a.sign : b.sign;
  const rest = (showAfter ? a.rest : b.rest) || '';
  const [n, setN] = React.useState(b.num);
  const nRef = React.useRef(b.num);

  // Snap-reset to Before when playKey changes (no backwards anim)
  React.useEffect(() => {
    nRef.current = b.num;
    setN(b.num);
  }, [playKey, b.num]);

  // Animate to target whenever target changes
  React.useEffect(() => {
    const start = performance.now();
    const startVal = nRef.current;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = startVal + (target - startVal) * eased;
      nRef.current = v;
      setN(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  const displaySign = n < 0 ? '−' : (sign === '+' ? '+' : '');
  return <>{displaySign}{Math.abs(n).toFixed(dec)}{rest}</>;
}

// Counts 0 → value. Resets and replays whenever playKey changes (and active is true).
function CountValue({ value, active, playKey = 0, duration = 1100 }) {
  const v = React.useMemo(() => _parseMetric(value), [value]);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    setN(0);
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(v.num * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, playKey, v.num, duration]);
  const displaySign = v.sign === '+' ? '+' : (v.sign === '-' || v.sign === '−') ? '−' : '';
  return <>{displaySign}{Math.abs(n).toFixed(v.dec)}{v.rest}</>;
}

function CaseCard({ c, project, index, isMobile }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [showAfter, setShowAfter] = React.useState(false);
  const [playKey, setPlayKey] = React.useState(0);
  const userTouchedRef = React.useRef(false);

  // Non-disconnecting observer — replay each viewport entry
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.4, root: null }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Sequence on viewport entry: snap to Before → wait 1.3s → morph to After
  React.useEffect(() => {
    if (!inView || userTouchedRef.current) return;
    setShowAfter(false);
    setPlayKey((k) => k + 1);
    const t = setTimeout(() => setShowAfter(true), 1300);
    return () => clearTimeout(t);
  }, [inView]);

  const onToggle = (v) => { userTouchedRef.current = true; setShowAfter(v); };

  const baData = [
    { before: { copy: '오랜만이에요! 지금 전 상품 20% 할인 중이에요.', open: '12.4%', ctr: '1.1%' }, after: { copy: '요즘 어떻게 지내세요? 마지막에 보신 ○○ 카테고리에 새 컬렉션이 들어왔어요.', open: '24.6%', ctr: '3.4%' } },
    { before: { copy: '회원가입을 환영합니다! 첫 구매 5,000원 쿠폰을 드려요.', open: '18.2%', ctr: '2.0%' }, after: { copy: '가입 때 살펴보신 카테고리에 마침 어울릴 만한 게 들어왔어요.', open: '34.5%', ctr: '5.6%' } },
    { before: { copy: 'VIP 고객님께 드리는 이번 달 특별 혜택을 확인하세요.', open: '21.0%', ctr: '1.8%' }, after: { copy: '이번 달 당신의 취향 노트입니다. 평소 보시던 톤에 가까운 4가지를 골라봤어요.', open: '38.1%', ctr: '6.4%' } },
  ];
  const ba = baData[index] || baData[0];
  const cur = showAfter ? ba.after : ba.before;

  return (
    <article
      ref={ref}
      data-warm-shotcard
      style={{
        flex: `0 0 ${isMobile ? 300 : 460}px`,
        scrollSnapAlign: 'start',
        background: c.paper, color: c.ink,
        borderRadius: 6, overflow: 'hidden',
        border: `1px solid ${c.line}`,
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* phone screenshot — slightly more breathing top/bottom */}
      <div style={{
        background: c.bg, padding: isMobile ? '32px 16px 28px' : '40px 24px 32px',
        display: 'flex', justifyContent: 'center',
        borderBottom: `1px solid ${c.line}`,
      }}>
        <PhoneScreenshot c={c} project={project} index={index} message={cur.copy} />
      </div>

      <div style={{padding: isMobile ? '24px 22px 28px' : '32px 32px 34px', display: 'flex', flexDirection: 'column', gap: 26}}>
        {/* meta header — slim, role + segment as captions; channel chips removed */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, gap: 12}}>
            <span style={{fontSize: 12, fontWeight: 700, color: c.faint, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace"}}>
              {project.cat} · 0{index+1}
            </span>
            <span style={{fontSize: 11.5, color: c.faint, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em', whiteSpace: 'nowrap'}}>
              {project.period}
            </span>
          </div>
          <h3 style={{fontSize: isMobile ? 19 : 22, fontWeight: 700, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.32}}>
            {project.title}
          </h3>
          <div style={{fontSize: 14, color: c.mute, marginTop: 12, lineHeight: 1.55}}>
            {project.role}
          </div>
          <div style={{fontSize: 12, color: c.faint, marginTop: 6, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.02em'}}>
            {project.segment}
          </div>
        </div>

        {/* message rewrite — sliding pill toggle + sliding metric panels */}
        <div style={{borderTop: `1px solid ${c.line}`, paddingTop: 22}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 8}}>
            <span style={{fontSize: 11.5, fontWeight: 700, color: c.ink, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace"}}>Message rewrite</span>

            {/* segmented control with sliding indicator */}
            <div style={{display: 'inline-flex', borderRadius: 999, background: c.bg, border: `1px solid ${c.line}`, padding: 3, position: 'relative'}}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: 3, bottom: 3,
                left: 3, width: 'calc(50% - 3px)',
                background: c.ink, borderRadius: 999,
                transform: showAfter ? 'translateX(100%)' : 'translateX(0%)',
                transition: 'transform .42s cubic-bezier(0.65, 0, 0.35, 1)',
              }} />
              {[['Before', false], ['After', true]].map(([l, v]) => (
                <button key={l} onClick={() => onToggle(v)} style={{
                  padding: '5px 18px', fontSize: 12, borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: 'transparent', color: showAfter === v ? c.bg : c.mute,
                  fontWeight: 500, fontFamily: 'inherit',
                  position: 'relative', zIndex: 1,
                  transition: 'color .35s ease',
                  minWidth: 64,
                }}>{l}</button>
              ))}
            </div>
          </div>

          {/* sliding panel — Before / After horizontally; whole content slides */}
          <div style={{overflow: 'hidden', borderRadius: 4}}>
            <div style={{
              display: 'flex', width: '200%',
              transform: `translateX(${showAfter ? '-50%' : '0%'})`,
              transition: 'transform .55s cubic-bezier(0.65, 0, 0.35, 1)',
            }}>
              {/* Before panel */}
              <div style={{flex: '0 0 50%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, paddingRight: 6}}>
                {[['Open rate', ba.before.open], ['CTR', ba.before.ctr]].map(([label, value]) => (
                  <div key={label} style={{padding: '14px 16px', background: c.bg, borderRadius: 4}}>
                    <div style={{fontSize: 11, color: c.faint, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'}}>{label}</div>
                    <div style={{fontSize: 21, fontWeight: 700, color: c.ink, marginTop: 6, letterSpacing: '-0.02em'}}>{value}</div>
                    <div style={{fontSize: 11, marginTop: 4, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.02em', visibility: 'hidden'}}>—</div>
                  </div>
                ))}
              </div>
              {/* After panel */}
              <div style={{flex: '0 0 50%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, paddingLeft: 6}}>
                {[
                  ['Open rate', ba.after.open, ba.before.open],
                  ['CTR', ba.after.ctr, ba.before.ctr],
                ].map(([label, value, beforeVal]) => (
                  <div key={label} style={{padding: '14px 16px', background: c.bg, borderRadius: 4}}>
                    <div style={{fontSize: 11, color: c.faint, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'}}>{label}</div>
                    <div style={{fontSize: 21, fontWeight: 700, color: c.accent, marginTop: 6, letterSpacing: '-0.02em'}}>{value}</div>
                    <div style={{fontSize: 11, color: c.faint, marginTop: 4, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.02em'}}>↑ vs Before {beforeVal}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* result — count-up on entry; per-metric baselines */}
        <div style={{borderTop: `1px solid ${c.line}`, paddingTop: 22}}>
          <div style={{fontSize: 11.5, fontWeight: 700, color: c.ink, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'IBM Plex Mono', monospace"}}>Result</div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {project.metrics.map((m, j) => (
              <div key={j} style={{borderRight: j < 2 ? `1px solid ${c.line}` : 'none', paddingLeft: j > 0 ? 14 : 0, paddingRight: j < 2 ? 14 : 0}}>
                <div style={{fontSize: 26, fontWeight: 700, color: c.ink, letterSpacing: '-0.025em', lineHeight: 1}}>
                  <CountValue value={m.v} active={inView} playKey={playKey} duration={1100} />
                </div>
                <div style={{fontSize: 12.5, color: c.ink, marginTop: 10, fontWeight: 600, lineHeight: 1.3}}>{m.label}</div>
                {m.base && (
                  <div style={{fontSize: 11, color: c.faint, marginTop: 5, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.02em'}}>{m.base}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* learning */}
        <div style={{fontSize: 14, lineHeight: 1.7, color: c.mute, borderLeft: `2px solid ${c.accent}`, paddingLeft: 14}}>
          <span style={{color: c.ink, fontWeight: 600}}>Learning.</span> {project.learn}
        </div>
      </div>
    </article>
  );
}

// Phone-frame screenshot — neutral, no per-card hue
function PhoneScreenshot({ c, project, index, message }) {
  const channel = project.channels[0] || 'Kakao 알림톡';
  const titles = ['카카오톡 알림톡', '신규 회원 안내', 'VIP · 취향 노트'];
  return (
    <div style={{
      width: 200, height: 360, borderRadius: 28,
      background: '#0e0c0a', padding: 7,
      boxShadow: '0 20px 50px -28px rgba(0,0,0,0.4)',
      position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 22, background: '#f7f4ef',
        overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
          width: 70, height: 16, borderRadius: 999, background: '#0e0c0a', zIndex: 2,
        }}></div>
        <div style={{padding: '12px 18px 6px', display: 'flex', justifyContent: 'space-between', fontSize: 9.5, fontWeight: 600, color: '#15110d'}}>
          <span>9:41</span><span>· · ·</span>
        </div>
        <div style={{padding: '10px 14px', borderBottom: `1px solid ${c.line}`, display: 'flex', alignItems: 'center', gap: 8}}>
          <div style={{width: 24, height: 24, borderRadius: 5, background: '#FEE500', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#3C1E1E'}}>K</div>
          <div>
            <div style={{fontSize: 10.5, fontWeight: 600, color: '#15110d'}}>{channel}</div>
            <div style={{fontSize: 8.5, color: c.mute, marginTop: 1}}>방금 전</div>
          </div>
        </div>
        <div style={{padding: '14px 12px'}}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: '12px 12px',
            border: `1px solid ${c.line}`,
          }}>
            <div style={{fontSize: 10.5, fontWeight: 700, color: '#15110d', marginBottom: 6}}>{titles[index] || titles[0]}</div>
            <div style={{fontSize: 10.5, lineHeight: 1.55, color: '#15110d', wordBreak: 'keep-all'}}>{message}</div>
            <div style={{
              marginTop: 10, paddingTop: 8, borderTop: `1px solid ${c.line}`,
              fontSize: 10.5, fontWeight: 600, color: c.accent,
            }}>확인하러 가기 →</div>
          </div>
          <div style={{
            display: 'inline-block', marginTop: 8,
            fontSize: 8.5, color: c.mute, padding: '2px 7px',
            background: '#ece4d6', borderRadius: 999,
          }}>오후 2:14</div>
        </div>
      </div>
    </div>
  );
}

window.PortfolioWarm = PortfolioWarm;
