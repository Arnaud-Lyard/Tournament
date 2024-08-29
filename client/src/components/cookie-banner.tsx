'use client';

import Link from 'next/link';
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';
import { useState, useEffect } from 'react';
import { useDictionary } from '@/providers/dictionary-provider';

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const dictionary = useDictionary();

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);
    setCookieConsent(storedCookieConsent);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage('cookie_consent', cookieConsent);
    }
  }, [cookieConsent]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                  fixed bottom-0 left-0 right-0 
                  flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                  bg-gray-700 rounded-lg shadow z-50
                  ${cookieConsent !== null ? 'hidden' : 'flex'}`}
    >
      <div className="text-center text-white">
        <Link href="/privacy-policy">
          <p>
            {dictionary.cookies.partOne}
            <span className="font-bold text-sky-400">cookies</span>{' '}
            {dictionary.cookies.partTwo}
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-gray-900 px-5 py-2 text-white rounded-lg"
          onClick={() => setCookieConsent(true)}
        >
          {dictionary.cookies.button}
        </button>
      </div>
    </div>
  );
}
