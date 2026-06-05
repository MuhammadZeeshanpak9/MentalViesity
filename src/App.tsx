import { useState, useEffect } from 'react';
import './App.css';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ThemeBackground from './components/ThemeBackground';
import Navigation from './components/Navigation';
import Toast from './components/Toast';
import Hero from './sections/Hero';
import CountdownTimer from './sections/CountdownTimer';
import Vision from './sections/Vision';
import HumanPotential from './sections/HumanPotential';
import SpiritualityScience from './sections/SpiritualityScience';
import FeaturedVideo from './sections/FeaturedVideo';
import EmailCapture from './sections/EmailCapture';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  const handleReturnClick = () => {
    setToast({ message: 'Return journey coming soon', visible: true });
  };

  const handleToastDismiss = () => {
    setToast({ message: '', visible: false });
  };

  return (
    <>
      <ThemeBackground />
      <Navigation onReturnClick={handleReturnClick} />

      {toast.visible && <Toast message={toast.message} onDismiss={handleToastDismiss} />}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <CountdownTimer />
        <Vision />
        <HumanPotential />
        <SpiritualityScience />
        <FeaturedVideo />
        <EmailCapture />
        <Footer />
      </div>
    </>
  );
}
