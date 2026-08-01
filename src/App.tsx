import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 });
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
    <div className="ambient" aria-hidden="true"><i /><i /><i /></div>
    <Navbar />
    <main id="main">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Resume />
      <Contact />
    </main>
    <Footer />
  </>;
}
