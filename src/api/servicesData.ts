// src/api/servicesData.ts
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { StaticImageData } from 'next/image';
import { db } from '@/lib/firebaseClient';

import digitalMarketingImg from '@/assets/images/digital_marketing.svg';
import webDevelopmentImg from '@/assets/images/web_development.svg';
import designBrandingImg from '@/assets/images/design_branding.svg';
import serviceFallback from '@/assets/images/profile.png';

/* ================= TYPES ================= */

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  tags?: string;
  image: string | StaticImageData;
  createdAt?: string | number | Date;
};

/* ================= FALLBACK ================= */

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    id: '1',
    image: digitalMarketingImg,
    title: 'Digital Marketing & Campaigns',
    description:
      'Boost your brand with data-driven social media, SEO, and paid ads that attract the right audience and drive real results.',
    tags: 'SEO, Social Media Management & Paid Advertisements.',
  },
  {
    id: '2',
    image: webDevelopmentImg,
    title: 'Web & App Development',
    description:
      'SEO-ready websites and mobile apps designed to deliver great user experiences and convert visitors into customers.',
    tags: 'Web Development with CMS, Apps & User Interface and Experience.',
  },
  {
    id: '3',
    image: designBrandingImg,
    title: 'Creative Design & Branding',
    description:
      'Stand out with professional visuals from social posts and ad creatives to complete brand identities and logo design.',
    tags: 'Branding, Logo Design, Creative Design & Designs for Businesses',
  },
];

/* ================= HELPERS ================= */

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isValidUrl(v: string) {
  return /^https?:\/\//i.test(v);
}

function resolveServiceImage(value: unknown): string | StaticImageData {
  if (typeof value === 'string') {
    if (isValidUrl(value)) return value;
    if (value.startsWith('/')) return value;
  }
  return serviceFallback;
}

/* ================= FETCH ================= */

const COLLECTION = 'services';

export async function fetchServices(): Promise<ServiceItem[]> {
  if (process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== 'true') {
    return FALLBACK_SERVICES;
  }

  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    if (snap.empty) return FALLBACK_SERVICES;

    const services: ServiceItem[] = snap.docs
      .map((d) => {
        const data = d.data();

        const title = isNonEmptyString(data.title) ? data.title : '';
        const description = isNonEmptyString(data.description) ? data.description : '';
        const tags = isNonEmptyString(data.tags) ? data.tags : undefined;
        const image = resolveServiceImage(data.image);

        return {
          id: d.id,
          title,
          description,
          tags,
          image,
          createdAt: data.createdAt ?? undefined,
        };
      })
      .filter(
        (s) =>
          isNonEmptyString(s.title) &&
          isNonEmptyString(s.description)
      );

    return services.length > 0 ? services : FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}
