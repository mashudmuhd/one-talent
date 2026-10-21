import { ArrowUpRight, ArrowDown, Check, ShieldCheck, Zap, Award, Globe2, Sparkles, Crown, HelpCircle, MessageSquare } from 'lucide-react';
import {
  Button,
  ServiceCards,
  EmployerCTA,
  ContactOptions,
  InquiryForm,
  TrustMarquee,
  StaffingCalculator,
  DivisionsShowcase,
  DivisionExplorer,
  DubaiClock,
  TestimonialsCarousel,
  FAQAccordion,
  AnimatedStat,
  StaffingServicesSection
} from '../components/site';
import { advantages, steps, photos, img } from '../lib/content';

export default function Home() {
  return (
    <main id="main">
      {/* Ambient background light effects */}
      <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-2" aria-hidden="true" />

      {/* Sunset Hospitality Inspired Cinematic Hero */}
      <section className="hero">
        <img
          className="hero-image"
          src={img(photos.hero, 2200)}
          srcSet={`${img(photos.hero, 900)} 900w, ${img(photos.hero, 1600)} 1600w, ${img(photos.hero, 2200)} 2200w`}
          sizes="100vw"
          alt="Cinematic luxury UAE architectural hospitality venue"
          fetchPriority="high"
        />
        <div className="hero-shade" />

        <div className="container hero-content">
          <div className="hero-status-tag">
            <span className="dot" />
            <span>Hire the Right Talent. Build the Right Team. • UAE</span>
          </div>

          <h1>
            Connecting Businesses
            <br />
            With the <em>Right Talent</em>
          </h1>

          <p>
            ONE TALENT is a UAE-based recruitment and staffing company helping businesses find reliable, skilled, and professional talent.
          </p>

          <p style={{ marginTop: '-8px', fontSize: '15px', color: 'var(--text-lead)' }}>
            We connect organizations with people who match their requirements, culture, and standards — making recruitment simpler, faster, and more effective.
          </p>

          <div className="button-row">
            <Button href="/employers#inquiry">Request Staff Dispatch</Button>
            <Button href="#services" secondary>Explore Our Services</Button>
          </div>

          {/* Minimalist Editorial Stats Bar with Animated CountUp */}
          <div className="hero-stats">
            <AnimatedStat target={500} suffix="+" label="Vetted Specialists" />
            <AnimatedStat target={24} suffix="h" label="Rapid Dispatch Window" />
            <AnimatedStat target={99} suffix="%" label="Service Excellence Score" />
            <AnimatedStat target={7} suffix=" Emirates" label="UAE & GCC Coverage" />
          </div>
        </div>
      </section>

      {/* NEW — Ultra-Premium Staffing Services Cards with Direct WhatsApp Booking */}
      <StaffingServicesSection />

      {/* Infinite Sector Marquee Ribbon */}
      <TrustMarquee />

      {/* Sunset Hospitality Style: The 6 Divisions Portfolio Showcase */}
      <section className="section" id="divisions" style={{ paddingBottom: '60px' }}>
        <div className="container">
          <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '30px' }}>
            <div>
              <span className="eyebrow">
                <Crown size={14} /> PORTFOLIO OF EXCELLENCE
              </span>
              <h2>
                The 6 Divisions of
                <br />
                <em>Hospitality & Workforce</em>
              </h2>
            </div>
            <p style={{ maxWidth: '440px', color: 'var(--text-lead)', fontSize: '15px' }}>
              Structured across dedicated luxury hospitality verticals, daylife destinations, sovereign summits, and corporate headquarters.
            </p>
          </div>

          <DivisionsShowcase />
        </div>
      </section>

      {/* Interactive Division Explorer */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <DivisionExplorer />
      </section>

      {/* About Us */}
      <section className="section intro container" id="about">
        <div className="intro-image">
          <img src={img(photos.team, 1000)} alt="Professional talent team collaborating in Dubai" loading="lazy" />
          <div className="image-label">
            <span>ONE TALENT CREED</span>
            <strong>Hire the Right Talent. Build the Right Team.</strong>
            <ArrowUpRight />
          </div>
        </div>
        <div className="intro-copy">
          <span className="eyebrow">
            <span className="dot" /> ABOUT US
          </span>
          <h2>
            Great businesses are built by
            <br />
            <em>great people.</em>
          </h2>
          <p className="lead">
            At ONE TALENT, we believe great businesses are built by great people.
          </p>
          <p>
            Our approach combines industry understanding, focused candidate sourcing, and careful screening to connect employers with talent that fits their needs.
          </p>
          <p>
            We work with businesses across the UAE, providing flexible recruitment and staffing solutions tailored to their requirements. We connect organizations with people who match their requirements, culture, and standards — making recruitment simpler, faster, and more effective.
          </p>
          <div style={{ marginTop: '28px' }}>
            <a href="/about" className="text-link">
              Read Our Full Story <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* VIP Staffing Estimator / Private Reservation Suite */}
      <section className="container" id="estimator">
        <StaffingCalculator />
      </section>

      {/* Core Services Section with Filter Tabs */}
      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            <div>
              <span className="eyebrow">
                <span className="dot" /> SPECIALIZED PRACTICES
              </span>
              <h2>
                Tailored workforce architectures
                <br />
                <em>curated for distinction.</em>
              </h2>
            </div>
            <p style={{ maxWidth: '420px', color: 'var(--text-lead)', fontSize: '15px' }}>
              Choose your practice below to explore verified roles, requirements, and deployment protocols.
            </p>
          </div>

          <ServiceCards />
        </div>
      </section>

      {/* Interactive Luxury Testimonials Carousel */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
            <div>
              <span className="eyebrow">
                <MessageSquare size={14} /> VOICES OF HOSPITALITY LEADERS
              </span>
              <h2>
                Trusted by premier venues
                <br />
                <em>across the Emirates.</em>
              </h2>
            </div>
            <p style={{ maxWidth: '420px', color: 'var(--text-lead)', fontSize: '15px' }}>
              From iconic beach resorts to Michelin gastronomy groups, discover how ONE TALENT elevates on-site standards.
            </p>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* Advantages / The ONE TALENT Standard */}
      <section className="section container difference">
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div>
            <span className="eyebrow">
              <span className="dot" /> WHY ONE TALENT?
            </span>
            <h2>
              Right People. Right Fit.
              <br />
              <em>Right Time.</em>
            </h2>
          </div>
          <p style={{ maxWidth: '440px', color: 'var(--text-lead)', fontSize: '15px' }}>
            We connect organizations with people who match their requirements, culture, and standards — making recruitment simpler, faster, and more effective.
          </p>
        </div>

        <div className="advantages">
          {advantages.map(([t, d], i) => (
            <article key={t}>
              <span className="advantage-number">
                <span>0{i + 1}</span>
                <Check size={18} />
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Process Roadmap */}
      <section className="section container process">
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div>
            <span className="eyebrow">
              <span className="dot" /> 4-STEP ONBOARDING PROTOCOL
            </span>
            <h2>
              Effortless deployment.
              <br />
              <em>Zero operational friction.</em>
            </h2>
          </div>
          <p style={{ maxWidth: '400px', color: 'var(--text-lead)', fontSize: '15px' }}>
            A disciplined path from your staffing brief to on-site guest excellence.
          </p>
        </div>

        <div className="steps">
          {steps.map(([t, d], i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: 'auto' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              <HelpCircle size={14} /> CONCIERGE ADVISORY
            </span>
            <h2>Frequently Asked Questions</h2>
            <p>Essential guidance on rapid dispatch, UAE compliance, grooming protocols, and staffing coverage.</p>
          </div>

          <FAQAccordion />
        </div>
      </section>

      {/* Employer CTA Banner */}
      <EmployerCTA />

      {/* Candidate Registration Strip */}
      <div className="container">
        <section className="candidate-strip">
          <div>
            <span className="eyebrow">
              <span className="dot" /> TALENT MEMBERSHIP & CAREERS
            </span>
            <h2>Are You a Hospitality or Corporate Professional in the UAE?</h2>
            <p>
              Join our talent database to access exclusive placements across premium hotels, Michelin dining rooms, luxury beach clubs, and global expos.
            </p>
          </div>
          <Button href="/candidates#inquiry" secondary>
            Submit Talent Profile
          </Button>
        </section>
      </div>

      {/* Concierge VIP Inquiry Suite */}
      <section className="section contact-section" id="contact">
        <div className="container contact-layout">
          <div>
            <span className="eyebrow">
              <span className="dot" /> RECRUITMENT &amp; WORKFORCE SOLUTIONS · UAE
            </span>
            <h2>
              Let’s Find Your
              <br />
              <em>Next Talent.</em>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'var(--text-lead)', margin: '18px 0 24px' }}>
              Whether you need one professional or an entire team, ONE TALENT is ready to support your recruitment needs.
            </p>
            <ContactOptions />
          </div>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
