// Syntax-checks every script the page loads, plus the Worker. Usage: npm run check
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.join(__dirname, '..');
const files = ['js', 'js/features'].flatMap(d => fs.readdirSync(path.join(root, d)).filter(f => f.endsWith('.js')).map(f => path.join(root, d, f)));
files.push(path.join(root, 'worker', 'index.js'));
let bad = 0;
for (const f of files) {
  try { execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }); }
  catch (e) { bad++; console.error('FAIL ' + path.relative(root, f) + '\n' + e.stderr); }
}
console.log(files.length - bad + ' of ' + files.length + ' files parse');
process.exit(bad ? 1 : 0);
