import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="video"
      ref={sectionRef}
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '120px 24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
          REAL LIFE BEFORE...
        </div>
        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#F8F9FF',
            marginBottom: '16px',
          }}
        >
          Witness the Transformation
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'rgba(248, 249, 255, 0.6)',
          }}
        >
          Experience stories of profound personal transformation and consciousness expansion
        </p>
      </div>

      <div
        ref={containerRef}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          opacity: 0,
        }}
      >
        <video
          controls
          poster="/images/video-poster.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        >
          <source src="/videos/featured.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          marginTop: '24px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(124, 92, 255, 0.15)',
            border: '1px solid rgba(124, 92, 255, 0.3)',
            borderRadius: '50px',
            padding: '8px 20px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: '#F8F9FF',
          }}
        >
          <Sparkles size={14} color="#7C5CFF" />
          Consciousness Journey
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 229, 255, 0.15)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            borderRadius: '50px',
            padding: '8px 20px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: '#F8F9FF',
          }}
        >
          <Play size={14} color="#00E5FF" />
          Live Experience
        </div>
      </div>
    </section>
  );
}
