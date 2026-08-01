import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Megaphone, Palette } from 'lucide-react';
import { workStreams } from '../data/profile';
const icons = [Code2, Palette, Megaphone];
export default function Projects() {
  return <section id="work" className="section work-section"><div className="container">
    <div className="section-heading split"><div><span>02 / SELECTED WORK</span><h2>Work across screens, <em>brands, and communities.</em></h2></div><p>A concise view of real work areas represented in my current portfolio and professional roles.</p></div>
    <div className="work-grid">{workStreams.map((item, i) => { const Icon = icons[i]; return <motion.article className="work-card" key={item.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}>
      <div className={`work-visual visual-${i + 1}`}><Icon /><span>0{i + 1}</span><div>{item.category}</div></div>
      <div className="work-body"><p className="mono-label">{item.category}</p><h3>{item.title}</h3><p>{item.description}</p><dl><div><dt>Role</dt><dd>{item.role}</dd></div><div><dt>Tools</dt><dd>{item.tools.join(' · ')}</dd></div></dl>{item.link ? <a href={item.link} target="_blank" rel="noreferrer">View live <ArrowUpRight /></a> : <span className="case-note">Details available on request</span>}</div>
    </motion.article>; })}</div>
  </div></section>;
}
