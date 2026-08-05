export type ExperienceCategory = 'Design' | 'Ambassador';
export type CredentialCategory = 'Development' | 'Cybersecurity' | 'Design' | 'English' | 'Professional';

export interface ExperienceItem {
  title: string; organization: string; period: string; category: ExperienceCategory;
  location?: string; bullets: string[];
}

export interface EducationItem {
  award: string; institution: string; period?: string; status: 'Current' | 'Completed'; details: string[];
}

export interface CertificationItem {
  title: string; issuer: string; category: CredentialCategory; featured?: boolean;
  issued?: string; credentialId?: string; skills?: string[];
}

export const certifications: CertificationItem[] = [
  { title: 'Software Engineer', issuer: 'HackerRank', category: 'Development', featured: true, issued: 'March 2026', credentialId: 'ef8fdd8d672e' },
  { title: 'Introduction to Programming Using Python', issuer: 'HackerRank', category: 'Development', featured: true, issued: 'March 2026', credentialId: '89361550dbc8', skills: ['Python'] },
  { title: 'Frontend Developer (React)', issuer: 'HackerRank', category: 'Development', featured: true, issued: 'March 2026', credentialId: 'F5EAC2D3B4BD', skills: ['React'] },
  { title: 'Web Security and Web Hacking', issuer: 'Techno Learn', category: 'Cybersecurity', issued: 'March 2026' },
  { title: 'Network Engineering Course', issuer: 'Techno Learn', category: 'Cybersecurity', issued: 'September 2025' },
  { title: 'Ethical Hacking and Cyber Security', issuer: 'Techno Learn', category: 'Cybersecurity', issued: 'January 2026' },
  { title: 'Endpoint Security', issuer: 'Cisco', category: 'Cybersecurity', featured: true, issued: 'March 2026' },
  { title: 'Ethical Hacker', issuer: 'Cisco', category: 'Cybersecurity', featured: true, issued: 'February 2026' },
  { title: 'CodinGame Certification — Python 3', issuer: 'CodinGame', category: 'Development', credentialId: 'kBc7B-L3ZxkoBmViorsjSQ', skills: ['Python'] },
  { title: 'EF SET English Certificate — B2 Upper Intermediate', issuer: 'EF SET', category: 'English', issued: 'April 2024' },
  { title: 'Security Principles', issuer: 'ISC2', category: 'Cybersecurity', featured: true, issued: 'January 2026', credentialId: 'TQ7MSRJ0VVSC' },
  { title: 'Graphic Design Master Class', issuer: 'Donato', category: 'Design', featured: true, issued: 'October 2025', credentialId: 'GDMC-S-419', skills: ['Graphic Design'] },
  { title: 'Master Adobe Photoshop', issuer: 'Donato', category: 'Design', issued: 'July 2025', credentialId: 'MAP S 4921', skills: ['Graphic Design'] },
  { title: 'Master Adobe Illustrator', issuer: 'Donato', category: 'Design', issued: 'July 2025', credentialId: 'MAI S 4162', skills: ['Graphic Design'] },
  { title: 'Foundations of Cybersecurity', issuer: 'Google', category: 'Cybersecurity', featured: true, issued: 'December 2025', credentialId: 'HG57IU5HYK9E' },
];

export const profile = {
  name: 'Kaung Khant Ko', role: 'Computer Science Student', location: 'Yangon, Myanmar',
  phone: '+95 9 889 750 033', email: 'kaungkkhant06@gmail.com', website: 'https://kaungkhantko.top',
  github: 'https://github.com/kaungkhantko26',
  linkedin: 'https://www.linkedin.com/in/kaungkhantko06/', cvUrl: '/kaung-khant-ko-linkedin-profile.pdf',
  roles: ['Computer Science Student', 'Junior Graphic Designer', 'Frontend Developer', 'Creative Technologist', 'Student Ambassador'],
  summary: 'I am a Computer Science student and Junior Graphic Designer with experience in visual design, branding, social media, and frontend development. I enjoy combining technology and creativity to build practical, polished digital experiences.',
  honors: ["People’s Choice Award", 'Nominated Artwork for MAI', 'Nominated Artwork for MAP'],
  languages: [
    { name: 'Myanmar', level: 'Native or bilingual proficiency' }, { name: 'Rakhine', level: 'Native or bilingual proficiency' },
    { name: 'English', level: 'Professional working proficiency' }, { name: 'Chinese', level: 'Limited working proficiency' },
  ],
} as const;

export const skillGroups = [
  { name: 'Development', skills: ['TypeScript', 'React', 'Frontend Development', 'Python', 'Web Security'] },
  { name: 'Design', skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Graphic Design', 'Branding', 'Social Media Design'] },
  { name: 'Professional', skills: ['Communication', 'Team Collaboration', 'Creative Problem Solving', 'Student Outreach'] },
] as const;

export const workStreams: ReadonlyArray<{ title: string; category: string; description: string; role: string; tools: readonly string[]; link?: string }> = [
  { title: 'Portfolio Experience', category: 'Frontend Development', description: 'A responsive personal portfolio that brings design, technology, education, and experience into one accessible digital identity.', role: 'Design + Frontend', tools: ['React', 'TypeScript', 'Motion'], link: profile.website },
  { title: 'Brand & Social Visuals', category: 'Graphic Design', description: 'Product designs, promotional posters, and social media graphics created through the Junior Graphic Designer role at Fuxing Brothers.', role: 'Junior Graphic Designer', tools: ['Photoshop', 'Illustrator', 'Branding'] },
  { title: 'Student Outreach', category: 'Creative Communication', description: 'Campus-facing communication and engagement work developed through the Student Ambassador role at KBZPay.', role: 'Student Ambassador', tools: ['Communication', 'Outreach', 'Campaigns'] },
] as const;

export const education: EducationItem[] = [
  { award: 'Bachelor of Science in Computer Science', institution: 'University College Birmingham', period: 'March 2026 – June 2028', status: 'Current', details: ['Current degree path in computer science.'] },
  { award: 'Higher National Diploma in Computer Science', institution: 'Auston College', period: 'November 2025 – February 2028', status: 'Current', details: ['Practical study in programming and digital problem solving.'] },
  { award: 'High School Diploma', institution: 'Family Private High School', period: 'June 2023 – March 2025', status: 'Completed', details: ['Completed high school study with a biology focus.'] },
  { award: 'Diploma of English', institution: 'Wall Street English Myanmar', status: 'Completed', details: ['English Language and Literature.'] },
];

export const experienceHighlights: ExperienceItem[] = [
  { title: 'Junior Graphic Designer', organization: 'Fuxing Brothers Company Ltd', period: 'August 2025 – Present', category: 'Design', location: 'Sittwe, Rakhine State, Myanmar', bullets: ['Created product designs and social media graphics.', 'Designed promotional posters to improve brand visibility.', 'Participated in creative brainstorming aligned with business goals.'] },
  { title: 'Student Ambassador', organization: 'KBZPay', period: 'February 2026 – Present', category: 'Ambassador', bullets: ['Supports campus-facing communication and outreach.', 'Represents KBZPay in student engagement activities.', 'Builds experience across communication, branding, and community work.'] },
];
