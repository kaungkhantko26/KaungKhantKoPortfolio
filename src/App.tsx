import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { certifications, profile } from './data/profile';
// suYetPieces is generated from the linked Figma file by scripts/sync-su-yet.mjs.
import { suYetPieces } from './data/suYet';

type RoutePath = '/' | '/design' | '/developer' | '/case-study/austonian-hub' | '/case-study/cursor-ai-hackathon' | '/design/su-yet-designs';

const routes: RoutePath[] = ['/', '/design', '/developer', '/case-study/austonian-hub', '/case-study/cursor-ai-hackathon', '/design/su-yet-designs'];

function currentRoute(): RoutePath {
  const normalized = location.pathname.replace(/\/+$/, '') || '/';
  return routes.includes(normalized as RoutePath) ? normalized as RoutePath : '/';
}

const colors = ['#06245f', '#f8c900', '#f7f3ec', '#eef2f7', '#d94a4a'];
const screens = [
  ['Home', '/austonian/home.png', 'Priority-first dashboard'],
  ['Card', '/austonian/card.png', 'Identity and student access'],
  ['Jobs', '/austonian/jobs.png', 'Relevant career discovery'],
  ['Class', '/austonian/class.png', 'Schedule and deadlines'],
  ['Feed', '/austonian/feed.png', 'Contextual campus updates'],
  ['Settings', '/austonian/settings.png', 'Account and preferences'],
] as const;
const wireframes = screens.map(([name], index) => [name, `/austonian/lf-${['home','card','jobs','class','feed','settings'][index]}.png`] as const);


function go(path: RoutePath) {
  history.pushState({}, '', path);
  dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: .7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function SiteHeader({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const items: [string, RoutePath][] = [['Home', '/'], ['Design', '/design'], ['Developer', '/developer'], ['Case study', '/case-study/austonian-hub']];
  return <>
    <header className={`site-header ${light ? 'light' : ''}`}>
      <button className="brand" onClick={() => go('/')} aria-label="Kaung Khant Ko portfolio home">KAUNG KHANT KO / PORTFOLIO</button>
      <nav>{items.map(([label, path]) => <button key={path} onClick={() => go(path)}>{label}</button>)}</nav>
      <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button className="close" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>{items.map(([label, path], i) => <motion.button key={path} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * .06 }} onClick={() => { setOpen(false); go(path); }}>{label}</motion.button>)}</motion.div>}</AnimatePresence>
  </>;
}

function Footer({ label = 'PORTFOLIO / 2026' }: { label?: string }) {
  return <footer className="connect"><div className="footer-intro"><h2>CONNECT WITH ME</h2><p>Available for design, development, and collaborative product work.</p></div><div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LINKEDIN</a><a href={profile.github} target="_blank" rel="noreferrer"><Github /> GITHUB</a><a href={profile.website} target="_blank" rel="noreferrer"><ExternalLink /> WEBSITE</a><a href={`mailto:${profile.email}`}><Mail /> EMAIL</a></div><div className="footer-signoff"><strong>{label}</strong><small>KAUNG KHANT KO / 2026</small></div></footer>;
}

function Landing() {
  return <div className="landing page"><SiteHeader light /><div className="dot-grid" />
    <main className="landing-main">
      <Reveal className="landing-copy"><span className="availability">OPEN TO WEB + DESIGN ROLES</span><p className="kicker">CS STUDENT · JUNIOR GRAPHIC DESIGNER · YANGON</p><h1>IDEAS, DESIGNED<br />&amp; DEVELOPED.</h1><p className="lead">I combine visual design and programming to create practical digital products—branding, UI/UX, full-stack web apps, and cybersecurity tools.</p></Reveal>
      <motion.div className="constellation" initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .8 }}><motion.span whileHover={{ y: -6 }} className="design">DESIGN</motion.span><motion.span whileHover={{ y: -6 }} className="code">CODE</motion.span><motion.span whileHover={{ y: -6 }} className="research">RESEARCH</motion.span><motion.span whileHover={{ scale: 1.08 }} className="ship">SHIP</motion.span></motion.div>
      <div className="route-picker"><RouteCard number="01" title="GRAPHIC DESIGN" subtitle="Brand identity · UI/UX · Artwork" path="/design" tone="blue" /><RouteCard number="02" title="COMPUTER SCIENCE" subtitle="Web apps · AI · Open source" path="/developer" tone="dark" /></div>
    </main><Footer label="SELECT A ROUTE ABOVE" />
  </div>;
}

function RouteCard({ number, title, subtitle, path, tone }: { number: string; title: string; subtitle: string; path: RoutePath; tone: string }) {
  return <motion.button className={`route-card ${tone}`} onClick={() => go(path)} whileHover={{ y: -8 }} whileTap={{ scale: .985 }}><span>{number}</span><h2>{title}</h2><p>{subtitle}</p><b>VIEW ROUTE <ArrowRight /></b></motion.button>;
}

function SectionTitle({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading"><span>{index} / {eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function DesignRoute() {
  const designCerts = certifications.filter(c => c.category === 'Design');
  return <div className="page design-route"><section className="route-hero design-hero"><SiteHeader light /><div className="route-hero-inner"><div className="hero-copy"><button className="back" onClick={() => go('/')}>BACK TO PORTFOLIO</button><p>KAUNG KHANT KO · GRAPHIC DESIGN</p><h1>I MAKE IDEAS<br />FEEL VISIBLE.</h1><p>Junior Graphic Designer and Auston College student creating branding, social media, packaging, posters, and thoughtful digital experiences.</p><span>CLEAR HIERARCHY · ACCESSIBLE CONTRAST · REAL DATA</span></div><motion.div className="selected-card" initial={{ rotate: 3, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}><small>SELECTED WORK</small><div>FORM<br />MEETS<br />FEELING</div><b>2024–2026</b><p>BRANDING · UI/UX · ART DIRECTION</p></motion.div><small className="scroll-label">SCROLL TO EXPLORE</small></div></section>
    <section className="section cream about-section"><div className="about-intro"><Reveal><SectionTitle index="01" eyebrow="ABOUT ME" title="DESIGNING WITH HEAD + HEART." /></Reveal><Reveal><p className="big-copy">I’m a Creative Junior Graphic Designer and student at Auston College with skills across visual design, branding, programming, social media, packaging, and poster design. I combine technology and design to create effective digital solutions.</p></Reveal></div><div className="stat-grid"><article><strong>03</strong><span>DESIGN CERTIFICATES</span></article><article><strong>01</strong><span>RESEARCH-LED UX CASE STUDY</span></article><article><strong>TOOLKIT</strong><span>FIGMA · ILLUSTRATOR<br />PHOTOSHOP · AFTER EFFECTS<br />BRANDING · UI/UX · PACKAGING</span></article></div><p className="strengths">Strengths: creative problem solving, responsible collaboration, visual storytelling, and bridging design with code.</p></section>
    <section className="section forest"><Reveal><SectionTitle index="02" eyebrow="SELECTED PROJECT" title="ONE REAL PROJECT. FULL DEPTH." /></Reveal><motion.article className="project-feature" whileHover={{ y: -5 }}><div className="project-images"><img src="/austonian/home.png" alt="Austonian Hub home screen" /><img src="/austonian/jobs.png" alt="Austonian Hub jobs screen" /></div><div><span>UI/UX CASE STUDY · GD 01</span><h3>AUSTONIAN HUB</h3><p>A single trusted place for the student day. Research, personas, information architecture, wireframes, high-fidelity UI, annotations, and mockups.</p><b>ROLE</b><strong>UI/UX DESIGNER + TEAM LEADER</strong><button className="pill gold" onClick={() => go('/case-study/austonian-hub')}>OPEN FULL CASE STUDY <ArrowRight /></button></div></motion.article></section>
    <section className="section sage"><Reveal><SectionTitle index="03" eyebrow="PRODUCT UI GALLERY" title="SCREEN BY SCREEN." /></Reveal><div className="phone-row">{screens.map(([name, src, note], i) => <motion.article key={name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}><img src={src} alt={`${name} screen`} /><h3>{name}</h3><p>{note}</p></motion.article>)}</div></section>
    <section className="section blue"><Reveal><SectionTitle index="04" eyebrow="COLLECTION" title="SU YET DESIGNS." copy="A curated hall of editorial poster work for the SUYET publication—shown museum-style with wall labels and a full-size view." /></Reveal><motion.article className="project-feature" whileHover={{ y: -5 }}><div className="project-images su-yet-preview">{suYetPieces.slice(0, 3).map(p => <img key={p.no} src={p.src} alt={`${p.title} poster`} />)}</div><div><span>POSTER SERIES · {suYetPieces.length} WORK{suYetPieces.length === 1 ? '' : 'S'} · SYNCED FROM FIGMA</span><h3>SU YET DESIGNS</h3><p>Technology and privacy ideas as bold, bilingual visual essays—grey palette, one insistent red, English headline over Burmese body copy.</p><b>ROLE</b><strong>DESIGNER + ILLUSTRATOR</strong><button className="pill gold" onClick={() => go('/design/su-yet-designs')}>ENTER THE COLLECTION <ArrowRight /></button></div></motion.article></section>
    <section className="section credentials"><Reveal><SectionTitle index="05" eyebrow="DESIGN CERTIFICATES" title="TRAINED TO MAKE. CURIOUS ENOUGH TO KEEP LEARNING." /></Reveal><div className="certificate-grid">{designCerts.map(c => <article key={c.title}><small>{c.issued}</small><h3>{c.title}</h3><p>{c.issuer}</p></article>)}</div></section><Footer label="GRAPHIC DESIGN PORTFOLIO" />
  </div>;
}

const projects = [
  { n: '01', title: 'ALGORITHM', copy: 'Visual and accessible sorting algorithm explorer.', tags: ['React', 'TypeScript', 'Visualization'] },
  { n: '02', title: 'SAFEMIND', copy: 'A cybersecurity MVP focused on practical online safety.', tags: ['Security', 'UX', 'Education'] },
  { n: '03', title: 'KTOOL FIELDS', copy: 'Terminal-first toolkit for safer field workflows.', tags: ['Python', 'CLI', 'Automation'] },
];
const programmingLanguages = ['Python', 'TypeScript', 'JavaScript', 'HTML / CSS'] as const;

function DeveloperRoute() {
  return <div className="page developer-route"><section className="route-hero developer-hero"><SiteHeader light /><div className="route-hero-inner"><div className="hero-copy"><button className="back" onClick={() => go('/')}>BACK TO PORTFOLIO</button><p>KAUNG KHANT KO · COMPUTER SCIENCE + AI ENGINEERING</p><h1>BUILDING USEFUL<br />THINGS, CAREFULLY.</h1><p>Computer Science student in Yangon building practical AI applications, full-stack software, cybersecurity tools, and bilingual digital products.</p><span>AI ENGINEER STATUS · ACTIVE · OPEN TO OPPORTUNITIES</span></div><motion.div className="code-card" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}><small>portfolio.ts</small><pre>{`const maker = {\n  focus: ['web', 'ai',\n    'open source'],\n  status: 'shipping'\n}`}</pre><b>AVAILABLE FOR NEW PROJECTS</b></motion.div></div></section>
    <section className="section cream"><Reveal><SectionTitle index="01" eyebrow="ABOUT THE DEVELOPER" title="CODE WITH CONTEXT." /></Reveal><div className="about-grid"><p className="big-copy">Creative developer, AI product builder, and Junior Graphic Designer studying Computer Science, with experience across responsive web apps, desktop software, PWAs, APIs, and command-line tools.</p><div className="dev-stats"><article><strong>25</strong><span>PUBLIC REPOSITORIES</span></article><article><strong>04</strong><span>FEATURED BUILDS</span></article><article><strong>04</strong><span>PROGRAMMING LANGUAGES</span></article><article><strong>∞</strong><span>CURIOSITY</span></article></div></div><div className="developer-profile-grid"><article className="ai-status-card"><small>AI ENGINEER STATUS</small><h3>ACTIVE + BUILDING</h3><p>Developing practical AI applications and open to AI, software, and product engineering opportunities.</p></article><article><small>SPOKEN LANGUAGES</small><h3>COMMUNICATION</h3><ul>{profile.languages.map(language => <li key={language.name}><b>{language.name}</b><span>{language.level}</span></li>)}</ul></article><article><small>PROGRAMMING LANGUAGES</small><h3>CORE STACK</h3><div className="language-tags">{programmingLanguages.map(language => <span key={language}>{language}</span>)}</div></article></div></section>
    <section className="section forest"><Reveal><SectionTitle index="02" eyebrow="FEATURED GITHUB PROJECTS" title="FROM REPO TO REAL WORLD." /></Reveal><div className="repo-grid">{projects.map((p, i) => <motion.article key={p.title} whileHover={{ y: -8 }} className={i === 2 ? 'wide' : ''}><span>{p.n}</span><h3>{p.title}</h3><p>{p.copy}</p><div>{p.tags.map(t => <b key={t}>{t}</b>)}</div><a href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer">VIEW ON GITHUB <ExternalLink /></a></motion.article>)}</div></section>
    <section className="section blue"><Reveal><SectionTitle index="03" eyebrow="SELECTED PROJECT · HACKATHON" title="A WEEKEND BUILD THAT SHIPPED." /></Reveal><motion.article className="hack-feature" whileHover={{ y: -5 }}><div className="hack-panel"><b>CURSOR AI HACKATHON MYANMAR</b><strong>PYAN<br />THONE</strong><span>UI/UX + FRONTEND · AUGUST 2026</span></div><div><h3>PYAN THONE</h3><p>A trusted second-hand marketplace with condition evidence on every listing and verified seller trust scores—buy and sell used products safely with people nearby. Bilingual EN / မြန်မာ.</p><div className="hack-tags"><b>Leadership</b><b>Frontend</b><b>Figma</b></div><div className="hack-actions"><a className="primary" href="https://pyan-thone-sigma.vercel.app" target="_blank" rel="noreferrer">OPEN LIVE DEMO <ExternalLink /></a><button className="ghost" onClick={() => go('/case-study/cursor-ai-hackathon')}>READ CASE STUDY <ArrowRight /></button></div></div></motion.article></section>
    <section className="section cream"><Reveal><SectionTitle index="04" eyebrow="PRODUCT THINKING" title="HOW I TURN A PROBLEM INTO A SYSTEM." /></Reveal><div className="system-flow">{['DISCOVER', 'DEFINE', 'BUILD', 'OPERATE'].map((x, i) => <article key={x}><span>0{i + 1}</span><h3>{x}</h3><p>{['Clarify users, risks, and failures.', 'Make interfaces, data, and scope explicit.', 'Ship in small, testable modules.', 'Measure, document, and improve.'][i]}</p></article>)}</div></section>
    <section className="section blue"><Reveal><SectionTitle index="05" eyebrow="EXPERIENCE + EDUCATION" title="SHIPPING SOFTWARE. LEARNING IN PUBLIC." /></Reveal><div className="experience-card"><div><small>RECENT EXPERIENCE</small><h3>Computer Science Student</h3><p>Full-stack development, software engineering, cybersecurity, and practical product work.</p><h3>KBZPay Student Ambassador</h3><p>Campus outreach, communication, and brand representation.</p></div><pre>{`NOW\n- Building agent-friendly tools\n- Security education work\n- Shipping bilingual products\n- Open to Web Developer roles`}</pre></div></section><Footer label="COMPUTER SCIENCE PORTFOLIO" />
  </div>;
}

const stats = [['80%', 'SELECTED TIMETABLE'], ['75%', 'WOULD USE THE APP'], ['75%', 'WANTED ANNOUNCEMENTS'], ['70%', 'TRACK ATTENDANCE'], ['65%', 'CHECK DAILY'], ['65%', 'SAVE 30–60 MIN']];
const personas = [
  ['Nan Yati Oo', 'The last organizer', 'One trusted Today view', 'Classes, rooms, changes, priority deadlines'],
  ['Minn Myat', 'The deadline-focused planner', 'Clear status and context', 'Deadlines, workload, attendance, careers'],
  ['Thaddar Su', 'The announcement checker', 'Priority alerts linked to changes', 'Timely notices with context and next action'],
];

function CaseStudy() {
  return <div className="page case-page"><section className="case-hero"><SiteHeader light /><button className="back" onClick={() => go('/design')}><ArrowLeft /> Graphic design</button><div><p>KAUNG KHANT KO / CASE STUDY 01</p><h1>AUSTONIAN HUB</h1><p>One trusted place for classes, deadlines, announcements, identity, benefits, and student services.</p><small>ABOUT THE PRODUCT</small><strong>A mobile student hub for Auston College · HND 2nd Semester · 2026</strong><a className="case-cta" href="#case-study-content">RESEARCH / IA / WIREFRAMES / TESTING / FINAL UI</a></div><motion.img src="/austonian/home.png" alt="Austonian Hub home screen" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} /></section>
    <section id="case-study-content" className="case-section cream"><Reveal><SectionTitle index="01" eyebrow="THE PROBLEM + SOLUTION" title="IMPORTANT STUDENT INFORMATION IS FRAGMENTED." /></Reveal><div className="problem-grid"><article className="dark"><small>PROBLEM STATEMENT</small><p>Students move between chats, spreadsheets, emails, and noticeboards to find classes, deadlines, announcements, identity, and opportunities.</p></article><article className="blue"><small>THE SOLUTION</small><p>A single mobile dashboard that makes priority visible, preserves context, and turns notices into clear next actions.</p></article></div><div className="evidence"><b>DESIGN PRINCIPLE</b><span>NOTICE → UNDERSTAND → ACT → CONFIRM</span><strong>65% expected to save 30–60 minutes.</strong></div></section>
    <section className="case-section blue"><Reveal><SectionTitle index="02" eyebrow="DESIGN PROCESS + RESEARCH" title="RESEARCH BEFORE PIXELS." /></Reveal><div className="process-row">{['DISCOVER', 'DEFINE', 'IDEATE', 'WIREFRAME', 'TEST', 'REFINE'].map((x, i) => <article key={x}><small>0{i + 1}</small><b>{x}</b></article>)}</div><div className="research-grid">{stats.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div></section>
    <section className="case-section cream"><Reveal><SectionTitle index="03" eyebrow="USER RESEARCH · PERSONAS" title="DIFFERENT HABITS. THE SAME TRUST PROBLEM." /></Reveal><div className="persona-grid">{personas.map(([name, type, need, behavior], i) => <article key={name} className={i === 1 ? 'blue' : 'dark'}><span>{name.split(' ').map(x => x[0]).join('')}</span><h3>{name}</h3><small>{type}</small><b>NEEDS</b><p>{need}</p><b>BEHAVIOR</b><p>{behavior}</p></article>)}</div><div className="shared-insight"><b>SHARED NEED</b> One trusted source that makes priority visible without adding another channel.</div></section>
    <section className="case-section forest"><Reveal><SectionTitle index="04" eyebrow="DESIGN SYSTEM" title="A CLEAR SYSTEM FOR A BUSY STUDENT DAY." /></Reveal><div className="system-showcase"><div><small>COLOR</small><div className="swatches">{colors.map(c => <span key={c} style={{ background: c }}><i>{c}</i></span>)}</div></div><div><small>TYPOGRAPHY</small><h3>INTER</h3><p>Clear hierarchy for headings, labels, body copy, status, and navigation.</p></div></div><div className="principle-row">{['16–20 px radius', 'Clear status colors', 'One primary action', 'Six-route navigation'].map(x => <span key={x}>{x}</span>)}</div></section>
    <section className="case-section cream"><Reveal><SectionTitle index="05" eyebrow="USER FLOW + INFORMATION ARCHITECTURE" title="ONE CONNECTED STUDENT DAY." /></Reveal><div className="ia-row">{screens.map(([name]) => <span key={name}>{name}</span>)}</div><div className="flow-row">{['OPEN APP', 'SCAN TODAY', 'OPEN PRIORITY', 'VIEW CONTEXT', 'TAKE ACTION'].map((x, i) => <span key={x}>{x}{i < 4 && <ArrowRight />}</span>)}</div><p className="flow-note">Every important item answers: What happened? Why does it matter? What can I do next?</p></section>
    <section className="case-section blue"><Reveal><SectionTitle index="06" eyebrow="WIREFRAMES" title="STRUCTURE BEFORE STYLE." /></Reveal><div className="wireframe-row">{wireframes.map(([name, src], i) => <motion.article key={name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }}><img src={src} alt={`${name} low-fidelity screen`} /><b>{name}</b></motion.article>)}</div><div className="decision-note"><b>DESIGN DECISION</b> Navigation stayed fixed across all six routes while content priority changed by task.</div></section>
    <section className="case-section forest"><Reveal><SectionTitle index="07" eyebrow="FINAL UI + ANNOTATIONS" title="REAL HIGH-FIDELITY SCREENS." /></Reveal><div className="final-row">{screens.map(([name, src], i) => <motion.article key={name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}><img src={src} alt={`${name} final UI`} /><b>{name}</b></motion.article>)}</div><div className="annotation-grid">{screens.map(([name,, note]) => <article key={name}><b>{name}</b><p>{note}.</p></article>)}</div><div className="fidelity-note"><b>FROM STRUCTURE TO SIGNAL</b> Color and hierarchy were introduced only after the six-route model and priority flow were stable.</div></section>
    <section className="case-section gold"><Reveal><SectionTitle index="08" eyebrow="MOCKUPS" title="THE SYSTEM, WITHOUT THE GIMMICKS." copy="Real screens shown at readable scale—no device shells and no decorative distortion." /></Reveal><div className="flat-showcase">{[screens[0], screens[2], screens[4]].map(([name, src, note]) => <article key={name}><img src={src} alt={`${name} screen`} /><div><h3>{name}</h3><p>{note}</p></div></article>)}</div></section><Footer label="AUSTONIAN HUB / UI UX CASE STUDY" />
  </div>;
}

const hackResearch: [string, string][] = [
  ['#1', 'Condition disputes are the top complaint in second-hand buying'],
  ['Gut', 'Buyers judge sellers from screenshots and mutual friends'],
  ['COD', 'Most insist on cash on delivery because paying first feels unsafe'],
  ['2 langs', 'Listings and chat happen in both English and Burmese'],
  ['Local', 'People want to buy from someone a few km away, not a courier'],
  ['Anchor', 'Sellers want a fair price from real past sales, not guesswork'],
];
const hackSolutions: [string, string][] = [
  ['CONDITION EVIDENCE', 'Photos, a condition checklist, and diagnostics attached to every product—no more guessing from one blurry image.'],
  ['VERIFIED TRUST SCORES', 'Seller scores built from real completed sales and buyer reviews, shown on every listing and every card.'],
  ['PROTECTED CHAT & PAYMENT', 'In-app offers and chat, with payment held until the buyer confirms the item, and admin dispute review on every order.'],
  ['ONE ACCOUNT, TWO MODES', 'Buy and sell from the same profile. Sellers get a storefront, listing tools, and an orders and revenue dashboard.'],
];

function HackathonCaseStudy() {
  return <div className="page case-page">
    <section className="case-hero"><SiteHeader light /><button className="back" onClick={() => go('/developer')}><ArrowLeft /> Computer science</button>
      <div><p>KAUNG KHANT KO / CASE STUDY 02</p><h1>PYAN THONE</h1><p>A trusted second-hand marketplace where an item's condition and the seller's history are visible before you buy.</p><small>ABOUT THE PROJECT</small><strong>Cursor AI Hackathon Myanmar · UI/UX + Frontend · August 2026 · Team lead</strong><a className="case-cta" href="#hack-content">PROBLEM / RESEARCH / SLOGAN / SOLUTIONS / DEMO</a></div>
      <aside className="case-brand">ပြန်<br />သုံး</aside>
    </section>
    <section id="hack-content" className="case-section cream"><Reveal><SectionTitle index="01" eyebrow="THE PROBLEM" title="SECOND-HAND TRADING RUNS ON BLIND TRUST." /></Reveal>
      <div className="problem-grid"><article className="dark"><small>FOR BUYERS</small><p>Listings hide defects, seller history is invisible, and payment happens before you can inspect anything. People overpay for worse-than-described items and have nowhere to take a dispute.</p></article><article className="blue"><small>FOR SELLERS</small><p>Honest sellers have no way to prove it. They compete on price with scammers and lose deals over trust they never had a chance to build.</p></article></div>
      <div className="evidence"><b>THE GAP</b><span>NO CONDITION EVIDENCE · NO SELLER HISTORY · NO PROTECTION</span><strong>Trust is assumed, never shown.</strong></div>
    </section>
    <section className="case-section blue"><Reveal><SectionTitle index="02" eyebrow="RESEARCH" title="WE ASKED PEOPLE WHO ACTUALLY BUY AND SELL USED." /></Reveal>
      <div className="process-row">{['TALK', 'MAP PAIN', 'PRIORITISE', 'PROTOTYPE', 'BUILD', 'DEMO'].map((x, i) => <article key={x}><small>0{i + 1}</small><b>{x}</b></article>)}</div>
      <div className="research-grid">{hackResearch.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
    </section>
    <section className="case-section forest"><div className="slogan-band"><Reveal><h2>Give your belongings a <em>new life</em>.</h2></Reveal><p>Pyan Thone — ပြန်သုံး, “use again.” The name is the promise: nothing good gets thrown away while someone nearby still wants it.</p></div></section>
    <section className="case-section cream"><Reveal><SectionTitle index="03" eyebrow="THE SOLUTION" title="MAKE TRUST VISIBLE BEFORE THE SALE." /></Reveal>
      <div className="system-flow">{hackSolutions.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className="principle-row">{['Condition badge on every card', 'Distance + rating at a glance', 'EN / မြန်မာ toggle', 'Payment held in escrow'].map(x => <span key={x}>{x}</span>)}</div>
    </section>
    <section className="case-section blue"><Reveal><SectionTitle index="04" eyebrow="DEMO" title="TRY THE LIVE PROTOTYPE." copy="Built inside the hackathon window with Cursor—front to back, bilingual, deployed." /></Reveal>
      <div className="demo-cta"><div><h3>pyan-thone-sigma.vercel.app</h3><p>Walk the buyer marketplace, open the seller dashboard, and flip the EN / မြန်မာ toggle.</p></div><a href="https://pyan-thone-sigma.vercel.app" target="_blank" rel="noreferrer">OPEN LIVE DEMO <ExternalLink /></a></div>
      <div className="flow-row">{['HOME', 'MARKETPLACE', 'PRODUCT + CONDITION', 'OFFER + CHAT', 'SELLER DASHBOARD'].map((x, i) => <span key={x}>{x}{i < 4 && <ArrowRight />}</span>)}</div>
    </section>
    <Footer label="PYAN THONE / CURSOR AI HACKATHON" />
  </div>;
}

function SuYetDesigns() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (active === null) return;
      if (e.key === 'ArrowRight') setActive((active + 1) % suYetPieces.length);
      if (e.key === 'ArrowLeft') setActive((active - 1 + suYetPieces.length) % suYetPieces.length);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [active]);
  const piece = active === null ? null : suYetPieces[active];
  return <div className="page museum-page"><section className="route-hero museum-hero"><SiteHeader light /><div className="route-hero-inner"><div className="hero-copy"><button className="back" onClick={() => go('/design')}><ArrowLeft /> Graphic design</button><p>KAUNG KHANT KO · COLLECTION 01</p><h1>SU YET<br />DESIGNS.</h1><p>A curated hall of editorial poster work—technology ideas translated into bold, bilingual visual essays for the SUYET publication.</p><span>ON VIEW · {suYetPieces.length} WORK{suYetPieces.length === 1 ? '' : 'S'} · YANGON</span></div><motion.div className="selected-card" initial={{ rotate: 3, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}><small>THE COLLECTION</small><div>SU<br />YET<br />DESIGNS</div><b>{suYetPieces[0]?.year ?? '2026'}</b><p>POSTER · EDITORIAL · COLLAGE</p></motion.div><small className="scroll-label">ENTER THE GALLERY</small></div></section>
    <section className="section cream"><Reveal><SectionTitle index="00" eyebrow="CURATORIAL NOTE" title="ONE IDEA PER POSTER." copy="Each piece pairs a single technology idea with a constructed image—classical sculpture, salvaged hardware, working hands—rendered in a restrained grey palette cut by a single insistent red. English headline, Burmese body: the series is written for readers who move between both." /></Reveal></section>
    <section className="section forest museum-hall"><Reveal><SectionTitle index="01" eyebrow="MAIN GALLERY" title="ON THE WALL." /></Reveal>
      <div className="gallery-wall">{suYetPieces.map((p, i) => <motion.figure key={p.no} className="artwork" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-6%' }} transition={{ delay: i * .08, duration: .6 }}>
        <button className="frame" onClick={() => setActive(i)} aria-label={`View ${p.title} enlarged`}><img src={p.src} alt={`${p.title}${p.series ? ` — SUYET ${p.series}` : ''} poster`} width={1280} height={1280} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" /></button>
        <figcaption className="wall-label"><span className="wl-no">{p.no}</span><h3>{p.title}</h3><p className="wl-meta">Kaung Khant Ko · {p.year}</p>{p.series && <p className="wl-series">SUYET · {p.series}</p>}<p className="wl-medium">{p.medium}</p>{p.note && <p className="wl-note">{p.note}</p>}</figcaption>
      </motion.figure>)}
      {suYetPieces.length === 0 && <p className="gallery-empty">This collection is being hung. Add a frame named <code>SUYET — Title</code> to the linked Figma file and it will appear here on the next sync.</p>}</div>
    </section>
    <section className="section sage"><Reveal><SectionTitle index="02" eyebrow="ABOUT THE SERIES" title="SUYET / TECH EXPLAINED." copy="SUYET is an independent knowledge publication. Each drop takes one idea—open source, privacy, collaboration—and is designed to be legible at thumbnail scale in a feed and rewarding at full size on a wall. New posters are drawn straight from the studio Figma file." /></Reveal>
      <div className="principle-row">{['Grey + one red', 'English head · Burmese body', 'Constructed imagery', 'Feed-first legibility'].map(x => <span key={x}>{x}</span>)}</div>
    </section>
    <Footer label="SU YET DESIGNS / COLLECTION 01" />
    <AnimatePresence>{piece && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
      <button className="lb-close" onClick={() => setActive(null)} aria-label="Close"><X /></button>
      <button className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); setActive((active! - 1 + suYetPieces.length) % suYetPieces.length); }} aria-label="Previous work"><ArrowLeft /></button>
      <motion.figure className="lb-inner" key={piece.no} initial={{ scale: .96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}>
        <img src={piece.src} alt={`${piece.title} — SUYET ${piece.series} poster`} />
        <figcaption><span>{piece.no}{piece.series ? ` · SUYET / ${piece.series}` : ' · SUYET'}</span><h3>{piece.title}</h3><p>{piece.medium} · {piece.year}</p>{piece.note && <p className="lb-note">{piece.note}</p>}</figcaption>
      </motion.figure>
      <button className="lb-nav lb-next" onClick={e => { e.stopPropagation(); setActive((active! + 1) % suYetPieces.length); }} aria-label="Next work"><ArrowRight /></button>
    </motion.div>}</AnimatePresence>
  </div>;
}

function App() {
  const [path, setPath] = useState<RoutePath>(currentRoute);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: .001 });
  useEffect(() => { const update = () => setPath(currentRoute()); addEventListener('popstate', update); return () => removeEventListener('popstate', update); }, []);
  const page = path === '/design' ? <DesignRoute /> : path === '/design/su-yet-designs' ? <SuYetDesigns /> : path === '/developer' ? <DeveloperRoute /> : path === '/case-study/austonian-hub' ? <CaseStudy /> : path === '/case-study/cursor-ai-hackathon' ? <HackathonCaseStudy /> : <Landing />;
  return <><a className="skip-link" href="#main">Skip to content</a><motion.div className="scroll-progress" style={{ scaleX }} /><AnimatePresence mode="wait"><motion.main id="main" key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .28 }}>{page}</motion.main></AnimatePresence></>;
}

export default App;
