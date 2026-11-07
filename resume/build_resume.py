"""Builds the ATS-friendly resume copy.

Writes resume/Sriram_Kolli_Resume_ATS.html, .pdf and .txt from the content below.
Run:  python resume/build_resume.py
Needs Google Chrome (for the PDF) and, for the check, the pypdf package.
Only plain ASCII text, one column, standard headings and no tables or icons, so applicant
tracking systems read it in the right order.
"""
import html, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

NAME = "SRIRAM KOLLI"
CONTACT = [
    ("Bengaluru, India", None),
    ("kollisriram6@gmail.com", "mailto:kollisriram6@gmail.com"),
    ("linkedin.com/in/sriram-kolli-979723219", "https://www.linkedin.com/in/sriram-kolli-979723219"),
    ("github.com/sriram36", "https://github.com/sriram36"),
    ("portfolio.kollisriram6.workers.dev", "https://portfolio.kollisriram6.workers.dev"),
]

SUMMARY = (
    "Backend-focused Full Stack Software Engineer and final-year B.Tech student (Computer Science and "
    "Information Technology, 2027) with internships at Accenture, Zennith AI and PixelTests. Builds FastAPI and "
    "PostgreSQL services, agentic AI pipelines with LangGraph and Azure OpenAI, and workflow automation. "
    "Cut manual support tickets by 80%, saving 15+ engineering hours per week. Seeking software engineering internships and entry-level roles."
)

SKILLS = [
    ("Languages", "Python, JavaScript, TypeScript, Java, SQL"),
    ("Backend", "FastAPI, Django, Node.js, Express.js, REST APIs, WebSockets, SQLAlchemy, Alembic, JWT, CI/CD, Pytest"),
    ("Frontend", "Next.js, React.js, Tailwind CSS, Streamlit"),
    ("Databases", "PostgreSQL, Supabase, MongoDB, SQLite"),
    ("AI and LLM", "LangGraph, Azure OpenAI, prompt engineering, RAG, LLM evaluation"),
    ("Automation and Tools", "n8n, Playwright, BeautifulSoup, Twilio, WhatsApp Cloud API, Docker, Git, Linux CLI, Postman"),
]

EXPERIENCE = [
    {
        "title": "Full Stack Developer Intern", "org": "Zennith AI", "dates": "Sep 2025 - Present (paused Jun - Jul 2026 for Accenture)",
        "note": None,
        "bullets": [
            "Built a document-extraction pipeline with custom parsing across 10+ FastAPI endpoints, returning structured data in under 3 seconds with sub-100 ms responses under concurrent load.",
            "Shipped 5+ Next.js components for upload flows and result visualization, owning the frontend-to-backend integration independently.",
        ],
    },
    {
        "title": "Associate Software Engineer Intern", "org": "Accenture", "dates": "Jun 2026 - Jul 2026", "note": None,
        "bullets": [
            "Contributed to CI/CD pipelines and deployment workflows for enterprise-scale backend services (FastAPI, PostgreSQL) in a globally distributed team.",
            "Independently designed and delivered an agentic Pharma MLR (Medical-Legal-Regulatory) compliance review system in about 2 months as a mentor-approved project (LangGraph, Azure OpenAI, FastAPI, Streamlit), presented in a live mentor demo.",
            "Built a deterministic rule-based grader (16 compliance rules, one optionally LLM-assisted; 78% agreement with manual review in my own test) and a three-tier fallback (dictionary, disk cache, LLM) that removed non-determinism and silent failures.",
        ],
    },
    {
        "title": "Software Development Intern", "org": "PixelTests", "dates": "Dec 2024 - May 2025", "note": None,
        "bullets": [
            "Developed a WhatsApp support pipeline (FastAPI, Twilio, state-machine logic) that cut manual ticket volume by 80%, saving 15+ engineering hours per week.",
            "Maintained 3+ production FastAPI services.",
        ],
    },
]

PROJECTS = [
    {
        "title": "LeaveFlow - Leave Management Platform (WhatsApp and web)",
        "stack": "FastAPI, PostgreSQL, WebSockets, Next.js",
        "links": [("github.com/sriram36/LeaveFlow", "https://github.com/sriram36/LeaveFlow"), ("Live demo: leave-flow-cyan.vercel.app", "https://leave-flow-cyan.vercel.app")],
        "bullets": [
            "Designed a dual-interface leave system (WhatsApp and web dashboard) with role-based access control, multi-level approvals, real-time WebSocket updates and audit logging across 10+ REST endpoints, replacing email-chain approvals.",
            "Handled concurrent requests with a normalized PostgreSQL schema and transactional writes; added JWT cookie authentication, webhook signature verification, rate limiting, Alembic migrations and a 29-test backend suite.",
        ],
    },
    {
        "title": "FinSight - Evidence-Grounded Personal Finance Platform",
        "stack": "FastAPI, Next.js, PostgreSQL",
        "links": [("github.com/sriram36/FinSight", "https://github.com/sriram36/FinSight"), ("Live: finsight-wine-tau.vercel.app", "https://finsight-wine-tau.vercel.app")],
        "bullets": [
            "Built a finance decision-support platform that keeps arithmetic out of the LLM: totals and daily pace are computed deterministically in Python, and a claim verifier checks every number in generated advice against cited transactions within a 1% tolerance.",
            "Added protected-category rules, SHA-256 de-duplication on statement import and a reproducible benchmark; 60 automated tests; deployed on Vercel and Render.",
        ],
    },
]

EDUCATION = [
    "B.Tech, Computer Science and Information Technology | SRKR Engineering College, Bhimavaram | 2023 - 2027 | CGPA 8.9/10",
]

CERTS = [
    "Agentic AI Fluency, Udacity, Jun 2026",
    "Generative AI Fluency, Udacity, Jun 2026",
    "AWS Educate Machine Learning Foundations, AWS, Jun 2025",
    "Introducing Generative AI with AWS, Udacity, Jun 2025",
    "Java Full Stack Developer Virtual Internship, EduSkills, Dec 2024",
]

ACHIEVEMENTS = [
    "Smart India Hackathon 2024: 1st among 150+ teams (internal selection round).",
    "Innoverse Startup Pitch: 3rd prize.",
    "GDSC Solution Challenge 2025: submitted EduBridge, a digital-skills learning platform (SDG 4).",
]

e = html.escape
def link(text, href):
    return '<a href="%s">%s</a>' % (e(href), e(text)) if href else e(text)

def render_html():
    out = []
    out.append('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Sriram Kolli - Resume</title><style>')
    out.append('''@page{size:A4;margin:9mm 12mm}
*{box-sizing:border-box}
body{margin:0;font:9pt/1.22 Arial,Helvetica,sans-serif;color:#000}
a{color:#000;text-decoration:none}
h1{font-size:17pt;margin:0 0 2px;letter-spacing:.5px}
.contact{margin:0 0 5px}
h2{font-size:9.6pt;margin:5px 0 2px;padding-bottom:1px;border-bottom:1px solid #000;letter-spacing:.6px}
p{margin:0 0 2px}
ul{margin:1px 0 3px;padding-left:15px}
li{margin:0 0 1px}
.row{margin:3px 0 0;font-weight:bold}
.sub{margin:0;font-style:italic}
.skill b{font-weight:bold}''')
    out.append('</style></head><body>')
    out.append('<h1>%s</h1>' % e(NAME))
    out.append('<p class="contact">%s</p>' % ' | '.join(link(t, h) for t, h in CONTACT))
    out.append('<h2>SUMMARY</h2><p>%s</p>' % e(SUMMARY))
    out.append('<h2>SKILLS</h2>')
    for k, v in SKILLS:
        out.append('<p class="skill"><b>%s:</b> %s</p>' % (e(k), e(v)))
    out.append('<h2>EXPERIENCE</h2>')
    for x in EXPERIENCE:
        out.append('<p class="row">%s | %s | %s</p>' % (e(x['title']), e(x['org']), e(x['dates'])))
        if x['note']:
            out.append('<p class="sub">%s</p>' % e(x['note']))
        out.append('<ul>%s</ul>' % ''.join('<li>%s</li>' % e(b) for b in x['bullets']))
    out.append('<h2>PROJECTS</h2>')
    for x in PROJECTS:
        out.append('<p class="row">%s | %s</p>' % (e(x['title']), e(x['stack'])))
        out.append('<p class="sub">%s</p>' % ' | '.join(link(t, h) for t, h in x['links']))
        out.append('<ul>%s</ul>' % ''.join('<li>%s</li>' % e(b) for b in x['bullets']))
    out.append('<h2>EDUCATION</h2>')
    for x in EDUCATION:
        out.append('<p>%s</p>' % e(x))
    out.append('<h2>CERTIFICATIONS</h2><p>%s</p>' % e('; '.join(CERTS) + '.'))
    out.append('<h2>ACHIEVEMENTS</h2><p>%s</p>' % e(' '.join(ACHIEVEMENTS)))
    out.append('</body></html>')
    return '\n'.join(out)

def render_txt():
    L = [NAME, ' | '.join(t for t, _ in CONTACT), '', 'SUMMARY', SUMMARY, '', 'SKILLS']
    L += ['%s: %s' % kv for kv in SKILLS]
    L += ['', 'EXPERIENCE']
    for x in EXPERIENCE:
        L.append('%s | %s | %s' % (x['title'], x['org'], x['dates']))
        if x['note']:
            L.append(x['note'])
        L += ['- ' + b for b in x['bullets']] + ['']
    L.append('PROJECTS')
    for x in PROJECTS:
        L.append('%s | %s' % (x['title'], x['stack']))
        L.append(' | '.join(t for t, _ in x['links']))
        L += ['- ' + b for b in x['bullets']] + ['']
    L += ['EDUCATION'] + EDUCATION + ['', 'CERTIFICATIONS', '; '.join(CERTS) + '.', '', 'ACHIEVEMENTS', ' '.join(ACHIEVEMENTS)]
    return '\n'.join(L) + '\n'

if __name__ == '__main__':
    base = os.path.join(HERE, 'Sriram_Kolli_Resume_ATS')
    open(base + '.html', 'w', encoding='utf-8').write(render_html())
    open(base + '.txt', 'w', encoding='utf-8', newline='\n').write(render_txt())
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--print-to-pdf=' + base + '.pdf', 'file:///' + (base + '.html').replace('\\', '/')], check=True, capture_output=True, timeout=120)
    print('wrote', base + '.pdf')
