import { getServerBrand } from '@gitroom/helpers/utils/brand';

// Goes in <head>. Hands the brand to the browser before React starts, sets the
// favicon, and repaints the accent colour when one is configured.
export const BrandHead = () => {
  const brand = getServerBrand();
  const json = JSON.stringify(brand).replace(/</g, '\\u003c');
  const dark = brand.accent;
  const light = brand.accentLight || brand.accent;
  const darkText = brand.accentText || '#ffffff';
  const lightText = brand.accentLightText || brand.accentText || '#ffffff';
  const css = dark
    ? `
:root .dark{--new-btn-primary:${dark};--new-btn-primary-text:${darkText};--color-forth:${dark};--color-seventh:${dark};--new-table-text-focused:${dark};}
:root .light{--new-btn-primary:${light};--new-btn-primary-text:${lightText};--color-forth:${light};--color-seventh:${light};--new-table-text-focused:${light};--new-textItemFocused:${light};--new-boxFocused:color-mix(in srgb, ${light} 12%, #ffffff);--new-back-drop:#111111;}
.bg-btnPrimary,.bg-btnPrimary *,.bg-forth,.bg-forth *,.bg-seventh,.bg-seventh *{color:var(--new-btn-primary-text) !important;}
.bg-btnPrimary:disabled,.bg-btnPrimary:disabled *{color:inherit !important;}
`
    : '';
  return (
    <>
      <link rel="icon" href={brand.favicon || '/favicon.ico'} sizes="any" />
      <script
        dangerouslySetInnerHTML={{ __html: `window.__BRAND__=${json};` }}
      />
      {!!css && <style dangerouslySetInnerHTML={{ __html: css }} />}
    </>
  );
};
