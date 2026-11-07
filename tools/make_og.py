"""Regenerates og-image.png (the link preview image) from the live counts in index.html.

Usage:  python tools/make_og.py
Counts the projects and the live ones the same way the page does, draws the "8 over 28" card in
headless Chrome using the self-hosted font, and overwrites og-image.png. Run it whenever the counts change.
"""
import os, re, subprocess, tempfile
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
s = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
hide = re.search(r"const HIDE=\[([^\]]*)\]", s).group(1)
rows = re.findall(r"^\['([^']+)','\d{4}-\d\d-\d\d','[^']*','(live|learned|killed|unsorted)'", s, re.M)
rows = [r for r in rows if "'%s'" % r[0] not in hide]
n, live = len(rows), sum(1 for r in rows if r[1] == 'live')
font = 'file:///' + os.path.join(ROOT, 'fonts', 'bricolage-grotesque-latin.woff2').replace(chr(92), '/')
page = f"""<!doctype html><meta charset="utf-8"><style>
@font-face{{font-family:B;src:url({font});font-weight:300 800;font-stretch:75% 100%}}
body{{margin:0;width:1200px;height:630px;background:#2338ff;color:#f3f5ff;font-family:B,Arial,sans-serif;display:flex;align-items:center;gap:64px;padding:0 90px;box-sizing:border-box;overflow:hidden}}
.f{{font-weight:800;font-stretch:75%;font-size:250px;line-height:.82;letter-spacing:-.04em;text-align:center}}
.f i{{display:block;height:16px;background:#f3f5ff;border-radius:9px;margin:16px 0 20px}}
</style><body><div class="f"><div style="color:#6dffb0">{live}</div><i></i><div>{n}</div></div>
<div><div style="font-weight:800;font-size:68px;line-height:1.02;letter-spacing:-.02em">Every portfolio shows the survivors.</div>
<div style="font-size:34px;margin-top:22px;opacity:.9">This one shows the denominator.</div>
<div style="font-size:26px;margin-top:40px;font-weight:600;color:#ffd23f">Sriram Kolli, backend-focused full-stack engineer</div></div></body>"""
tmp = os.path.join(tempfile.gettempdir(), 'og_card.html')
open(tmp, 'w', encoding='utf-8').write(page)
out = os.path.join(ROOT, 'og-image.png')
subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,630', '--virtual-time-budget=4000', '--screenshot=' + out, 'file:///' + tmp.replace(chr(92), '/')], check=True, capture_output=True, timeout=120)
os.remove(tmp)
print('og-image.png written: %d of %d live' % (live, n))
