// White-label settings. Every value comes from a BRAND_* environment variable
// read when the server starts, so one build can be rebranded per install.
// With no BRAND_NAME set, the app is plain Postiz and nothing here changes it.

export const UPSTREAM_NAME = 'Postiz';

export interface Brand {
  // Product name shown in titles, copy and emails
  name: string;
  whiteLabel: boolean;
  // Wide logo for dark surfaces (sign-in, connect pages)
  logo: string;
  // Square mark for the sidebar and small slots
  icon: string;
  favicon: string;
  // Line under the logo on the sign-in page
  tagline: string;
  // Company behind the install, linked from the sign-in page
  company: string;
  companyUrl: string;
  // Where this install's source code lives (AGPL-3.0, section 13)
  sourceUrl: string;
  // Accent colour and the text colour that sits on it, per theme
  accent: string;
  accentText: string;
  accentLight: string;
  accentLightText: string;
}

const HEX = /^#[0-9a-fA-F]{3,8}$/;
const color = (value?: string) => (value && HEX.test(value) ? value : '');
// Asset paths and links only: no quotes, brackets or spaces
const link = (value?: string) =>
  value && /^(\/|https?:\/\/)[^\s"'<>]*$/.test(value) ? value : '';
const text = (value?: string) => (value || '').replace(/[<>]/g, '').trim();

export const getServerBrand = (): Brand => {
  const name = text(process.env.BRAND_NAME);
  return {
    name: name || UPSTREAM_NAME,
    whiteLabel: !!name && name !== UPSTREAM_NAME,
    logo: link(process.env.BRAND_LOGO_URL),
    icon: link(process.env.BRAND_ICON_URL),
    favicon: link(process.env.BRAND_FAVICON_URL),
    tagline: text(process.env.BRAND_TAGLINE),
    company: text(process.env.BRAND_COMPANY),
    companyUrl: link(process.env.BRAND_COMPANY_URL),
    sourceUrl: link(process.env.BRAND_SOURCE_URL),
    accent: color(process.env.BRAND_ACCENT),
    accentText: color(process.env.BRAND_ACCENT_TEXT),
    accentLight: color(process.env.BRAND_ACCENT_LIGHT),
    accentLightText: color(process.env.BRAND_ACCENT_LIGHT_TEXT),
  };
};

// Works on the server and in the browser. The browser copy is written into
// the page head by BrandHead before React starts, so both sides agree.
export const getBrand = (): Brand => {
  if (typeof window === 'undefined') {
    return getServerBrand();
  }
  // @ts-ignore
  return window.__BRAND__ || { ...getServerBrand(), name: UPSTREAM_NAME };
};

export const brandName = () => getBrand().name;

// Swap the upstream product name for the brand name in a piece of copy.
// Web addresses (postiz.com) and package names (lowercase) are left alone.
export const brandText = (value: string): string => {
  const { name, whiteLabel } = getBrand();
  if (!whiteLabel || typeof value !== 'string' || !value.includes(UPSTREAM_NAME)) {
    return value;
  }
  return value.replace(/\bPostiz\b(?!\.com|\.pro)/g, name);
};
