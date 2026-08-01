import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Megaphone, Palette } from 'lucide-react';
import { workStreams } from '../data/profile';
const icons = [Code2, Palette, Megaphone];
export default function Projects() {
  return <section id="work" className="section soft-section"><div className="container">
    <div className="section-intro"><span>Selected work</span><h2>A small selection of design, <em>development, and communication work.</em></h2></div>
    <div className="work-list">{workStreams.map((item, i) => { const Icon = icons[i]; return <motion.article className="project-card" key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: i * .06 }}>
      <div className={`project-visual visual-${i + 1}`}><Icon /></div><div className="project-copy"><h3>{item.title}</h3><p>{item.description}</p><dl><div><dt>Role</dt><dd>{item.role}</dd></div>{item.tools.length > 0 && <div><dt>Tools</dt><dd>{item.tools.slice(0, 2).join(', ')}</dd></div>}</dl>{item.link ? <a href={item.link} target="_blank" rel="noreferrer">View project <ArrowUpRight /></a> : <a href="#contact">View details <ArrowUpRight /></a>}</div>
    </motion.article>; })}</div>
  </div></section>;
}
