import {company} from '../lib/content';
export default function sitemap(){return ['','/about','/services','/employers','/candidates','/contact','/privacy'].map(path=>({url:company.origin+path,changeFrequency:'monthly' as const,priority:path?0.7:1}));}
