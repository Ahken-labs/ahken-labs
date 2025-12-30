'use client';

import Image from 'next/image';
import useEdgeAutoScroll from '@/hooks/useEdgeAutoScroll';
import { brandsData } from '@/api/brandsData';
import useScale from '@/hooks/useScale';

export default function BrandsSection() {
  const scale = useScale();
  const { containerRef, handleMouseMove, stopScroll } =
    useEdgeAutoScroll(12, 120);

  return (
    <section style={{ marginTop: 64 }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: 40 * scale,
          fontWeight: 700,
          color: '#111111',
        }}
      >
        Some brands we&apos;ve worked with
      </h2>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopScroll}
        style={{
          marginTop: 64 * scale,
          paddingLeft: 200 * scale,
          paddingRight: 200 * scale,
          display: 'flex',
          gap: 64 * scale,
          overflowX: 'scroll',
        }}
        className="scrollbar-hide"
      >
        {brandsData.map(brand => (
          <Image
            key={brand.id}
            src={brand.image}
            alt="Brand"
            height={80 * scale}
          />
        ))}
      </div>
    </section>
  );
}
