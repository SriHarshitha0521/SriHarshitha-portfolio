import React from 'react';
import { useEffect, useRef, useState } from 'react';
import CinematicLayer from './CinematicLayer.jsx';

export default function VideoIntro() {
  const rootRef    = useRef(null);
  const videoRef   = useRef(null);
  const bgVideoRef = useRef(null);

  // Voice (main video) plays with sound for this many loops on load, then auto-mutes.
  const AUTO_PLAY_LOOPS = 5;

  const [muted,  setMuted]  = useState(false);
  const [paused, setPaused] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const playCountRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const main = videoRef.current;
    const bg   = bgVideoRef.current;

    if (root) requestAnimationFrame(() => root.classList.add('is-loaded'));

    // Background video: always silent, continuous loop.
    if (bg) {
      bg.muted        = true;
      bg.defaultMuted = true;
      bg.loop         = true;
      bg.play().catch(() => {});
    }

    if (!main) return;

    // Main video: try to autoplay WITH sound for AUTO_PLAY_LOOPS plays, then
    // switch to a silent continuous loop. We can't use the native `loop`
    // attribute while counting plays, since it never fires `ended`, so we
    // manually restart the video on each `ended` event until the count is hit.
    main.loop = false;

    const startMutedLoop = () => {
      main.loop          = true;
      main.muted         = true;
      main.defaultMuted  = true;
      main.volume        = 0;
      setMuted(true);
      main.play().catch(() => {});
    };

    const handleEnded = () => {
      playCountRef.current += 1;
      if (playCountRef.current < AUTO_PLAY_LOOPS) {
        main.currentTime = 0;
        main.play().catch(() => {});
      } else {
        startMutedLoop();
      }
    };

    main.addEventListener('ended', handleEnded);

    // Attempt unmuted autoplay. Most browsers block autoplay with sound
    // until the user has interacted with the page, so if this is rejected
    // we fall back immediately to a muted loop (no popups, no stalled video).
    main.muted        = false;
    main.defaultMuted = false;
    main.volume        = 1;
    main.play().then(() => {
      setMuted(false);
    }).catch(() => {
      // Autoplay with sound was blocked by the browser — fall back to muted.
      startMutedLoop();
    });

    return () => {
      main.removeEventListener('ended', handleEnded);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowHints(false);
  }, 6000);

  return () => clearTimeout(timer);
}, []);

  // Manual toggle (button/control). Once the user touches this, we stop the
  // automatic "5 plays then mute" sequence and just loop continuously.
  const toggleMute = async () => {
    const main = videoRef.current;
    const bg   = bgVideoRef.current;
    if (!main) return;
    playCountRef.current = AUTO_PLAY_LOOPS; // cancel the auto-mute countdown
    main.loop = true;
    const nextMuted = !muted;
    main.muted        = nextMuted;
    main.defaultMuted = nextMuted;
    main.volume        = nextMuted ? 0 : 1;
    setMuted(nextMuted);
    if (bg) bg.muted = true; // ambient background video always stays muted
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
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }} className="primary-btn">
                  Hire Me
                </a>
                <a href="#work" onClick={(e) => { e.preventDefault(); scrollToWork(); }} className="ghost-btn">
                  View Work
                </a>
              </div>

              <div className="hero-socials">
                <a href="https://www.linkedin.com/in/kurre-sri-harshitha-3101a1215/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zM8 19h-3v-9h3v9zM6.5 8.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zM20 19h-3v-4.5c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.55 2.84-1.55 3.04 0 3.6 2 3.6 4.59v4.73z"/></svg>
                </a>
                <a href="https://github.com/SriHarshitha0521" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.4-2.69 5.37-5.25 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>
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
            />
            <div className="video-warmth" />
            <div className="video-edge" />
            <div className="video-controls-center">

  <button
    className="video-main-btn"
    onClick={toggleMute}
  >
    {muted ? "🔇 Turn Sound On" : "🔊 Turn Sound Off"}
  </button>

</div>
          </div>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollToWork} aria-label="Scroll to work">
        <span />
        <b>↓</b>
      </button>
    </section>
  );
}
