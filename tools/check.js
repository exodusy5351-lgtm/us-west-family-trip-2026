// index.html 빠른 점검: 태그 균형 + 인라인 <script> 문법. 사용: node tools/check.js
// 정상 출력 예: "script blocks: 25 syntax errors: 0" (블록 수는 변경에 따라 달라질 수 있음)
const fs = require('fs');
const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');

for (const t of ['div', 'details', 'summary', 'span', 'button', 'ul', 'li']) {
  const open = (html.match(new RegExp('<' + t + '[\\s>]', 'g')) || []).length;
  const close = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
  console.log(t, open, close, open === close ? 'OK' : 'MISMATCH');
}

let blocks = 0, errors = 0;
for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/type=["']application\/(ld\+)?json/.test(m[1])) continue;
  blocks++;
  try { new Function(m[2]); } catch (e) { errors++; console.log('SYNTAX ERROR:', e.message, '\n', m[2].slice(0, 120)); }
}
console.log('script blocks:', blocks, 'syntax errors:', errors);
