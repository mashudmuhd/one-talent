'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Users,
  ConciergeBell,
  Clock3,
  Sparkles,
  Layers3,
  Check,
  MapPin,
  ShieldCheck,
  Award,
  SlidersHorizontal,
  Copy,
  CheckCheck,
  Flame,
  Calendar,
  Building2,
  Phone,
  Mail,
  Utensils,
  Palmtree,
  Crown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageCircle
} from 'lucide-react';
import { company, services, photos, img } from '../lib/content';

export function Brand({ variant = 'inline' }: { variant?: 'inline' | 'stacked' }) {
  if (variant === 'stacked') {
    return (
      <a className="brand brand-stacked" href="/" aria-label="ONE TALENT home">
        <img
          src="/logo-white.png"
          alt="ONE TALENT — One Team. The Right Talent."
          width={210}
          height={110}
          className="brand-stacked-img"
        />
      </a>
    );
  }

  return (
    <a className="brand" href="/" aria-label="ONE TALENT home">
      <span className="brand-mark">
        <img
          src="/logo-mark-white.png"
          alt="ONE TALENT emblem"
          width={44}
          height={44}
          className="brand-emblem-img"
        />
      </span>
      <span className="brand-text">
        <span className="brand-title">ONE TALENT</span>
        <span className="brand-tagline">ONE TEAM. THE RIGHT TALENT.</span>
      </span>
    </a>
  );
}

export function DubaiClock() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Dubai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setTimeStr(formatter.format(now));
      } catch {
        setTimeStr('GST Active');
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dubai-pill" title="Live UAE Standard Time (GST • UTC+4)">
      <span className="pulse-indicator" />
      <span>UAE HQ • {timeStr || 'Loading...'}</span>
    </div>
  );
}

export function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setDotPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          'a, button, input, select, textarea, .division-card, .service-card, .pill-option, .filter-tab, .faq-question'
        )
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      currentX = lerp(currentX, targetX, 0.2);
      currentY = lerp(currentY, targetY, 0.2);
      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div
        className={`cursor-follower ${hovered ? 'hovered' : ''}`}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)` }}
      />
      <div
        className="cursor-dot"
        style={{ transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)` }}
      />
    </>
  );
}

export function QuickConciergeDock() {
  return (
    <aside className="floating-dock" aria-label="Quick Concierge Dispatch">
      <DubaiClock />
      <span style={{ width: '1px', height: '18px', background: 'var(--border-gold)', margin: '0 2px' }} />
      <a href="/employers#inquiry" className="dock-action">
        <Sparkles size={14} style={{ color: 'var(--gold-primary)' }} />
        <span>Dispatch Brief</span>
      </a>
    </aside>
  );
}

export function AnimatedStat({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="hero-stat-card">
      <div className="hero-stat-number">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
}

const nav = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/services', 'Services'],
  ['/employers', 'Employers'],
  ['/candidates', 'Candidates'],
  ['/contact', 'Contact Us'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="header">
      <div className="header-inner">
        <Brand />
        <div style={{ display: 'none' }} className="desktop-clock">
          <DubaiClock />
        </div>
        <nav className={open ? 'navigation open' : 'navigation'} aria-label="Main navigation">
          {nav.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={path === href ? 'active' : ''}
              aria-current={path === href ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="button nav-cta" href="/employers#inquiry">
          Request Staff <ArrowUpRight size={17} />
        </a>
        <button
          className="menu-button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a href={href} className={'button ' + (secondary ? 'secondary' : '')}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}

export function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const I =
    ({
      users: Users,
      bell: ConciergeBell,
      clock: Clock3,
      sparkles: Sparkles,
      layers: Layers3,
    } as Record<string, typeof Users>)[name] || Users;
  return <I size={size} strokeWidth={1.5} />;
}

export function TrustMarquee() {
  const items = [
    '★ Ultra-Luxury Hotels & Resorts',
    '★ Michelin & Fine Dining Concepts',
    '★ Daylife Beach Clubs & Lounges',
    '★ Global Summits & DWTC Pavilions',
    '★ Private VIP & Royal Protocol',
    '★ DIFC Corporate HQs & Family Offices',
    '★ <24h Rapid Deployment Workforce',
    '★ 100% MOHRE Compliant & Vetted',
  ];

  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((text, i) => (
          <div className="marquee-item" key={i}>
            <Sparkles size={13} />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Sunset Hospitality Style - The 6 Divisions of Excellence */
export const hospitalityDivisions = [
  {
    id: 'resorts',
    index: '01 / 06',
    pill: 'Hotels & Resorts',
    title: 'Luxury Resorts & Palaces',
    description:
      'Bespoke front-of-house, butler services, guest relations, and room management for five-star UAE hospitality properties.',
    roles: 'Guest Relations · Concierge · Butlers · Front Desk',
    photo: photos.hotel,
  },
  {
    id: 'dining',
    index: '02 / 06',
    pill: 'Culinary & Dining',
    title: 'Fine Dining & Michelin Venues',
    description:
      'Impeccable dining room staff, sommeliers, maître d’s, and culinary support trained to international luxury gastronomy standards.',
    roles: 'Maître d’ · Sommeliers · Captains · Culinary Brigade',
    photo: photos.dining,
  },
  {
    id: 'daylife',
    index: '03 / 06',
    pill: 'Daylife & Beach Clubs',
    title: 'Beach Clubs & Pool Lounges',
    description:
      'Dynamic, polished personnel delivering curated outdoor lifestyle and seaside hospitality experiences across Dubai.',
    roles: 'Beach Concierge · VIP Hostesses · Pool Service · Baristas',
    photo: photos.resort,
  },
  {
    id: 'events',
    index: '04 / 06',
    pill: 'Conferences & Summits',
    title: 'Global Summits & Royal Protocol',
    description:
      'Discreet, multilingual personnel for high-stakes governmental summits, exhibitions at DWTC, and private galas.',
    roles: 'Protocol Staff · VIP Escorts · Pavilion Hosts · Coordination',
    photo: photos.gala,
  },
  {
    id: 'corporate',
    index: '05 / 06',
    pill: 'Executive Search',
    title: 'Corporate HQs & Financial Hubs',
    description:
      'High-caliber professionals placed across DIFC, ADGM, multinational headquarters, and prestigious family offices.',
    roles: 'Executive Assistants · Operations · Legal & Finance Support',
    photo: photos.business,
  },
  {
    id: 'workforce',
    index: '06 / 06',
    pill: 'Scalable Solutions',
    title: 'Flexible & Seasonal Workforces',
    description:
      'Rapid-deployment talent teams to absorb seasonal tourist surges, major festival rosters, and high-volume operations.',
    roles: 'Rapid Surge Squads · Event Crews · Operational Roster',
    photo: photos.team,
  },
];

export function DivisionsShowcase() {
  return (
    <div className="divisions-wrapper">
      <div className="divisions-grid">
        {hospitalityDivisions.map((div) => (
          <article className="division-card" key={div.id}>
            <img src={img(div.photo, 900)} alt={div.title} loading="lazy" />
            <div className="division-top-meta">
              <span className="division-pill">{div.pill}</span>
              <span className="division-index">{div.index}</span>
            </div>
            <div className="division-content">
              <h3>{div.title}</h3>
              <p>{div.description}</p>
              <div className="division-disciplines">
                <span>{div.roles}</span>
                <ArrowUpRight size={17} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* Sunset Hospitality Style Interactive Division Explorer */
export function DivisionExplorer() {
  const [activeTab, setActiveTab] = useState(0);
  const activeDiv = hospitalityDivisions[activeTab];

  return (
    <div className="estimator-wrapper" style={{ marginTop: '50px' }}>
      <div className="estimator-header">
        <div>
          <span className="eyebrow">
            <Crown size={14} /> CURATED HOSPITALITY PORTFOLIO
          </span>
          <h3>Explore Practices & Service Divisions</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DubaiClock />
        </div>
      </div>

      <div className="filter-tabs" style={{ marginBottom: '28px' }}>
        {hospitalityDivisions.map((div, index) => (
          <button
            type="button"
            key={div.id}
            className={`filter-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {div.pill}
          </button>
        ))}
      </div>

      <div className="estimator-grid" style={{ alignItems: 'stretch' }}>
        <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', minHeight: '340px' }}>
          <img
            src={img(activeDiv.photo, 1000)}
            alt={activeDiv.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, rgba(8, 9, 11, 0.95) 0%, rgba(8, 9, 11, 0.3) 60%, transparent 100%)',
            }}
          />
          <div style={{ position: 'absolute', bottom: '26px', left: '26px', right: '26px' }}>
            <span className="eyebrow" style={{ color: 'var(--gold-light)' }}>
              {activeDiv.index}
            </span>
            <h3 style={{ fontSize: '32px', color: '#ffffff', margin: '4px 0 10px' }}>{activeDiv.title}</h3>
            <p style={{ color: 'var(--text-lead)', fontSize: '14px', margin: 0 }}>{activeDiv.description}</p>
          </div>
        </div>

        <div className="estimator-result-card" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="result-metric">
              <span>Primary Placement Roles</span>
              <strong style={{ color: 'var(--gold-light)', fontSize: '15px' }}>{activeDiv.roles}</strong>
            </div>
            <div className="result-metric">
              <span>Service Standard</span>
              <strong>Five-Star & Luxury Hospitality Protocol</strong>
            </div>
            <div className="result-metric">
              <span>Deployment Timeline</span>
              <strong className="highlight">Immediate to &lt;24h Dispatch</strong>
            </div>
            <div className="result-metric">
              <span>Jurisdiction</span>
              <strong>Dubai, Abu Dhabi, UAE & GCC</strong>
            </div>
          </div>

          <a
            className="button"
            style={{ marginTop: '20px', width: '100%' }}
            href={`/employers?service=hospitality#inquiry`}
          >
            Inquire for {activeDiv.pill} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

/* VIP Staffing Estimator / Private Reservation Suite */
export function StaffingCalculator() {
  const [industry, setIndustry] = useState('hospitality');
  const [count, setCount] = useState(8);
  const [urgency, setUrgency] = useState('rapid');

  const industryMap: Record<string, { title: string; speed: string; compliance: string }> = {
    hospitality: {
      title: 'Luxury Resorts & Hospitality',
      speed: urgency === 'rapid' ? 'Under 24 Hours' : '2 - 3 Days',
      compliance: 'Five-Star Grooming & Service Certified',
    },
    dining: {
      title: 'Fine Dining & Michelin Staff',
      speed: urgency === 'rapid' ? 'Under 24 Hours' : '2 - 4 Days',
      compliance: 'Sommelier & Wine Protocol Briefed',
    },
    events: {
      title: 'Global Summits & Royal Galas',
      speed: urgency === 'rapid' ? 'Immediate (<18 Hours)' : '3 - 5 Days',
      compliance: 'VIP Protocol & Multilingual Certified',
    },
    corporate: {
      title: 'Executive Corporate Search',
      speed: urgency === 'rapid' ? '48 Hours' : '5 - 7 Days',
      compliance: 'Comprehensive Background & Reference Vetted',
    },
    temporary: {
      title: 'Flexible High-Volume Surge',
      speed: urgency === 'rapid' ? 'Same Day Deployment' : '1 - 2 Days',
      compliance: '100% UAE Ministry of Human Resources Compliant',
    },
  };

  const current = industryMap[industry] || industryMap.hospitality;

  function applyToForm() {
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const select = el.querySelector('select[name="service"]') as HTMLSelectElement | null;
      if (select) {
        select.value = industry === 'dining' ? 'hospitality' : industry;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const countInput = el.querySelector('input[name="count"]') as HTMLInputElement | null;
      if (countInput) {
        countInput.value = count.toString();
      }
      const msgInput = el.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null;
      if (msgInput && !msgInput.value) {
        msgInput.value = `VIP Staffing Request from interactive calculator: ${count} professionals for ${current.title} (${
          urgency === 'rapid' ? 'Urgent Dispatch' : 'Scheduled Plan'
        }).`;
      }
    }
  }

  return (
    <div className="estimator-wrapper">
      <div className="estimator-header">
        <div>
          <span className="eyebrow">
            <SlidersHorizontal size={14} /> VIP WORKFORCE ARCHITECTURE
          </span>
          <h3>Staffing & Deployment Estimator</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DubaiClock />
        </div>
      </div>

      <div className="estimator-grid">
        <div className="estimator-controls">
          <div className="control-group">
            <label>
              Hospitality & Corporate Practice <span>{industry.toUpperCase()}</span>
            </label>
            <div className="pill-selector">
              <button
                type="button"
                className={`pill-option ${industry === 'hospitality' ? 'active' : ''}`}
                onClick={() => setIndustry('hospitality')}
              >
                Hotels & Resorts
              </button>
              <button
                type="button"
                className={`pill-option ${industry === 'dining' ? 'active' : ''}`}
                onClick={() => setIndustry('dining')}
              >
                Fine Dining
              </button>
              <button
                type="button"
                className={`pill-option ${industry === 'events' ? 'active' : ''}`}
                onClick={() => setIndustry('events')}
              >
                Events & Galas
              </button>
              <button
                type="button"
                className={`pill-option ${industry === 'corporate' ? 'active' : ''}`}
                onClick={() => setIndustry('corporate')}
              >
                Corporate HQs
              </button>
              <button
                type="button"
                className={`pill-option ${industry === 'temporary' ? 'active' : ''}`}
                onClick={() => setIndustry('temporary')}
              >
                Surge Workforce
              </button>
            </div>
          </div>

          <div className="control-group">
            <label>
              Required Personnel: <span>{count} {count === 1 ? 'Specialist' : 'Professionals'}</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="range-slider"
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#a39c92',
                marginTop: '6px',
              }}
            >
              <span>1 Specialist</span>
              <span>10 Hospitality Unit</span>
              <span>25+ Gala Squadron</span>
              <span>50 Scale Roster</span>
            </div>
          </div>

          <div className="control-group">
            <label>
              Deployment Speed <span>{urgency.toUpperCase()}</span>
            </label>
            <div className="pill-selector">
              <button
                type="button"
                className={`pill-option ${urgency === 'rapid' ? 'active' : ''}`}
                onClick={() => setUrgency('rapid')}
              >
                ⚡ Urgent (Under 24h)
              </button>
              <button
                type="button"
                className={`pill-option ${urgency === 'standard' ? 'active' : ''}`}
                onClick={() => setUrgency('standard')}
              >
                Standard (2 - 4 Days)
              </button>
              <button
                type="button"
                className={`pill-option ${urgency === 'roster' ? 'active' : ''}`}
                onClick={() => setUrgency('roster')}
              >
                Seasonal Roster
              </button>
            </div>
          </div>
        </div>

        <div className="estimator-result-card">
          <div className="result-metric">
            <span>Projected Dispatch Window</span>
            <strong className="highlight">{current.speed}</strong>
          </div>
          <div className="result-metric">
            <span>Team Allocation Tier</span>
            <strong>
              {count >= 25 ? 'Complete Luxury Squad' : count >= 8 ? 'Core Service Pod' : 'Bespoke Specialist'}
            </strong>
          </div>
          <div className="result-metric">
            <span>Compliance & Standards</span>
            <strong>{current.compliance}</strong>
          </div>
          <div className="result-metric">
            <span>Service Territory</span>
            <strong>Dubai, Abu Dhabi & All Emirates</strong>
          </div>

          <button
            type="button"
            className="button"
            style={{ marginTop: '10px', width: '100%' }}
            onClick={applyToForm}
          >
            Reserve Staffing Allocation <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServiceCards() {
  const [filter, setFilter] = useState('all');

  const filteredServices = services.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'hospitality' && s.slug === 'hospitality') return true;
    if (filter === 'events' && s.slug === 'events') return true;
    if (filter === 'recruitment' && s.slug === 'recruitment') return true;
    if (filter === 'workforce' && (s.slug === 'workforce' || s.slug === 'temporary')) return true;
    return false;
  });

  return (
    <div>
      <div className="filter-tabs">
        <button
          type="button"
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Practices ({services.length})
        </button>
        <button
          type="button"
          className={`filter-tab ${filter === 'hospitality' ? 'active' : ''}`}
          onClick={() => setFilter('hospitality')}
        >
          Hospitality Staffing
        </button>
        <button
          type="button"
          className={`filter-tab ${filter === 'events' ? 'active' : ''}`}
          onClick={() => setFilter('events')}
        >
          Events & Exhibitions
        </button>
        <button
          type="button"
          className={`filter-tab ${filter === 'recruitment' ? 'active' : ''}`}
          onClick={() => setFilter('recruitment')}
        >
          Permanent Recruitment
        </button>
        <button
          type="button"
          className={`filter-tab ${filter === 'workforce' ? 'active' : ''}`}
          onClick={() => setFilter('workforce')}
        >
          Flexible Workforce
        </button>
      </div>

      <div className="service-grid">
        {filteredServices.map((s, i) => (
          <a className="service-card" key={s.slug} href={'/services#' + s.slug}>
            <div className="card-top">
              <div className="card-icon-box">
                <Icon name={s.icon} size={26} />
              </div>
              <span>0{i + 1}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <span className="card-link">
              Explore{' '}
              {s.slug === 'recruitment'
                ? 'Recruitment'
                : s.slug === 'hospitality'
                ? 'Hospitality'
                : s.slug === 'temporary'
                ? 'Temporary Staff'
                : s.slug === 'events'
                ? 'Event Staff'
                : 'Workforce'}
              <ArrowUpRight size={18} />
            </span>
          </a>
        ))}
        {filter === 'all' && (
          <div className="service-card service-note">
            <span className="eyebrow">A BESPOKE PARTNERSHIP</span>
            <h3>
              Your venue.
              <br />
              Your guest standards.
              <br />
              <em>Flawless grace.</em>
            </h3>
            <p>Tell us your vision. We curate teams that personify luxury hospitality.</p>
            <a className="text-link" href="/employers#inquiry">
              Consult with our Directors <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function TestimonialsCarousel() {
  const testimonials = [
    {
      quote:
        'ONE TALENT understands luxury hospitality at a level rarely seen in the region. Their front-of-house and banquet specialists arrived impeccably groomed, briefed, and ready to execute seamlessly.',
      author: 'Jean-Marc Laurent',
      title: 'Managing Director · Ultra-Luxury Resort & Beach Club, Palm Jumeirah',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote:
        'For our flagship DIFC fine dining venue, guest expectations are uncompromising. ONE TALENT delivered sommeliers and service captains who blended effortlessly with our Michelin standards.',
      author: 'Elena Rostova',
      title: 'Operations Director · Signature Gastronomy Group, DIFC Dubai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote:
        'Staffing an international summit at DWTC with over 40 multilingual protocol hosts within 48 hours seemed impossible until ONE TALENT stepped in. Flawless execution from start to finish.',
      author: 'Hamdan Al Falasi',
      title: 'Head of Protocol & Sovereign Events · UAE Global Summit Pavilion',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="testimonial-card">
      <div style={{ display: 'flex', gap: '5px', marginBottom: '18px', color: 'var(--gold-primary)' }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="var(--gold-primary)" />
        ))}
      </div>
      <p className="testimonial-quote">“{testimonials[current].quote}”</p>
      <div className="testimonial-meta">
        <div className="testimonial-author" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src={testimonials[current].avatar}
            alt={testimonials[current].author}
            style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid var(--gold-primary)', objectFit: 'cover' }}
          />
          <div>
            <h4>{testimonials[current].author}</h4>
            <p>{testimonials[current].title}</p>
          </div>
        </div>
        <div className="testimonial-controls">
          <button
            type="button"
            className="carousel-btn"
            aria-label="Previous testimonial"
            onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="carousel-btn"
            aria-label="Next testimonial"
            onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="carousel-dots">
        {testimonials.map((_, idx) => (
          <button
            type="button"
            key={idx}
            className={`carousel-dot ${current === idx ? 'active' : ''}`}
            aria-label={`Go to testimonial ${idx + 1}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How rapidly can ONE TALENT dispatch vetted hospitality specialists?',
      a: 'For urgent banquet rosters or operational cover, our Rapid Dispatch unit can mobilize verified personnel within under 24 hours across Dubai and Abu Dhabi. Planned seasonal rosters are coordinated 1 to 2 weeks ahead.',
    },
    {
      q: 'What background vetting and MOHRE compliance checks are conducted?',
      a: 'Every candidate undergoes complete identity verification, legal UAE labor residency checks, background screening, and health card compliance. Staff are 100% compliant with UAE Ministry of Human Resources regulations.',
    },
    {
      q: 'Do you supply staff groomed to five-star luxury standards?',
      a: 'Yes. Our hospitality personnel undergo mandatory grooming and protocol briefings adhering to international five-star hospitality standards, including personal presentation, posture, and multilingual guest etiquette.',
    },
    {
      q: 'Can our venue interview or trial candidates prior to seasonal deployment?',
      a: 'Yes. For specialist placements, supervisory leads, and seasonal rosters, we provide full candidate dossiers and coordinate confidential trial shifts or video evaluations before final engagement.',
    },
    {
      q: 'Which Emirates and Gulf regions does ONE TALENT support?',
      a: 'We actively provide workforce and talent solutions across Dubai, Abu Dhabi, Sharjah, Ras Al Khaimah, and select cross-border luxury events across the GCC.',
    },
  ];

  return (
    <div className="faq-grid">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              <span>{faq.q}</span>
              <ChevronDown className="faq-icon" size={20} />
            </button>
            <div className="faq-answer">
              <p style={{ margin: 0 }}>{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ContactOptions() {
  const waNumber = company.whatsapp.replace(/[^0-9]/g, '').replace(/^00/, '');

  return (
    <div className="contact-options">
      <div className="contact-hub-card" style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ marginBottom: '18px' }}>
          <span className="eyebrow" style={{ marginBottom: '6px' }}>
            <span className="dot" /> HEADQUARTERS
          </span>
          <h3 style={{ fontSize: '20px', color: 'var(--text-head)', fontFamily: 'Cormorant Garamond, serif', margin: '4px 0' }}>
            ONE TALENT
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--gold-light)', margin: '0 0 12px' }}>
            Recruitment &amp; Workforce Solutions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-body)' }}>
            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: 0 }}>
              <MapPin size={16} style={{ color: 'var(--gold-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>{company.location}</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
              <Phone size={16} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
              <a href={'tel:' + company.phone} style={{ color: 'inherit', textDecoration: 'none' }}>
                {company.phone}
              </a>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
              <Mail size={16} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
              <a href={'mailto:' + company.email} style={{ color: 'inherit', textDecoration: 'none' }}>
                {company.email}
              </a>
            </p>
          </div>
        </div>

        <div className="button-row" style={{ gap: '10px', flexWrap: 'wrap' }}>
          <a className="button" style={{ padding: '10px 18px', fontSize: '11px' }} href={'tel:' + company.phone}>
            <Phone size={14} /> Call Us
          </a>
          <a
            className="button secondary"
            style={{ padding: '10px 18px', fontSize: '11px' }}
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
          <a className="button secondary" style={{ padding: '10px 18px', fontSize: '11px' }} href={'mailto:' + company.email}>
            <Mail size={14} /> Email Us
          </a>
        </div>
      </div>
    </div>
  );
}

export function InquiryForm({ candidate = false }: { candidate?: boolean }) {
  const [isCandidate, setIsCandidate] = useState(candidate);
  const [service, setService] = useState('');
  const [status, setStatus] = useState('');
  const [reference, setReference] = useState('');
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('service');
    if (value && services.some((s) => s.slug === value)) setService(value);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setDone(false);
    setStatus('');
    setReference('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: isCandidate ? 'candidate' : 'employer' }),
      });
      const result = (await res.json()) as { error?: string; reference?: string };
      if (!res.ok) throw new Error(result.error || 'We could not save your inquiry. Please try again.');
      setDone(true);
      setReference(result.reference || '');
      setStatus(
        `Your ${isCandidate ? 'candidate profile' : 'staffing brief'} has been registered with ONE TALENT UAE.`
      );
      form.reset();
      setService('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Connection failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function copyReference() {
    if (reference) {
      navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <form id="inquiry" className="inquiry-form" onSubmit={submit}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
        <button
          type="button"
          className={`pill-option ${!isCandidate ? 'active' : ''}`}
          onClick={() => setIsCandidate(false)}
        >
          Employer Staffing Brief
        </button>
        <button
          type="button"
          className={`pill-option ${isCandidate ? 'active' : ''}`}
          onClick={() => setIsCandidate(true)}
        >
          Talent Membership
        </button>
      </div>

      <span className="eyebrow">
        {isCandidate ? 'JOIN OUR TALENT ROSTER' : 'DISPATCH THE RIGHT TALENT'}
      </span>
      <h3>{isCandidate ? 'Introduce your background.' : 'Specify your workforce brief.'}</h3>
      <p className="form-intro">
        {isCandidate
          ? 'Share your experience and verified CV link. We connect skilled professionals with premier UAE hospitality & corporate icons.'
          : 'Provide your company requirements. Our recruitment coordinators will align candidates suited to your standards and timeline.'}
      </p>

      <div className="form-grid">
        <label>
          Full Name <b>*</b>
          <input name="name" autoComplete="name" required maxLength={120} placeholder="e.g. Tariq Al Mansoori" />
        </label>
        <label>
          {isCandidate ? 'Email address' : 'Work Email'} <b>*</b>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={180}
            placeholder="you@company.com"
          />
        </label>
        <label>
          {isCandidate ? 'Current Location (City/Country)' : 'Enterprise / Venue Name'} <b>*</b>
          <input
            name="company"
            required
            maxLength={180}
            placeholder={isCandidate ? 'Sharjah, UAE' : 'e.g. Luxury Resort / Group Name'}
          />
        </label>
        <label>
          Phone Number <b>*</b>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            minLength={7}
            maxLength={30}
            placeholder="+971 54 585 6200"
          />
        </label>

        {isCandidate ? (
          <>
            <label className="full">
              CV / LinkedIn / Portfolio URL
              <input
                name="profile"
                type="url"
                maxLength={1000}
                placeholder="https://linkedin.com/in/... or Google Drive link"
              />
              <small>Please supply a publicly shareable link to your CV or profile.</small>
            </label>
            <label className="full">
              Area of Expertise <b>*</b>
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  Select your discipline
                </option>
                <option>Hospitality</option>
                <option>Corporate & professional services</option>
                <option>Events</option>
                <option>Temporary work</option>
                <option>Other</option>
              </select>
            </label>
          </>
        ) : (
          <>
            <label className="full">
              Hospitality & Workforce Practice <b>*</b>
              <select name="service" required value={service} onChange={(e) => setService(e.target.value)}>
                <option value="" disabled>
                  Select required practice
                </option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Number of Staff Needed
              <input name="count" type="number" min="1" max="10000" placeholder="e.g. 10" />
            </label>
            <label>
              Expected Start Date
              <input name="date" type="date" />
            </label>
          </>
        )}

        <label className="full">
          {isCandidate ? 'Summary of Experience' : 'Operational Brief & Requirements'} <b>*</b>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={4}
            placeholder={
              isCandidate
                ? 'Detail your core skills, years of luxury experience, UAE residency status, and availability.'
                : 'Detail the roles needed, service standards, shift schedules, venue location, and deployment timeline.'
            }
          />
        </label>

        <label className="honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          I agree to the <a href="/privacy">privacy notice</a> and authorize ONE TALENT to contact me regarding this
          inquiry.
        </span>
      </label>

      <button className="button submit" type="submit" disabled={busy}>
        {busy ? 'Registering Brief…' : isCandidate ? 'Submit Talent Profile' : 'Dispatch Staffing Brief'}
        {done ? <Check size={18} /> : <ArrowRight size={18} />}
      </button>

      {status && (
        <div className={done ? 'form-status success' : 'form-status'} role="status">
          <p style={{ margin: 0 }}>{status}</p>
          {reference && (
            <div
              style={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-gold)',
                borderRadius: '6px',
              }}
            >
              <code style={{ color: 'var(--gold-light)', fontWeight: 700 }}>Reference: {reference}</code>
              <button
                type="button"
                onClick={copyReference}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: copied ? 'var(--gold-light)' : 'var(--text-lead)',
                }}
              >
                {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Ref'}
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export function EmployerCTA() {
  const waNumber = company.whatsapp.replace(/[^0-9]/g, '').replace(/^00/, '');

  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">
            <span className="dot" /> RECRUITMENT &amp; WORKFORCE SOLUTIONS · UAE
          </span>
          <h2>
            Let&apos;s Find Your
            <br />
            <em>Next Talent.</em>
          </h2>
          <p style={{ marginTop: '16px', maxWidth: '520px', fontSize: '16px', color: 'var(--text-lead)' }}>
            Whether you need one professional or an entire team, ONE TALENT is ready to support your recruitment needs.
          </p>
          <div style={{ marginTop: '14px', fontSize: '13px', color: 'var(--text-body)' }}>
            <strong style={{ color: 'var(--text-head)' }}>ONE TALENT</strong> · Recruitment &amp; Workforce Solutions · {company.location}
          </div>
        </div>
        <div>
          <div className="button-row" style={{ gap: '12px', marginBottom: '16px' }}>
            <a className="button" href={'tel:' + company.phone}>
              <Phone size={15} /> Call Us
            </a>
            <a
              className="button secondary"
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={15} /> WhatsApp Us
            </a>
            <a className="button secondary" href={'mailto:' + company.email}>
              <Mail size={15} /> Email Us
            </a>
          </div>
          <div>
            <Button href="/employers#inquiry">
              Request Staff Dispatch <ArrowUpRight size={17} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const waNumber = company.whatsapp.replace(/[^0-9]/g, '').replace(/^00/, '');

  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Brand variant="stacked" />
          <p style={{ fontSize: '14px', color: 'var(--gold-light)', fontWeight: 600, margin: '14px 0 6px' }}>
            One Team. The Right Talent.
          </p>
          <p style={{ fontSize: '12.5px', color: 'var(--text-lead)', margin: '0 0 14px', letterSpacing: '0.04em' }}>
            Recruitment | Staffing | Hospitality | Events | Workforce Solutions
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, maxWidth: '280px', lineHeight: 1.5 }}>
            {company.location}
          </p>
          <div style={{ marginTop: '20px' }}>
            <DubaiClock />
          </div>
        </div>
        <div>
          <span className="eyebrow">QUICK LINKS</span>
          <div className="footer-nav">
            {nav.map(([href, label]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <span className="eyebrow">LET&apos;S FIND YOUR NEXT TALENT</span>
          <p style={{ fontSize: '13px', color: 'var(--text-body)', margin: '0 0 14px' }}>
            Whether you need one professional or an entire team, ONE TALENT is ready to support your recruitment needs.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a className="text-link" href={'tel:' + company.phone}>
              <Phone size={14} /> Call Us ({company.phone})
            </a>
            <a
              className="text-link"
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
            <a className="text-link" href={'mailto:' + company.email}>
              <Mail size={14} /> Email Us ({company.email})
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 ONE TALENT. All Rights Reserved.</span>
        <a href="/privacy">Privacy Notice &amp; Compliance</a>
        <span>Recruitment | Staffing | Hospitality | Events | Workforce Solutions</span>
      </div>
    </footer>
  );
}
