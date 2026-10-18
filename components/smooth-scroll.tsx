'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with luxury physics, momentum, and custom exponential easing
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // refined ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Fluid RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Subtle scroll-driven physics for existing hero image and ambient lighting
    const handleScroll = ({ scroll }: { scroll: number }) => {
      // Subtle parallax on hero image without layout shift
      const heroImage = document.querySelector<HTMLElement>('.hero-image');
      if (heroImage && scroll < window.innerHeight * 1.5) {
        heroImage.style.transform = `translate3d(0, ${(scroll * 0.16).toFixed(1)}px, 0) scale(1.04)`;
      }

      // Gentle depth response on ambient lighting glows
      const glow1 = document.querySelector<HTMLElement>('.ambient-glow-1');
      const glow2 = document.querySelector<HTMLElement>('.ambient-glow-2');
      if (glow1) {
        glow1.style.transform = `translate3d(0, ${(scroll * -0.05).toFixed(1)}px, 0)`;
      }
      if (glow2) {
        glow2.style.transform = `translate3d(0, ${(scroll * 0.06).toFixed(1)}px, 0)`;
      }
    };

    lenis.on('scroll', handleScroll);

    // Smooth Anchor-link scrolling with sticky header offset compensation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Same-page anchor: e.g. "#services", "#estimator", "#inquiry"
      if (href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, {
            offset: -100, // Accounts for the 90px sticky header + breathing space
            duration: 1.2,
          });
        }
      }
      // Link to current page with hash (e.g. "/employers#inquiry" while currently on "/employers")
      else if (href.includes('#')) {
        const [urlPath, hash] = href.split('#');
        const currentPath = window.location.pathname;
        if (urlPath === currentPath || (urlPath === '/' && currentPath === '')) {
          const targetEl = document.querySelector(`#${hash}`);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -100,
              duration: 1.2,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    // Handle hash on initial mount or load
    if (window.location.hash) {
      const hashEl = document.querySelector(window.location.hash);
      if (hashEl) {
        setTimeout(() => {
          lenis.scrollTo(hashEl as HTMLElement, {
            offset: -100,
            duration: 1.2,
          });
        }, 250);
      }
    }

    // Scroll-Triggered Reveal Animations for existing elements
    const targetSelectors = [
      '.section-heading',
      '.hero-stats .hero-stat-card',
      '.division-card',
      '.estimator-wrapper',
      '.intro-image',
      '.intro-copy',
      '.service-card',
      '.testimonial-card',
      '.advantages article',
      '.steps article',
      '.faq-item',
      '.candidate-strip',
      '.contact-hub-card',
      '.inquiry-form-card',
      '.service-detail',
      '.prose',
      '.employer-cta',
      '.page-hero .container',
    ];

    const elementsToReveal: HTMLElement[] = [];
    targetSelectors.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el, index) => {
        if (!el.hasAttribute('data-scroll-reveal')) {
          el.setAttribute('data-scroll-reveal', 'true');
          const stagger = (index % 6) + 1;
          el.setAttribute('data-stagger', stagger.toString());
          elementsToReveal.push(el);
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            // Smooth exit transition when scrolled far below viewport
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight * 1.15) {
              entry.target.classList.remove('is-revealed');
            }
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elementsToReveal.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If already in or above the viewport on initial page mount, reveal immediately
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('is-revealed');
      }
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
