import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  onReturnClick: () => void;
}

const NAV_LINKS = [
  { label: 'Vision', href: '#vision' },
  { label: 'Science', href: '#science' },
  { label: 'Human Potential', href: '#potential' },
  { label: 'Video', href: '#video' },
  { label: 'Connect', href: '#connect' },
];

export default function Navigation({ onReturnClick }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    );
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '72px',
        zIndex: 100,
        background: 'rgba(13, 5, 32, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        opacity: 0,
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '18px',
          fontWeight: 600,
          color: '#F8F9FF',
          letterSpacing: '0.1em',
        }}
      >
        ELEV8
      </div>

      {/* Desktop Nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}
        className="nav-desktop"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              color: 'rgba(248, 249, 255, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#F8F9FF';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'rgba(248, 249, 255, 0.6)';
            }}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={onReturnClick}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(248, 249, 255, 0.6)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            textTransform: 'uppercase' as const,
            transition: 'color 0.3s',
            padding: 0,
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = '#F8F9FF';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.color = 'rgba(248, 249, 255, 0.6)';
          }}
        >
          Return
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
        }}
      >
        <div style={{ width: '24px', height: '2px', background: '#F8F9FF', marginBottom: '6px' }} />
        <div style={{ width: '24px', height: '2px', background: '#F8F9FF', marginBottom: '6px' }} />
        <div style={{ width: '24px', height: '2px', background: '#F8F9FF' }} />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            position: 'absolute',
            top: '72px',
            left: 0,
            width: '100%',
            background: 'rgba(13, 5, 32, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '24px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase' as const,
                color: 'rgba(248, 249, 255, 0.6)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              onReturnClick();
              setMobileMenuOpen(false);
            }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(248, 249, 255, 0.6)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              padding: 0,
              textAlign: 'left',
            }}
          >
            Return
          </button>
        </div>
      )}
    </nav>
  );
}
