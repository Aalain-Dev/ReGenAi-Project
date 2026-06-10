const resmune = `
John Doe
Software Engineer
Email: john.doe@example.com | Phone: +1-555-0123 | Location: San Francisco, CA
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

PROFESSIONAL SUMMARY
Full-stack software engineer with 5+ years of experience building scalable web applications
using React, Node.js, and cloud-native technologies. Proven track record of delivering
high-impact features in fast-paced startup environments and leading small engineering teams.

WORK EXPERIENCE

Senior Software Engineer | TechFlow Inc. | Jun 2022 - Present
- Architected and shipped a real-time analytics dashboard serving 50K+ daily active users,
  reducing query latency by 40% through Redis caching and PostgreSQL query optimization.
- Led migration of monolithic Express backend to a microservices architecture on AWS ECS,
  improving deployment frequency from weekly to multiple times per day.
- Mentored 3 junior engineers; introduced code review standards and pair-programming practices.

Software Engineer | DataNest Labs | Aug 2020 - May 2022
- Built customer-facing React/Redux SPA used by 10K+ B2B customers across 4 product lines.
- Designed and implemented REST and GraphQL APIs in Node.js, handling 2M+ requests/day.
- Reduced AWS infrastructure costs by 25% through autoscaling tuning and reserved instances.

Software Engineer Intern | InnoSoft Solutions | Jan 2020 - Jul 2020
- Developed internal tooling in Python and Django to automate QA regression test reporting.

EDUCATION
B.S. Computer Science | University of California, Berkeley | 2016 - 2020
- GPA: 3.8/4.0 | Dean's List 4 semesters

SKILLS
Languages: JavaScript, TypeScript, Python, Go, SQL
Frontend: React, Next.js, Redux, TailwindCSS, HTML5, CSS3
Backend: Node.js, Express, NestJS, Django, REST, GraphQL, gRPC
Databases: PostgreSQL, MongoDB, Redis, DynamoDB
DevOps: AWS (ECS, Lambda, S3, RDS), Docker, Kubernetes, Terraform, GitHub Actions
Other: Kafka, WebSockets, Jest, Cypress, Agile/Scrum

PROJECTS
OpenScheduler (open-source) - github.com/johndoe/openscheduler
- Self-hosted cron alternative with a web UI; 1.2K+ GitHub stars.

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate (2023)
`


const jobDescription = `
Job Title: Senior Full-Stack Engineer
Company: Northwind Cloud
Location: Remote (US) | Employment Type: Full-time

About the Role:
We're looking for a Senior Full-Stack Engineer to join our Platform team. You'll own
critical pieces of our customer-facing web application and the services that power it,
working closely with product, design, and SRE to deliver reliable, high-performance features.

Responsibilities:
- Design, build, and maintain scalable web applications using React (TypeScript) on the
  frontend and Node.js (NestJS) on the backend.
- Lead the technical design of new features end-to-end, from API contracts to UI polish.
- Collaborate with SRE to improve observability, on-call ergonomics, and incident response.
- Drive code quality through reviews, automated tests, and mentorship of mid-level engineers.
- Contribute to architectural decisions around microservices, event-driven systems, and data
  modeling in PostgreSQL.

Required Qualifications:
- 5+ years of professional software engineering experience.
- Strong proficiency in JavaScript/TypeScript, React, and Node.js.
- Deep experience with relational databases (PostgreSQL preferred) and API design.
- Experience deploying production systems on AWS (ECS, Lambda, RDS, or equivalent).
- Solid understanding of CI/CD, Docker, and infrastructure-as-code (Terraform a plus).
- Excellent written and verbal communication skills.

Nice to Have:
- Experience with GraphQL, Kafka, or other event-streaming platforms.
- Prior experience in B2B SaaS or developer-tools companies.
- Open-source contributions.

Compensation & Benefits:
- Base salary: $170K - $210K + equity
- Fully remote with quarterly team offsites
- Comprehensive health, dental, vision; 401(k) match; unlimited PTO
`


const selfDescription = `
I'm a full-stack engineer who genuinely enjoys the whole stack - I'll happily move between
tightening a slow PostgreSQL query, refactoring a tangled React component, and tuning an
ECS task definition in the same afternoon. Most of my career has been at small-to-mid stage
startups, so I'm comfortable with ambiguity and tend to default toward shipping something
real quickly, then iterating with users in the loop.

The work I'm proudest of is usually the unglamorous kind: cutting a p95 from 1.4s to 280ms,
turning a flaky deploy pipeline into something the team trusts, or untangling a data model
so future features stop being painful. I care a lot about developer experience and try to
leave codebases a little more readable than I found them.

I've recently been leaning more into mentorship - running design reviews, pairing with
junior engineers, and writing internal RFCs. I'd like my next role to keep that thread
going while still keeping me close to the code; I don't want to step fully away from
hands-on engineering.

Outside of work I maintain a small open-source scheduler project, contribute occasionally
to Node.js tooling, and spend weekends bouldering or cooking my way through whatever
cookbook I've most recently become obsessed with.
`


module.exports = {resmune,jobDescription,selfDescription}
