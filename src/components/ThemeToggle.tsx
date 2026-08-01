import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('theme', dark ? 'dark' : 'light'); }, [dark]);
  return <button className="theme-toggle" onClick={() => setDark(v => !v)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>{dark ? <Sun /> : <Moon />}</button>;
}
