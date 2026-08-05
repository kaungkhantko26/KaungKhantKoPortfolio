import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import AIShowcase from './components/AIShowcase';
import Footer from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress,{stiffness:120,damping:28,restDelta:.001});
  return <><a className="skip-link" href="#main">Skip to content</a><motion.div className="scroll-progress" style={{scaleX}} aria-hidden="true"/><Navbar/><main id="main"><AIShowcase/></main><Footer/></>;
}
