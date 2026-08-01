import { ArrowUpRight, Check, Copy, Download, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { profile } from '../data/profile';
export default function Contact() {
  const [toast, setToast] = useState('');
  const copy = async (value: string, label: string) => { try { await navigator.clipboard.writeText(value); setToast(`${label} copied to clipboard`); } catch { setToast(`Could not copy ${label.toLowerCase()}`); } window.setTimeout(() => setToast(''), 2400); };
  return <section id="contact" className="section contact-section"><div className="container contact-shell">
    <div className="contact-copy"><span className="availability"><i /> Available for collaboration</span><h2>Let’s create something useful, <em>memorable, and well designed.</em></h2><p>Available for graphic design, frontend development, portfolio collaborations, student campaigns, and creative technology projects.</p><div className="contact-actions"><a className="button primary" href={`mailto:${profile.email}`}>Send an email <Mail /></a><a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer">Open LinkedIn <Linkedin /></a><a className="text-link" href={profile.cvUrl} download>Download resume <Download /></a></div></div>
    <div className="contact-cards"><article><span><Mail /></span><div><small>Email</small><a href={`mailto:${profile.email}`}>{profile.email}</a></div><button onClick={() => copy(profile.email, 'Email')} aria-label="Copy email"><Copy /></button></article><article><span><Phone /></span><div><small>Phone</small><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></div><button onClick={() => copy(profile.phone, 'Phone')} aria-label="Copy phone"><Copy /></button></article><article><span><MapPin /></span><div><small>Location</small><strong>{profile.location}</strong></div><ArrowUpRight /></article></div>
  </div><div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite"><Check />{toast}</div></section>;
}
