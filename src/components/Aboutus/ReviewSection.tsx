'use client';

import Image from 'next/image';
import CartBox from '@/components/common/CartBox';
import useScale from '@/hooks/useScale';
import useEdgeAutoScroll from '@/hooks/useEdgeAutoScroll';
import { reviewData } from '@/api/reviewData';
import starIcon from '@/assets/icons/star.svg';

export default function ReviewSection() {
  const scale = useScale();
  const { containerRef, handleMouseMove, stopScroll } =
    useEdgeAutoScroll(14, 120);

  return (
    <section
      style={{
        marginTop: 60,
        marginLeft: 200 * scale,
        marginRight: 200 * scale,
        position: 'relative',
      }}
    >
      {/* HEADING */}
      <h2
        style={{
          fontSize: 40 * scale,
          fontWeight: 700,
          color: '#111111',
          textAlign: 'center',
        }}
      >
        What our customers say
      </h2>

      {/* SCROLL WRAPPER */}
      <div
        style={{
          marginTop: 40,
          position: 'relative',
        }}
      >
        {/* LEFT FADE */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            zIndex: 2,
            pointerEvents: 'none',
            background:
              'linear-gradient(to right, #FFFFFF 0%, transparent 100%)',
          }}
        />

        {/* RIGHT FADE */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 120 * scale,
            zIndex: 2,
            pointerEvents: 'none',
            background:
              'linear-gradient(to left, #FFFFFF 0%, transparent 100%)',
          }}
        />

        {/* SCROLLABLE */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={stopScroll}
          className="flex gap-6 overflow-x-scroll scrollbar-hide"
        >
          {reviewData.map(item => (
            <CartBox
              key={item.id}
              width={489.33 * scale}
              borderRadius={24}
              backgroundColor="#F7F7F7"
              paddingTop={24}
              paddingBottom={24}
              paddingLeft={24}
              paddingRight={24}
              style={{ flexShrink: 0, }}
            >
              {/* USER */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  style={{
                    borderRadius: 100,
                    marginRight: 14,
                  }}
                />

                <span
                  style={{
                    fontSize: 20 * scale,
                    fontWeight: 500,
                    color: '#242424',
                  }}
                >
                  {item.name}
                </span>
              </div>

              {/* STARS */}
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                  marginTop: 20,
                }}
              >
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Image
                    key={i}
                    src={starIcon}
                    alt="star"
                    width={20}
                    height={20}
                  />
                ))}
              </div>

              {/* FEEDBACK */}
              <p
                style={{
                  marginTop: 12,
                  fontSize: 16 * scale,
                  fontWeight: 400,
                  color: '#343434',
                }}
              >
                {item.feedback}
              </p>

              {/* ROLE */}
              <p
                style={{
                  marginTop: 20,
                  fontSize: 16 * scale,
                  fontWeight: 400,
                  color: '#58585B',
                }}
              >
                {item.role}
              </p>
            </CartBox>
          ))}
        </div>
      </div>
    </section>
  );
}
