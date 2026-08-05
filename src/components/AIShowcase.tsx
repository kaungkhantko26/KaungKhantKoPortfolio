import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Copy, ExternalLink, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { profile } from '../data/profile';

const projects: ReadonlyArray<{title:string;kind:string;summary:string;problem:string;solution:string;stack:readonly string[];evidence:readonly string[];github:string;live?:string}> = [
  { title:'SafeMind', kind:'AI Engineering', summary:'A bilingual security platform for investigating suspicious messages, links, phone numbers, and email senders.', problem:'Scam analysis is often opaque or too technical for people who need to make a safe decision quickly.', solution:'Combines deterministic indicators with fresh OpenRouter assessments and presents the evidence as a structured investigation.', stack:['JavaScript','Python','OpenRouter','Vite','PWA'], evidence:['Structured AI output contracts','Hybrid rules + model pipeline','Bilingual AI coaching','Security and input validation'], github:'https://github.com/kaungkhantko26/SafeMind', live:'https://safemind.kaungkhantko.studio' },
  { title:'CookAI', kind:'AI Engineering', summary:'A Telegram AI assistant with user access control, a separate admin bot, and an operations dashboard.', problem:'A useful assistant needs access control, memory, file handling, operational visibility, and practical workflows—not chat alone.', solution:'A split user/admin system powered by OpenRouter with document, study, productivity, and content tools.', stack:['Python','OpenRouter','Telegram API','Flask','PM2'], evidence:['Short conversation memory','File and image analysis','One-time access hashes','Admin monitoring and controls'], github:'https://github.com/kaungkhantko26/CookAi' },
  { title:'Augorithm', kind:'Product Engineering', summary:'A visual pseudocode editor, flowchart generator, and algorithm runner for macOS, Windows, and iPad.', problem:'Beginning programmers need to see how written logic becomes control flow without switching between disconnected tools.', solution:'An offline-capable editor that validates and runs pseudocode, generates editable flowcharts, and exports source code in English and Burmese.', stack:['TypeScript','JavaScript','Electron','PWA','GitHub Actions'], evidence:['Parser and interpreter','Editable flowchart renderer','Multi-target source generation','Desktop packaging and CI releases'], github:'https://github.com/kaungkhantko26/Augorithm', live:'https://augorithm-for-students.vercel.app' },
  { title:'KTOOL FieldOps', kind:'Developer Tools', summary:'A terminal-first console for authorized reconnaissance, defensive triage, reporting, and AI-assisted security review.', problem:'Authorized security work involves fragmented tools, inconsistent evidence, and repetitive reporting.', solution:'A Python CLI that organizes safe workflows, stores structured evidence, and adds OpenRouter-assisted defensive prioritization.', stack:['Python','OpenRouter','Linux','Security APIs'], evidence:['CLI workflow design','JSON and Markdown reports','AI-assisted triage','Authorization boundaries'], github:'https://github.com/kaungkhantko26/Ktool' },
] as const;

const capabilities = [
  ['AI application engineering','Core','Model-backed product flows with structured outputs, memory, tool boundaries, explainability, and human-readable results.','OpenRouter · AI APIs · Prompt contracts · Agents · Evaluation','SafeMind · CookAI · KTOOL'],
  ['Python systems','Core','APIs, automation, bots, CLIs, validation pipelines, and operational tooling.','Python · FastAPI · Flask · REST APIs · Automation','CookAI · KTOOL · Climate Risk'],
  ['Product engineering','Core','Taking software from a user problem through interaction design, implementation, packaging, and release.','TypeScript · React · Electron · PWA · CI/CD','Augorithm · Bee · SafeMind'],
  ['ML foundations','Exploring','Developing data and evaluation foundations needed to move from rule-based prototypes toward trained systems.','Python · Data processing · Model evaluation · Scikit-learn','Climate Risk · SafeMind'],
  ['Security-minded engineering','Advanced','Input validation, least privilege, safe AI boundaries, evidence handling, and defensive workflows.','Web security · Threat triage · Authorization · Privacy','SafeMind · KTOOL'],
  ['Interface systems','Supporting','Design training used to make complex software understandable, accessible, and consistent.','React · Accessibility · Typography · Visual design','Augorithm · SafeMind · Bee'],
] as const;

const strengths = [
  ['Problem solving','Combined pseudocode parsing, execution, flowchart rendering, and code generation into one learning workflow.'],
  ['Product thinking','Projects begin with a user decision—from recognizing a scam to understanding an algorithm—not a technology demo.'],
  ['Communication','Built English and Burmese interfaces and translates security evidence into direct, actionable guidance.'],
  ['Attention to detail','Uses validation, accessible states, release checks, documentation, and structured failure handling.'],
  ['Continuous learning','Balances Computer Science study, certifications, and active experiments across AI, software, security, and design.'],
  ['Creative engineering','Combines frontend implementation with graphic-design experience to make technical products easier to understand.'],
] as const;

const credentials = [['Software Engineer','HackerRank','2026'],['Frontend Developer (React)','HackerRank','2026'],['Python Programming','HackerRank','2026'],['Ethical Hacker','Cisco','2026'],['Foundations of Cybersecurity','Google','2025'],['Security Principles','ISC2','2026']] as const;

function SectionTitle({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}) {
  return <div className="ai-section-title"><span>{eyebrow}</span><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>;
}

export default function AIShowcase() {
  const [open,setOpen]=useState<string|null>('SafeMind');
  const [copied,setCopied]=useState(false);
  const copyEmail=async()=>{try{await navigator.clipboard.writeText(profile.email);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{}};
  return <>
    <section id="home" className="ai-hero">
      <div className="ai-grid-bg" aria-hidden="true"/>
      <div className="container ai-hero-grid">
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
          <div className="ai-status"><i/> Available for AI & product engineering opportunities</div>
          <p className="ai-kicker">Hi, I’m Kaung Khant Ko.</p>
          <h1>I build intelligent products that are <em>useful, explainable, and well designed.</em></h1>
          <p className="ai-lead">Computer Science student and product builder working across AI applications, Python systems, full-stack development, security, and interface engineering.</p>
          <div className="ai-actions"><a className="ai-btn primary" href="#projects">View projects <ArrowRight/></a><a className="ai-btn" href={profile.cvUrl} download>Résumé</a><a className="ai-icon-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a className="ai-icon-link" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a></div>
        </motion.div>
        <div className="intelligence-core" aria-label="AI engineering focus">
          <div className="core-ring ring-a"/><div className="core-ring ring-b"/><div className="core-center">AI</div>
          {['Python','Agents','APIs','React','Security','Products'].map((x,i)=><span key={x} style={{'--i':i} as CSSProperties}>{x}</span>)}
        </div>
      </div>
      <div className="container recruiter-strip">
        <div><small>Based in</small><strong>Yangon, Myanmar</strong></div><div><small>Primary focus</small><strong>AI applications + product engineering</strong></div><div><small>Current path</small><strong>BSc Computer Science</strong></div><div><small>Open to</small><strong>AI, software & product roles</strong></div>
      </div>
    </section>

    <section id="about" className="ai-section"><div className="container ai-about">
      <SectionTitle eyebrow="About" title="Engineering judgment, product thinking, and visual clarity."/>
      <div className="ai-about-copy"><p>I’m a Computer Science student building software where AI capability meets practical product design. My strongest work turns complex systems—security analysis, algorithm execution, and assistant workflows—into interfaces people can understand and use.</p><p>I care about the full path from problem framing and architecture to error states, documentation, accessibility, and release quality. Graphic design remains part of my toolkit, but the goal is always a better software product.</p><a href={profile.github} target="_blank" rel="noreferrer">Explore my GitHub <ArrowRight/></a></div>
    </div></section>

    <section id="projects" className="ai-section alt"><div className="container">
      <SectionTitle eyebrow="Selected case studies" title="Real repositories. Real engineering decisions." copy="Four verified projects that show how I approach AI, product architecture, developer tooling, and human-centered software."/>
      <div className="case-list">{projects.map((p,i)=><motion.article key={p.title} className="case" initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}}>
        <button className="case-head" onClick={()=>setOpen(open===p.title?null:p.title)} aria-expanded={open===p.title}><div><span>{p.kind}</span><h3>{p.title}</h3><p>{p.summary}</p></div><div className="case-toggle"><small>Case study</small><ChevronDown/></div></button>
        <AnimatePresence>{open===p.title&&<motion.div className="case-detail" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>
          <div><small>Problem</small><p>{p.problem}</p></div><div><small>Solution</small><p>{p.solution}</p></div><div><small>Engineering evidence</small><ul>{p.evidence.map(x=><li key={x}>{x}</li>)}</ul></div><div><small>Stack</small><div className="tag-row">{p.stack.map(x=><span key={x}>{x}</span>)}</div></div>
          <div className="case-links"><a href={p.github} target="_blank" rel="noreferrer"><Github/> Repository</a>{p.live&&<a href={p.live} target="_blank" rel="noreferrer"><ExternalLink/> Live product</a>}</div>
        </motion.div>}</AnimatePresence>
      </motion.article>)}</div>
      <a className="all-repos" href={profile.github} target="_blank" rel="noreferrer">View all public repositories <ArrowRight/></a>
    </div></section>

    <section id="capabilities" className="ai-section"><div className="container">
      <SectionTitle eyebrow="Capabilities" title="Skills connected to evidence—not percentages." copy="Status labels distinguish demonstrated strengths from areas I am actively developing."/>
      <div className="capability-grid">{capabilities.map((c,i)=><motion.article key={c[0]} className="capability" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.04}}><div><span>{c[1]}</span><b>0{i+1}</b></div><h3>{c[0]}</h3><p>{c[2]}</p><code>{c[3]}</code><small>Evidence · {c[4]}</small></motion.article>)}</div>
      <div className="knowledge-graph" aria-label="Technology relationship graph"><div className="graph-core">Product<br/>Engineering</div>{['Python → AI APIs → Agents','React → TypeScript → Interfaces','Security → Evidence → Trust','CI/CD → Releases → Feedback'].map((x,i)=><div className={'graph-node n'+i} key={x}>{x}</div>)}</div>
    </div></section>

    <section id="strengths" className="ai-section alt"><div className="container">
      <SectionTitle eyebrow="How I work" title="Technical depth needs human judgment." copy="Evidence from the way these products are scoped, documented, and delivered."/>
      <div className="strength-grid">{strengths.map(([title,evidence])=><article key={title}><h3>{title}</h3><p>{evidence}</p></article>)}</div>
    </div></section>

    <section id="experience" className="ai-section"><div className="container">
      <SectionTitle eyebrow="Experience & learning" title="Building while studying."/>
      <div className="timeline-simple"><article><span>2026 — Present</span><h3>Student Ambassador</h3><p>KBZPay · Student communication, outreach, and campus engagement.</p></article><article><span>2025 — Present</span><h3>Junior Graphic Designer</h3><p>Fuxing Brothers Company Ltd · Product visuals, promotion, and brand communication.</p></article></div>
      <div className="edu-grid"><article><small>Current education</small><h3>BSc Computer Science</h3><p>University College Birmingham · 2026–2028</p></article><article><small>Current education</small><h3>Higher National Diploma in Computer Science</h3><p>Auston College · 2025–2028</p></article></div>
      <div className="credential-row">{credentials.map(c=><article key={c[0]}><small>{c[1]} · {c[2]}</small><h3>{c[0]}</h3></article>)}</div>
    </div></section>

    <section id="contact" className="ai-contact"><div className="container ai-contact-grid"><div><span>Let’s build something useful.</span><h2>Open to AI engineering, software, and product opportunities.</h2><p>I’m interested in teams that value thoughtful systems, clear products, continuous learning, and responsible AI.</p></div><div><a className="contact-mail" href={'mailto:'+profile.email}><Mail/>{profile.email}</a><button onClick={copyEmail}>{copied?<Check/>:<Copy/>}{copied?'Copied':'Copy email'}</button><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer"><Github/> GitHub</a><p><MapPin/> Yangon, Myanmar</p></div></div></section>
  </>;
}
