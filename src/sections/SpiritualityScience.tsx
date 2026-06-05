import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '98%', label: 'Neural Plasticity', color: '#7C5CFF' },
  { value: '12', label: 'Dimensions Explored', color: '#00E5FF' },
  { value: '∞', label: 'Infinite Potential', color: '#FFD700' },
];

export default function SpiritualityScience() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      leftRef.current,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
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
      id="science"
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
        className="grid-two-col-reverse"
      >
        <div ref={leftRef} style={{ opacity: 0, order: 2 }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              overflow: 'hidden',
              aspectRatio: '3/4',
            }}
          >
            <img
              src="/images/quantum-consciousness.jpg"
              alt="Quantum consciousness visualization with swirling energy vortex"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        <div ref={rightRef} style={{ opacity: 0, order: 1 }}>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#00E676',
              marginBottom: '16px',
            }}
          >
            QUANTUM MIND
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
            The Universe Lives Within You
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
            Every neuron in your brain contains the same carbon forged in dying stars. Your consciousness is not separate from the cosmos — it is the cosmos observing itself. At ELEV8 Mentalversity, we guide you through quantum meditation techniques that dissolve the illusion of separation between self and universe.
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
            Through guided entrainment protocols, you will experience direct states of unified awareness where the observer and the observed become one. This is not philosophy — this is the frontier of consciousness research.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '48px',
              marginTop: '40px',
              flexWrap: 'wrap',
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '32px',
                    fontWeight: 700,
                    color: stat.color,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(248, 249, 255, 0.35)',
                    marginTop: '4px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
