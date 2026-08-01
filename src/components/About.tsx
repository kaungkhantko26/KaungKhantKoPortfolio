import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { profile } from '../data/profile';
export default function About() {
  const facts = [['Current role', 'Student Ambassador at KBZPay'], ['Design role', 'Junior Graphic Designer at Fuxing Brothers'], ['Education', 'Computer Science'], ['Base', profile.location]];
  return <section id="about" className="section"><div className="container about-grid">
    <motion.div className="portrait-panel reveal" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="portrait-grid" aria-hidden="true"><span>DESIGN</span><b>KK</b><span>CODE</span></div>
      <div className="rotating-note"><Sparkles /> Designing + Building</div>
      <div className="portrait-meta"><span><MapPin /> Yangon, Myanmar</span><span><i /> Available</span></div>
    </motion.div>
    <div><div className="section-heading"><span>01 / ABOUT</span><h2>I combine creative thinking <em>with technical execution.</em></h2></div>
      <div className="about-copy"><p>{profile.summary}</p><p>My work sits where visual communication meets practical technology—from promotional graphics and brand thinking to accessible frontend experiences.</p></div>
      <div className="fact-grid">{facts.map(([key, value]) => <article key={key}><small>{key}</small><strong>{value}</strong></article>)}</div>
      <a className="text-link" href={profile.cvUrl} download>See the full resume <ArrowUpRight /></a>
    </div>
  </div></section>;
}
