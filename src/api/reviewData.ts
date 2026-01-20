// src/api/reviewsData.ts
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { StaticImageData } from 'next/image';
import { db } from '@/lib/firebaseClient';

import user1 from '@/assets/images/user1.svg';
import user2 from '@/assets/images/user2.svg';
import user3 from '@/assets/images/user3.svg';
import profileFallback from '@/assets/images/profile.png';

/**
 * Public type used by website components.
 * image can be a StaticImageData (local import) or a URL string.
 */
export type ReviewItem = {
  id: string;
  image: string | StaticImageData;
  name: string;
  rating: number;
  feedback: string;
  role: string;
  createdAt?: string | number | Date;
};

export const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    id: '1',
    image: user1,
    name: 'Agalya',
    rating: 5,
    feedback:
      'We partnered with Ahken Labs for our complete brand design, packaging, menu designs, and social media creatives. Everything was beautifully crafted and aligned with our brand identity. Truly professional work!',
    role: 'Founder · Natural Roots',
  },
  {
    id: '2',
    image: user2,
    name: 'Sri.Anuyan',
    rating: 4,
    feedback:
      'Ahken Labs created our logo and custom chess jersey designs with exceptional clarity and creativity. They understood exactly what our academy needed.',
    role: 'Founder · Glowing Pawn Chess Academy',
  },
  {
    id: '3',
    image: user3,
    name: 'Sanjeevan',
    rating: 5,
    feedback:
      'From strategy to execution, the Ahken Labs team delivered outstanding results. Our digital presence improved massively within weeks.',
    role: 'Co-Founder · Urban Hive',
  },
  {
    id: '4',
    image: user2,
    name: 'Nilanthan',
    rating: 4,
    feedback:
      'Clean designs, clear communication, and reliable delivery. We highly recommend Ahken Labs for creative and tech solutions.',
    role: 'Marketing Lead · Blue Orbit',
  },
];

const COLLECTION_NAME = 'reviews';

/** quick helpers */
function isAbsoluteUrl(s: string) {
  return /^https?:\/\//i.test(s);
}
function isLeadingSlashPath(s: string) {
  return /^\//.test(s);
}

/**
 * Map known string keys to local static imports. If your mobile app writes "user1" etc,
 * this will resolve them to the correct StaticImageData object for next/image.
 */
const STATIC_IMAGE_MAP: Record<string, StaticImageData> = {
  user1,
  user2,
  user3,
  profile: profileFallback,
};

/**
 * Resolve Firestore image field into something valid for <Image src={...} />:
 * - absolute URL strings (http/https) are returned as-is
 * - leading-slash paths (/uploads/...) are returned as-is
 * - known keys like "user1" map to imported StaticImageData
 * - otherwise return the profile fallback import
 */
function resolveImageField(value: unknown): string | StaticImageData {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.length === 0) return profileFallback;
    if (isAbsoluteUrl(trimmed) || isLeadingSlashPath(trimmed)) return trimmed;
    // If value contains a known key anywhere (e.g. "user3" or "user3.svg"), try match
    const key = Object.keys(STATIC_IMAGE_MAP).find((k) =>
      trimmed.toLowerCase().includes(k.toLowerCase())
    );
    if (key) return STATIC_IMAGE_MAP[key];
    return profileFallback;
  }
  return profileFallback;
}

/**
 * Fetch reviews from Firestore or return the fallback list when Firebase is disabled or on error.
 */
export async function fetchReviews(): Promise<ReviewItem[]> {
  if (process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== 'true') {
    return FALLBACK_REVIEWS;
  }

  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'asc'));
    const snap = await getDocs(q);

    if (snap.empty) {
      return FALLBACK_REVIEWS;
    }

    const items: ReviewItem[] = snap.docs
      .map((d) => {
        const data = d.data();

        const name = typeof data.name === 'string' ? data.name : '';
        const feedback = typeof data.feedback === 'string' ? data.feedback : '';
        const role = typeof data.role === 'string' ? data.role : '';
        const imageField = data.image;
        const image = resolveImageField(imageField);

        const rawRating = data.rating;
        const parsedRating =
          typeof rawRating === 'number'
            ? rawRating
            : typeof rawRating === 'string'
              ? Number.parseFloat(rawRating)
              : NaN;

        const rating = Number.isFinite(parsedRating) ? Math.max(0, Math.floor(parsedRating)) : 0;

        return {
          id: d.id,
          image,
          name,
          rating,
          feedback,
          role,
          createdAt: data.createdAt ?? undefined,
        } as ReviewItem;
      })
      .filter(
        (r) =>
          typeof r.name === 'string' &&
          r.name.trim().length > 0 &&
          (typeof r.feedback === 'string' && r.feedback.trim().length > 0)
      );

    return items.length > 0 ? items : FALLBACK_REVIEWS;
  } catch {
    return FALLBACK_REVIEWS;
  }
}
