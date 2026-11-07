// Run with: npm test  (Node 18 or newer, no packages needed)
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const D = require('../js/data.js');

const ROOT = path.join(__dirname, '..');
const shown = D.P.filter(p => !D.HIDE.includes(p[0]));
const OUTCOMES = Object.keys(D.NAMES);
const DATE = /^\d{4}-\d\d-\d\d$/;

test('every project row has a name, a valid date, an outcome and a note', () => {
  for (const p of D.P) {
    assert.ok(p[0], 'row has no name: ' + JSON.stringify(p));
    assert.match(p[1], DATE, p[0] + ': bad date');
    assert.ok(!Number.isNaN(Date.parse(p[1])), p[0] + ': unreadable date');
    assert.ok(OUTCOMES.includes(p[3]), p[0] + ': unknown outcome ' + p[3]);
    assert.ok(p[6] && p[6].trim(), p[0] + ': missing note');
  }
});

test('project names are unique', () => {
  const names = D.P.map(p => p[0]);
  assert.equal(new Set(names).size, names.length);
});

test('the headline count matches the page: 28 projects, 8 live', () => {
  assert.equal(shown.length, 28);
  assert.equal(shown.filter(p => p[3] === 'live').length, 8);
});

test('hidden names refer to real rows', () => {
  for (const h of D.HIDE) assert.ok(D.P.some(p => p[0] === h), 'HIDE has an unknown name: ' + h);
});

test('every live project links somewhere you can open', () => {
  for (const p of shown.filter(p => p[3] === 'live')) assert.match(p[5] || '', /^https:\/\//, p[0] + ': live without a link');
});

test('start dates exist for known projects and are not after the last push', () => {
  for (const [name, start] of Object.entries(D.START)) {
    const row = D.P.find(p => p[0] === name);
    assert.ok(row, 'START names an unknown project: ' + name);
    assert.match(start, DATE);
    assert.ok(start <= row[1], name + ': starts after its last push');
  }
});

test('outcome colours and names cover every outcome', () => {
  for (const o of D.B) { assert.ok(D.NAMES[o], o); assert.ok(D.HC[o], o); }
  assert.deepEqual([...D.B].sort(), OUTCOMES.sort());
});

test('receipt cards: every claim is marked Check it or My word', () => {
  for (const card of D.RC) {
    const claims = card[2];
    assert.ok(Array.isArray(claims) && claims.length, card[0] + ': no claims');
    for (const c of claims) {
      assert.ok(['c', 'w'].includes(c[1]), card[0] + ': claim kind must be c or w');
      if (c[1] === 'c') assert.match(c[2] || '', /^https:\/\//, card[0] + ': "Check it" needs a link');
    }
  }
});

test('skills only name projects and employers that exist', () => {
  const known = new Set([...shown.map(p => p[0]), ...Object.keys(D.KN)]);
  for (const [skill, who] of Object.entries(D.USES)) for (const w of who) assert.ok(known.has(w), skill + ' uses unknown ' + w);
});

test('the commit rhythm grid has one row per week of seven days', () => {
  for (const week of D.RH.w) assert.equal(week.length, 4);
  assert.match(D.RH.start, DATE);
});

test('index.html loads every script and stylesheet it names, and nothing else is missing', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const files = [...html.matchAll(/(?:src|href)="((?:js|css|fonts)\/[^"]+)"/g)].map(m => m[1]);
  assert.ok(files.length > 10);
  for (const f of files) assert.ok(fs.existsSync(path.join(ROOT, f)), 'missing file: ' + f);
  // data.js must load before the files that read it
  const order = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
  assert.equal(order[0], 'js/data.js');
  assert.ok(order.indexOf('js/app.js') < order.findIndex(s => s.startsWith('js/features/')));
});
