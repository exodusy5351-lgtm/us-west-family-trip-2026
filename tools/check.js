// index.html 빠른 점검: 태그 균형 + 인라인 <script> 문법. 사용: node tools/check.js
// 정상 출력 예: "script blocks: 25 syntax errors: 0" (블록 수는 변경에 따라 달라질 수 있음)
const fs = require('fs');
const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');

for (const t of ['div', 'details', 'summary', 'span', 'button', 'ul', 'li']) {
  const open = (html.match(new RegExp('<' + t + '[\\s>]', 'g')) || []).length;
  const close = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
  console.log(t, open, close, open === close ? 'OK' : 'MISMATCH');
}

// 개수만 맞고 순서가 어긋난 경우(여분 </div>로 카드가 일찍 닫힘 등)를 잡는 중첩 검사
const body = html.slice(html.indexOf('<body')).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '');
const stack = [], nestErr = [];
for (const m of body.matchAll(/<(\/?)(div|details|summary|section|main|ol|ul|li|span|button|a)\b[^>]*>/g)) {
  if (!m[1]) { stack.push(m[2]); continue; }
  if (stack[stack.length - 1] === m[2]) stack.pop();
  else nestErr.push('</' + m[2] + '> but open <' + stack[stack.length - 1] + '> near: ' + body.slice(Math.max(0, m.index - 80), m.index).replace(/\s+/g, ' '));
}
console.log('nesting errors:', nestErr.length, 'unclosed:', stack.length);
nestErr.slice(0, 3).forEach(e => console.log('  ' + e));

let blocks = 0, errors = 0;
for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/type=["']application\/(ld\+)?json/.test(m[1])) continue;
  blocks++;
  try { new Function(m[2]); } catch (e) { errors++; console.log('SYNTAX ERROR:', e.message, '\n', m[2].slice(0, 120)); }
}
console.log('script blocks:', blocks, 'syntax errors:', errors);
