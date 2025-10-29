import { Theme } from "./types/theme.enum";

// Support email
export const CONTACT_EMAIL = "support@brrrmatch.com";

// Site metadata
export const SITE_TITLE = "Next.js SST Starter";
export const SITE_DESCRIPTION = "A modern Next.js starter with SST, AWS SES, and TypeScript";

// Toaster config
export const TOASTER_DURATION_MS = 6000;

// Security headers
export const SECURITY_HEADERS = {
  CSP: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://assets.calendly.com; img-src 'self' data: https: https://www.facebook.com; font-src 'self' https://assets.calendly.com; connect-src 'self' https://calendly.com https://*.calendly.com https://www.facebook.com https://*.facebook.com; frame-src https://calendly.com;",
  HSTS: "max-age=31536000; includeSubDomains",
  X_FRAME_OPTIONS: "SAMEORIGIN",
  X_CONTENT_TYPE_OPTIONS: "nosniff",
  REFERRER_POLICY: "strict-origin-when-cross-origin",
  PERMISSIONS_POLICY: "camera=(), microphone=(), geolocation=(), payment=*",
};

export const DEFAULT_THEME = Theme.DARK;
