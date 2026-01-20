// src/api/siteStats.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

export type SiteStats = {
  projectsDelivered: number;
  happyClients: number;
};

const FALLBACK_STATS: SiteStats = {
  projectsDelivered: 200,
  happyClients: 50,
};

/**
 * Simple caching: key + TTL (ms). We store in sessionStorage so
 * same browser session doesn't re-fetch repeatedly.
 */
const CACHE_KEY = 'siteStats_v1';
const CACHE_TTL_MS = 15_000; // 15 seconds (adjust if you want more frequent updates)

function readCached(): SiteStats | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; data: SiteStats };
    if (Date.now() - parsed.ts < CACHE_TTL_MS) return parsed.data;
    return null;
  } catch {
    return null;
  }
}

function writeCached(data: SiteStats) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // ignore
  }
}

/**
 * getSiteStats(): used by your client components (HomeStatsSection).
 *
 * Behavior:
 * - If NEXT_PUBLIC_FIREBASE_ENABLED != 'true' -> return fallback immediately
 * - If enabled -> try Firestore doc: collection 'siteData', doc 'siteStats'
 * - Always return a SiteStats object (no any)
 */
export async function getSiteStats(): Promise<SiteStats> {
  // 1) fast cached response if available
  const cached = readCached();
  if (cached) return cached;

  // 2) If firebase not enabled, return FALLBACK
  if (process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== 'true') {
    // write to cache for tiny TTL so repeated calls are fast
    writeCached(FALLBACK_STATS);
    return FALLBACK_STATS;
  }

  // 3) Try fetch from Firestore
  try {
    const snap = await getDoc(doc(db, 'siteData', 'siteStats'));
    if (!snap.exists()) {
      writeCached(FALLBACK_STATS);
      return FALLBACK_STATS;
    }

    const data = snap.data() as { projectsDelivered?: number; happyClients?: number };

    const result: SiteStats = {
      projectsDelivered: typeof data.projectsDelivered === 'number' ? data.projectsDelivered : FALLBACK_STATS.projectsDelivered,
      happyClients: typeof data.happyClients === 'number' ? data.happyClients : FALLBACK_STATS.happyClients,
    };

    writeCached(result);
    return result;
  } catch (err) {
    // if error, return fallback but don't crash the UI
    console.error('Error fetching siteStats from Firestore', err);
    writeCached(FALLBACK_STATS);
    return FALLBACK_STATS;
  }
}
