"use client";

import { useEffect, useState } from "react";

/**
 * Hook to check if Calendly script is loaded
 * @returns boolean indicating if Calendly is ready to use
 */
export const useCalendly = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (window.Calendly) {
      setIsLoaded(true);
      return;
    }

    // Poll for Calendly to be available
    let attempts = 0;
    const maxAttempts = 300; // 30 seconds with 100ms intervals

    const checkCalendly = setInterval(() => {
      attempts++;

      if (window.Calendly) {
        setIsLoaded(true);
        clearInterval(checkCalendly);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkCalendly);
        console.warn("Calendly script did not load within expected time");
      }
    }, 100);

    return () => {
      clearInterval(checkCalendly);
    };
  }, []);

  return isLoaded;
};
