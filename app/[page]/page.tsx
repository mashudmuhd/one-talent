import { notFound } from 'next/navigation';
import { Button, Icon, EmployerCTA, InquiryForm, ContactOptions } from '../../components/site';
import { services, steps, photos, img } from '../../lib/content';

const pages: Record<
  string,
  { title: string; description: string; eyebrow: string; heading: string; accent: string }
> = {
  about: {
    title: 'About Us',
    description: 'At ONE TALENT, we believe great businesses are built by great people. Connecting organizations across the UAE with reliable, skilled, and professional talent.',
    eyebrow: 'ABOUT US',
    heading: 'Great businesses are built by',
    accent: 'great people.',
  },
  services: {
    title: 'Our Services',
    description: 'Explore recruitment & talent acquisition, hospitality staffing, temporary & contract staffing, event staffing, and workforce solutions in the UAE.',
    eyebrow: 'OUR SERVICES',
    heading: 'Right People. Right Fit.',
    accent: 'Right Time.',
  },
  employers: {
    title: 'For Employers',
    description: 'Request staff for your business in Dubai and the UAE. Tell ONE TALENT about your recruitment and workforce requirements.',
    eyebrow: 'LET’S FIND YOUR NEXT TALENT',
    heading: 'Hire the right talent.',
    accent: 'Build the right team.',
  },
  candidates: {
    title: 'For Candidates',
    description: 'Share your professional profile with ONE TALENT and express your interest in recruitment opportunities in the UAE.',
    eyebrow: 'FOR CANDIDATES',
    heading: 'Bring your ambition.',
    accent: 'Take the next step.',
  },
  contact: {
    title: 'Contact Us',
    description: 'Whether you need one professional or an entire team, ONE TALENT is ready to support your recruitment needs.',
    eyebrow: 'LET’S FIND YOUR NEXT TALENT',
    heading: 'Connecting businesses with',
    accent: 'the right talent.',
  },
  privacy: {
    title: 'Privacy Notice',
    description: 'How ONE TALENT handles information submitted through this website.',
    eyebrow: 'YOUR INFORMATION',
    heading: 'A thoughtful approach',
    accent: 'to your privacy.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const p = pages[(await params).page];
  return p ? { title: p.title, description: p.description } : {};
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const key = (await params).page;
  const p = pages[key];
  if (!p) notFound();

  return (
    <main id="main">
      <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-2" aria-hidden="true" />

      <section className="page-hero">
        <div className="container">
          <a className="breadcrumb" href="/">
            Home / {p.title}
          </a>
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>
            {p.heading}
            <br />
            <em>{p.accent}</em>
          </h1>
          <p>{p.description}</p>
        </div>
        <span className="page-decoration" aria-hidden="true">
          1
        </span>
      </section>

      {key === 'about' && (
        <>
          <section className="section container intro">
            <div className="intro-image">
              <img src={img(photos.team)} alt="Professional talent team collaborating in Dubai" loading="lazy" />
              <div className="image-label">
                <span>OUR PHILOSOPHY</span>
                <strong>Hire the Right Talent. Build the Right Team.</strong>
              </div>
            </div>
            <div>
              <span className="eyebrow">ONE TEAM. THE RIGHT TALENT.</span>
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
                We work with businesses across the UAE, providing flexible recruitment and staffing solutions tailored to their requirements.
              </p>
              <p>
                We connect organizations with people who match their requirements, culture, and standards — making recruitment simpler, faster, and more effective.
              </p>
              <div style={{ margin: '20px 0 28px', padding: '14px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-sm)' }}>
                <strong style={{ color: 'var(--gold-light)', display: 'block', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '13px' }}>
                  Hire the Right Talent. Build the Right Team.
                </strong>
              </div>
              <Button href="/services">Discover Our Services</Button>
            </div>
          </section>

          <section className="section soft">
            <div className="container">
              <span className="eyebrow">HOW WE WORK</span>
              <h2>
                Understanding first.
                <br />
                <em>Recruitment with purpose.</em>
              </h2>
              <div className="steps">
                {steps.map(([t, d], i) => (
                  <article key={t}>
                    <span>0{i + 1}</span>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <EmployerCTA />
        </>
      )}

      {key === 'services' && (
        <>
          <section className="section container service-details">
            {services.map((s, i) => (
              <article id={s.slug} className="service-detail" key={s.slug}>
                <div className="service-detail-icon">
                  <Icon name={s.icon} size={48} />
                  <span>0{i + 1}</span>
                </div>
                <div>
                  <span className="eyebrow">{s.roles}</span>
                  <h2>{s.title}</h2>
                  <p className="lead">{s.description}</p>
                  <p>{s.detail}</p>
                  <Button href={'/employers?service=' + s.slug + '#inquiry'}>Enquire About This Service</Button>
                </div>
              </article>
            ))}
          </section>
          <EmployerCTA />
        </>
      )}

      {key === 'employers' && (
        <section className="section container contact-layout">
          <div>
            <span className="eyebrow">THE RIGHT FIT FOR YOUR BUSINESS</span>
            <h2>
              One professional.
              <br />
              An entire team.
              <br />
              <em>Let’s get started.</em>
            </h2>
            <p>
              Whether you are hiring for a permanent role, preparing for an event or responding to seasonal demand, share
              your requirements with us.
            </p>
            <div className="mini-services">
              {services.map((s) => (
                <a href={'/services#' + s.slug} key={s.slug}>
                  <Icon name={s.icon} size={20} />
                  {s.title}
                </a>
              ))}
            </div>
            <p>
              Our team will use your inquiry to understand the roles, skill requirements and timing before coordinating
              the next steps.
            </p>
            <ContactOptions />
          </div>
          <InquiryForm />
        </section>
      )}

      {key === 'candidates' && (
        <section className="section container contact-layout">
          <div>
            <span className="eyebrow">YOUR NEXT OPPORTUNITY</span>
            <h2>
              Your skills.
              <br />
              Your potential.
              <br />
              <em>Your next chapter.</em>
            </h2>
            <p className="lead">
              Are you looking for opportunities to grow your career? Connect with ONE TALENT and share your professional
              profile with our team.
            </p>
            <img
              className="candidate-photo"
              src={img(photos.team, 800)}
              alt="People sharing ideas in a collaborative workplace"
              loading="lazy"
            />
            <h3>A little preparation goes a long way.</h3>
            <p>
              Tell us about your experience, preferred roles and current location. You can include a shareable CV or
              LinkedIn link in your registration.
            </p>
            <p>
              There are no vacancies published on this website at the moment. Sharing your profile expresses interest and
              does not guarantee an interview or placement.
            </p>
          </div>
          <InquiryForm candidate />
        </section>
      )}

      {key === 'contact' && (
        <section className="section container contact-layout">
          <div>
            <span className="eyebrow">
              <span className="dot" /> RECRUITMENT &amp; WORKFORCE SOLUTIONS
            </span>
            <h2>
              Let&apos;s Find Your
              <br />
              <em>Next Talent.</em>
            </h2>
            <p className="lead">
              Whether you need one professional or an entire team, ONE TALENT is ready to support your recruitment needs.
            </p>
            <p>
              We connect organizations with people who match their requirements, culture, and standards — making recruitment simpler, faster, and more effective.
            </p>
            <ContactOptions />
            <div style={{ marginTop: '24px' }}>
              <a className="text-link" href="/candidates#inquiry">
                Looking for work? Share your profile →
              </a>
            </div>
          </div>
          <InquiryForm />
        </section>
      )}

      {key === 'privacy' && (
        <section className="section container prose">
          <h2>Website inquiry privacy notice</h2>
          <p>Last updated: 11 October 2026.</p>
          <h3>Information you choose to share</h3>
          <p>
            Employer inquiries collect your name, company, email, phone number, service requirements and message. Candidate
            registrations collect your name, location, contact details, area of interest, experience and any CV or
            professional profile link you provide.
          </p>
          <h3>How it is used</h3>
          <p>
            Submissions are stored to handle your inquiry and coordinate recruitment or staffing discussions. Please share
            only information relevant to your inquiry and avoid including identity documents, financial information or
            other sensitive details.
          </p>
          <h3>Storage and service providers</h3>
          <p>
            The website uses hosted infrastructure and a database to process and store submissions. Authorized site
            operators can access submitted information. Images are served by Unsplash; your browser connects to that
            provider to display them. This website does not use advertising trackers.
          </p>
          <h3>Your choices</h3>
          <p>
            You can ask about, correct or request deletion of information you submitted by using the contact form. Include
            your submission reference and use the same contact email so your request can be verified.
          </p>
          <h3>Before public launch</h3>
          <p>
            Company privacy contact details and a retention schedule will be added before this website opens for public
            inquiries.
          </p>
        </section>
      )}
    </main>
  );
}
