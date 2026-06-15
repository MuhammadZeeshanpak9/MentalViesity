import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import videoSrc from '../Home_Page_Vid/Video.mp4';

function SpeakerOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SpeakerOnIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioBtnRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(overlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 })
      .fromTo(line1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(line2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(audioBtnRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '0 24px',
        overflow: 'hidden',
      }}
    >
      {/* Fullscreen background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          transform: 'scale(1.3) translateY(8%)',
          transformOrigin: 'center top',
          zIndex: 0,
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Primary dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(13, 5, 32, 0.55) 0%, rgba(13, 5, 32, 0.3) 45%, rgba(13, 5, 32, 0.8) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Purple radial glow behind text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          background:
            'radial-gradient(ellipse at center, rgba(124, 92, 255, 0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Content sits above all overlays */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
            textShadow: '0 2px 40px rgba(13, 5, 32, 0.9)',
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
            color: '#000000',
            maxWidth: '560px',
            marginTop: '24px',
            textShadow: '0 1px 8px rgba(255, 255, 255, 0.6)',
            opacity: 0,
          }}
        >
          The world's premier spirituality and science experience center dedicated to expanding
          human awareness, consciousness, and potential.
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
      </div>

      {/* Audio toggle — bottom-center, floats above all layers */}
      <div
        ref={audioBtnRef}
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: 0,
        }}
      >
        {/* Pulsing ring — only rendered when sound is on */}
        {!isMuted && (
          <>
            <div
              className="audio-pulse-ring"
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                marginLeft: '-30px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '2px solid rgba(124, 92, 255, 0.7)',
                animation: 'audioPulse 1.6s ease-out infinite',
                pointerEvents: 'none',
              }}
            />
            <div
              className="audio-pulse-ring"
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                marginLeft: '-30px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '2px solid rgba(0, 229, 255, 0.5)',
                animation: 'audioPulse 1.6s ease-out 0.5s infinite',
                pointerEvents: 'none',
              }}
            />
          </>
        )}

        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isMuted
              ? 'rgba(13, 5, 32, 0.55)'
              : 'rgba(124, 92, 255, 0.18)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: `2px solid ${isMuted ? 'rgba(124, 92, 255, 0.35)' : 'rgba(124, 92, 255, 0.85)'}`,
            boxShadow: isMuted
              ? '0 4px 24px rgba(0, 0, 0, 0.4)'
              : '0 0 32px rgba(124, 92, 255, 0.55), 0 0 64px rgba(124, 92, 255, 0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isMuted ? 'rgba(248, 249, 255, 0.55)' : '#a78bff',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          {isMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
        </button>

        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: isMuted ? 'rgba(248, 249, 255, 0.35)' : 'rgba(167, 139, 255, 0.9)',
            transition: 'color 0.3s',
            userSelect: 'none',
          }}
        >
          {isMuted ? 'SOUND OFF' : 'SOUND ON'}
        </span>
      </div>
    </section>
  );
}
