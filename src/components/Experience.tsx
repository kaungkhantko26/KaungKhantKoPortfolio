import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { useState } from 'react';
import { experienceHighlights } from '../data/profile';
export default function Experience() {
  const [filter, setFilter] = useState('All'); const [expanded, setExpanded] = useState<string | null>(experienceHighlights[0].title);
  const items = filter === 'All' ? experienceHighlights : experienceHighlights.filter(x => x.category === filter);
  return <section id="experience" className="section experience-section"><div className="container">
    <div className="section-heading split"><div><span>04 / EXPERIENCE</span><h2>Growing through <em>real responsibilities.</em></h2></div><div className="filters" role="group" aria-label="Filter experience">{['All', 'Design', 'Ambassador'].map(f => <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>{f}</button>)}</div></div>
    <div className="timeline"><AnimatePresence>{items.map((item, i) => <motion.article key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="timeline-item">
      <div className="timeline-dot"><span>{String(i + 1).padStart(2, '0')}</span></div><div className="timeline-card"><div className="timeline-head"><div><span className="category">{item.category} · Current</span><h3>{item.title}</h3><p>{item.organization}</p></div><div className="time-meta"><b>{item.period}</b>{item.location && <span><MapPin />{item.location}</span>}</div></div>
      <button className="expand-button" onClick={() => setExpanded(expanded === item.title ? null : item.title)} aria-expanded={expanded === item.title}>Responsibilities <ChevronDown /></button>
      <AnimatePresence>{expanded === item.title && <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{item.bullets.map(b => <li key={b}>{b}</li>)}</motion.ul>}</AnimatePresence></div>
    </motion.article>)}</AnimatePresence></div>
  </div></section>;
}
