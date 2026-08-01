import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { profile } from '../data/profile';

export default function Hero() {
  return <section id="home" className="hero section"><div className="container hero-inner">
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
      <span className="availability"><i /> Available for selected projects</span>
      <p className="hero-name">{profile.name}</p>
      <h1>I design clear digital experiences <em>and build them with code.</em></h1>
      <p className="hero-summary">Computer Science student, designer, and frontend developer based in Yangon.</p>
      <div className="hero-actions"><a className="button primary" href="#work">View selected work <ArrowDown /></a><a className="button secondary" href="#contact">Contact me</a></div>
      <a className="resume-link" href={profile.cvUrl} download>Download résumé <Download /></a>
    </motion.div>
    <div className="hero-mark" aria-hidden="true"><span>K</span><span>K</span></div>
  </div></section>;
}
