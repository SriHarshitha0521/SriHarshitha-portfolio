import { useEffect, useRef, useState } from 'react';
import CinematicLayer from './CinematicLayer.jsx';

export default function VideoIntro() {
  const rootRef    = useRef(null);
  const videoRef   = useRef(null);
  const bgVideoRef = useRef(null);

  const [muted,          setMuted]          = useState(false);
  const [paused,         setPaused]         = useState(false);
  // showUnlock: true until the browser lets us play with sound
  const [showUnlock,     setShowUnlock]     = useState(false);

  const firstPlayFinishedRef = useRef(false);
  const unlockedRef          = useRef(false);

  // ── Try to play the main video with audio ──
  const playWithVoice = () => {
    const main = videoRef.current;
    if (!main) return;
    main.muted         = false;
    main.defaultMuted  = false;
    main.volume        = 1;
    setMuted(false);
    setPaused(false);
    return main.play();
  };

  // ── Called once on any user interaction to unlock audio ──
  const unlockAudio = () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    setShowUnlock(false);

    const main = videoRef.current;
    const bg   = bgVideoRef.current;
    if (!main) return;

    // If the video is already playing muted (browser started it muted),
    // unmute it in place so the viewer hears from wherever they are.
    if (!main.paused) {
      main.muted        = false;
      main.defaultMuted = false;
      main.volume       = 1;
      setMuted(false);
      return;
    }

    // Otherwise restart from the beginning with voice.
    firstPlayFinishedRef.current = false;
    main.loop        = false;
    main.currentTime = 0;
    main.muted       = false;
    main.defaultMuted = false;
    main.volume      = 1;
    setMuted(false);
    Promise.allSettled([main.play(), bg?.play()]);
  };

  useEffect(() => {
    const root = rootRef.current;
    const main = videoRef.current;
    const bg   = bgVideoRef.current;

    if (root) requestAnimationFrame(() => root.classList.add('is-loaded'));

    // Background ambient video — always muted
    if (bg) {
      bg.muted        = true;
      bg.defaultMuted = true;
      bg.loop         = true;
      bg.play().catch(() => {});
    }

    if (main) {
      main.muted        = false;
      main.defaultMuted = false;
      main.volume       = 1;
      main.loop         = false;
      setMuted(false);
      setPaused(false);

      const attempt = playWithVoice();
      if (attempt) {
        attempt
          .then(() => {
            // Autoplay with sound succeeded (rare but happens on desktop)
            unlockedRef.current = true;
            setShowUnlock(false);
          })
          .catch(() => {
            // Browser blocked audio autoplay — show the unlock overlay immediately
            setShowUnlock(true);
            // Also try muted autoplay so the video at least starts visually
            main.muted = true;
            main.play().catch(() => {});
          });
      }

      // Register a one-time listener on every meaningful user gesture
      const onGesture = () => unlockAudio();
      window.addEventListener('pointerdown', onGesture, { once: true });
      window.addEventListener('keydown',     onGesture, { once: true });
      window.addEventListener('touchstart',  onGesture, { once: true });

      return () => {
        window.removeEventListener('pointerdown', onGesture);
        window.removeEventListener('keydown',     onGesture);
        window.removeEventListener('touchstart',  onGesture);
      };
    }
  }, []); // eslint-disable-line

  const handleVideoEnded = () => {
    const main = videoRef.current;
    if (!main || firstPlayFinishedRef.current) return;
    firstPlayFinishedRef.current = true;
    main.muted        = true;
    main.defaultMuted = true;
    main.loop         = true;
    main.currentTime  = 0;
    setMuted(true);
    main.play().catch(() => {});
  };

  const toggleMute = async () => {
    const main = videoRef.current;
    if (!main) return;
    // If user had not unlocked yet, treat this as unlock
    if (!unlockedRef.current) { unlockAudio(); return; }
    const nextMuted   = !muted;
    main.muted        = nextMuted;
    main.defaultMuted = nextMuted;
    main.volume       = nextMuted ? 0 : 1;
    setMuted(nextMuted);
    if (main.paused) { await main.play().catch(() => {}); setPaused(false); }
  };

  const togglePlay = async () => {
    const main = videoRef.current;
    const bg   = bgVideoRef.current;
    if (!main || !bg) return;
    if (main.paused) {
      await Promise.allSettled([main.play(), bg.play()]);
      setPaused(false);
    } else {
      main.pause(); bg.pause(); setPaused(true);
    }
  };

  const scrollToWork    = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="video-intro" ref={rootRef}>
      <video
        ref={bgVideoRef}
        className="ambient-video"
        src="/videos/hero.mp4"
        autoPlay muted loop playsInline aria-hidden="true"
      />

      <div className="global-shade" />

      {/* ── Auto-shown sound unlock overlay ──
           Appears immediately when browser blocks autoplay with audio.
           Any tap/click anywhere on this overlay (or anywhere on the page
           via the window listener) will unlock and dismiss it. ── */}
      {showUnlock && (
        <div
          onClick={unlockAudio}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
            cursor: 'pointer',
            gap: '14px',
          }}
          aria-label="Tap anywhere to hear voice"
        >
          {/* Pulsing speaker icon */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30,
            animation: 'unlockPulse 1.6s ease-in-out infinite',
          }}>
            🔊
          </div>
          <p style={{
            color: '#fff', fontFamily: 'inherit',
            fontSize: '1rem', fontWeight: 600,
            margin: 0, letterSpacing: '0.03em',
            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
          }}>
            Tap anywhere to hear voice
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.78rem', margin: 0,
          }}>
            Your browser requires a tap to enable audio
          </p>

          {/* Inline keyframes for the pulse */}
          <style>{`
            @keyframes unlockPulse {
              0%,100% { transform: scale(1);   opacity: 1; }
              50%      { transform: scale(1.12); opacity: 0.75; }
            }
          `}</style>
        </div>
      )}

      <div className="hero-shell">
        <div className="hero-grid">
          <div className="content-side">
            <CinematicLayer />
            <div className="left-vignette" />
            <div className="left-orb left-orb-one" />
            <div className="left-orb left-orb-two" />

            <div className="content-inner">
              <div className="status-pill"><span /> Open to work</div>
              <p className="hero-kicker">Java Full Stack Portfolio</p>

              <h1 className="hero-name" aria-label="Sri Harshitha">
                <span>SRI</span>
                <span>HARSHITHA</span>
              </h1>

              <p className="hero-subtitle">
                Spring Boot · React.js · Secure API Systems · Production-ready UI
              </p>

              <div className="skills">
                <span className="skill-pill">Java</span>
                <span className="skill-pill">Spring Boot</span>
                <span className="skill-pill">React</span>
                <span className="skill-pill">REST APIs</span>
                <span className="skill-pill">PostgreSQL</span>
              </div>

              <div className="hero-actions">
                <a href="#work" onClick={(e) => { e.preventDefault(); scrollToWork(); }} className="primary-btn">
                  View Work
                </a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }} className="ghost-btn">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="video-side">
            <video
              ref={videoRef}
              className="main-video"
              src="/videos/hero.mp4"
              autoPlay
              playsInline
              preload="auto"
              onEnded={handleVideoEnded}
            />
            <div className="video-warmth" />
            <div className="video-edge" />
          </div>
        </div>

        <div className="controls">
          <button className="control-btn" onClick={togglePlay}  aria-label="Toggle play">{paused ? '▶' : 'Ⅱ'}</button>
          <button className="control-btn" onClick={toggleMute}  aria-label="Toggle sound">{muted  ? '🔇' : '🔊'}</button>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollToWork} aria-label="Scroll to work">
        <span />
        <b>↓</b>
      </button>
    </section>
  );
}
