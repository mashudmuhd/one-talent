export const company = {
  name: 'ONE TALENT',
  tagline: 'One Team. The Right Talent.',
  category: 'Recruitment & Workforce Solutions',
  location: '3rd Floor, Al Messaned, Al Bataeh Suburb, Sharjah, United Arab Emirates',
  email: 'info@onetalent-uae.com',
  phone: '+971 54 585 6200',
  whatsapp: '+971 54 585 6200',
  origin: 'https://one-talent.vercel.app',
};

export const services = [
  {
    slug: 'recruitment',
    title: 'Recruitment & Talent Acquisition',
    description: 'Finding qualified professionals for permanent positions across various business functions.',
    detail: 'From specialist roles to executive and business support, we focus on the skills, experience, and cultural fit your business needs to excel.',
    roles: 'Corporate Teams · Business Functions · Specialist Professionals',
    icon: 'users',
  },
  {
    slug: 'hospitality',
    title: 'Hospitality Staffing',
    description: 'Providing trained and reliable staff for hotels, restaurants, resorts, catering companies, and other hospitality businesses.',
    detail: 'Build a team that understands luxury service. Share your operational standards, role requirements, and schedules so we can source relevant candidates.',
    roles: 'Hotels & Resorts · Restaurants · Catering & Banquets',
    icon: 'bell',
  },
  {
    slug: 'temporary',
    title: 'Temporary & Contract Staffing',
    description: 'Flexible workforce solutions for short-term, seasonal, project-based, and changing manpower requirements.',
    detail: 'Plan for busy periods and evolving workloads with staffing support shaped around your project, duration, and required capabilities.',
    roles: 'Seasonal Surges · Project Support · Short-Term Cover',
    icon: 'clock',
  },
  {
    slug: 'events',
    title: 'Event Staffing',
    description: 'Professional staff for exhibitions, conferences, corporate events, weddings, brand activations, and other events.',
    detail: 'From guest-facing protocol roles to event operational support, we help you identify people suited to your format, audience, and standards.',
    roles: 'Exhibitions & Conferences · Weddings · Brand Activations',
    icon: 'sparkles',
  },
  {
    slug: 'workforce',
    title: 'Workforce Solutions',
    description: 'Customized staffing support for businesses requiring dependable teams at scale.',
    detail: 'Coordinate large-scale staffing needs through a focused process that considers role mix, multiple locations, skills, and business priorities.',
    roles: 'Turnkey Teams · Operational Support · Workforce Scaling',
    icon: 'layers',
  },
];

export const advantages = [
  [
    'Quality-focused candidate sourcing',
    'Candidate sourcing shaped around your role, organizational culture, and high performance standards.',
  ],
  [
    'Professional screening process',
    'A considered assessment of verified skills, industry experience, and professional suitability.',
  ],
  [
    'Fast and flexible staffing solutions',
    'Rapid response support for permanent, temporary, seasonal, and evolving workforce needs.',
  ],
  [
    'Industry-focused recruitment',
    'Recruitment informed by the practical realities, operational tempo, and compliance of your sector.',
  ],
  [
    'Employer and candidate support',
    'Dedicated coordination and clear, transparent communication for employers and talent throughout.',
  ],
  [
    'UAE market understanding',
    'A recruitment and staffing approach deeply grounded in the UAE business environment and MOHRE standards.',
  ],
];

export const steps = [
  ['Share your requirements', 'Tell us about the roles, number of staff, skills, and timelines you need.'],
  ['Candidate sourcing', 'We identify suitable candidates based on your specific requirements.'],
  ['Screening & selection', 'Candidates are rigorously assessed against the agreed criteria and standards.'],
  ['Staffing coordination', 'We coordinate deployment and next steps seamlessly with your business.'],
];
export const photos = {
  /** Real client hospitality photography — enhanced locally */
  hero: '/photos/chef-plating.jpg',
  team: '/photos/hotel-corridor.jpg',
  hotel: '/photos/hotel-corridor.jpg',
  events: '/photos/restaurant-setup.jpg',
  business: '/photos/room-service-delivery.jpg',
  resort: '/photos/restaurant-setup.jpg',
  dining: '/photos/chef-plating.jpg',
  gala: '/photos/room-service-cloche.jpg',
  /** Thumbs for gallery tiles */
  heroThumb: '/photos/chef-plating-thumb.jpg',
  teamThumb: '/photos/hotel-corridor-thumb.jpg',
  eventsThumb: '/photos/restaurant-setup-thumb.jpg',
  businessThumb: '/photos/room-service-delivery-thumb.jpg',
  galaThumb: '/photos/room-service-cloche-thumb.jpg',
};
/** Returns the URL as-is for local assets, or appends Unsplash params if needed */
export const img = (url: string, _width = 1200) => url;

export interface StaffingServiceItem {
  id: string;
  name: string;
  roleBadge: string;
  startingPrice: string;
  priceValue: string;
  priceUnit: string;
  description: string;
  features: string[];
  icon: 'zap' | 'wine' | 'shield' | 'crown' | 'sparkles';
  highlight?: boolean;
}

export const staffingServices: StaffingServiceItem[] = [
  {
    id: 'runner',
    name: 'Runner',
    roleBadge: 'Rapid Dispatch',
    startingPrice: '180 AED / Shift',
    priceValue: '180',
    priceUnit: 'AED / Shift',
    description: 'Operational support ensuring rapid service and floor efficiency.',
    features: ['Quick Response', 'Floor Support', 'Supply Sync'],
    icon: 'zap',
  },
  {
    id: 'waiter',
    name: 'Waiter',
    roleBadge: 'Signature VIP',
    startingPrice: '450 AED / Shift',
    priceValue: '450',
    priceUnit: 'AED / Shift',
    description: 'Skilled professionals delivering high-end hospitality standards.',
    features: ['VIP Service', 'Order Management', 'Menu Knowledge'],
    icon: 'wine',
    highlight: true,
  },
  {
    id: 'stewards',
    name: 'Stewards',
    roleBadge: 'BOH Operations',
    startingPrice: '160 AED / Shift',
    priceValue: '160',
    priceUnit: 'AED / Shift',
    description: 'Essential back-of-house support for hygiene and organization.',
    features: ['BOH Hygiene', 'Kitchen Support', 'Safety Focused'],
    icon: 'shield',
  },
  {
    id: 'hostess',
    name: 'Hostess',
    roleBadge: 'Front of House',
    startingPrice: '105 AED / Hour',
    priceValue: '105',
    priceUnit: 'AED / Hour',
    description: 'Elegant and personable front-of-house guest management.',
    features: ['Guest Greeting', 'Table Booking', 'Brand Aligned'],
    icon: 'crown',
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    roleBadge: '5-Star Standards',
    startingPrice: '160 AED / Shift',
    priceValue: '160',
    priceUnit: 'AED / Shift',
    description: 'Meticulous cleaning experts for premium environments.',
    features: ['5-Star Standards', 'Detail Oriented', 'Reliable Care'],
    icon: 'sparkles',
  },
];

export function buildStaffingWhatsAppMessage(service: StaffingServiceItem): string {
  return [
    `Hello ${company.name} Team! 👋`,
    '',
    'I would like to inquire about booking your staffing service.',
    '',
    '📋 BOOKING INQUIRY',
    '━━━━━━━━━━━━━━━━━━',
    '',
    `👤 Service: ${service.name}`,
    '',
    '📝 Service Description:',
    service.description,
    '',
    '✨ Service Includes:',
    ...service.features.map((f) => `• ${f}`),
    '',
    `💰 Starting Price: ${service.startingPrice}`,
    '',
    '━━━━━━━━━━━━━━━━━━',
    '',
    'I would like to know more about availability and the booking process.',
    '',
    'Please share the next steps.',
    '',
    'Thank you!',
  ].join('\n');
}

export function buildStaffingWhatsAppUrl(
  service: StaffingServiceItem,
  rawWhatsappNumber: string = company.whatsapp
): string | null {
  const cleanNumber = (rawWhatsappNumber || '').replace(/[^0-9]/g, '').replace(/^00/, '');
  if (!cleanNumber) return null;
  const message = buildStaffingWhatsAppMessage(service);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
