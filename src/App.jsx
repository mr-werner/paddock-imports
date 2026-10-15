import blueprintLogo from "./assets/blueprint-webstudio-logo.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, Flag, MapPin, Menu, Minus, Phone, Plus, Snowflake, Truck, X } from "lucide-react";
import SITE from "./site.js";

// -----------------------------------------------------------------------------
// All business content lives in src/site.js. This file only lays it out.
// -----------------------------------------------------------------------------

const { COMPANY, PHONE, PHONE_DISPLAY, EMAIL, ADDRESS, CITY, MAPS_QUERY, FALLBACK_RATING } = SITE;
const GOOGLE_REVIEWS_URL = SITE.GOOGLE_PLACE_ID
  ? `https://search.google.com/local/reviews?placeid=${SITE.GOOGLE_PLACE_ID}`
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

// Public contact details for the studio — edit here, no environment variables required.
const STUDIO_PHONE = "+17205156647";
const STUDIO_EMAIL = "hello@blueprintwebstudio.com";
const STUDIO_WEBSITE = "https://blueprintwebstudio.com";
const STUDIO_SOURCE = `${SITE.ABBR}.blueprintwebstudio.com`;

const END_DATE = import.meta.env.VITE_CONCEPT_END_DATE || SITE.END_DATE;

function Title({ parts }) {
  const [plain, em] = parts;
  return <>{plain}{em && <em>{em}</em>}</>;
}

// -----------------------------------------------------------------------------
// CONCEPT COUNTDOWN + INTEREST FORM (Blueprint WebStudio)
// -----------------------------------------------------------------------------

function getRemaining() {
  const ms = Math.max(0, new Date(END_DATE).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    expired: ms === 0,
  };
}

function ConceptInterestModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement;
    modalRef.current?.focus();
    const handleEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    if (form.website) { setStatus("sent"); return; }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/demo-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect: COMPANY,
          source: STUDIO_SOURCE,
          page: window.location.href,
          action: "Partner Program Interest",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          budget: form.budget,
          message: form.message.trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Please try again.");
    }
  }

  return (
    <div className="interest-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="interest-modal" role="dialog" aria-modal="true" aria-labelledby="interest-title" ref={modalRef} tabIndex={-1}>
        <button type="button" className="interest-close" onClick={onClose} aria-label="Close interest form"><X size={24} /></button>
        <span className="interest-kicker">BLUEPRINT WEBSTUDIO PARTNER PROGRAM</span>
        {status === "sent" ? (
          <div className="interest-success">
            <CheckCircle2 size={44} />
            <h2 id="interest-title">Thank you for your interest.</h2>
            <p>Your message has been sent to Blueprint WebStudio. We'll follow up using the contact information you provided.</p>
            <button type="button" className="interest-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="interest-title">Interested in this redesign?</h2>
            <p className="interest-intro">Send a quick note and Blueprint WebStudio will follow up about launching, customizing, or taking over the site.</p>
            <form onSubmit={submit} className="interest-form">
              <label>Name <span>*</span><input value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={120} autoComplete="name" /></label>
              <label>Email <span>*</span><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required maxLength={254} autoComplete="email" /></label>
              <label>Phone<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} autoComplete="tel" /></label>
              <label>Budget <span>*</span>
                <select value={form.budget} onChange={(e) => update("budget", e.target.value)} required>
                  <option value="">Select a range...</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$2,500">$1,000–$2,500</option>
                  <option value="$2,500–$5,000">$2,500–$5,000</option>
                  <option value="$5,000–$10,000">$5,000–$10,000</option>
                  <option value="$10,000+">$10,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>
              <label>Message <small>(optional)</small><textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={3000} rows={4} placeholder="Questions, ideas, or anything you'd like us to know..." /></label>
              <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              {error && <p className="interest-error" role="alert">{error}</p>}
              <button type="submit" className="interest-submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send My Interest"}</button>
              <p className="interest-privacy">Your inquiry goes directly to Blueprint WebStudio, not {COMPANY}.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function ConceptWidget() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [collapsed, setCollapsed] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  const [showForm, setShowForm] = useState(false);
  const closeForm = useCallback(() => setShowForm(false), []);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside className={`concept-widget${collapsed ? " is-collapsed" : ""}`} aria-label="Independent website concept preview">
        <div className="concept-widget-head">
          <span>CONCEPT REVIEW · NOT FOR OFFICIAL USE</span>
          <button type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand concept preview" : "Collapse concept preview"} aria-expanded={!collapsed}>
            {collapsed ? <Plus size={20} /> : <Minus size={20} />}
          </button>
        </div>
        {!collapsed && (
          <div className="concept-widget-body">
            <h2>Private Client Preview</h2>
            <span className="concept-widget-label">PARTNER PROGRAM ELIGIBILITY</span>
            <p>Reserved for review</p>
            <div className="concept-widget-timer" aria-label="Time remaining for concept review">
              {remaining.expired ? <strong>Review window ended</strong> : (
                [[remaining.days, "Days"], [remaining.hours, "Hours"], [remaining.minutes, "Minutes"]].map(([value, unit]) => (
                  <span key={unit}><strong>{String(value).padStart(2, "0")}</strong> {unit}</span>
                ))
              )}
            </div>
            <button type="button" className="concept-widget-cta" onClick={() => setShowForm(true)}>I'm Interested <ArrowUpRight size={18} /></button>
            <div className="concept-widget-links">
              {STUDIO_PHONE && <a href={`tel:${STUDIO_PHONE}`}>Call</a>}
              <a href={`mailto:${STUDIO_EMAIL}`}>Email</a>
              <a href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        )}
        <div className="concept-widget-footer">
          <a className="concept-widget-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Visit Blueprint WebStudio"><span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" /><span>Blueprint WebStudio</span></a>
          <span>Independent concept</span>
        </div>
      </aside>
      {showForm && <ConceptInterestModal onClose={closeForm} />}
    </>
  );
}

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------

function Brand({ onClick }) {
  return (
    <a className="brand brand-logo" href="#home" onClick={onClick} aria-label={`${COMPANY} home`}>
      <img src={SITE.BRAND.logo} alt={SITE.BRAND.logoAlt} width="402" height="102" />
    </a>
  );
}

function navItems() {
  return [
    ["#services", "Services"],
    ["#prices", "Prices"],
    ["#about", SITE.ABOUT.nav],
    ["#reviews", "Reviews"],
    ["#visit", SITE.VISIT.nav],
  ];
}

function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky-header">
      <div className="announce">
        <div className="container announce-inner">
          <span>{SITE.ANNOUNCE}</span>
          <div className="announce-contact">
            <div className="announce-social">
              {SITE.SOCIAL_LINKS.filter(({ url, top }) => url && top).map(({ name, url, icon: Icon }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${COMPANY} on ${name}`} title={name}><Icon size={14} /></a>
              ))}
            </div>
            <a href={`tel:${PHONE}`}><Phone size={13} /> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Brand onClick={closeMenu} />
          <nav className={menu ? "links open" : "links"} aria-label="Main navigation">
            {navItems().map(([href, label]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="links-cta" href="#book" onClick={closeMenu}>{SITE.BOOK.nav}</a>
          </nav>
          <a className="nav-cta" href="#book">{SITE.BOOK.nav} <ArrowUpRight size={17} /></a>
          <button className="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu((current) => !current)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE SECTIONS
// -----------------------------------------------------------------------------

function Stripe({ className = "" }) {
  return <span className={`race-stripe ${className}`} aria-hidden="true"><i /><i /><i /></span>;
}

function Hero({ rating }) {
  const { HERO } = SITE;
  return (
    <section className="hero">
      <img className="hero-bg" src={HERO.photo.src} alt={HERO.photo.alt} width="2200" height="902" fetchPriority="high" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-stripes" aria-hidden="true"><i /><i /><i /></div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow light">{HERO.eyebrow}</span>
          <h1><span>{HERO.title[0]}</span> <em>{HERO.title[1]}</em></h1>
          <p>{HERO.text}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#book">{HERO.cta} <ArrowUpRight size={19} /></a>
            <a className="btn ghost" href={`tel:${PHONE}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
          </div>
        </div>
        <aside className="pit-card" aria-label="Before you come in">
          <span className="pit-card-head"><Flag size={14} /> Pit info</span>
          <ul>
            {HERO.pit.map(({ icon: Icon, title, text }) => (
              <li key={title}><Icon size={18} /><span><b>{title}</b>{text}</span></li>
            ))}
          </ul>
          {rating && (
            <a className="pit-rating" href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
              <strong>{rating.rating.toFixed(1)}</strong>
              <span><span className="stars" aria-hidden="true">★★★★★</span>{rating.userRatingCount.toLocaleString()} Google reviews</span>
            </a>
          )}
        </aside>
      </div>
      <div className="timing">
        <div className="container timing-inner">
          {SITE.STATS(rating).map(([value, label], i) => (
            <div key={label}><small>P{i + 1}</small><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marques() {
  return (
    <section className="marques" aria-label="Makes we specialize in">
      <div className="container marques-inner">
        <ul>
          {SITE.MARQUES.map((name) => <li key={name}>{name}</li>)}
        </ul>
        <p>{SITE.MARQUES_NOTE}</p>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, text, light }) {
  return (
    <div className="section-head">
      <div>
        <span className={`eyebrow${light ? " light" : ""}`}>{eyebrow}</span>
        <h2><Title parts={title} /></h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}

function Services() {
  const { SERVICES } = SITE;
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHead {...SERVICES} />
        <div className="services-grid">
          {SERVICES.items.map(({ title, desc, photo, alt }, index) => (
            <article className="service-card" key={title}>
              <div className="service-photo">
                <img src={photo} alt={alt} loading="lazy" width="800" height="450" />
                <span className="service-pos">P{index + 1}</span>
              </div>
              <div className="service-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                <a href="#book" data-service={title}>{SERVICES.cta} <ArrowRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { PROCESS } = SITE;
  return (
    <section className="section process">
      <div className="container">
        <SectionHead {...PROCESS} light />
        <ol className="lap">
          {PROCESS.steps.map(([title, description], index) => (
            <li key={title}>
              <span className="lap-turn">T{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Prices() {
  const { PRICES } = SITE;
  return (
    <section className="section prices" id="prices">
      <div className="container">
        <SectionHead {...PRICES} />
        <div className="price-board">
          {PRICES.groups.map(({ name, rows }) => (
            <div className="price-group" key={name}>
              <h3>{name}</h3>
              <dl>
                {rows.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="price-foot">
          <p className="price-tip"><Snowflake size={18} /> {PRICES.tip}</p>
          <p className="price-note">{PRICES.note}</p>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ABOUT } = SITE;
  return (
    <section className="section about" id="about">
      <div className="container about-inner">
        <figure className="about-portrait">
          <img src={ABOUT.portrait.src} alt={ABOUT.portrait.alt} width="1000" height="1250" />
          <figcaption>{ABOUT.portrait.caption}</figcaption>
          <Stripe className="about-stripe" />
        </figure>
        <div>
          <span className="eyebrow">{ABOUT.eyebrow}</span>
          <h2><Title parts={ABOUT.title} /></h2>
          {ABOUT.text.map((paragraph) => <p className="about-lead" key={paragraph.slice(0, 24)}>{paragraph}</p>)}
          <div className="crew-stats">
            {ABOUT.credentials.map(([big, small]) => <div key={big}><strong>{big}</strong><span>{small}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { GALLERY } = SITE;
  return (
    <section className="gallery" aria-label={GALLERY.eyebrow}>
      <div className="gallery-grid">
        {GALLERY.items.map(({ src, alt }) => <figure key={src}><img src={src} alt={alt} /></figure>)}
        <div className="gallery-label"><span className="eyebrow light">{GALLERY.eyebrow}</span><strong><Title parts={GALLERY.title} /></strong></div>
      </div>
    </section>
  );
}

function Reviews({ data, rating }) {
  const reviews = data?.reviews?.filter((review) => review.text?.text || review.originalText?.text) || [];
  const { REVIEWS } = SITE;
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <SectionHead {...REVIEWS} />
        <div className="rep-grid">
          <a className="rep-google" href={rating?.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            <span className="google-wordmark">Google</span>
            {rating ? (
              <>
                <strong>{rating.rating.toFixed(1)}</strong>
                <span className="stars" aria-hidden="true">★★★★★</span>
                <span>{rating.userRatingCount.toLocaleString()} Google reviews</span>
              </>
            ) : <span>See what customers say on Google.</span>}
            <b>Read reviews on Google <ArrowUpRight size={16} /></b>
          </a>
          <div className="rep-badges">
            {REVIEWS.badges.map(({ img, name, url, w, h }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" title={name}>
                <img src={img} alt={name} width={w} height={h} />
              </a>
            ))}
            <div className="rep-partner">
              <img src={REVIEWS.partner.img} alt={REVIEWS.partner.name} />
              <span>{REVIEWS.partner.text}</span>
            </div>
          </div>
        </div>
        {reviews.length > 0 && (
          <>
            <div className="reviews-grid">
              {reviews.slice(0, 3).map((review, i) => (
                <article className="review-card" key={`${review.publishTime || i}-${i}`}>
                  <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating || 0))))}</div>
                  <p>{review.text?.text || review.originalText?.text}</p>
                  <footer>
                    <strong>{review.authorAttribution?.displayName || "Google reviewer"}</strong>
                    <small>{review.relativePublishTimeDescription}</small>
                  </footer>
                </article>
              ))}
            </div>
            <p className="reviews-attribution">Reviews provided by Google. A limited selection is displayed.</p>
          </>
        )}
      </div>
    </section>
  );
}

function RequestForm() {
  const { BOOK } = SITE;
  const blank = Object.fromEntries([...BOOK.fields.flat().map((field) => [field.name, ""]), ["website", ""]]);
  const [form, setForm] = useState(blank);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pick = (event) => {
      const link = event.target.closest?.("a[data-service]");
      if (link) setForm((prev) => ({ ...prev, service: link.dataset.service }));
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Something went wrong.");
      setStatus(result.demo ? "demo" : "sent");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="book-form book-done">
        <CheckCircle2 size={44} />
        <h3>{status === "demo" ? `This is where ${SITE.BRAND.name} gets your request.` : "Request received."}</h3>
        <p>
          {status === "demo"
            ? `In this concept preview, requests aren't sent anywhere. On the live site they'd land in the ${SITE.NOUN} inbox with everything ${SITE.BRAND.name} needs to call back.`
            : `Thanks, ${form.name.split(" ")[0]}. We'll be in touch to confirm.`}
        </p>
        <button type="button" className="btn dark" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  const renderField = (field) => {
    const common = { value: form[field.name], onChange: (e) => update(field.name, e.target.value), required: field.required };
    let control;
    if (field.type === "select") {
      control = (
        <select {...common}>
          <option value="">{field.placeholder || "Choose…"}</option>
          {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    } else if (field.type === "textarea") {
      control = <textarea rows={4} maxLength={3000} placeholder={field.placeholder} {...common} />;
    } else {
      control = <input type={field.type || "text"} maxLength={field.type === "email" ? 254 : 160} placeholder={field.placeholder} autoComplete={field.autoComplete} {...common} />;
    }
    return <label key={field.name}>{field.label}{field.required ? " *" : ""}{control}</label>;
  };

  return (
    <form className="book-form" onSubmit={submit}>
      {BOOK.fields.map((row, index) => (Array.isArray(row) ? <div className="book-row" key={index}>{row.map(renderField)}</div> : renderField(row)))}
      <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" className="btn primary full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : BOOK.submit} <ArrowUpRight size={18} /></button>
      <p className="form-note">{BOOK.note} <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>.</p>
    </form>
  );
}

function Book() {
  const { BOOK } = SITE;
  return (
    <section className="section book" id="book">
      <div className="container book-inner">
        <div>
          <span className="eyebrow light">{BOOK.eyebrow}</span>
          <h2><Title parts={BOOK.title} /></h2>
          <p>{BOOK.text}</p>
          <ul className="book-points">
            {BOOK.points.map((point) => <li key={point}><CheckCircle2 size={18} /> {point}</li>)}
          </ul>
          <a className="book-call" href={`tel:${PHONE}`}><Phone size={20} /><span><small>Prefer to call?</small>{PHONE_DISPLAY}</span></a>
        </div>
        <RequestForm />
      </div>
    </section>
  );
}

function Visit() {
  const { VISIT, HOURS } = SITE;
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
  return (
    <section className="section visit" id="visit">
      <div className="container visit-inner">
        <div className="visit-info">
          <span className="eyebrow">{VISIT.eyebrow}</span>
          <h2><Title parts={VISIT.title} /></h2>
          <div className="visit-blocks">
            <div>
              <MapPin size={20} />
              <span><small>ADDRESS</small>{ADDRESS}<br />{CITY}</span>
            </div>
            <div>
              <Phone size={20} />
              <span><small>CALL, TEXT OR EMAIL</small><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a> · <a href={`sms:+1${PHONE}`}>Text us</a><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            </div>
            <div>
              <Clock size={20} />
              <span><small>HOURS · BY APPOINTMENT</small>
                {HOURS.map(([day, hours]) => <span className="hours-row" key={day}><b>{day}</b>{hours}</span>)}
              </span>
            </div>
            <div>
              <Truck size={20} />
              <span><small>NEED A TOW?</small>{VISIT.tow.name} · <a href={`tel:${VISIT.tow.phone}`}>{VISIT.tow.display}</a></span>
            </div>
          </div>
          <a className="btn dark" href={directions} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={17} /></a>
          <p className="areas">{VISIT.areas}</p>
        </div>
        <div className="visit-map">
          <iframe title={`Map to ${COMPANY}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Stripe className="footer-stripe" />
      <div className="container footer-main">
        <div>
          <Brand />
          <p>{SITE.FOOTER_BLURB}</p>
          <div className="footer-social">
            {SITE.SOCIAL_LINKS.filter(({ url }) => url).map(({ name, url, icon: Icon }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div>
          <b>Services</b>
          {SITE.SERVICES.items.slice(0, 6).map(({ title }) => <a key={title} href="#services">{title}</a>)}
        </div>
        <div>
          <b>Shop</b>
          {navItems().slice(1).map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <a href="#book">{SITE.BOOK.nav}</a>
        </div>
        <div>
          <b>Contact</b>
          <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>{ADDRESS}</span>
          <span>{CITY}</span>
          <span>{SITE.HOURS_SHORT}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {COMPANY}. Independent design concept, not an official company website.</span>
        <a className="footer-studio-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Website concept by Blueprint WebStudio">
          <span>Concept redesign by</span>
          <span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" />
          <strong>Blueprint WebStudio</strong>
        </a>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// APP — PAGE ORDER
// -----------------------------------------------------------------------------

export default function App() {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => { if (data) setReviewData(data); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const live = typeof reviewData?.rating === "number" && typeof reviewData?.userRatingCount === "number";
  const rating = live
    ? { rating: reviewData.rating, userRatingCount: reviewData.userRatingCount, googleMapsUri: reviewData.googleMapsUri || null }
    : FALLBACK_RATING
      ? { rating: FALLBACK_RATING.rating, userRatingCount: FALLBACK_RATING.userRatingCount, googleMapsUri: null }
      : null;

  return (
    <>
      <ConceptWidget />
      <SiteHeader />
      <main id="home">
        <Hero rating={rating} />
        <Marques />
        <Services />
        <Process />
        <Prices />
        <About />
        <Gallery />
        <Reviews data={reviewData} rating={rating} />
        <Book />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
