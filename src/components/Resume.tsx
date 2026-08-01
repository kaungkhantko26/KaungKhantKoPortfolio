import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { certifications, profile } from '../data/profile';
const featuredTitles = ['Software Engineer', 'Frontend Developer (React)', 'Ethical Hacker', 'Foundations of Cybersecurity'];
export default function Resume() {
  const selected = featuredTitles.map(title => certifications.find(c => c.title === title)).filter(Boolean);
  return <section id="credentials" className="section soft-section"><div className="container">
    <div className="section-intro"><span>Selected credentials</span><h2>A few signals of <em>continued learning.</em></h2></div>
    <div className="credential-list">{selected.map(c => c && <article key={c.title}><BadgeCheck /><div><h3>{c.title.replace(' (React)', '')}</h3><p>{c.issuer} · {c.issued?.split(' ').pop()}</p></div></article>)}</div>
    <div className="recognition-note">Recognition includes a People’s Choice Award and nominated artwork for MAI and MAP.</div>
    <a className="text-link" href={profile.cvUrl} download>View all credentials <ArrowUpRight /></a>
  </div></section>;
}
