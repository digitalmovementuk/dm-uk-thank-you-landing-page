import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  animate,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  HERO_CHIPS,
  NAV_LINKS,
  REVIEW,
  SLOT_GROUPS,
  STATS,
  STEPS,
  TRUST_POINTS,
} from './content';

const SECTION_REVEAL = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const CARD_REVEAL = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 12.5 10 17l9-10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6.5 11 .9 2.4L22 17.3l-2.6.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9.9-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.5 4.5h2.3l1 5-1.9 1.9a15 15 0 0 0 3.7 3.7l1.9-1.9 5 1v2.3a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 6 6a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M7.5 3.5v4M16.5 3.5v4M3.5 10.5h17" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#EA4335"
        d="M12 10.2v3.8h5.4a4.7 4.7 0 0 1-2.1 3.1l3.2 2.4c1.9-1.8 3-4.4 3-7.5 0-.6-.1-1.2-.2-1.8H12Z"
      />
      <path
        fill="#34A853"
        d="M12 22a9.9 9.9 0 0 0 6.5-2.3l-3.2-2.4c-.9.6-2 .9-3.3.9a5.8 5.8 0 0 1-5.5-4H3.2v2.5A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.5 14.2a6 6 0 0 1 0-4.4V7.3H3.2a10 10 0 0 0 0 9.4l3.3-2.5Z"
      />
      <path
        fill="#4285F4"
        d="M12 5.8c1.8 0 3.3.6 4.5 1.7l2.7-2.7A10 10 0 0 0 3.2 7.3l3.3 2.5a5.8 5.8 0 0 1 5.5-4Z"
      />
    </svg>
  );
}

function SectionTitle({ eyebrow, title, copy, align = 'left' }) {
  return (
    <m.div
      className={`section-title section-title--${align}`}
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </m.div>
  );
}

function Header({ onOpenModal, progress }) {
  return (
    <header className="site-header">
      <div className="scroll-progress-wrap" aria-hidden="true">
        <m.div className="scroll-progress" style={{ scaleX: progress }} />
      </div>
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Digital Movement UK thank you page">
          <img src="brand/logo-color-negative.svg" alt="Digital Movement" />
        </a>
        <nav className="header-nav" aria-label="Page sections">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href="tel:02038157992">
            0203 815 7992
          </a>
          <m.button
            className="button button--light"
            type="button"
            onClick={onOpenModal}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Priority Call
          </m.button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onOpenModal }) {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const motifY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 180]);
  const motifScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.16]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -60]);

  return (
    <section id="top" ref={heroRef} className="hero">
      <div className="hero-backdrop" aria-hidden="true" />
      <m.img
        className="hero-motif"
        src="brand/motif-positive.png"
        alt=""
        style={{ y: motifY, scale: motifScale }}
      />
      <div className="shell hero-grid">
        <m.div
          className="hero-copy"
          variants={SECTION_REVEAL}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-kicker">
            <span className="hero-kicker__dot" />
            Request received
          </div>
          <m.div
            className="hero-confirm"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <CheckIcon />
          </m.div>
          <h1>
            Thank you. <span>We&apos;ve got your details.</span>
          </h1>
          <p className="hero-lead">
            One of our digital marketing specialists will review your website and come back to
            you within 24 hours with the clearest route to more enquiries, better visibility, and
            faster momentum.
          </p>
          <div className="hero-chip-row">
            {HERO_CHIPS.map((chip) => (
              <span key={chip} className="hero-chip">
                {chip}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <m.button
              className="button button--primary"
              type="button"
              onClick={onOpenModal}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarIcon />
              Book a priority call
            </m.button>
            <m.a
              className="button button--ghost"
              href="tel:02038157992"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <PhoneIcon />
              Call us now
            </m.a>
          </div>
          <div className="hero-meta">
            <SparkIcon />
            If you already know you want to move fast, skip the wait and lock in a priority call
            now.
          </div>
        </m.div>

        <m.div
          className="hero-rail"
          style={{ y: panelY }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="hero-art-card">
            <img src="brand/cover-option-1.png" alt="Digital Movement brand artwork" />
          </div>
          <div className="hero-status-card">
            <div className="hero-status-card__logo">
              <img src="brand/logo-color-positive.svg" alt="Digital Movement" />
            </div>
            <div className="hero-status-card__copy">
              <span className="eyebrow">Your enquiry is moving</span>
              <h3>What happens behind the scenes now</h3>
              <ul>
                <li>
                  <CheckIcon />
                  Website and rankings reviewed first
                </li>
                <li>
                  <CheckIcon />
                  Quick-win opportunities identified
                </li>
                <li>
                  <CheckIcon />
                  Strategy response prepared by the team
                </li>
              </ul>
            </div>
            <div className="hero-status-card__footer">
              <div>
                <span className="status-label">Response window</span>
                <strong>Within 24 hours</strong>
              </div>
              <button type="button" onClick={onOpenModal}>
                Open priority options
                <ArrowIcon />
              </button>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function NextStepsSection() {
  return (
    <section id="next-steps" className="section-shell section-shell--tight">
      <div className="shell">
        <SectionTitle
          eyebrow="What happens next"
          title="Three simple steps from enquiry to strategy"
          copy="From here, we review your current setup, find the quickest wins, and come back with the clearest next move."
        />
        <div className="steps-rail" aria-hidden="true" />
        <div className="steps-grid">
          {STEPS.map((step, index) => (
            <m.article
              key={step.title}
              className="step-card"
              custom={index}
              variants={CARD_REVEAL}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="step-pill">{step.phase}</div>
              <div className="step-index">{String(index + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, shouldReduceMotion, value]);

  return (
    <div ref={ref} className="stat-item">
      <strong>
        {displayValue.toLocaleString()}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function ProofSection() {
  return (
    <section id="proof" className="section-shell section-shell--gradient">
      <div className="shell">
        <SectionTitle
          eyebrow="Why businesses trust us"
          title="Proof up front, not hidden away"
          copy="The businesses that work with Digital Movement want clear results, honest advice, and a team that moves quickly once the opportunity is there."
        />
        <div className="stats-grid">
          {STATS.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>

        <div className="proof-layout">
          <m.article
            className="review-card"
            variants={SECTION_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="review-stars" aria-hidden="true">
              5/5
            </div>
            <blockquote>{REVIEW.quote}</blockquote>
            <div className="review-meta">
              <strong>{REVIEW.name}</strong>
              <span>{REVIEW.role}</span>
            </div>
            <div className="review-chip">
              <GoogleIcon />
              5.0 rating - based on 100+ reviews
            </div>
          </m.article>

          <m.aside
            className="proof-panel"
            variants={SECTION_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="proof-panel__logo">
              <img src="brand/logo-color-positive.svg" alt="Digital Movement" />
            </div>
            <h3>What you can expect from the team</h3>
            <ul>
              {TRUST_POINTS.map((point) => (
                <li key={point}>
                  <CheckIcon />
                  {point}
                </li>
              ))}
            </ul>
          </m.aside>
        </div>
      </div>
    </section>
  );
}

function PrioritySection({ onOpenModal }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="priority-call" className="section-shell section-shell--cta">
      <div className="shell priority-layout">
        <m.div
          className="priority-copy"
          variants={SECTION_REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="eyebrow">Don&apos;t want to wait?</span>
          <h2>Jump straight to the front of the queue</h2>
          <p>
            If you already know you want to speak with the team sooner, use the priority call
            options below or call us directly in London.
          </p>
          <div className="priority-actions">
            <m.button
              className="button button--primary button--large"
              type="button"
              onClick={onOpenModal}
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <CalendarIcon />
              Choose a priority slot
            </m.button>
            <m.a
              className="button button--ghost button--large"
              href="tel:02038157992"
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <PhoneIcon />
              Call 0203 815 7992
            </m.a>
          </div>
        </m.div>

        <m.div
          className="priority-card"
          variants={CARD_REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          custom={0}
        >
          <img className="priority-card__motif" src="brand/motif-positive.png" alt="" />
          <div className="priority-card__inner">
            <span className="priority-tag">Digital Movement UK</span>
            <h3>Priority support options</h3>
            <p>
              Use the modal to send a booked-slot request by email, or phone the team directly if
              you want the quickest possible response.
            </p>
            <div className="priority-card__details">
              <div>
                <span>Phone</span>
                <strong>0203 815 7992</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>office@digitalmovement.uk</strong>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src="brand/logo-mono-positive.svg" alt="Digital Movement" />
          <p>
            128 City Road, London, EC1V 2NX, United Kingdom
            <br />
            0203 815 7992 | office@digitalmovement.uk
          </p>
        </div>
        <div className="footer-links">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function PriorityModal({ open, onClose }) {
  const [selectedDay, setSelectedDay] = useState(SLOT_GROUPS[0].day);
  const currentSlots = useMemo(
    () => SLOT_GROUPS.find((group) => group.day === selectedDay)?.slots ?? [],
    [selectedDay],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  const bookSlot = (time) => {
    const subject = `Priority call request - ${selectedDay} ${time}`;
    const body = `Hi Digital Movement,%0D%0A%0D%0AI'd like to request the ${selectedDay} ${time} priority call slot.%0D%0A%0D%0AName:%0D%0ABusiness:%0D%0AWebsite:%0D%0APhone:%0D%0A%0D%0AThanks`;
    window.location.href = `mailto:office@digitalmovement.uk?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            className="modal-card"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="priority-modal-title"
          >
            <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </button>
            <img
              className="modal-logo"
              src="brand/logo-color-positive.svg"
              alt="Digital Movement"
            />
            <span className="eyebrow">Priority call</span>
            <h3 id="priority-modal-title">Choose a preferred slot</h3>
            <p>
              Pick the day that works best and we&apos;ll start a ready-made email for you with
              that slot already filled in.
            </p>
            <div className="slot-days" role="tablist" aria-label="Available days">
              {SLOT_GROUPS.map((group) => (
                <button
                  key={group.day}
                  className={selectedDay === group.day ? 'is-active' : ''}
                  type="button"
                  onClick={() => setSelectedDay(group.day)}
                >
                  {group.day}
                </button>
              ))}
            </div>
            <div className="slot-grid">
              {currentSlots.map((slot) => (
                <m.button
                  key={slot}
                  className="slot-button"
                  type="button"
                  onClick={() => bookSlot(slot)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {slot}
                </m.button>
              ))}
            </div>
            <div className="modal-divider" />
            <div className="modal-direct">
              <a href="tel:02038157992">
                <PhoneIcon />
                Call us instead
              </a>
              <a href="mailto:office@digitalmovement.uk">
                <ArrowIcon />
                Email the team
              </a>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <LazyMotion features={domAnimation}>
      <div className="page-shell">
        <Header onOpenModal={() => setIsModalOpen(true)} progress={scrollYProgress} />
        <main>
          <Hero onOpenModal={() => setIsModalOpen(true)} />
          <NextStepsSection />
          <ProofSection />
          <PrioritySection onOpenModal={() => setIsModalOpen(true)} />
        </main>
        <Footer />
        <PriorityModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </LazyMotion>
  );
}
