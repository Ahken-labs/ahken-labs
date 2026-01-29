// src/api/footerData.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

export type SiteInfoType = {
  name: string;
  email: string;
  phone: string;
};

export type SocialLink = {
  name: string;
  href: string;
  icon?: string;
};

export type FooterLinksType = {
  main: { label: string; id: string }[];
  services: string[][];
};

/**
 * Minimal local fallback values used only if Firestore is disabled
 * or fetch unexpectedly fails. These are NOT used as the primary source
 * when Firestore is enabled.
 */
export const FALLBACK_SITE_INFO: SiteInfoType = {
  name: 'Ahken Labs.',
  email: 'ahkennexus@gmail.com',
  phone: '+94 750 207 507',
};

export const FALLBACK_SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', href: 'https://m.facebook.com/AhkenLabs.page?wtsid=rdr_0iXhCOzaE51i4wp3u', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com', icon: 'instagram' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ahkenlabs/', icon: 'LinkedIn' },
];

export const FALLBACK_FOOTER_LINKS: FooterLinksType = {
  main: [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'Services' },
    { label: 'Portfolio', id: 'Portfolio' },
    { label: 'Contact us', id: 'contact' },
  ],
  services: [
    ['Design for brands'],
    ['Web & app design'],
    ['Social media', 'marketing'],
  ],
};

/* ------------------------
   Type guards & parsers
   ------------------------ */

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseSiteInfo(raw: unknown): SiteInfoType {
  if (!isObject(raw)) return FALLBACK_SITE_INFO;

  const name = typeof raw.name === 'string' ? raw.name : FALLBACK_SITE_INFO.name;
  const email = typeof raw.email === 'string' ? raw.email : FALLBACK_SITE_INFO.email;
  const phone = typeof raw.phone === 'string' ? raw.phone : FALLBACK_SITE_INFO.phone;

  return { name, email, phone };
}

function parseSocialLinks(raw: unknown): SocialLink[] {
  if (!isObject(raw)) return FALLBACK_SOCIAL_LINKS;

  const linksRaw = raw.links;
  if (!Array.isArray(linksRaw)) return FALLBACK_SOCIAL_LINKS;

  const out: SocialLink[] = [];
  for (const item of linksRaw) {
    if (!isObject(item)) continue;
    const name = typeof item.name === 'string' ? item.name : undefined;
    const href = typeof item.href === 'string' ? item.href : undefined;
    const icon = typeof item.icon === 'string' ? item.icon : undefined;
    if (typeof name === 'string' && typeof href === 'string') {
      out.push({ name, href, icon });
    }
  }
  return out.length ? out : FALLBACK_SOCIAL_LINKS;
}

function parseFooterLinks(raw: unknown): FooterLinksType {
  if (!isObject(raw)) return FALLBACK_FOOTER_LINKS;

  const mainRaw = raw.main;
  const servicesRaw = raw.services;

  const main: { label: string; id: string }[] = Array.isArray(mainRaw)
    ? mainRaw
      .filter(isObject)
      .map((m) => {
        const label = typeof m.label === 'string' ? m.label : '';
        const id = typeof m.id === 'string' ? m.id : '';
        return { label, id };
      })
      .filter((x) => x.label && x.id)
    : FALLBACK_FOOTER_LINKS.main;

  const services: string[][] = Array.isArray(servicesRaw)
    ? servicesRaw
      .filter(Array.isArray)
      .map((arr) => arr.filter((v) => typeof v === 'string'))
    : FALLBACK_FOOTER_LINKS.services;

  return {
    main: main.length ? main : FALLBACK_FOOTER_LINKS.main,
    services: services.length ? services : FALLBACK_FOOTER_LINKS.services,
  };
}

/* ------------------------
   Firestore fetch functions
   ------------------------ */

const COLLECTION = 'siteData';

export async function fetchSiteInfo(): Promise<SiteInfoType> {
  if (process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== 'true') {
    return FALLBACK_SITE_INFO;
  }
  try {
    const snap = await getDoc(doc(db, COLLECTION, 'siteInfo'));
    if (!snap.exists()) return FALLBACK_SITE_INFO;
    return parseSiteInfo(snap.data());
  } catch {
    return FALLBACK_SITE_INFO;
  }
}

export async function fetchSocialLinks(): Promise<SocialLink[]> {
  if (process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== 'true') {
    return FALLBACK_SOCIAL_LINKS;
  }
  try {
    const snap = await getDoc(doc(db, COLLECTION, 'socialLinks'));
    if (!snap.exists()) return FALLBACK_SOCIAL_LINKS;
    return parseSocialLinks(snap.data());
  } catch {
    return FALLBACK_SOCIAL_LINKS;
  }
}

export async function fetchFooterLinks(): Promise<FooterLinksType> {
  if (process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== 'true') {
    return FALLBACK_FOOTER_LINKS;
  }
  try {
    const snap = await getDoc(doc(db, COLLECTION, 'footerLinks'));
    if (!snap.exists()) return FALLBACK_FOOTER_LINKS;
    return parseFooterLinks(snap.data());
  } catch {
    return FALLBACK_FOOTER_LINKS;
  }
}
