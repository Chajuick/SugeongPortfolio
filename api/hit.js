// 방문 알림용 서버리스 함수 (Vercel Node.js runtime)
// 방문마다 디스코드 웹훅으로 접속 시각 / 위치 / IP / 유입경로 / 기기 정보를 보냅니다.
//
// 사용법:
//   1) 디스코드 채널에서 웹훅 URL 발급
//   2) Vercel > Settings > Environment Variables 에 DISCORD_WEBHOOK_URL 추가
//   3) index.html 하단의 beacon 스크립트가 이 엔드포인트를 호출
//
// 얻을 수 있는 것: 대략적 도시 + IP + 시각 + 기기/브라우저 (누구인지 '신원'은 알 수 없음)
// IP 위치는 근사치이며 VPN/모바일에서는 부정확할 수 있습니다.

export default async function handler(req, res) {
  // CORS/캐시 방지
  res.setHeader('Cache-Control', 'no-store');

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  // 환경변수 미설정(로컬/프리뷰 등)이면 조용히 종료
  if (!webhook) {
    res.status(204).end();
    return;
  }

  const h = req.headers || {};
  const q = req.query || {};

  const ip =
    (h['x-forwarded-for'] || '').split(',')[0].trim() ||
    h['x-real-ip'] ||
    'unknown';

  const country = h['x-vercel-ip-country'] || '';
  const region = h['x-vercel-ip-country-region'] || '';
  let city = '';
  try {
    city = decodeURIComponent(h['x-vercel-ip-city'] || '');
  } catch (_) {
    city = h['x-vercel-ip-city'] || '';
  }

  const ua = h['user-agent'] || '';
  const path = (q.p || '/').toString();
  const ref = (q.ref || h['referer'] || '직접 방문(없음)').toString();
  const lang = (q.l || '').toString();

  const location = [city, region, country].filter(Boolean).join(', ') || '위치 불명';

  // 한국 시간(KST) 표기
  const now = new Date();
  let kst;
  try {
    kst = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(now);
  } catch (_) {
    kst = now.toISOString();
  }

  const clip = (s, n) => (s.length > n ? s.slice(0, n) + '…' : s);

  const payload = {
    username: '포폴 방문 알림',
    embeds: [
      {
        title: '🔔 포트폴리오 방문',
        color: 0xe8a87c,
        fields: [
          { name: '🕒 시각 (KST)', value: kst, inline: false },
          { name: '📍 위치', value: location, inline: true },
          { name: '🌐 IP', value: '`' + ip + '`', inline: true },
          { name: '📄 페이지', value: clip(path, 100), inline: true },
          { name: '↩️ 유입경로', value: clip(ref, 300), inline: false },
          { name: '💻 기기/브라우저', value: clip(ua, 300), inline: false },
        ],
        footer: lang ? { text: '언어: ' + lang } : undefined,
        timestamp: now.toISOString(),
      },
    ],
  };

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (_) {
    // 알림 실패해도 방문자 경험엔 영향 없도록 무시
  }

  res.status(204).end();
}
