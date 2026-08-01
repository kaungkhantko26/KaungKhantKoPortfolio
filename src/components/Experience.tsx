import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { education, experienceHighlights } from '../data/profile';
export default function Experience() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const summaries = ['Created product visuals, promotional graphics, and social media designs while supporting creative direction and brand communication.', 'Supports student communication, outreach, and campus engagement initiatives.'];
  return <section id="experience" className="section"><div className="container">
    <div className="section-intro"><span>Experience</span><h2>Current roles, <em>focused on useful work.</em></h2></div>
    <div className="experience-list">{experienceHighlights.map((item, i) => <article key={item.title}><div className="role-main"><div><h3>{item.title}</h3><p>{item.organization}</p></div><time>{item.period.replace('August', 'Aug').replace('February', 'Feb')}</time></div><p className="role-summary">{summaries[i]}</p><button onClick={() => setExpanded(expanded === item.title ? null : item.title)} aria-expanded={expanded === item.title}>View responsibilities <ChevronDown /></button><AnimatePresence>{expanded === item.title && <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{item.bullets.map(b => <li key={b}>{b}</li>)}</motion.ul>}</AnimatePresence></article>)}</div>
    <div className="education-compact"><span>Current education</span>{education.filter(x => x.status === 'Current').map(item => <div key={item.institution}><h3>{item.award.replace('Bachelor of Science in', 'BSc')}</h3><p>{item.institution}</p></div>)}</div>
  </div></section>;
}
