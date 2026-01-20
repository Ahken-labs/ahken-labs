import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import type { StaticImageData } from 'next/image';

import brand1 from '@/assets/images/brand1.svg';
import brand2 from '@/assets/images/brand2.svg';
import brand3 from '@/assets/images/brand3.svg';
import brand4 from '@/assets/images/brand4.svg';
import brand5 from '@/assets/images/brand5.svg';

export type BrandItem = {
  image: string | StaticImageData;
};

export const FALLBACK_BRANDS: BrandItem[] = [
  { image: brand1 },
  { image: brand2 },
  { image: brand3 },
  { image: brand4 },
  { image: brand5 },
];

const COLLECTION = 'brands';

export async function fetchBrands(): Promise<BrandItem[]> {
  if (process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== 'true') {
    return FALLBACK_BRANDS;
  }

  try {
    const q = query(
      collection(db, COLLECTION),
      orderBy('createdAt', 'asc')
    );

    const snap = await getDocs(q);
    if (snap.empty) return FALLBACK_BRANDS;

    const valid = snap.docs
      .map(d => d.data().image)
      .filter((img): img is string => typeof img === 'string' && img.trim() !== '');

    return valid.length > 0
      ? valid.map(image => ({ image }))
      : FALLBACK_BRANDS;

  } catch (e) {
    console.error('fetchBrands error', e);
    return FALLBACK_BRANDS;
  }
}
