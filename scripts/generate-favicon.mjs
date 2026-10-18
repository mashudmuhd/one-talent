import fs from 'node:fs';

const icon64 = fs.readFileSync('public/favicon.png');
const b64 = icon64.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="cardGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a2216" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#08090b" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e6cca0" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#98783d" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#cardGlow)" stroke="url(#borderGlow)" stroke-width="1.5"/>
  <image href="data:image/png;base64,${b64}" x="7" y="7" width="50" height="50" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;

fs.writeFileSync('public/favicon.svg', svg);
console.log('favicon.svg written successfully!');
