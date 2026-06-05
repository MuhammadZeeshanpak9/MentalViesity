import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EmailCapture() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    if (!validateEmail(email)) {
      setError(true);
      gsap.fromTo(
        formRef.current,
        { x: 0 },
        { x: -10, duration: 0.1, repeat: 3, yoyo: true, ease: 'power2.inOut' }
      );
      return;
    }

    console.log('Email submitted:', email);
    setSubmitted(true);
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '120px 24px',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}
    >
      <h2
        ref={headlineRef}
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(28px, 4vw, 56px)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: '#F8F9FF',
          lineHeight: 1.2,
          opacity: 0,
        }}
      >
        Join the Consciousness Revolution
      </h2>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: 1.7,
          color: 'rgba(248, 249, 255, 0.6)',
          marginTop: '16px',
          marginBottom: '40px',
        }}
      >
        Be the first to experience the future of human awareness. Enter your email to receive early access.
      </p>

      {submitted ? (
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '18px',
            fontWeight: 500,
            color: '#00E676',
            padding: '16px 24px',
          }}
        >
          Thank you. Your journey begins.
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            placeholder="Enter your email"
            style={{
              flex: 1,
              minWidth: '200px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${error ? 'rgba(255, 50, 50, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`,
              borderRadius: '50px',
              padding: '16px 24px',
              color: '#F8F9FF',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#7C5CFF';
              e.target.style.boxShadow = '0 0 20px rgba(124, 92, 255, 0.2)';
            }}
            onBlur={(e) => {
              if (!error) {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              color: '#0D0520',
              background: 'linear-gradient(135deg, #7C5CFF, #00E5FF)',
              borderRadius: '50px',
              padding: '16px 32px',
              border: 'none',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow = '0 0 30px rgba(124, 92, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Get Early Access
          </button>
        </form>
      )}

      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: 'rgba(248, 249, 255, 0.35)',
          marginTop: '16px',
        }}
      >
        We respect your consciousness. No spam, ever.
      </div>
    </section>
  );
}
