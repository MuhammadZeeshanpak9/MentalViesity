import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Atom, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    Icon: Brain,
    title: 'Neural Mastery',
    description: 'Rewire your brain for peak performance using neuroplasticity-based training combined with ancient meditation techniques.',
    accentColor: '#7C5CFF',
  },
  {
    Icon: Atom,
    title: 'Quantum Awareness',
    description: 'Explore the quantum nature of consciousness and discover how observation shapes reality at the fundamental level.',
    accentColor: '#00E5FF',
  },
  {
    Icon: Sparkles,
    title: 'Universal Intelligence',
    description: 'Tap into the field of universal intelligence that connects all living beings across space and time.',
    accentColor: '#FFD700',
  },
];

export default function HumanPotential() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.2,
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
      id="potential"
      ref={sectionRef}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: '#FFD700',
            marginBottom: '16px',
          }}
        >
          HUMAN POTENTIAL
        </div>
        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#F8F9FF',
          }}
        >
          Expand Beyond Your Current Reality
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
        }}
      >
        {CARDS.map((card, index) => (
          <div
            key={card.title}
            ref={(el) => { cardsRef.current[index] = el; }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '40px 32px',
              borderTop: `2px solid ${card.accentColor}`,
              opacity: 0,
            }}
          >
            <card.Icon size={48} color={card.accentColor} strokeWidth={1.5} />
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '20px',
                fontWeight: 600,
                color: '#F8F9FF',
                marginTop: '24px',
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'rgba(248, 249, 255, 0.6)',
                marginTop: '12px',
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
