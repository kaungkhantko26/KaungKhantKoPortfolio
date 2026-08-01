import { Check, Copy, Download, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { profile } from '../data/profile';
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { setCopied(false); } };
  return <section id="contact" className="section contact-section"><div className="container contact-inner"><div><span className="availability"><i /> Open to selected projects</span><h2>Have a project in mind? <em>Let’s talk.</em></h2><p>Available for selected graphic design, frontend development, and creative technology projects.</p></div><div className="contact-side"><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button onClick={copy} aria-label="Copy email address">{copied ? <Check /> : <Copy />}</button></div><p>{profile.location}</p><div className="contact-actions"><a className="button primary" href={`mailto:${profile.email}`}>Send an email <Mail /></a><a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Linkedin /></a></div><a className="resume-link" href={profile.cvUrl} download>Download résumé <Download /></a><span className="copy-status" role="status" aria-live="polite">{copied ? 'Email copied to clipboard' : ''}</span></div></div></section>;
}
