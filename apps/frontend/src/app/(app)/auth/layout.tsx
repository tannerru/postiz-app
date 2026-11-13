import { getServerBrand } from '@gitroom/helpers/utils/brand';
import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { TestimonialComponent } from '@gitroom/frontend/components/auth/testimonial.component';
import { AttributionComponent } from '@gitroom/frontend/components/auth/attribution.component';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();
  const brand = getServerBrand();

  return (
    <MantineWrapper>
      <Toaster />
      <div className="bg-[#0E0E0E] flex flex-1 p-[12px] gap-[12px] min-h-screen w-screen text-white">
        {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
        <ReturnUrlComponent />
        <AttributionComponent />
        <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[12px] text-white p-[12px] bg-[#1A1919]">
          <div className="w-full max-w-[440px] mx-auto justify-center gap-[20px] h-full flex flex-col text-white">
            <LogoTextComponent />
            <div className="flex">{children}</div>
            {brand.whiteLabel && (
              <div className="text-[12px] text-[#9C9C9C] flex gap-[12px] flex-wrap">
                {!!brand.company && (
                  <span>
                    {brand.companyUrl ? (
                      <a
                        href={brand.companyUrl}
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {brand.company}
                      </a>
                    ) : (
                      brand.company
                    )}
                  </span>
                )}
                {!!brand.sourceUrl && (
                  <a
                    href={brand.sourceUrl}
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open source (AGPL-3.0)
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="text-[36px] flex-1 pt-[88px] hidden lg:flex flex-col items-center">
          {brand.whiteLabel ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-[28px] pb-[88px] text-center px-[40px]">
              {!!brand.icon && (
                <img
                  src={brand.icon}
                  alt={brand.name}
                  className="w-[200px] h-[200px] object-contain"
                />
              )}
              <div className="text-[44px] font-[700] leading-[1.1]">
                {brand.name}
              </div>
              {!!brand.tagline && (
                <div className="text-[20px] text-[#9C9C9C] max-w-[520px]">
                  {brand.tagline}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="text-center">
                Over <span className="text-[42px] text-[#FC69FF]">20,000+</span>{' '}
                Entrepreneurs use
                <br />
                Postiz To Grow Their Social Presence
              </div>
              <TestimonialComponent />
            </>
          )}
        </div>
      </div>
    </MantineWrapper>
  );
}
