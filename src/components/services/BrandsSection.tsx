'use client';

import useEdgeAutoScroll from '@/hooks/useEdgeAutoScroll';
import { fetchBrands, FALLBACK_BRANDS } from '@/api/brandsData';
import { useEffect, useState } from 'react';
import type { BrandItem } from '@/api/brandsData';
import useScale from '@/hooks/useScale';
import useResponsivePadding from '@/hooks/useResponsivePadding';
import ScrollFade from '../common/ScrollFade';

export default function BrandsSection() {
  const scale = useScale();
  const { containerRef, handleMouseMove, stopScroll } =
    useEdgeAutoScroll(12, 120);
  const { isDesktop, paddingLR, isTablet } = useResponsivePadding();

  const sectionTitleSize = isDesktop ? 40 : isTablet ? 28 : 20;
  const sectionPaddingTop = isDesktop ? 64 : 40;
  const imagepaddingTop = isDesktop ? 40 : 30;
  const imageheight = isDesktop ? 80 : isTablet ? 60 : 50;
  const [brands, setBrands] = useState<BrandItem[]>(FALLBACK_BRANDS);
  useEffect(() => {
    fetchBrands().then(setBrands);
  }, []);

  return (
    <section style={{ marginTop: sectionPaddingTop }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: sectionTitleSize,
          fontWeight: 700,
          color: '#111111',
        }}
      >
        Some brands we&apos;ve worked with
      </h2>
      <div
        style={{
          marginTop: imagepaddingTop,
          position: 'relative',
        }}
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={stopScroll}
          style={{
            marginLeft: isDesktop ? paddingLR : 20,
            marginRight: isDesktop ? paddingLR : 20,
            display: 'flex',
            gap: 64 * scale,
            overflowX: 'scroll',
            userSelect: 'none',
          }}
          className="scrollbar-hide"
        >
          <ScrollFade />
          {brands.map((brand) => {
            const src =
              typeof brand.image === 'string'
                ? brand.image
                : brand.image.src;
            return (
              //eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt="Brand"
                style={{
                  height: imageheight,
                  width: 'auto',
                  display: 'block',
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
