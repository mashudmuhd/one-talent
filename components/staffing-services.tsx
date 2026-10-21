'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Zap,
  Wine,
  ShieldCheck,
  Crown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Shield,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import {
  staffingServices,
  buildStaffingWhatsAppUrl,
  type StaffingServiceItem,
  company
} from '../lib/content';

/** Official WhatsApp luxury SVG mark */
function WhatsAppMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function RoleIcon({ icon }: { icon: StaffingServiceItem['icon'] }) {
  switch (icon) {
    case 'zap':
      return <Zap size={24} strokeWidth={1.8} />;
    case 'wine':
      return <Wine size={24} strokeWidth={1.8} />;
    case 'shield':
      return <ShieldCheck size={24} strokeWidth={1.8} />;
    case 'crown':
      return <Crown size={24} strokeWidth={1.8} />;
    case 'sparkles':
    default:
      return <Sparkles size={24} strokeWidth={1.8} />;
  }
}

export function StaffingServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Interaction safety refs to differentiate swipe vs click
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const justSwipedRef = useRef(false);
  const swipeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to specific card by index
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;

    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const currentScroll = track.scrollLeft;
    const targetOffset = card.offsetLeft - (trackRect.width - cardRect.width) / 2;

    track.scrollTo({
      left: Math.max(0, targetOffset),
      behavior: 'smooth',
    });
    setActiveIndex(index);
  }, []);

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(staffingServices.length - 1, activeIndex + 1);
    scrollToIndex(nextIndex);
  };

  // Sync active index as user scrolls/swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const distance = Math.abs(cardCenter - trackCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        });

        setActiveIndex(closestIndex);
      }, 60);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Desktop 3D Tilt Physics and dynamic specular lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -5; // max 5 deg tilt
    const rotY = ((x - centerX) / centerX) * 5;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--card-rot-x', `${rotX.toFixed(2)}deg`);
    card.style.setProperty('--card-rot-y', `${rotY.toFixed(2)}deg`);
    card.style.setProperty('--specular-opacity', '1');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--card-rot-x', '0deg');
    card.style.setProperty('--card-rot-y', '0deg');
    card.style.setProperty('--specular-opacity', '0');
  };

  // Touch and pointer swipe detection to prevent accidental WhatsApp booking clicks
  const handlePointerDown = (e: React.PointerEvent) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const deltaX = Math.abs(e.clientX - startPosRef.current.x);
    const deltaY = Math.abs(e.clientY - startPosRef.current.y);
    if (deltaX > 8 || deltaY > 8) {
      isDraggingRef.current = true;
    }
  };

  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      justSwipedRef.current = true;
      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
      swipeTimeoutRef.current = setTimeout(() => {
        justSwipedRef.current = false;
        isDraggingRef.current = false;
      }, 160);
    }
  };

  const handleBookingClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    service: StaffingServiceItem,
    url: string | null
  ) => {
    // Prevent accidental booking click if user was swiping or dragging
    if (justSwipedRef.current || isDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Verify WhatsApp number configuration
    if (!url) {
      e.preventDefault();
      alert('Unable to launch WhatsApp booking: WhatsApp business number is not configured in website settings.');
      return;
    }
  };

  return (
    <section
      className="staffing-services-section"
      id="staffing-services"
      aria-label="Ultra-Premium Staffing Services"
    >
      <div className="container">
        {/* Section Header */}
        <div className="staffing-section-header">
          <div className="staffing-header-left">
            <span className="eyebrow" style={{ marginBottom: 0 }}>
              <Sparkles size={14} /> HOSPITALITY STAFFING ROSTERS
            </span>
          </div>

          <div className="staffing-header-right">
            <div className="staffing-live-pill" title="MOHRE Compliant • Immediate Roster Dispatch">
              <span className="pulse-indicator" />
              <span>UAE Rosters Active • Live WhatsApp Desk</span>
            </div>

            {/* Prev / Next Luxury Carousel Controls */}
            <div className="staffing-nav-controls" aria-label="Staffing cards carousel navigation">
              <button
                type="button"
                className="staffing-nav-btn"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous service"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="staffing-nav-counter">
                0{activeIndex + 1} <i>/</i> 0{staffingServices.length}
              </span>
              <button
                type="button"
                className="staffing-nav-btn"
                onClick={handleNext}
                disabled={activeIndex === staffingServices.length - 1}
                aria-label="Next service"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Role Jump Pills */}
        <div className="staffing-role-pills" role="tablist" aria-label="Quick jump to service">
          {staffingServices.map((service, idx) => (
            <button
              key={service.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              className={`staffing-role-pill ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => scrollToIndex(idx)}
            >
              <span>{service.name}</span>
              <small>{service.startingPrice}</small>
            </button>
          ))}
        </div>

        {/* Swipe Hint for Mobile Devices */}
        <div className="staffing-swipe-hint" aria-hidden="true">
          <span>Swipe horizontally to view all 5 luxury roles</span>
          <ArrowRight size={14} />
        </div>

        {/* Carousel / Responsive Cards Track */}
        <div
          ref={trackRef}
          className="staffing-cards-track"
          data-lenis-prevent="true"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="region"
          aria-label="Staffing services cards"
        >
          {staffingServices.map((service, index) => {
            const whatsappUrl = buildStaffingWhatsAppUrl(service);

            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`staffing-card ${service.highlight ? 'highlighted' : ''} ${
                  activeIndex === index ? 'active' : ''
                }`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* 3D Specular Lighting Layer */}
                <div className="staffing-card-specular" aria-hidden="true" />

                {/* Top Ambient Highlight Line */}
                <div className="staffing-card-glow-bar" aria-hidden="true" />

                {/* Card Top Metadata */}
                <div className="staffing-card-top">
                  <span className="staffing-card-badge">
                    <span className="staffing-badge-dot" />
                    {service.roleBadge}
                  </span>
                  <span className="staffing-card-index">0{index + 1}</span>
                </div>

                {/* Service Role Header & Icon */}
                <div className="staffing-card-hero">
                  <div className="staffing-icon-container">
                    <RoleIcon icon={service.icon} />
                  </div>
                  <div>
                    <h3 className="staffing-card-title">{service.name}</h3>
                    <div className="staffing-verified-tag">
                      <CheckCircle2 size={13} style={{ color: 'var(--gold-primary)' }} />
                      <span>Verified • Uniformed Pro</span>
                    </div>
                  </div>
                </div>

                {/* Starting Price Box */}
                <div className="staffing-price-box">
                  <div className="staffing-price-label">STARTING PRICE</div>
                  <div className="staffing-price-row">
                    <span className="staffing-price-currency">AED</span>
                    <span className="staffing-price-number">{service.priceValue}</span>
                    <span className="staffing-price-unit">/ {service.priceUnit.replace(/^AED\s*\/\s*/i, '')}</span>
                  </div>
                  <div className="staffing-price-subtext">
                    {service.startingPrice} • Standard UAE Shift
                  </div>
                </div>

                {/* Description */}
                <p className="staffing-card-desc">{service.description}</p>

                {/* Key Features ("Service Includes") */}
                <div className="staffing-features-block">
                  <div className="staffing-features-title">
                    <Sparkles size={12} style={{ color: 'var(--gold-primary)' }} />
                    <span>SERVICE INCLUDES</span>
                  </div>
                  <ul className="staffing-features-list">
                    {service.features.map((feature) => (
                      <li key={feature} className="staffing-feature-item">
                        <span className="staffing-check-icon">
                          <CheckCircle2 size={14} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp Direct Booking CTA Button */}
                <div className="staffing-card-footer">
                  <a
                    href={whatsappUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="staffing-book-button"
                    onClick={(e) => handleBookingClick(e, service, whatsappUrl)}
                    aria-label={`Book Now for ${service.name} at ${service.startingPrice} on WhatsApp`}
                  >
                    <WhatsAppMark size={19} />
                    <span>Book Now</span>
                  </a>
                  <div className="staffing-cta-micro">
                    <MessageCircle size={11} />
                    <span>Direct WhatsApp Inquiry • Instant Chat</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="staffing-dots-bar" role="tablist" aria-label="Staffing card pagination">
          {staffingServices.map((service, idx) => (
            <button
              key={service.id}
              type="button"
              role="tab"
              aria-label={`Jump to ${service.name}`}
              aria-selected={activeIndex === idx}
              className={`staffing-dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => scrollToIndex(idx)}
            />
          ))}
        </div>

        {/* Trust & Dispatch Guarantee Strip */}
        <div className="staffing-trust-strip">
          <div className="staffing-trust-item">
            <Clock3 size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
            <div>
              <strong>Rapid Dispatch Window</strong>
              <p>Immediate roster confirmation for emergency shifts or planned seasons.</p>
            </div>
          </div>
          <div className="staffing-trust-item">
            <Shield size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
            <div>
              <strong>100% MOHRE & Visa Compliant</strong>
              <p>All specialists are legally sponsored, insured, and medically certified.</p>
            </div>
          </div>
          <div className="staffing-trust-item">
            <WhatsAppMark size={18} />
            <div>
              <strong>Instant Concierge Response</strong>
              <p>Dedicated UAE WhatsApp coordinator handles role briefings & logistics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
