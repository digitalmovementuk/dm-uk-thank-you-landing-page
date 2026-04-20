import { useEffect, useMemo, useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  AUDIT_ITEMS,
  BUILD_POINTS,
  CONTACT_DETAILS,
  DELIVERY_POINTS,
  FAQS,
  HERO_BULLETS,
  HERO_REVIEWS,
  PROCESS_STEPS,
  PROOF_METRICS,
  SEARCH_EXAMPLES,
} from './content';

const FORM_ENDPOINT = import.meta.env.VITE_AUDIT_FORM_ENDPOINT;
const WHATSAPP_URL = `https://wa.me/447446967403?text=${encodeURIComponent(
  "Hi Martey, I'd like a free clinic growth audit for my clinic."
)}`;
const FORM_STEPS = [
  { number: '1', label: 'Share your clinic' },
  { number: '2', label: 'Get the audit view' },
  { number: '3', label: 'See the next steps' },
];

const REVEAL_EASE = [0.22, 1, 0.36, 1];
const VIEWPORT_ONCE = { once: true, amount: 0.24 };

const SECTION_REVEAL = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: REVEAL_EASE },
  },
};

const CARD_REVEAL = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.64,
      delay: index * 0.08,
      ease: REVEAL_EASE,
    },
  }),
};

function getRevealMotionProps(shouldReduceMotion, variants, options = {}) {
  if (shouldReduceMotion) {
    return options;
  }

  return {
    variants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: VIEWPORT_ONCE,
    ...options,
  };
}

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

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7.5 12 13l8-5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChevronIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20.52 3.48A11.83 11.83 0 0 0 12.07 0C5.53 0 .2 5.32.2 11.86c0 2.09.55 4.12 1.59 5.92L0 24l6.39-1.68a11.8 11.8 0 0 0 5.68 1.44h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.42-8.42Zm-8.45 18.28h-.01a9.9 9.9 0 0 1-5.06-1.39l-.36-.2-3.79.99 1.01-3.7-.24-.38a9.9 9.9 0 0 1-1.53-5.23c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.15 1.03 7.02 2.91a9.86 9.86 0 0 1 2.9 7.01c0 5.47-4.46 9.91-9.93 9.91Zm5.44-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.8-1.49-1.79-1.66-2.1-.17-.3-.02-.47.13-.62.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52l-.57-.01c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.08 3.17 5.05 4.45.71.31 1.27.49 1.7.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35Z"
      />
    </svg>
  );
}

function GoogleMark(props) {
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={`section-title section-title--${align}`}
      {...getRevealMotionProps(shouldReduceMotion, SECTION_REVEAL)}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </m.div>
  );
}

function Header({ progress }) {
  return (
    <header className="site-header">
      <div className="scroll-progress-wrap" aria-hidden="true">
        <m.div className="scroll-progress" style={{ scaleX: progress }} />
      </div>
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Digital Movement UK">
          <img src="brand/logo-color-positive.svg" alt="Digital Movement UK" />
        </a>
        <div className="header-actions">
          <a className="header-phone" href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`}>
            {CONTACT_DETAILS.phone}
          </a>
          <a className="button button--light" href="#audit-form">
            Get Free Audit
          </a>
        </div>
      </div>
    </header>
  );
}

function AuditForm({ formRef, onSubmit, queryFields, submitState, errorMessage }) {
  if (submitState === 'success') {
    return (
      <div className="form-card form-card--success" id="audit-form">
        <div className="form-success-icon">
          <CheckIcon />
        </div>
        <span className="eyebrow">Audit request received</span>
        <h3>Thank you. Martey will review your clinic properly.</h3>
        <p>
          We have your details and will look at your treatments, local coverage, and landing-page
          opportunities before coming back with the clearest next steps.
        </p>
        <div className="form-success-actions">
          <a className="button button--primary" href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`}>
            <PhoneIcon />
            Call {CONTACT_DETAILS.phone}
          </a>
          <a className="button button--ghost" href={`mailto:${CONTACT_DETAILS.email}`}>
            <MailIcon />
            Email the team
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card" id="audit-form">
      <span className="eyebrow">Free audit</span>
      <h3>Request your free clinic growth audit</h3>
      <p className="form-intro">
        Martey will show you the treatments, locations, and pages most likely to bring better-fit
        enquiries.
      </p>
      <p className="form-meta">5 fields. About 30 seconds.</p>
      <div className="form-steps" aria-label="Audit steps">
        {FORM_STEPS.map((step) => (
          <div key={step.number} className="form-step">
            <strong>{step.number}</strong>
            <span>{step.label}</span>
          </div>
        ))}
      </div>
      <form ref={formRef} className="audit-form" onSubmit={onSubmit}>
        <input type="hidden" name="utm_source" value={queryFields.utm_source} />
        <input type="hidden" name="utm_medium" value={queryFields.utm_medium} />
        <input type="hidden" name="utm_campaign" value={queryFields.utm_campaign} />
        <input type="hidden" name="audience_type" value={queryFields.audience_type} />
        <input type="hidden" name="email_variant" value={queryFields.email_variant} />

        <label>
          <span>First name</span>
          <input name="first_name" type="text" autoComplete="given-name" required />
        </label>
        <label>
          <span>Clinic name</span>
          <input name="clinic_name" type="text" autoComplete="organization" required />
        </label>
        <label>
          <span>Website</span>
          <input name="website" type="url" placeholder="https://yourclinic.com" required />
        </label>
        <label>
          <span>Work email</span>
          <input name="work_email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Phone number (optional)</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <button className="button button--primary button--full" type="submit" disabled={submitState === 'submitting'}>
          {submitState === 'submitting' ? 'Sending...' : 'Get Free Audit'}
        </button>
        <p className="form-helper">
          No pressure. We will show you the clearest opportunities first.
        </p>
        {submitState === 'error' ? <p className="form-error">{errorMessage}</p> : null}
      </form>
    </div>
  );
}

function HeroReviewSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeReview = HERO_REVIEWS[activeIndex];

  useEffect(() => {
    if (shouldReduceMotion || HERO_REVIEWS.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_REVIEWS.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + HERO_REVIEWS.length) % HERO_REVIEWS.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % HERO_REVIEWS.length);
  }

  const initials = activeReview.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <m.article
      className="hero-review-slider"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.18, ease: REVEAL_EASE }}
    >
      <div className="hero-review-slider__top">
        <div className="hero-review-slider__rating">
          <div className="hero-review-slider__google">
            <GoogleMark />
            <span>Google</span>
          </div>
          <div className="hero-review-slider__summary">
            <strong>100+ 5-star reviews</strong>
            <span>Digital Movement client feedback</span>
          </div>
        </div>
        <div className="hero-review-slider__stars" aria-label="5 out of 5 stars">
          {'★★★★★'}
        </div>
      </div>

      <div className="hero-review-slider__body">
        <m.p
          key={activeReview.name}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.44, ease: REVEAL_EASE }}
        >
          {activeReview.quote}
        </m.p>
      </div>

      <div className="hero-review-slider__footer">
        <m.div
          key={`${activeReview.name}-${activeReview.age}`}
          className="hero-review-slider__person"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: REVEAL_EASE }}
        >
          <div className="hero-review-slider__avatar" aria-hidden="true">
            {initials}
          </div>
          <div>
            <strong>{activeReview.name}</strong>
            <span>
              {activeReview.meta} • {activeReview.age}
            </span>
          </div>
        </m.div>

        <div className="hero-review-slider__controls">
          <button type="button" className="hero-review-slider__control" onClick={goToPrevious} aria-label="Previous review">
            <ChevronIcon className="is-left" />
          </button>
          <button type="button" className="hero-review-slider__control" onClick={goToNext} aria-label="Next review">
            <ChevronIcon />
          </button>
        </div>
      </div>

      <div className="hero-review-slider__dots" aria-label="Review selection">
        {HERO_REVIEWS.map((review, index) => (
          <button
            key={review.name}
            type="button"
            className={`hero-review-slider__dot${index === activeIndex ? ' is-active' : ''}`}
            aria-label={`Show review ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </m.article>
  );
}

function Hero({ formRef, onSubmit, queryFields, submitState, errorMessage }) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const backdropY = useTransform(heroProgress, [0, 1], ['0%', '16%']);
  const spotlightY = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const motifY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const motifRotate = useTransform(heroProgress, [0, 1], [0, 7]);

  return (
    <section id="top" className="hero" ref={heroRef}>
      <m.div className="hero-backdrop" aria-hidden="true" style={shouldReduceMotion ? undefined : { y: backdropY }} />
      <m.div className="hero-spotlight" aria-hidden="true" style={shouldReduceMotion ? undefined : { y: spotlightY }} />
      <m.img
        className="hero-motif"
        src="brand/motif-positive.png"
        alt=""
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={shouldReduceMotion ? undefined : { opacity: 0.16, scale: 1 }}
        transition={{ duration: 1, ease: REVEAL_EASE }}
        style={shouldReduceMotion ? undefined : { y: motifY, rotate: motifRotate }}
      />
      <div className="shell hero-grid">
        <m.div
          className="hero-copy"
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'visible'}
          variants={SECTION_REVEAL}
        >
          <div className="hero-kicker">
            <span className="hero-kicker__dot" />
            Free audit for private cosmetic surgery and hair restoration clinics
          </div>
          <HeroReviewSlider />
          <h1>Win more private patient enquiries in the right local areas</h1>
          <p className="hero-lead">
            We map the procedures and local searches worth owning, build the right service and area
            pages, and only invoice after the website is built and the pages are submitted to
            Google.
          </p>
          <ul className="hero-bullets">
            {HERO_BULLETS.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="hero-actions">
            <a className="button button--primary" href="#audit-form">
              <ArrowIcon />
              Get Free Audit
            </a>
          </div>
          <p className="hero-note">
            Prefer to speak first? <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`}>Call {CONTACT_DETAILS.phone}</a>
          </p>
        </m.div>

        <m.div
          className="hero-side hero-side--form-only"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 26, y: 10 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.78, delay: 0.12, ease: REVEAL_EASE }}
        >
          <AuditForm
            formRef={formRef}
            onSubmit={onSubmit}
            queryFields={queryFields}
            submitState={submitState}
            errorMessage={errorMessage}
          />
        </m.div>
      </div>
    </section>
  );
}

function ProofBand() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="proof-band-section">
      <div className="shell">
        <div className="proof-band">
          {PROOF_METRICS.map((metric, index) => (
            <m.article
              key={metric.label}
              className="proof-band__item"
              {...getRevealMotionProps(shouldReduceMotion, CARD_REVEAL, { custom: index })}
            >
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpportunitySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell section-shell--tinted" id="audit">
      <div className="shell split-layout">
        <div className="split-copy">
          <SectionTitle
            eyebrow="What the audit shows"
            title="Where the easiest local enquiry wins usually are"
            copy="Patients search by procedure and area, not just by clinic name. The audit shows where your clinic is missing the most valuable demand."
          />
          <div className="search-chip-row">
            {SEARCH_EXAMPLES.map((item) => (
              <span key={item} className="search-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
        <m.aside
          className="stack-card"
          {...getRevealMotionProps(shouldReduceMotion, CARD_REVEAL)}
        >
          <span className="eyebrow">What Martey reviews</span>
          <div className="stack-list">
            {AUDIT_ITEMS.map((item, index) => (
              <article key={item.title} className="stack-list__item">
                <span className="stack-list__index">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </m.aside>
      </div>
    </section>
  );
}

function DeliverySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell">
      <div className="shell split-layout">
        <div className="split-copy">
          <SectionTitle
            eyebrow="How it works"
            title="A simple path from audit to launch"
            copy="We keep the process simple: review the opportunity, plan the right page system, then build before billing."
          />
          <m.div className="stack-card" {...getRevealMotionProps(shouldReduceMotion, CARD_REVEAL)}>
            <div className="stack-list">
              {PROCESS_STEPS.map((step) => (
                <article key={step.title} className="stack-list__item stack-list__item--process">
                  <span className="stack-list__index">{step.phase}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </m.div>
        </div>
        <m.aside
          className="promise-card"
          {...getRevealMotionProps(shouldReduceMotion, CARD_REVEAL, { custom: 1 })}
        >
          <span className="eyebrow">Delivery promise</span>
          <h3>We build first. You pay after delivery.</h3>
          <p className="promise-copy">
            Your first invoice only comes after the website is built and the landing pages are
            submitted to Google.
          </p>
          <div className="promise-pills">
            {DELIVERY_POINTS.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
          <ul>
            {BUILD_POINTS.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </m.aside>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section-shell section-shell--tinted" id="faq">
      <div className="shell">
        <SectionTitle
          eyebrow="FAQ"
          title="Straight answers before you enquire"
        />
        <div className="faq-list">
          {FAQS.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>
                <span>{item.question}</span>
                <span className="faq-item__plus">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section-shell">
      <div className="shell">
        <div className="final-cta">
          <div className="final-cta__copy">
            <span className="eyebrow">Next step</span>
            <h2>Want to see the best treatments, keywords, and local areas for your clinic?</h2>
            <p>
              Send your details through and Martey will show you the clearest opportunities first.
            </p>
          </div>
          <div className="final-cta__actions">
            <a className="button button--primary button--large" href="#audit-form">
              <ArrowIcon />
              Get Free Audit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomStickyBar({ submitState }) {
  if (submitState === 'success') {
    return null;
  }

  return (
    <div className="bottom-sticky-bar" aria-label="Sticky call to action">
      <div className="bottom-sticky-bar__copy">
        <strong>Free clinic growth audit</strong>
        <span>See your best treatment, keyword, and local area opportunities.</span>
      </div>
      <div className="bottom-sticky-bar__actions">
        <a className="button button--primary bottom-sticky-bar__button" href="#audit-form">
          <ArrowIcon />
          Get Free Audit
        </a>
        <a
          className="whatsapp-button"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Message Martey on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src="brand/logo-color-positive.svg" alt="Digital Movement UK" />
          <p>{CONTACT_DETAILS.address}</p>
        </div>
        <div className="footer-links">
          <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`}>{CONTACT_DETAILS.phone}</a>
          <a href={`mailto:${CONTACT_DETAILS.email}`}>{CONTACT_DETAILS.email}</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const formRef = useRef(null);
  const [submitState, setSubmitState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const queryFields = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        audience_type: '',
        email_variant: '',
      };
    }

    const params = new URLSearchParams(window.location.search);

    return {
      utm_source: params.get('utm_source') ?? '',
      utm_medium: params.get('utm_medium') ?? '',
      utm_campaign: params.get('utm_campaign') ?? '',
      audience_type: params.get('audience_type') ?? 'cosmetic_surgery_clinics',
      email_variant: params.get('email_variant') ?? 'clinic_growth_audit',
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const payload = Object.fromEntries(formData.entries());

    setErrorMessage('');

    if (FORM_ENDPOINT) {
      setSubmitState('submitting');

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            page_url: typeof window !== 'undefined' ? window.location.href : '',
            form_name: 'clinic_growth_audit',
          }),
        });

        if (!response.ok) {
          throw new Error('Unable to submit form');
        }

        setSubmitState('success');
        formRef.current.reset();
        return;
      } catch (error) {
        setSubmitState('error');
        setErrorMessage('Something went wrong. Please try again or call 0203 815 7992.');
        return;
      }
    }

    const subject = encodeURIComponent(
      `Clinic growth audit request - ${payload.clinic_name || 'New enquiry'}`
    );
    const body = encodeURIComponent(
      [
        'Hi Digital Movement UK,',
        '',
        'I would like a free clinic growth audit.',
        '',
        `First name: ${payload.first_name || ''}`,
        `Clinic name: ${payload.clinic_name || ''}`,
        `Website: ${payload.website || ''}`,
        `Work email: ${payload.work_email || ''}`,
        `Phone: ${payload.phone || ''}`,
        '',
        `UTM source: ${payload.utm_source || ''}`,
        `UTM medium: ${payload.utm_medium || ''}`,
        `UTM campaign: ${payload.utm_campaign || ''}`,
        `Audience type: ${payload.audience_type || ''}`,
        `Email variant: ${payload.email_variant || ''}`,
      ].join('\n')
    );

    window.location.href = `mailto:${CONTACT_DETAILS.email}?subject=${subject}&body=${body}`;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="page-shell">
        <Header progress={scrollYProgress} />
        <main>
          <Hero
            formRef={formRef}
            onSubmit={handleSubmit}
            queryFields={queryFields}
            submitState={submitState}
            errorMessage={errorMessage}
          />
          <ProofBand />
          <OpportunitySection />
          <DeliverySection />
          <FaqSection />
          <FinalCta />
        </main>
        <BottomStickyBar submitState={submitState} />
        <Footer />
      </div>
    </LazyMotion>
  );
}

export default App;
