'use client';

import { FC, ReactNode } from 'react';
import { getBrand } from '@gitroom/helpers/utils/brand';

// The wide logo. Falls back to the upstream artwork when no brand logo is set.
export const BrandLogo: FC<{ fallback: ReactNode; height?: number }> = ({
  fallback,
  height = 44,
}) => {
  const brand = getBrand();
  if (!brand.logo) {
    return <>{fallback}</>;
  }
  return (
    <img
      src={brand.logo}
      alt={brand.name}
      style={{
        height,
        width: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        alignSelf: 'flex-start',
      }}
    />
  );
};

// The square mark. Falls back to the upstream artwork when no icon is set.
export const BrandIcon: FC<{
  fallback: ReactNode;
  size?: number;
  className?: string;
}> = ({ fallback, size = 44, className }) => {
  const brand = getBrand();
  if (!brand.icon) {
    return <>{fallback}</>;
  }
  return (
    <img
      src={brand.icon}
      alt={brand.name}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
};
