/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
  interface ImportMeta {
    readonly env: Record<string, string | undefined>;
  }
}

/**
 * Initializes Google Search Console Meta tag and Google Analytics (gtag.js) tracking.
 * Safely handles empty or unconfigured environment variables.
 */
export function initAnalytics() {
  const trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  const siteVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;

  // 1. Google Search Console Site Verification Setup
  if (siteVerification && siteVerification !== '%VITE_GOOGLE_SITE_VERIFICATION%') {
    // Check if the meta tag is already present in the head (either static or static fallback)
    let meta = document.querySelector('meta[name="google-site-verification"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'google-site-verification');
      meta.setAttribute('content', siteVerification);
      document.head.appendChild(meta);
    } else {
      // If it exists but is still the unreplaced template placeholder, update it
      const currentContent = meta.getAttribute('content');
      if (currentContent === '%VITE_GOOGLE_SITE_VERIFICATION%' || !currentContent) {
        meta.setAttribute('content', siteVerification);
      }
    }
  }

  // 2. Google Analytics (gtag.js) Dynamic Integration
  if (trackingId && trackingId !== '%VITE_GOOGLE_ANALYTICS_ID%') {
    const scriptId = 'google-analytics-gtag';
    
    // Prevent double-injection
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', trackingId, {
        page_path: window.location.pathname,
        send_page_view: true,
      });
      
      console.log(`[Google Analytics] Configured successfully for ID: ${trackingId}`);
    }
  }
}

/**
 * Tracks individual screen view events in our Single Page Application (SPA).
 * @param screenName - The active section or tab of the application
 */
export function trackScreenView(screenName: string) {
  const trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  if (trackingId && trackingId !== '%VITE_GOOGLE_ANALYTICS_ID%' && window.gtag) {
    window.gtag('event', 'screen_view', {
      app_name: 'PLIDA B2 Italian Trainer',
      screen_name: screenName,
      page_title: `PLIDA B2 Trainer - ${screenName.toUpperCase()}`,
      page_path: `/${screenName}`,
    });
    console.log(`[Google Analytics] Tracked screen view: ${screenName}`);
  }
}
