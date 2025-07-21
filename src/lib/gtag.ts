// lib/gtag.ts
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
export const GA_TRACKING_ID = 'G-L2GV24L652';

// Function to log pageviews
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
