// src/api/portfolioData.ts
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { StaticImageData } from 'next/image';
import { db } from '@/lib/firebaseClient';

import Xenia from '@/assets/images/Xenia.svg';
import SurveySource from '@/assets/images/Survey_source.svg';
import AdminDashboard from '@/assets/images/admin_dashboard.svg';
import CeylonTea from '@/assets/images/Ceylon_tea.svg';
import LimatWorld from '@/assets/images/Limat_World.svg';
import GrandmasSecret from '@/assets/images/Grandmas_Secret.svg';

import XeniaFrame1 from '@/assets/images/xeniaFrame01.png';
import XeniaFrame2 from '@/assets/images/xeniaFrame02.png';
import XeniaFrame3 from '@/assets/images/xeniaFrame03.png';
import XeniaFrame4 from '@/assets/images/xeniaFrame04.png';
import XeniaFrame5 from '@/assets/images/xeniaFrame05.png';
import XeniaFrame6 from '@/assets/images/xeniaFrame06.png';
import XeniaFrame7 from '@/assets/images/xeniaFrame07.png';
import XeniaFrame8 from '@/assets/images/xeniaFrame08.png';
import XeniaFrame9 from '@/assets/images/xeniaFrame09.png';
import XeniaFrame10 from '@/assets/images/xeniaFrame10.png';

import Landingpage1 from '@/assets/images/Landingpage01.png';
import Landingpage2 from '@/assets/images/Landingpage02.png';
import Landingpage3 from '@/assets/images/Landingpage03.png';
import Landingpage4 from '@/assets/images/Landingpage04.png';
import Landingpage5 from '@/assets/images/Landingpage05.png';

import Admindashboard1 from '@/assets/images/Admindashboard01.png';
import Admindashboard2 from '@/assets/images/Admindashboard02.png';
import Admindashboard3 from '@/assets/images/Admindashboard03.png';
import Admindashboard4 from '@/assets/images/Admindashboard04.png';
import Admindashboard5 from '@/assets/images/Admindashboard05.png';
import Admindashboard6 from '@/assets/images/Admindashboard06.png';
import Admindashboard7 from '@/assets/images/Admindashboard07.png';

import Ceylontea01 from '@/assets/images/Ceylontea01.png';
import Ceylontea02 from '@/assets/images/Ceylontea02.png';
import Ceylontea03 from '@/assets/images/Ceylontea03.png';
import Ceylontea04 from '@/assets/images/Ceylontea04.png';


import LimatWorld01 from '@/assets/images/LimatWorld01.png';
import LimatWorld02 from '@/assets/images/LimatWorld02.png';
import LimatWorld03 from '@/assets/images/LimatWorld03.png';
import LimatWorld04 from '@/assets/images/LimatWorld04.png';
import LimatWorld05 from '@/assets/images/LimatWorld05.png';
import LimatWorld06 from '@/assets/images/LimatWorld06.png';
import LimatWorld07 from '@/assets/images/LimatWorld07.png';
import LimatWorld08 from '@/assets/images/LimatWorld08.png';
import LimatWorld09 from '@/assets/images/LimatWorld09.png';
import LimatWorld10 from '@/assets/images/LimatWorld10.png';

import GrandmasSecret01 from '@/assets/images/GrandmasSecret01.png';
import GrandmasSecret02 from '@/assets/images/GrandmasSecret02.png';
import GrandmasSecret03 from '@/assets/images/GrandmasSecret03.png';
import GrandmasSecret04 from '@/assets/images/GrandmasSecret04.png';
import GrandmasSecret05 from '@/assets/images/GrandmasSecret05.png';
import GrandmasSecret06 from '@/assets/images/GrandmasSecret06.png';
import GrandmasSecret07 from '@/assets/images/GrandmasSecret07.png';
import GrandmasSecret08 from '@/assets/images/GrandmasSecret08.png';
import GrandmasSecret09 from '@/assets/images/GrandmasSecret09.png';
import GrandmasSecret10 from '@/assets/images/GrandmasSecret10.png';
import GrandmasSecret11 from '@/assets/images/GrandmasSecret11.png';
import GrandmasSecret12 from '@/assets/images/GrandmasSecret12.png';
import GrandmasSecret13 from '@/assets/images/GrandmasSecret13.png';
import GrandmasSecret14 from '@/assets/images/GrandmasSecret14.png';

import LimatWorld11 from '@/assets/images/LimatWorld11.png';

import profileFallback from '@/assets/images/profile.png';

/* ========== TYPES ========== */

export type FrameItem = string | StaticImageData;

export type PortfolioItem = {
  id: string;
  name: string;
  title?: string;
  description?: string;
  type?: 'ui' | 'link';
  link?: string;
  image: string | StaticImageData;
  frames?: FrameItem[];
  createdAt?: string | number | Date;
};

/* ========== FALLBACK (local hardcoded) ========== */

/**
 * We reverse the fallback on consumption so newly appended items (defined last)
 * appear first, matching expected "newest first" behaviour when DB isn't available.
 */
export const FALLBACK_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'portfolio-6',
    image: GrandmasSecret,
    name: 'Grandma’s Secret',
    title: 'Logo & branding design',
    description:
      'Developed a meaningful brand identity inspired by Sri Lankan heritage and the elegance of Sigiriya art-capturing tradition, authenticity, and the charm of age-old family recipes.',
    link: 'https://xenia.com',
    type: 'ui',
    frames:[
      GrandmasSecret01,
      GrandmasSecret02,
      GrandmasSecret03,
      GrandmasSecret04,
      GrandmasSecret05,
      GrandmasSecret06,
      GrandmasSecret07,
      GrandmasSecret08,
      GrandmasSecret09,
      GrandmasSecret10,
      GrandmasSecret11,
      GrandmasSecret12,
      GrandmasSecret13,
      GrandmasSecret14 
    ],
  },
  {
    id: 'portfolio-5',
    image: LimatWorld,
    name: 'Limat World',
    title: 'Jersey design',
    description:
      'Created a bold jersey inspired by the brand’s tiger-eye identity. Designed using creative freedom, ensuring the visuals express strength, confidence, and the brand’s modern style.',
    link: 'https://xenia.com',
    type: 'ui',
    frames:[
      LimatWorld01,
      LimatWorld02,
      LimatWorld03,
      LimatWorld04,
      LimatWorld05,
      LimatWorld06,
      LimatWorld07,
      LimatWorld08,
      LimatWorld09,
      LimatWorld10,
      LimatWorld11,
    ],
  },
  {
    id: 'portfolio-4',
    image: CeylonTea,
    name: 'Ceylon tea',
    title: 'Digital art & calendar design',
    description:
      'Designed a vibrant calendar showcasing tea pluckers in lush greenery-celebrating Sri Lanka’s heritage through detailed and atmospheric digital artwork.',
    link: 'https://xenia.com',
    type: 'ui',
    frames:[
      Ceylontea01,
      Ceylontea02,
      Ceylontea03,
      Ceylontea04,
    ],
  },
  {
    id: 'portfolio-3',
    image: AdminDashboard,
    name: 'Survey source',
    title: 'Admin dashboard',
    description:
      'Designed an MVP dashboard featuring efficient controls, data visualization, and management tools-empowering administrators to run the platform smoothly and effectively.',
    type: 'ui',
    frames: [
      Admindashboard1,
      Admindashboard2,
      Admindashboard3,
      Admindashboard4,
      Admindashboard5,
      Admindashboard6,
      Admindashboard7,
    ],
  },
  {
    id: 'portfolio-2',
    image: SurveySource,
    name: 'Survey source',
    title: 'Landing page & platform',
    description:
      'Created a modern interface for a new-age platform that connects surveyors and users, replacing traditional survey processes with a seamless digital experience.',
    type: 'ui',
    frames: [Landingpage1, Landingpage2, Landingpage3, Landingpage4, Landingpage5],
  },
  {
    id: 'portfolio-1',
    name: 'Xenia',
    image: Xenia,
    title: 'Landing page',
    description:
      'Designed a clean, intuitive landing page for Xenia-a platform that enhances team communication, compliance, and workflow efficiency through personalized content and smart tools.',
    type: 'ui',
    frames: [
      XeniaFrame1,
      XeniaFrame2,
      XeniaFrame3,
      XeniaFrame4,
      XeniaFrame5,
      XeniaFrame6,
      XeniaFrame7,
      XeniaFrame8,
      XeniaFrame9,
      XeniaFrame10,
    ],
  },
];

/* ========== HELPERS ========== */

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isValidUrl(v: string) {
  return /^https?:\/\//i.test(v);
}

function resolveImageField(value: unknown): string | StaticImageData {
  if (typeof value === 'string') {
    const t = value.trim();
    if (isValidUrl(t)) return t;
    if (t.startsWith('/')) return t;
    // not an URL or leading slash — avoid giving raw keys like "Xenia" to next/image
    // fallback to profile
    return profileFallback;
  }
  // if already StaticImageData, return fallback? but Firestore won't give that
  return profileFallback;
}

function resolveFrames(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const frames = value
    .map((f): string | undefined => {
      if (typeof f === 'string') {
        const t = f.trim();
        return isValidUrl(t) || t.startsWith('/') ? t : undefined;
      }

      if (
        typeof f === 'object' &&
        f !== null &&
        'url' in f &&
        typeof (f as { url: unknown }).url === 'string'
      ) {
        const t = (f as { url: string }).url.trim();
        return isValidUrl(t) || t.startsWith('/') ? t : undefined;
      }

      return undefined;
    })
    .filter((x): x is string => typeof x === 'string');

  return frames.length > 0 ? frames : undefined;
}
/* ========== FETCH ========== */

const COLLECTION = 'portfolios';

/**
 * fetchPortfolios() returns newest-first list:
 * - when Firebase enabled: queries createdAt desc (newest first)
 * - when Firebase disabled or on error: returns FALLBACK_PORTFOLIO with last-defined item shown first
 */
export async function fetchPortfolios(): Promise<PortfolioItem[]> {
  if (process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== 'true') {
    // reverse fallback so last-defined (newly added locally) appears first
    return FALLBACK_PORTFOLIO.slice().reverse();
  }

  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    if (snap.empty) return FALLBACK_PORTFOLIO.slice().reverse();

    const items: PortfolioItem[] = snap.docs
      .map((d) => {
        const data = d.data();

        const name = isNonEmptyString(data.name) ? data.name : '';
        const title = isNonEmptyString(data.title) ? data.title : undefined;
        const description = isNonEmptyString(data.description) ? data.description : undefined;
        const type = data.type === 'ui' || data.type === 'link' ? data.type : undefined;
        const link = isNonEmptyString(data.link) ? data.link : undefined;
        const image = resolveImageField(data.image);
        const frames = resolveFrames(data.frames);

        return {
          id: d.id,
          name,
          title,
          description,
          type,
          link,
          image,
          frames,
          createdAt: data.createdAt ?? undefined,
        } as PortfolioItem;
      })
      .filter((p) => isNonEmptyString(p.name) && (isNonEmptyString(p.title ?? '') || isNonEmptyString(p.description ?? '') || p.frames?.length));

    return items.length > 0 ? items : FALLBACK_PORTFOLIO.slice().reverse();
  } catch {
    return FALLBACK_PORTFOLIO.slice().reverse();
  }
}
