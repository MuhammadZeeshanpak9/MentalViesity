import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TARGET_DATE = new Date('2026-12-31T23:59:59').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export default function CountdownTimer() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const left = calculateTimeLeft();
      setTimeLeft(left);
      if (left.days === 0 && left.hours === 0 && left.minutes === 0 && left.seconds === 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const glassCardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '32px 24px',
    textAlign: 'center',
    minWidth: '100px',
    opacity: 0,
  };

  const numberStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: 'clamp(36px, 5vw, 64px)',
    fontWeight: 700,
    color: '#F8F9FF',
    lineHeight: 1,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(248, 249, 255, 0.35)',
    marginTop: '8px',
  };

  const separatorStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: 'clamp(28px, 4vw, 56px)',
    fontWeight: 600,
    color: 'rgba(124, 92, 255, 0.5)',
    alignSelf: 'center',
  };

  if (isExpired) {
    return (
      <section
        ref={sectionRef}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '120px 24px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: '#7C5CFF',
            marginBottom: '16px',
          }}
        >
          THE AWAKENING BEGINS
        </div>
        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#F8F9FF',
            marginBottom: '48px',
          }}
        >
          End of 2026
        </h2>
        <div
          style={{
            ...glassCardStyle,
            opacity: 1,
            padding: '48px 32px',
          }}
        >
          <div style={{ ...numberStyle, color: '#00E676', fontSize: '48px' }}>
            THE TIME IS NOW
          </div>
        </div>
      </section>
    );
  }

  const timerData = [
    { value: pad(timeLeft.days), label: 'Days' },
    { value: pad(timeLeft.hours), label: 'Hours' },
    { value: pad(timeLeft.minutes), label: 'Minutes' },
    { value: pad(timeLeft.seconds), label: 'Seconds' },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '120px 24px',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: '#7C5CFF',
          marginBottom: '16px',
        }}
      >
        THE AWAKENING BEGINS
      </div>
      <h2
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(28px, 4vw, 56px)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: '#F8F9FF',
          marginBottom: '48px',
        }}
      >
        End of 2026
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {timerData.map((item, index) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {index > 0 && <span style={separatorStyle}>:</span>}
            <div
              ref={(el) => { cardsRef.current[index] = el; }}
              style={glassCardStyle}
            >
              <div style={numberStyle}>{item.value}</div>
              <div style={labelStyle}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
