import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Code2, Download, Linkedin, Mail, MapPin, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

export default function Hero() {
  const [role, setRole] = useState(0); const reduced = useReducedMotion();
  useEffect(() => { if (reduced) return; const timer = window.setInterval(() => setRole(v => (v + 1) % profile.roles.length), 2600); return () => clearInterval(timer); }, [reduced]);
  return <section id="home" className="hero section">
    <div className="container hero-grid">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
        <span className="availability"><i /> Open for work</span>
        <p className="eyebrow">Computer Science <span>×</span> Visual Design</p>
        <h1><span>Kaung Khant Ko</span>I design digital experiences <em>and build them with code.</em></h1>
        <div className="role-line" aria-live="polite"><span>Currently</span><motion.b key={role} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{profile.roles[role]}</motion.b></div>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowDown /></a><a className="button secondary" href={profile.cvUrl} download>Download resume <Download /></a><a className="text-link" href="#contact">Let’s work together <ArrowUpRight /></a></div>
        <div className="social-row"><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail /> Email</a></div>
      </motion.div>
      <motion.div className="identity-stage" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }}>
        <div className="orbit-label label-code"><Code2 /> TypeScript</div><div className="orbit-label label-design"><Palette /> Graphic Design</div>
        <div className="identity-card">
          <div className="card-toolbar"><span /><span /><span /><small>identity.card</small></div>
          <div className="monogram"><span>K</span><span>K</span></div>
          <div><p className="mono-label">DESIGNER + DEVELOPER</p><h2>{profile.name}</h2><p className="location"><MapPin /> {profile.location}</p></div>
          <div className="card-stack"><span>React</span><span>Branding</span><span>Python</span><span>Cybersecurity</span></div>
          <div className="card-status"><i /> Available for collaboration <ArrowUpRight /></div>
        </div>
      </motion.div>
    </div>
    <div className="container stats-strip" aria-label="Portfolio highlights"><div><strong>15+</strong><span>Verified credentials</span></div><div><strong>2</strong><span>Active professional roles</span></div><div><strong>4</strong><span>Languages</span></div><div><strong>Design + Tech</strong><span>One creative practice</span></div></div>
  </section>;
}
