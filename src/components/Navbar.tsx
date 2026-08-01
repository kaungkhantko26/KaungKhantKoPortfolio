import { AnimatePresence, motion } from 'framer-motion';
import { Download, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import ThemeToggle from './ThemeToggle';

const links = [
  ['Home', 'home'], ['About', 'about'], ['Work', 'work'], ['Experience', 'experience'], ['Contact', 'contact'],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false); const [active, setActive] = useState('home');
  const [hidden, setHidden] = useState(false); const lastY = useRef(0); const menuButton = useRef<HTMLButtonElement>(null); const menuPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-38% 0px -55%' });
    links.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    const onScroll = () => { const y = window.scrollY; setHidden(y > lastY.current && y > 160 && !open); lastY.current = y; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [open]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    menuPanel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
      if (e.key === 'Tab' && menuPanel.current) {
        const items = [...menuPanel.current.querySelectorAll<HTMLElement>('button,a[href]')];
        if (!items.length) return; const first = items[0]; const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey); return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);
  const go = (id: string) => { setOpen(false); history.replaceState(null, '', `#${id}`); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return <>
    <motion.header className="nav-wrap" animate={{ y: hidden ? -110 : 0 }} transition={{ duration: .28 }}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <button className="brand" onClick={() => go('home')} aria-label="Go to home"><span>KK</span><b>Kaung Khant Ko</b></button>
        <div className="desktop-nav">
          {links.map(([label, id]) => <button key={id} onClick={() => go(id)} className={active === id ? 'active' : ''} aria-current={active === id ? 'page' : undefined}>{label}</button>)}
        </div>
        <div className="nav-actions"><ThemeToggle /><a className="resume-chip" href={profile.cvUrl} download><Download size={16} /> Resume</a><button ref={menuButton} className="menu-button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu"><Menu /></button></div>
      </nav>
    </motion.header>
    <AnimatePresence>{open && <motion.div ref={menuPanel} id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mobile-top"><span className="brand"><span>KK</span><b>Navigate</b></span><button className="icon-button" onClick={() => { setOpen(false); menuButton.current?.focus(); }} aria-label="Close menu"><X /></button></div>
      <div className="mobile-links">{links.map(([label, id], i) => <button key={id} onClick={() => go(id)}><small>0{i + 1}</small>{label}</button>)}</div>
      <div className="mobile-social"><a href={`mailto:${profile.email}`}><Mail size={18} /> Email</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a><a href={profile.cvUrl} download><Download size={18} /> Resume</a></div>
    </motion.div>}</AnimatePresence>
  </>;
}
