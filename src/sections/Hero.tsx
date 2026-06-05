import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(overlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 })
      .fromTo(line1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(line2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '0 24px',
      }}
    >
      {/* Radial gradient overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(ellipse at center, rgba(13, 5, 32, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <div
        ref={overlineRef}
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.25em',
          textTransform: 'uppercase' as const,
          color: '#7C5CFF',
          marginBottom: '24px',
          opacity: 0,
        }}
      >
        COMING SOON
      </div>

      <h1
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(40px, 8vw, 96px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#F8F9FF',
          textShadow: '0 2px 40px rgba(13, 5, 32, 0.8)',
        }}
      >
        <span ref={line1Ref} style={{ display: 'block', opacity: 0 }}>
          ELEV8
        </span>
        <span ref={line2Ref} style={{ display: 'block', opacity: 0 }}>
          MENTALVERSITY
        </span>
      </h1>

      <p
        ref={subRef}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: 1.7,
          color: 'rgba(248, 249, 255, 0.6)',
          maxWidth: '560px',
          marginTop: '24px',
          textShadow: '0 2px 40px rgba(13, 5, 32, 0.8)',
          opacity: 0,
        }}
      >
        The world's premier spirituality and science experience center dedicated to expanding human awareness, consciousness, and potential.
      </p>

      <a
        ref={ctaRef}
        href="#connect"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#connect')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase' as const,
          color: '#0D0520',
          background: 'linear-gradient(135deg, #7C5CFF, #00E5FF)',
          padding: '16px 40px',
          borderRadius: '50px',
          marginTop: '40px',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'box-shadow 0.3s',
          opacity: 0,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.boxShadow = '0 0 30px rgba(124, 92, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.boxShadow = 'none';
        }}
      >
        Begin Your Journey
      </a>
    </section>
  );
}
