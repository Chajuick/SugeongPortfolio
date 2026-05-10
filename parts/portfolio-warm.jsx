// Concept A — Editorial Modern (v3, full overhaul addressing 15-point review).

const PortfolioWarm = ({ palette = 'ivoryCoral' }) => {
  const D = window.PORTFOLIO_DATA;
  const { Reveal, CountUp, PhotoSlot, useInView } = window;

  const palettes = {
    ivoryCoral:  { bg:'#f6f3ec', bgTint:'#f1ede3', paper:'#ffffff', ink:'#15110d', mute:'#6b6259', faint:'#a59c92', line:'#e7e0d2', accent:'#c0584a', accentSoft:'#f3dccf' },
    softPink:    { bg:'#faf2ed', bgTint:'#f4eae4', paper:'#ffffff', ink:'#1c1410', mute:'#7a6660', faint:'#a99891', line:'#eedcd1', accent:'#d97a86', accentSoft:'#f8dad8' },
    mustard:     { bg:'#f6efe0', bgTint:'#f0e8d6', paper:'#ffffff', ink:'#1a1610', mute:'#695e44', faint:'#a09879', line:'#e6dabd', accent:'#b88019', accentSoft:'#efdfa6' },
  };
  const c = palettes[palette] || palettes.ivoryCoral;

  // ── i18n: lang state synced with ?lang=en query param ──────────────────────
  const [lang, setLang] = React.useState(() => {
    if (typeof window === 'undefined') return 'ko';
    const p = new URLSearchParams(window.location.search);
    return p.get('lang') === 'en' ? 'en' : 'ko';
  });
  // Sync URL + <html lang> on every change. SEO/sharing benefit + back/forward support.
  React.useEffect(() => {
    document.documentElement.lang = lang;
    const url = new URL(window.location);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState({}, '', url);
  }, [lang]);
  React.useEffect(() => {
    const onPop = () => {
      const p = new URLSearchParams(window.location.search);
      setLang(p.get('lang') === 'en' ? 'en' : 'ko');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const t = (obj, fallback = '') => (obj && obj[lang]) || (obj && obj.ko) || fallback;
  const P = lang === 'en' && D.EN ? D.EN : D;
  const S = P.SECTION_COPY || D.SECTION_COPY;

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
    // index.html forces `overflow-y: visible` on [data-pwarm] (line 40), so the
    // real scroll context is window. Use absolute doc-position via getBoundingClientRect.
    const navOffset = (isMobile ? 56 : 64) + 12;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const [active, setActive] = React.useState('home');
  React.useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const handler = () => {
      const ids = ['home','work','about','career','approach','skills','contact'];
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
  // language toggle — pill segmented control, sits left of Contact CTA
  const langPill = {
    display: 'inline-flex', alignItems: 'center', padding: 3,
    border: `1px solid ${c.line}`, borderRadius: 999, background: 'transparent',
    fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em',
  };
  const langSeg = (active) => ({
    padding: isMobile ? '4px 9px' : '5px 11px', fontSize: isMobile ? 10.5 : 11.5,
    borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    background: active ? c.ink : 'transparent',
    color: active ? c.bg : c.mute,
    fontWeight: active ? 700 : 500,
    transition: 'background .25s ease, color .25s ease',
  });

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
  const isEmailReady = D.PERSON.email && D.PERSON.email.includes('@');
  const emailHref = isEmailReady ? `mailto:${D.PERSON.email}` : '#';
  const guardPlaceholderLink = (e) => {
    if (!isEmailReady) e.preventDefault();
  };

  // hero stats grid — single observer drives all 4 count-ups in sync
  const [statsRef, statsSeen] = useInView(0.3);

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

      {/* nav — logo · section links · KO/EN toggle (Contact via floating Q&A or footer) */}
      <div style={navBar}>
        <div style={navInner}>
          <div style={logo}>
            <span style={logoDot}></span>
            {lang === 'en' ? D.PERSON.nameEn : D.PERSON.nameKo}
          </div>
          <div style={navLinks}>
            {[['home','Home'],['work','Work'],['about','About'],['career','Career'],['approach','Approach'],['skills','Skills'],['contact','Contact']].map(([id,l]) => (
              <span key={id} style={navLink(id)} data-warm-link onClick={() => goTo(id)}>{l}</span>
            ))}
          </div>
          <div style={langPill} role="group" aria-label={t(D.I18N.langToggleAria)}>
            <button style={langSeg(lang === 'ko')} onClick={() => setLang('ko')} aria-pressed={lang === 'ko'}>KO</button>
            <button style={langSeg(lang === 'en')} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
          </div>
        </div>
      </div>

      {/* hero — content-led; portrait as smaller editorial anchor */}
      <section data-anchor="home" data-screen-label="01 Hero" style={heroWrap}>
        <div style={heroGrid}>
          <div>
            <Reveal>
              <div style={{...eyebrow, fontFamily: "'IBM Plex Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: c.mute}}>
                CRM MARKETER · SEOUL
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 style={heroH}>
                {P.HERO_COPY.headlineLines.map((line, i) => (
                  <React.Fragment key={line}>
                    <span style={{whiteSpace: 'nowrap'}}>
                      {line.accent ? <><span style={{color: c.accent}}>{line.accent}</span>{line.rest}</> : line.text}
                    </span>
                    {i < P.HERO_COPY.headlineLines.length - 1 && <br/>}
                  </React.Fragment>
                ))}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p style={heroSub}>{P.HERO_COPY.sub}</p>
            </Reveal>

            {/* core competencies — borderless rule-line row, mirrors Selected Metrics language */}
            <Reveal delay={180}>
              <div style={competencyRow}>
                {P.HERO_COPY.competencies.map((cm, i) => (
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
                <a href={emailHref} onClick={guardPlaceholderLink} style={{...ctaGhost, textDecoration:'none'}}>Email</a>
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
                alt={`${lang === 'en' ? D.PERSON.nameEn : D.PERSON.nameKo} portrait`}
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
              }}>{lang === 'en' ? D.PERSON.nameEn : D.PERSON.nameKo} · CRM @ Seoul</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Selected Metrics — bridge with explicit baselines (5-sec trust signal) */}
      <div style={{...wrap, paddingTop: isMobile ? 16 : 24, paddingBottom: isMobile ? 32 : 48}}>
        <Reveal>
          <div style={{fontSize: 12, fontWeight: 700, color: c.faint, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'IBM Plex Mono', monospace"}}>
            {lang === 'en' ? 'Selected metrics' : 'Selected metrics · 대표 성과'}
          </div>
          <div ref={statsRef} style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`,
          }}>
            {P.HERO_COPY.stats.map((s, i) => (
              <div key={i} style={{
                padding: isMobile ? '20px 0' : '24px 24px 24px 0',
                borderRight: !isMobile && i < P.HERO_COPY.stats.length - 1 ? `1px solid ${c.line}` : 'none',
                borderBottom: isMobile && i < P.HERO_COPY.stats.length - 1 ? `1px solid ${c.line}` : 'none',
                paddingLeft: !isMobile && i > 0 ? 24 : 0,
              }}>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 8, minHeight: isMobile ? 42 : 44}}>
                  <span style={{fontSize: isMobile ? 34 : 36, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.08, color: c.ink}}>
                    <CountValue value={s.text} active={statsSeen} duration={1400} />
                  </span>
                  {s.unit && (
                    <span style={{fontSize: 11.5, fontWeight: 700, color: c.faint, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase'}}>
                      {s.unit}
                    </span>
                  )}
                </div>
                <div style={{fontSize: 14, color: c.ink, marginTop: 12, fontWeight: 600}}>{s.label}</div>
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
              <h2 style={secTitle}>{S.workTitle}</h2>
            </div>
            <p style={secLead}>{S.workLead}</p>
          </div>
        </div>

        <CaseStrip c={c} isMobile={isMobile} wrap={wrap} projects={P.PROJECTS} lang={lang} />
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
              <h2 style={secTitle}>{S.aboutTitle}</h2>
            </div>
            <p style={secLead}>{S.aboutLead}</p>
          </div>

          <Reveal>
            <p style={{
              fontSize: isMobile ? 22 : 30, lineHeight: 1.4, margin: '0 0 48px', fontWeight: 600,
              letterSpacing: '-0.025em', color: c.ink, maxWidth: 820,
            }}>
              {S.aboutQuoteBefore} <span style={{color: c.accent}}>{S.aboutQuoteAccent}</span>{S.aboutQuoteAfter}
            </p>
          </Reveal>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            borderTop: `1px solid ${c.line}`,
          }}>
            {P.VALUES.map((v, i) => (
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
              <h2 style={secTitle}>{S.careerTitle}</h2>
            </div>
          <p style={secLead}>{S.careerLead}</p>
        </div>
        <div>
          {P.CAREER.map((job, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '160px 1fr',
                gap: isMobile ? 12 : 40,
                padding: isMobile ? '28px 0' : '36px 0',
                borderTop: `1px solid ${c.line}`,
                borderBottom: i === P.CAREER.length - 1 ? `1px solid ${c.line}` : 'none',
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
        {P.EDUCATION && P.EDUCATION.length > 0 && (
          <div style={{marginTop: isMobile ? 48 : 72}}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 18, gap: 16, flexWrap: 'wrap',
            }}>
              <div style={{...secNum, fontSize: 13}}>Education · Certification</div>
              <div style={{fontSize: 12.5, color: c.faint, lineHeight: 1.6}}>
                {S.educationLead}
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? 18 : 0,
              borderTop: `1px solid ${c.line}`,
              borderBottom: `1px solid ${c.line}`,
            }}>
              {P.EDUCATION.map((edu, i) => (
                <Reveal key={edu.title} delay={i * 60}>
                  <div style={{
                    padding: isMobile ? '24px 0' : '28px 28px 28px 0',
                    paddingLeft: !isMobile && i > 0 ? 28 : 0,
                    borderRight: !isMobile && i < P.EDUCATION.length - 1 ? `1px solid ${c.line}` : 'none',
                    borderBottom: isMobile && i < P.EDUCATION.length - 1 ? `1px solid ${c.line}` : 'none',
                  }}>
                    <div style={{fontSize: 12, color: c.faint, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em', marginBottom: 10}}>
                      {edu.period}
                    </div>
                    <h3 style={{fontSize: isMobile ? 18 : 20, lineHeight: 1.35, margin: '0 0 4px', letterSpacing: '-0.02em'}}>
                      {edu.title}
                    </h3>
                    <div style={{fontSize: 13.5, color: c.accent, fontWeight: 600, marginBottom: 14}}>{edu.org}</div>
                    <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
                      {edu.details.map((d, j) => (
                        <li key={j} style={{fontSize: 14, lineHeight: 1.65, color: c.mute, paddingLeft: 14, position: 'relative', marginBottom: 4}}>
                          <span style={{position: 'absolute', left: 0, top: 11, width: 6, height: 1, background: c.faint}}></span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
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
              <h2 style={secTitle}>{S.approachTitle}</h2>
            </div>
            <p style={secLead}>{S.approachLead}</p>
          </div>
          <div>
          {P.ROUTINE.map((r, i) => (
            <Reveal key={r.k} delay={i * 80}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
                gap: isMobile ? 16 : 40,
                padding: isMobile ? '28px 0' : '36px 0',
                borderTop: `1px solid ${c.line}`,
                borderBottom: i === P.ROUTINE.length - 1 ? `1px solid ${c.line}` : 'none',
                alignItems: 'start',
              }}>
                <div>
                  <div style={{fontSize: 12, fontWeight: 700, color: c.accent, letterSpacing: '0.08em', marginBottom: 10, fontFamily: "'IBM Plex Mono', monospace"}}>0{i+1} · {r.k.toUpperCase()}</div>
                  <h3 style={{fontSize: isMobile ? 22 : 24, fontWeight: 700, margin: 0, letterSpacing: '-0.025em', lineHeight: 1.3}}>{r.t}</h3>
                  <div style={{
                    fontSize: 12, padding: '10px 12px', background: c.bg, borderRadius: 4,
                    border: `1px solid ${c.line}`, color: c.mute, fontWeight: 500,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginTop: 16, maxWidth: '100%',
                    fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em',
                  }}>
                    <span style={{color: c.faint}}>→ ARTIFACT</span>
                    <span style={{color: c.ink, fontWeight: 600, whiteSpace: 'normal'}}>{r.artifact}</span>
                  </div>
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
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skills — function-based with frequency dots */}
        <div data-anchor="skills" data-screen-label="06 Skills" style={{marginTop: isMobile ? 56 : 96}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 8}}>
            <div style={{...secNum, fontSize: 13}}>{S.skillsTitle}</div>
            <div style={{fontSize: 12, color: c.faint, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em', display: 'flex', gap: 16}}>
              <span><span style={{color: c.accent, fontWeight: 700}}>●●●</span> Daily</span>
              <span><span style={{color: c.accent, fontWeight: 700}}>●●</span><span style={{color: c.line}}>●</span> Weekly</span>
              <span><span style={{color: c.accent, fontWeight: 700}}>●</span><span style={{color: c.line}}>●●</span> Occasional</span>
            </div>
          </div>
          <SkillsGrid c={c} isMobile={isMobile} skills={P.SKILLS} />
        </div>
        </div>
      </section>

      {/* CONTACT */}
      <section data-anchor="contact" data-screen-label="07 Contact" style={{...wrap, paddingTop: isMobile ? 80 : 140, paddingBottom: isMobile ? 80 : 140, textAlign: 'center'}}>
        <Reveal>
          <div style={{...secNum, marginBottom: 24}}>07 — Contact</div>
          <h2 style={{fontSize: isMobile ? 44 : 76, lineHeight: 1.05, margin: '0 0 28px', letterSpacing: '-0.035em', fontWeight: 700}}>
            <span style={{whiteSpace: 'nowrap'}}>{S.contactTitle}</span>
          </h2>
          <p style={{fontSize: isMobile ? 15 : 16.5, color: c.mute, margin: '0 0 36px', lineHeight: 1.7}}>
            {S.contactLead}
          </p>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <a href={emailHref} onClick={guardPlaceholderLink} style={{...cta, textDecoration:'none'}}>{D.PERSON.email} →</a>
            <a
              href="https://in.naver.com/gorgeous"
              target="_blank"
              rel="noopener noreferrer"
              style={{...ctaGhost, textDecoration:'none'}}
            >
              Naver Influencer
            </a>
          </div>
        </Reveal>
      </section>

      <div style={{borderTop: `1px solid ${c.line}`, padding: isMobile ? '20px 24px 112px' : '24px 56px 44px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize: 13, color: c.faint, fontWeight: 500}}>
        <span>© 2026 {lang === 'en' ? D.PERSON.nameEn : D.PERSON.nameKo}</span>
        <span>v.2026.05</span>
      </div>

      {/* mobile sticky CTA — Email · Naver */}
      {isMobile && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: c.bg + 'ee', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderTop: `1px solid ${c.line}`,
          padding: '10px 16px',
          display: 'flex', gap: 8,
          paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
        }}>
          <a href={emailHref} onClick={guardPlaceholderLink} style={{
            ...cta, flex: 1, justifyContent: 'center', textDecoration: 'none', padding: '12px 16px',
          }}>Email →</a>
          <a href="https://in.naver.com/gorgeous" target="_blank" rel="noopener noreferrer" style={{
            ...ctaGhost, flex: 1, justifyContent: 'center', textDecoration: 'none', padding: '12px 16px',
          }}>Naver →</a>
        </div>
      )}

      {/* Interactive Profile Q&A — not a chatbot, a navigation aid */}
      <AskSujeong c={c} isMobile={isMobile} lang={lang} t={t} qa={D.CHATBOT_QA} goTo={goTo} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Skills — function-based grouping with frequency dots (Daily/Weekly/Occasional)
function SkillsGrid({ c, isMobile, skills }) {
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
      {skills.map((g, i) => {
        const isRightCol = !isMobile && i % 2 === 1;
        const isLeftCol = !isMobile && i % 2 === 0;
        const hasRightNeighbor = isLeftCol && i + 1 < skills.length;
        return (
          <div key={g.g} style={{
            paddingLeft: isRightCol ? 32 : 0,
            paddingRight: isLeftCol ? 32 : 0,
            paddingTop: !isMobile && i >= 2 ? 24 : 0,
            paddingBottom: 24,
            borderTop: !isMobile && i >= 2 ? `1px solid ${c.line}` : 'none',
            borderRight: hasRightNeighbor ? `1px solid ${c.line}` : 'none',
            borderBottom: isMobile && i < skills.length - 1 ? `1px solid ${c.line}` : 'none',
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
function CaseStrip({ c, isMobile, wrap, projects, lang }) {
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
  const totalCases = projects.length;
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
          {projects.map((p, i) => (
            <CaseCard key={p.id} c={c} project={p} index={i} isMobile={isMobile} lang={lang} />
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
          <button onClick={() => scrollBy(-1)} aria-label={lang === 'en' ? 'Previous' : '이전'} disabled={atStart} style={{
            width: 40, height: 40, borderRadius: 999, background: 'transparent',
            border: `1px solid ${c.line}`, cursor: atStart ? 'default' : 'pointer', fontSize: 16,
            color: atStart ? c.faint : c.ink, fontFamily: 'inherit', opacity: atStart ? 0.5 : 1,
            transition: 'opacity .2s ease, color .2s ease',
          }}>←</button>
          <button onClick={() => scrollBy(1)} aria-label={lang === 'en' ? 'Next' : '다음'} disabled={atEnd} style={{
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

// Numeric metric parser — handles signed percentages, multipliers, plain labels,
// and comma-grouped integers (e.g. "1,000+").
function _parseMetric(s) {
  const str = String(s);
  const cleaned = str.replace(/,/g, '');
  const hasComma = str !== cleaned;
  const m = cleaned.match(/^([+\-−])?\s*(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { num: 0, sign: '', rest: str, dec: 0, raw: str, hasComma: false };
  const numStr = m[2];
  const dec = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { num: parseFloat(numStr), sign: m[1] || '', rest: m[3] || '', dec, raw: null, hasComma };
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
  if (v.raw) return <>{v.raw}</>;
  const displaySign = v.sign === '+' ? '+' : (v.sign === '-' || v.sign === '−') ? '−' : '';
  const absN = Math.abs(n);
  const formatted = v.hasComma
    ? Math.round(absN).toLocaleString()
    : absN.toFixed(v.dec);
  return <>{displaySign}{formatted}{v.rest}</>;
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

  const ba = project.compare || {
    title: 'Before / After',
    summary: { value: 'Review', label: 'Performance review', caption: 'Post-send report' },
    beforeLabel: 'Before',
    afterLabel: 'After',
    before: { copy: project.problem, primary: 'Before', secondary: 'Context' },
    after: { copy: project.learn, primary: 'After', secondary: 'Result' },
    note: '',
  };
  const beforeCopy = ba.before?.copy || project.problem || '';
  const afterCopy = ba.after?.copy || project.learn || '';
  const cur = showAfter
    ? { copy: afterCopy, primary: ba.after?.primary || 'After', secondary: ba.after?.secondary || 'Result' }
    : { copy: beforeCopy, primary: ba.before?.primary || 'Before', secondary: ba.before?.secondary || 'Context' };

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

      <div style={{padding: isMobile ? '20px 20px 22px' : '24px 26px 26px', display: 'flex', flexDirection: 'column', gap: 16}}>
        {/* meta header — slim, role + segment as captions; channel chips removed */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, gap: 12}}>
            <span style={{fontSize: 11.5, fontWeight: 700, color: c.faint, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace", maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {project.cat} · 0{index+1}
            </span>
            <span style={{fontSize: 11.5, color: c.faint, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em', whiteSpace: 'nowrap'}}>
              {project.period.replace(/ · 2025 — (현재|Present)/, '')}
            </span>
          </div>
          <h3 style={{fontSize: isMobile ? 19 : 22, fontWeight: 700, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.32}}>
            {project.title}
          </h3>
          <div style={{
            fontSize: 13.5, color: c.mute, marginTop: 10, lineHeight: 1.55,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {project.role}
          </div>
          <div style={{fontSize: 11.5, color: c.faint, marginTop: 6, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {project.segment}
          </div>
        </div>

        {/* performance summary */}
        <div style={{borderTop: `1px solid ${c.line}`, paddingTop: 16}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 12, gap: 8}}>
            <span style={{fontSize: 11.5, fontWeight: 700, color: c.ink, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace"}}>{ba.title}</span>
          </div>

          <div style={{
            background: c.bg,
            border: `1px solid ${c.line}`,
            borderRadius: 4,
            padding: '16px 16px 14px',
          }}>
            <div style={{fontSize: 34, fontWeight: 800, color: c.accent, letterSpacing: '-0.04em', lineHeight: 1}}>
              <CountValue value={ba.summary.value} active={inView} playKey={playKey} />
            </div>
            <div style={{fontSize: 13.5, color: c.ink, fontWeight: 700, marginTop: 8}}>
              {ba.summary.label}
            </div>
            <div style={{fontSize: 12, color: c.faint, marginTop: 5, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.02em'}}>
              {ba.summary.caption}
            </div>
          </div>
        </div>

        {/* learning */}
        <div style={{fontSize: 13, lineHeight: 1.55, color: c.mute, borderLeft: `2px solid ${c.accent}`, paddingLeft: 12}}>
          <span style={{color: c.ink, fontWeight: 600}}>Learning.</span> {project.learn}
          {ba.note && (
            <div style={{fontSize: 11.5, color: c.faint, marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.02em'}}>{ba.note}</div>
          )}
        </div>
      </div>
    </article>
  );
}

// Phone-frame screenshot — neutral, no per-card hue.
function PhoneScreenshot({ c, project, index, message }) {
  const channel = project.channels[0] || 'Kakao 알림톡';
  const titles = ['Water Purifier CRM', 'Big Smile Day Push', 'Performance Tracking', 'CRM Monitoring Board'];
  return (
    <div style={{
      width: 'min(300px, 100%)', aspectRatio: '300 / 460', borderRadius: 28,
      background: '#0e0c0a', padding: 7,
      boxShadow: '0 20px 50px -28px rgba(0,0,0,0.4)',
      position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 22, background: '#f7f4ef',
        overflow: 'hidden', position: 'relative',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        ) : (
        <>
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
        </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AskSujeong — Interactive profile Q&A. Not a chatbot. A portfolio navigation aid.
// Behavior: preset questions only (no free input), 3–5 line answers, optional
// jump-to-section link that closes panel and scrolls to relevant content.
function AskSujeong({ c, isMobile, lang, t, qa, goTo }) {
  const [open, setOpen] = React.useState(false);
  const [showBubble, setShowBubble] = React.useState(false);
  const [conversation, setConversation] = React.useState([]); // [{role, text, jump?, qid}]
  const [thinking, setThinking] = React.useState(false);
  // Desktop only: dropdown popover for question list. Mobile uses horizontal chip rail.
  const [listOpen, setListOpen] = React.useState(true);
  const scrollerRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const listAnchorRef = React.useRef(null);

  // When the panel re-opens, expand the question list so it's immediately discoverable.
  React.useEffect(() => { if (open) setListOpen(true); }, [open]);

  // Click outside the trigger/popover closes the dropdown (desktop only).
  React.useEffect(() => {
    if (!listOpen || isMobile) return;
    const onDocClick = (e) => {
      if (listAnchorRef.current && !listAnchorRef.current.contains(e.target)) {
        setListOpen(false);
      }
    };
    const timer = setTimeout(() => document.addEventListener('click', onDocClick), 0);
    return () => { clearTimeout(timer); document.removeEventListener('click', onDocClick); };
  }, [listOpen, isMobile]);

  // Bubble hint — appears 1.8s after mount, fades 8s later. Persists across lang switches.
  React.useEffect(() => {
    const t1 = setTimeout(() => setShowBubble(true), 1800);
    const t2 = setTimeout(() => setShowBubble(false), 9800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ESC closes panel
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Auto-scroll on conversation change
  React.useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, [conversation, thinking, open]);

  // Lock body scroll when mobile panel is open (avoids dual scroll)
  React.useEffect(() => {
    if (!isMobile || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isMobile, open]);

  // Reset conversation when language switches (questions+answers swap)
  React.useEffect(() => { setConversation([]); }, [lang]);

  const handleQuestion = (item) => {
    if (thinking) return;
    const stamp = Date.now();
    setConversation(prev => [...prev, { role: 'user', text: t(item.q), qid: item.id, key: `${item.id}-u-${stamp}` }]);
    setThinking(true);
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: 'bot', text: t(item.a), jump: item.jump, qid: item.id, key: `${item.id}-b-${stamp}`,
      }]);
      setThinking(false);
    }, 720);
  };

  const handleJump = (id) => {
    // Mobile: panel covers ~85vh, so close it before scrolling — otherwise the
    // user can't see the destination. Desktop: panel sits in corner, keep it open
    // so the user can read the answer while the page scrolls behind it.
    if (isMobile) {
      setOpen(false);
      setTimeout(() => goTo(id), 280);
    } else {
      goTo(id);
    }
  };

  const toggleOpen = () => {
    setOpen(o => !o);
    setShowBubble(false);
  };

  const askedIds = new Set(conversation.filter(m => m.role === 'user').map(m => m.qid));

  // Position offsets — float button must clear mobile sticky CTA (≈64px)
  const fabBottom = isMobile ? 88 : 26;
  const fabRight = isMobile ? 16 : 26;
  const fabSize = isMobile ? 52 : 56;

  // ── Floating button ──
  // Pale-cream coral (lighter than accentSoft) — matches hero portrait halo
  // tone but reads as "soft cream" rather than coral, so the photo dominates.
  const fabBg = '#faeade'; // accentSoft mixed ~40% toward bg
  const fabStyle = {
    position: 'fixed', right: fabRight, bottom: fabBottom, zIndex: 60,
    width: fabSize, height: fabSize, borderRadius: '50%',
    background: fabBg, border: `1px solid ${c.accent}22`,
    padding: 0, cursor: 'pointer', overflow: 'hidden',
    boxShadow: '0 12px 28px -10px rgba(192,88,74,0.18), 0 2px 6px -2px rgba(20,15,10,0.08)',
    transition: 'transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s ease',
    transform: open ? 'scale(0.92)' : 'scale(1)',
    display: 'block',
  };

  // Bubble hint — sits to the LEFT of the FAB
  const bubbleStyle = {
    position: 'fixed',
    right: fabRight + fabSize + 12, bottom: fabBottom + fabSize / 2 - 18,
    zIndex: 59,
    background: c.paper, color: c.ink,
    padding: '9px 14px', borderRadius: 18,
    border: `1px solid ${c.line}`,
    fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap',
    boxShadow: '0 10px 24px -14px rgba(20,15,10,0.18)',
    opacity: showBubble && !open ? 1 : 0,
    transform: showBubble && !open ? 'translateY(0)' : 'translateY(6px)',
    transition: 'opacity .35s ease, transform .35s cubic-bezier(.2,.7,.2,1)',
    pointerEvents: 'none',
    fontFamily: 'inherit',
  };

  // ── Panel ──
  const panelStyle = isMobile ? {
    position: 'fixed', left: 0, right: 0, bottom: 0,
    height: '85vh', maxHeight: '85vh',
    background: c.bg, borderTop: `1px solid ${c.line}`,
    borderTopLeftRadius: 18, borderTopRightRadius: 18,
    zIndex: 70, display: 'flex', flexDirection: 'column',
    transform: open ? 'translateY(0)' : 'translateY(100%)',
    opacity: open ? 1 : 0,
    visibility: open ? 'visible' : 'hidden',
    pointerEvents: open ? 'auto' : 'none',
    transition: 'transform .42s cubic-bezier(.2,.7,.2,1)',
    boxShadow: '0 -20px 60px -20px rgba(20,15,10,0.25)',
    paddingBottom: 'env(safe-area-inset-bottom)',
  } : {
    position: 'fixed', right: 24, bottom: 96,
    width: 384, height: 'min(548px, calc(100vh - 140px))',
    background: c.bg, border: `1px solid ${c.line}`, borderRadius: 14,
    zIndex: 70, display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
    transformOrigin: 'bottom right',
    transform: open ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'opacity .25s ease, transform .3s cubic-bezier(.2,.7,.2,1)',
    boxShadow: '0 24px 60px -24px rgba(20,15,10,0.32), 0 4px 12px -4px rgba(20,15,10,0.08)',
  };

  return (
    <>
      <style>{`
        @keyframes asTypingBlink {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
        @keyframes asMsgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        [data-as-fab]:hover { transform: scale(1.05) translateY(-2px) !important; box-shadow: 0 16px 36px -10px rgba(20,15,10,0.28), 0 4px 10px -2px rgba(20,15,10,0.12) !important; }
        [data-as-chip]:hover:not([data-disabled="true"]) { border-color: ${c.ink} !important; background: ${c.paper} !important; }
        [data-as-listrow]:hover:not([disabled]) { background: ${c.bgTint} !important; }
        [data-as-listrow]:hover:not([disabled]) span:last-child { opacity: 1 !important; }
        [data-as-jump]:hover { color: ${c.ink} !important; }
        [data-as-msg-bot] { animation: asMsgIn .42s cubic-bezier(.2,.7,.2,1) both; }
        [data-as-msg-user] { animation: asMsgIn .3s ease both; }
        [data-as-scroller]::-webkit-scrollbar { width: 6px; }
        [data-as-scroller]::-webkit-scrollbar-thumb { background: ${c.line}; border-radius: 999px; }
        [data-as-chiprail] { scrollbar-width: none; }
        [data-as-chiprail]::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Speech bubble hint — only when closed and within the show window */}
      <div style={bubbleStyle} aria-hidden="true">
        {t(qa.ui.bubble)}
        <span style={{
          position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%) rotate(45deg)',
          width: 10, height: 10, background: c.paper,
          borderRight: `1px solid ${c.line}`, borderTop: `1px solid ${c.line}`,
        }}></span>
      </div>

      {/* Floating button — face crop + small online dot */}
      <button
        data-as-fab
        onClick={toggleOpen}
        aria-label={open ? t(qa.ui.closeAria) : t(qa.ui.panelTitle)}
        aria-expanded={open}
        style={fabStyle}
      >
        <div style={{
          width: '100%', height: '100%',
          backgroundImage: 'url(assets/portrait.png)',
          // Zoom + low Y% shows more of the top of the image (hair/forehead),
          // which visually pushes the face down into the lower half of the circle.
          backgroundSize: '165% auto',
          backgroundPosition: '50% 10%',
          backgroundRepeat: 'no-repeat',
          filter: 'saturate(0.85) contrast(1.05)',
        }} />
        {/* online dot */}
        <span aria-hidden="true" style={{
          position: 'absolute', right: 4, bottom: 4,
          width: 12, height: 12, borderRadius: '50%',
          background: c.accent, border: `2px solid ${fabBg}`,
        }}></span>
      </button>

      {/* Mobile backdrop */}
      {isMobile && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 65,
            background: 'rgba(20,15,10,0.42)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            transition: 'opacity .3s ease',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Panel */}
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label={t(qa.ui.panelTitle)} style={panelStyle}>
        {/* Mobile drag handle */}
        {isMobile && (
          <div aria-hidden="true" style={{
            display: 'flex', justifyContent: 'center', paddingTop: 8,
          }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: c.line }}></div>
          </div>
        )}

        {/* Header */}
        <header style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: isMobile ? '14px 18px 14px' : '16px 18px',
          borderBottom: `1px solid ${c.line}`,
          background: c.paper,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            backgroundColor: '#faeade',
            backgroundImage: 'url(assets/portrait.png)',
            backgroundSize: '165% auto',
            backgroundPosition: '50% 22%',
            backgroundRepeat: 'no-repeat',
            border: `1px solid ${c.accent}22`,
            filter: 'saturate(0.85)',
          }} />
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontSize: 14, fontWeight: 700, color: c.ink, letterSpacing: '-0.01em', lineHeight: 1.25}}>
              {t(qa.ui.panelTitle)}
            </div>
            <div style={{fontSize: 11.5, color: c.faint, marginTop: 2, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em'}}>
              {t(qa.ui.panelSubtitle)}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label={t(qa.ui.closeAria)}
            style={{
              width: 32, height: 32, borderRadius: 999,
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: c.mute, fontSize: 18, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'inherit',
            }}
          >×</button>
        </header>

        {/* Messages */}
        <div
          ref={scrollerRef}
          data-as-scroller
          style={{
            flex: 1, overflowY: 'auto', padding: '18px 18px 8px',
            display: 'flex', flexDirection: 'column', gap: 14,
            background: c.bg,
          }}
        >
          {/* Greeting */}
          <BotBubble c={c} text={t(qa.ui.greeting)} />

          {conversation.map((m) => (
            m.role === 'user' ? (
              <UserBubble key={m.key} c={c} text={m.text} />
            ) : (
              <BotBubble key={m.key} c={c} text={m.text} jump={m.jump} lang={lang} onJump={handleJump} />
            )
          ))}

          {thinking && <TypingDots c={c} />}
        </div>

        {/* Question footer — desktop: dropdown popover, mobile: horizontal chip rail */}
        <footer style={{
          borderTop: `1px solid ${c.line}`,
          background: c.paper,
          padding: '12px 14px 14px',
        }}>
          {isMobile ? (
            <>
              <div style={{
                fontSize: 10.5, fontWeight: 700, color: c.faint,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: "'IBM Plex Mono', monospace",
                marginBottom: 9, paddingLeft: 2,
              }}>
                {conversation.length > 0 ? t(qa.ui.askAnother) : (lang === 'en' ? 'Pick a question' : '질문 골라보기')}
              </div>
              <div data-as-chiprail style={{
                display: 'flex', gap: 7,
                flexWrap: 'nowrap', overflowX: 'auto',
                paddingBottom: 4,
                scrollSnapType: 'x proximity',
              }}>
                {qa.items.map((item) => {
                  const asked = askedIds.has(item.id);
                  return (
                    <button
                      key={item.id}
                      data-as-chip
                      data-disabled={asked || thinking ? 'true' : 'false'}
                      disabled={thinking}
                      onClick={() => handleQuestion(item)}
                      style={{
                        flexShrink: 0,
                        padding: '8px 13px', fontSize: 12.5,
                        background: asked ? c.bgTint : c.bg,
                        color: asked ? c.faint : c.ink,
                        border: `1px solid ${c.line}`,
                        borderRadius: 999, cursor: thinking ? 'default' : 'pointer',
                        fontFamily: 'inherit', fontWeight: 500,
                        whiteSpace: 'nowrap',
                        transition: 'background .2s ease, border-color .2s ease, color .2s ease',
                        scrollSnapAlign: 'start',
                        opacity: thinking ? 0.6 : 1,
                      }}
                    >
                      {asked ? '✓ ' : ''}{t(item.q)}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div ref={listAnchorRef} style={{position: 'relative'}}>
              {/* Popover list — appears above the trigger button */}
              <div
                aria-hidden={!listOpen}
                style={{
                  position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, right: 0,
                  background: c.paper, border: `1px solid ${c.line}`, borderRadius: 12,
                  boxShadow: '0 -16px 36px -14px rgba(20,15,10,0.20), 0 -2px 8px -4px rgba(20,15,10,0.06)',
                  padding: 6,
                  maxHeight: 280, overflowY: 'auto',
                  zIndex: 2,
                  opacity: listOpen ? 1 : 0,
                  transform: listOpen ? 'translateY(0)' : 'translateY(6px)',
                  pointerEvents: listOpen ? 'auto' : 'none',
                  transition: 'opacity .2s ease, transform .25s cubic-bezier(.2,.7,.2,1)',
                }}
              >
                {qa.items.map((item) => {
                  const asked = askedIds.has(item.id);
                  return (
                    <button
                      key={item.id}
                      data-as-listrow
                      data-asked={asked ? 'true' : 'false'}
                      disabled={thinking}
                      onClick={() => { handleQuestion(item); setListOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', textAlign: 'left',
                        padding: '10px 12px',
                        background: 'transparent', border: 'none', borderRadius: 8,
                        cursor: thinking ? 'default' : 'pointer',
                        fontSize: 13, fontFamily: 'inherit', fontWeight: 500,
                        color: asked ? c.faint : c.ink,
                        transition: 'background .15s ease, color .15s ease',
                      }}
                    >
                      <span style={{
                        flex: 0, width: 14, fontSize: 11, color: asked ? c.accent : c.faint,
                      }}>{asked ? '✓' : ''}</span>
                      <span style={{flex: 1, lineHeight: 1.4}}>{t(item.q)}</span>
                      <span style={{flex: 0, color: c.accent, fontSize: 12, opacity: 0.5}}>→</span>
                    </button>
                  );
                })}
              </div>

              {/* Trigger button */}
              <button
                onClick={(e) => { e.stopPropagation(); setListOpen(o => !o); }}
                aria-expanded={listOpen}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  padding: '10px 14px',
                  background: c.bg, border: `1px solid ${c.line}`, borderRadius: 999,
                  fontSize: 13, color: c.ink, fontFamily: 'inherit',
                  cursor: 'pointer', fontWeight: 500,
                  transition: 'border-color .2s ease, background .2s ease',
                }}
              >
                <span style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{
                    fontSize: 10.5, fontWeight: 700, color: c.faint,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>{askedIds.size}/{qa.items.length}</span>
                  <span>{conversation.length > 0 ? t(qa.ui.askAnother) : (lang === 'en' ? 'Pick a question' : '질문 골라보기')}</span>
                </span>
                <span style={{
                  color: c.faint, fontSize: 11,
                  transform: listOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform .2s ease', display: 'inline-block',
                }}>▾</span>
              </button>
            </div>
          )}
        </footer>
      </div>
    </>
  );
}

// Bot/User message bubbles — paragraph-aware (split on \n\n), optional jump link.
function BotBubble({ c, text, jump, lang, onJump }) {
  const paragraphs = String(text).split('\n\n');
  return (
    <div data-as-msg-bot style={{
      alignSelf: 'flex-start', maxWidth: '88%',
      background: c.paper, border: `1px solid ${c.line}`,
      borderRadius: '4px 14px 14px 14px',
      padding: '11px 14px',
      fontSize: 13.5, lineHeight: 1.65, color: c.ink,
      wordBreak: 'keep-all', overflowWrap: 'break-word',
    }}>
      {paragraphs.map((p, i) => (
        <p key={i} style={{margin: i === 0 ? 0 : '8px 0 0'}}>{p}</p>
      ))}
      {jump && (
        <button
          data-as-jump
          onClick={() => onJump(jump.id)}
          style={{
            marginTop: 12, padding: '6px 11px',
            background: 'transparent', color: c.accent,
            border: `1px solid ${c.accentSoft}`, borderRadius: 999,
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'inline-flex', alignItems: 'center', gap: 4,
            transition: 'color .2s ease, border-color .2s ease',
          }}
        >
          → {jump.label[lang] || jump.label.ko}
        </button>
      )}
    </div>
  );
}

function UserBubble({ c, text }) {
  return (
    <div data-as-msg-user style={{
      alignSelf: 'flex-end', maxWidth: '85%',
      background: c.ink, color: c.bg,
      borderRadius: '14px 4px 14px 14px',
      padding: '10px 14px',
      fontSize: 13, lineHeight: 1.55,
      wordBreak: 'keep-all', overflowWrap: 'break-word',
      fontWeight: 500,
    }}>
      {text}
    </div>
  );
}

function TypingDots({ c }) {
  return (
    <div data-as-msg-bot style={{
      alignSelf: 'flex-start',
      background: c.paper, border: `1px solid ${c.line}`,
      borderRadius: '4px 14px 14px 14px',
      padding: '12px 16px',
      display: 'inline-flex', gap: 4, alignItems: 'center',
    }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: c.faint,
          display: 'inline-block',
          animation: `asTypingBlink 1.2s ${i * 0.18}s infinite ease-in-out`,
        }}></span>
      ))}
    </div>
  );
}

window.PortfolioWarm = PortfolioWarm;
