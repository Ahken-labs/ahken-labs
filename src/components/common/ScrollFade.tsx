'use client';

import useResponsivePadding from "@/hooks/useResponsivePadding";

export default function ScrollFade({ background = '#FFFFFF' }) {
  const { isMobile, isTablet } = useResponsivePadding();
  return (
    <>
      {/* LEFT FADE */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: isMobile? 20 : isTablet? 40 :50,
          zIndex: 2,
          pointerEvents: 'none',
          background: `linear-gradient(to right, ${background} 0%, transparent 100%)`,
        }}
      />

      {/* RIGHT FADE */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: isMobile? 20 : isTablet? 40 :50,
          zIndex: 2,
          pointerEvents: 'none',
          background: `linear-gradient(to left, ${background} 0%, transparent 100%)`,
        }}
      />
    </>
  );
}
