// 구독용 여행 일정 캘린더(trip.ics) 생성. 사용: node tools/build-ics.js
// 페이지의 "여행 일정 11일 (.ics)" 버튼(scheduleIcs)과 같은 규칙으로 index.html의 일정 블록을 읽는다.
// GitHub Pages에 올라간 trip.ics를 구글 캘린더에서 "URL로 추가"하면, 일정을 고치고 푸시할 때마다 폰 캘린더가 따라 바뀐다.
// 예약번호 등 .sensitive 내용과 버튼·지도 배지는 뺀다. 내용이 그대로면 파일을 다시 쓰지 않는다(DTSTAMP만 바뀌는 커밋 방지).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const OUT = path.join(root, 'trip.ics');
const YEAR = 2026, MONTH = 10;

const pad = n => (n < 10 ? '0' : '') + n;
const ymd = d => d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate());
const esc = t => String(t || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
function fold(line) {
  const out = [];
  let cur = '', bytes = 0;
  for (const ch of line) {
    const b = Buffer.byteLength(ch);
    if (bytes + b > 74) { out.push(cur); cur = ' ' + ch; bytes = 1 + b; } else { cur += ch; bytes += b; }
  }
  out.push(cur);
  return out.join('\r\n');
}

// 여는 태그가 test에 맞는 요소를 (같은 태그의 중첩까지 세어) 통째로 지운다
function removeEls(s, tag, test) {
  const re = new RegExp('<(/?)' + tag + '\\b[^>]*>', 'g');
  let out = '', last = 0, depth = 0, start = -1, m;
  while ((m = re.exec(s))) {
    if (depth === 0) {
      if (!m[1] && test(m[0])) { start = m.index; depth = 1; }
    } else if (m[1]) {
      if (--depth === 0) { out += s.slice(last, start); last = re.lastIndex; }
    } else depth++;
  }
  return out + s.slice(last);
}
function clean(s) {
  s = removeEls(s, 'span', t => /class="[^"]*\b(sensitive|detail-sensitive|mini-badge)\b/.test(t));
  s = removeEls(s, 'a', t => /class="[^"]*\bnav-badge\b/.test(t));
  s = removeEls(s, 'button', () => true);
  s = s.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '');
  s = s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, '&');
  return s.replace(/\s+/g, ' ').trim();
}

const VTZ = ['BEGIN:VTIMEZONE', 'TZID:America/Los_Angeles',
  'BEGIN:DAYLIGHT', 'TZOFFSETFROM:-0800', 'TZOFFSETTO:-0700', 'TZNAME:PDT', 'DTSTART:19700308T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU', 'END:DAYLIGHT',
  'BEGIN:STANDARD', 'TZOFFSETFROM:-0700', 'TZOFFSETTO:-0800', 'TZNAME:PST', 'DTSTART:19701101T020000', 'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU', 'END:STANDARD',
  'END:VTIMEZONE'];

const now = new Date();
const stamp = ymd(now) + 'T' + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds()) + 'Z';
const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//uswest2026//family-trip//KO', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
  'X-WR-CALNAME:미서부 가족여행 2026 일정', 'X-WR-TIMEZONE:America/Los_Angeles',
  'REFRESH-INTERVAL;VALUE=DURATION:PT1H', 'X-PUBLISHED-TTL:PT1H'].concat(VTZ);

const dayStarts = [...html.matchAll(/<details class="day[^"]*" id="day-(\d+)"/g)];
let count = 0;
dayStarts.forEach((m, k) => {
  const n = +m[1];
  const end = k + 1 < dayStarts.length ? dayStarts[k + 1].index : html.indexOf('</div>', html.indexOf('id="day-' + n + '"'));
  const dayHtml = html.slice(m.index, k + 1 < dayStarts.length ? end : html.indexOf('<details class="cal-export"', m.index));
  const blocks = dayHtml.split(/<div class="sched-block[^"]*">/).slice(1);
  blocks.forEach((raw, i) => {
    const b = raw.split('<div class="tip-note')[0];
    const timeM = b.match(/<div class="sched-time">([\s\S]*?)<\/div>/);
    const titleM = b.match(/<div class="sched-title">([\s\S]*?)<\/div>/);
    if (!timeM || !titleM) return;
    const t = clean(timeM[1]).match(/\d{1,2}:\d{2}/g);
    if (!t) return;
    const mins = h => { const p = h.split(':'); return +p[0] * 60 + +p[1]; };
    const s0 = mins(t[0]), e0 = t.length > 1 ? mins(t[1]) : s0 + 30;
    const dayStart = new Date(Date.UTC(YEAR, MONTH - 1, n)), endDay = new Date(dayStart.getTime());
    let startShift = 0, endShift = Math.floor(e0 / 1440);
    if (e0 <= s0) { if (i === 0 && n > 1) startShift = -1; else endShift += 1; } // 자정을 넘는 블록(페이지와 같은 규칙)
    dayStart.setUTCDate(dayStart.getUTCDate() + startShift);
    endDay.setUTCDate(endDay.getUTCDate() + endShift);
    const hhmm = x => { x %= 1440; return pad(Math.floor(x / 60)) + pad(x % 60) + '00'; };
    const title = clean(titleM[1]);
    const desc = [...b.matchAll(/<div class="sched-note[^"]*"[^>]*>([\s\S]*?)<\/div>/g)].map(x => clean(x[1])).filter(Boolean).join('\n');
    const locM = b.match(/<a class="nav-badge" href="([^"]*query=[^"]*)"/);
    let loc = '';
    if (locM) { try { loc = new URL(locM[1].replace(/&amp;/g, '&')).searchParams.get('query') || ''; } catch (e) {} }
    lines.push('BEGIN:VEVENT',
      'UID:sched-d' + n + '-' + i + '-' + hhmm(s0) + '@uswest2026',
      'DTSTAMP:' + stamp,
      'DTSTART;TZID=America/Los_Angeles:' + ymd(dayStart) + 'T' + hhmm(s0),
      'DTEND;TZID=America/Los_Angeles:' + ymd(endDay) + 'T' + hhmm(e0),
      'SUMMARY:' + esc(n + '일차 · ' + title));
    if (desc) lines.push('DESCRIPTION:' + esc(desc));
    if (loc) lines.push('LOCATION:' + esc(loc));
    lines.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-PT15M', 'DESCRIPTION:' + esc(title), 'END:VALARM', 'END:VEVENT');
    count++;
  });
});
lines.push('END:VCALENDAR');
const text = lines.map(fold).join('\r\n') + '\r\n';

const strip = s => s.replace(/^DTSTAMP:.*\r?\n/gm, '');
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
if (strip(prev) === strip(text)) console.log('trip.ics unchanged (' + count + ' events)');
else { fs.writeFileSync(OUT, text); console.log('trip.ics written (' + count + ' events)'); }
