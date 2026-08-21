'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface GeoState {
  countryCode: string;   // ISO-3166 lowercase, e.g. "in"
  loading: boolean;
}

const GeoContext = createContext<GeoState>({ countryCode: 'in', loading: true });

/**
 * Provides the visitor's country code (via ipapi.co) to all descendants.
 * Fetches once, caches in context — eliminates triple duplicate API calls.
 */
export function GeoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GeoState>({ countryCode: 'in', loading: true });

  useEffect(() => {
    let cancelled = false;
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.country_code) {
          setState({ countryCode: data.country_code.toLowerCase(), loading: false });
        } else {
          setState((s) => ({ ...s, loading: false }));
        }
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      });
    return () => { cancelled = true; };
  }, []);

  return <GeoContext value={state}>{children}</GeoContext>;
}

/** Hook to read the visitor's detected country code */
export function useGeo() {
  return useContext(GeoContext);
}
