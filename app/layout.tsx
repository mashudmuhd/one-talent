import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, CursorFollower, QuickConciergeDock } from '../components/site';
import { SmoothScroll } from '../components/smooth-scroll';
import { company } from '../lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(company.origin),
  title: {
    default: 'ONE TALENT | Connecting Businesses With the Right Talent · Dubai, UAE',
    template: '%s | ONE TALENT UAE',
  },
  description:
    'ONE TALENT is a UAE-based recruitment and staffing company helping businesses find reliable, skilled, and professional talent. Hire the Right Talent. Build the Right Team.',
  openGraph: {
    siteName: 'ONE TALENT UAE',
    type: 'website',
    title: 'ONE TALENT — Connecting Businesses With the Right Talent',
    description:
      'We connect organizations with people who match their requirements, culture, and standards — making recruitment simpler, faster, and more effective.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ONE TALENT — One Team. The Right Talent.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONE TALENT — Connecting Businesses With the Right Talent',
    description:
      'We connect organizations with people who match their requirements, culture, and standards — making recruitment simpler, faster, and more effective.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SmoothScroll />
        <CursorFollower />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <QuickConciergeDock />
      </body>
    </html>
  );
}
