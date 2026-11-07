"""Compare the resume with a job description.

Usage:  python resume/check_jd.py path/to/job_description.txt
Prints which technology keywords in the job description the resume already has, and which it does not.
Only add a missing keyword to the resume if it is true: the list is a guide, not a to-do list.
"""
import re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
resume = open(os.path.join(HERE, 'Sriram_Kolli_Resume_ATS.txt'), encoding='utf-8').read().lower()
VOCAB = """python java javascript typescript sql go golang c++ c# ruby php kotlin swift rust
fastapi django flask node.js express.js spring springboot rest restful graphql grpc websockets microservices
react react.js next.js vue angular tailwind html css streamlit
postgresql postgres mysql mongodb redis sqlite supabase dynamodb elasticsearch kafka rabbitmq
docker kubernetes aws azure gcp terraform ci/cd jenkins github-actions linux git nginx
pytest unit-testing integration-testing tdd agile scrum jira
langgraph langchain openai llm rag prompt-engineering machine-learning nlp pandas numpy scikit-learn pytorch tensorflow
n8n playwright selenium beautifulsoup twilio postman jwt oauth sqlalchemy alembic
data-structures algorithms system-design api-design authentication authorization""".split()
ALIAS = {'rest': 'rest apis', 'restful': 'rest apis', 'postgres': 'postgresql', 'unit-testing': 'pytest', 'ci/cd': 'ci/cd',
         'prompt-engineering': 'prompt engineering', 'github-actions': 'ci/cd', 'machine-learning': 'machine learning'}
def has(text, k):
    k = ALIAS.get(k, k).replace('-', ' ')
    return re.search(r'(?<![a-z0-9])' + re.escape(k) + r'(?![a-z0-9])', text) is not None
jd = open(sys.argv[1], encoding='utf-8').read().lower()
wanted = list(dict.fromkeys(ALIAS.get(k, k) for k in VOCAB if has(jd.replace('-', ' '), k)))
hit = [k for k in wanted if has(resume, k)]
miss = [k for k in wanted if not has(resume, k)]
print('Keywords in the job description: %d' % len(wanted))
print('Already in the resume (%d): %s' % (len(hit), ', '.join(hit) or '-'))
print('Not in the resume (%d): %s' % (len(miss), ', '.join(miss) or '-'))
if wanted: print('Coverage: %d%%' % round(100 * len(hit) / len(wanted)))
