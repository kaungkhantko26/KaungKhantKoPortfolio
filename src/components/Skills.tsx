import { AnimatePresence, motion } from 'framer-motion';
import { Braces, Palette, Users } from 'lucide-react';
import { useState } from 'react';
import { skillGroups } from '../data/profile';
const filters = ['All', ...skillGroups.map(g => g.name)] as const;
const iconMap = { Development: Braces, Design: Palette, Professional: Users };
export default function Skills() {
  const [filter, setFilter] = useState<string>('All'); const groups = filter === 'All' ? skillGroups : skillGroups.filter(g => g.name === filter);
  return <section id="skills" className="section"><div className="container">
    <div className="section-heading split"><div><span>03 / CAPABILITIES</span><h2>Built to think visually <em>and ship practically.</em></h2></div><div className="filters" role="group" aria-label="Filter skills">{filters.map(f => <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>{f}</button>)}</div></div>
    <motion.div layout className="skills-grid"><AnimatePresence mode="popLayout">{groups.flatMap(group => group.skills.map((skill, i) => { const Icon = iconMap[group.name]; return <motion.article layout key={skill} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} className="skill-card"><span><Icon /></span><small>{group.name}</small><h3>{skill}</h3><i>0{i + 1}</i></motion.article>; }))}</AnimatePresence></motion.div>
  </div></section>;
}
