import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoImg from '../logo/Logo.png';

gsap.registerPlugin(ScrollTrigger);

function InstagramIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

function TwitterIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.3 6.6L8 4H4z" />
    </svg>
  );
}

function YouTubeIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" fill={color} stroke="none" />
    </svg>
  );
}

function TikTokIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
  { Icon: TwitterIcon, label: 'Twitter', href: '#' },
  { Icon: YouTubeIcon, label: 'YouTube', href: '#' },
  { Icon: TikTokIcon, label: 'TikTok', href: '#' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        width: '100%',
        background: 'rgba(13, 5, 32, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '80px 40px 40px',
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={logoImg}
              alt="ELEV8 Mentalversity"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(124, 92, 255, 0.5)',
                boxShadow: '0 0 16px rgba(124, 92, 255, 0.3)',
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#F8F9FF',
                  letterSpacing: '0.05em',
                }}
              >
                ELEV8
              </div>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'rgba(248, 249, 255, 0.35)',
                  letterSpacing: '0.2em',
                  marginTop: '4px',
                }}
              >
                Mentalversity
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            {SOCIAL_LINKS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  color: 'rgba(248, 249, 255, 0.6)',
                  transition: 'color 0.3s',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#7C5CFF';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(248, 249, 255, 0.6)';
                }}
              >
                <Icon size={24} color="currentColor" />
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.08)',
            margin: '40px 0',
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: 'rgba(248, 249, 255, 0.35)',
            }}
          >
            2025 ELEV8 Mentalversity. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(248, 249, 255, 0.35)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'rgba(248, 249, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'rgba(248, 249, 255, 0.35)';
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
