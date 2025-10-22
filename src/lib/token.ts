"use client";
import { useSession } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

export function useAuthToken() {
  const { session, isLoaded } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !session) {
      setToken(null);
      return;
    }

    session.getToken()
      .then(setToken)
      .catch(() => setToken(null));
  }, [session, isLoaded]);

  return token;
}


