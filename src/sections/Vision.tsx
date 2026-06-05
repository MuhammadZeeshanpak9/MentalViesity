import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      leftRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      rightRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '64px',
          alignItems: 'center',
        }}
        className="grid-two-col"
      >
        <div ref={leftRef} style={{ opacity: 0 }}>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#00E5FF',
              marginBottom: '16px',
            }}
          >
            CONSCIOUSNESS & SCIENCE
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: '#F8F9FF',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            Where Spirituality Meets Neuroscience
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(248, 249, 255, 0.6)',
              marginBottom: '20px',
            }}
          >
            At the intersection of ancient wisdom and cutting-edge neuroscience, ELEV8 Mentalversity creates a new paradigm for human development. We merge meditation practices with brain-computer interfaces, spiritual exploration with quantum physics, and personal transformation with evidence-based research.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(248, 249, 255, 0.6)',
            }}
          >
            Our curriculum bridges the gap between what humanity has known for millennia and what science is only now beginning to understand. This is not education as you know it — this is the evolution of awareness itself.
          </p>
        </div>

        <div ref={rightRef} style={{ opacity: 0 }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              overflow: 'hidden',
              aspectRatio: '4/3',
            }}
          >
            <img
              src="/images/neural-viz.jpg"
              alt="Cosmic neural visualization"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
