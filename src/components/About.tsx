import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
export default function About() {
  const facts = [['Based in', 'Yangon, Myanmar'], ['Currently', 'Student Ambassador at KBZPay'], ['Design role', 'Junior Graphic Designer'], ['Studying', 'Computer Science']];
  return <section id="about" className="section"><div className="container reading-layout">
    <div className="section-intro"><span>About</span><h2>Designing with clarity, <em>building with purpose.</em></h2></div>
    <div className="about-body"><div className="body-copy"><p>I am a Computer Science student and Junior Graphic Designer interested in the space between design and technology.</p><p>My work includes visual design, frontend development, student communication, and creative digital projects.</p><p className="tools-line">Working with React, TypeScript, Python, Photoshop, and Illustrator.</p></div>
      <dl className="detail-list">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p className="languages">Languages: Myanmar, Rakhine, English, and basic Chinese.</p>
      <a className="text-link" href={profile.cvUrl} download>View full résumé <ArrowUpRight /></a>
    </div>
  </div></section>;
}
