import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Role Access', href: '#choose-role' },
];

const LandingNavbar = ({ onLoginClick }) => {
  const { user } = useAuth();
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.1,
      });
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '18px 0',
        background: '#FFFFFF',
        borderBottom: '1px solid #D9E5EC',
        boxShadow: scrolled ? '0 2px 12px rgba(19,43,79,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '11px' }}>
          {/* Blue rounded-square anchor icon */}
          <div
            style={{
              width: '46px',
              height: '46px',
              flexShrink: 0,
              borderRadius: '13px',
              background: 'linear-gradient(150deg, #3BA8D8 0%, #1278B4 55%, #0B62A0 100%)',
              boxShadow: '0 2px 10px rgba(11,130,201,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Traditional maritime anchor — matches uploaded reference */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              width="28"
              height="28"
              aria-hidden="true"
            >
              {/* Shackle ring at top */}
              <circle
                cx="16" cy="6"
                r="2.6"
                stroke="#FFFFFF"
                strokeWidth="2"
                fill="none"
              />

              {/* Vertical shank — ring bottom to crown */}
              <line
                x1="16" y1="8.6"
                x2="16" y2="26"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Stock / crossbar */}
              <line
                x1="8.5" y1="12.5"
                x2="23.5" y2="12.5"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="butt"
              />
              {/* Left knob */}
              <circle cx="8.5" cy="12.5" r="1.5" fill="#FFFFFF" />
              {/* Right knob */}
              <circle cx="23.5" cy="12.5" r="1.5" fill="#FFFFFF" />

              {/* Left fluke — sweeps out and up from crown */}
              <path
                d="M16 26 Q10.5 26.5 7.5 23.5 Q5 20.5 7.5 18"
                stroke="#FFFFFF"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Right fluke */}
              <path
                d="M16 26 Q21.5 26.5 24.5 23.5 Q27 20.5 24.5 18"
                stroke="#FFFFFF"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Crown ring at bottom of shank */}
              <circle cx="16" cy="26" r="1.4" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Brand name + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div
              style={{
                fontSize: '19px',
                fontWeight: 800,
                color: '#132B4F',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              Bulk<span style={{ color: '#087CC1' }}>Matrix</span>
            </div>
            <div
              style={{
                fontSize: '7.5px',
                fontWeight: 700,
                color: '#087CC1',
                letterSpacing: '0.16em',
                marginTop: '3px',
                textTransform: 'uppercase',
              }}
            >
              MARITIME INTELLIGENCE
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hidden md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#122F55',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                transition: 'all 220ms ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0B82C9';
                e.currentTarget.style.background = '#F0F8FC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#122F55';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <Link
              to={user.role === 'VESSEL_OWNER' ? '/owner/dashboard' : '/dashboard'}
              style={{
                padding: '10px 22px',
                background: '#0B82C9',
                border: 'none',
                borderRadius: '11px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                letterSpacing: '0.01em',
                boxShadow: '0 2px 8px rgba(11, 130, 201, 0.28)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0969A1';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0B82C9';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Dashboard →
            </Link>
          ) : (
            <button
              id="navbar-login-btn"
              onClick={onLoginClick}
              style={{
                padding: '10px 24px',
                background: '#FF7426',
                border: 'none',
                borderRadius: '11px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 200ms ease',
                letterSpacing: '0.01em',
                boxShadow: '0 2px 8px rgba(255, 116, 38, 0.28)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F5661F';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 116, 38, 0.38)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FF7426';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 116, 38, 0.28)';
                e.currentTarget.style.transform = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
            >
              Login
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              color: '#132B4F',
            }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
              {menuOpen ? (
                <path d="M4 4l14 14M4 18L18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <rect y="4" width="22" height="2" rx="1" />
                  <rect y="10" width="22" height="2" rx="1" />
                  <rect y="16" width="22" height="2" rx="1" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid #D9E5EC',
            padding: '16px 32px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: 'block',
                padding: '12px 0',
                fontSize: '15px',
                fontWeight: 600,
                color: '#132B4F',
                textDecoration: 'none',
                borderBottom: '1px solid #D9E5EC',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
