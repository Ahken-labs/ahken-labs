'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
    containerRef: React.RefObject<HTMLDivElement | null>;
};

const MAX_DOTS = 10;

export default function CarouselDots({ containerRef }: Props) {
    const [dotCount, setDotCount] = useState(0);
    const [activeDot, setActiveDot] = useState(0);

    const cardWidthRef = useRef(1);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const update = () => {
            const items = container.querySelectorAll<HTMLElement>('[data-carousel-item]');
            const first = items[0];

            if (!first || items.length === 0) {
                setDotCount(0);
                return;
            }

            const style = getComputedStyle(first);
            const marginRight = parseFloat(style.marginRight || '0');
            cardWidthRef.current = first.offsetWidth + marginRight;

            setDotCount(Math.min(items.length, MAX_DOTS));
        };

        const onScroll = () => {
            const scrollLeft = container.scrollLeft;
            const rawIndex = Math.round(scrollLeft / cardWidthRef.current);

            // Clamp index so it NEVER exceeds last dot
            const maxIndex = Math.max(0, dotCount - 1);
            const clampedIndex = Math.min(rawIndex, maxIndex);

            setActiveDot(clampedIndex);
        };

        update();
        onScroll();

        container.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            container.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
        };
    }, [containerRef, dotCount]);

    if (dotCount <= 1) return null;

    const scrollToDot = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTo({
            left: index * cardWidthRef.current,
            behavior: 'smooth',
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 10 }}>
                {Array.from({ length: dotCount }).map((_, i) => {
                    const active = i === activeDot;

                    return (
                        <button
                            key={i}
                            onClick={() => scrollToDot(i)}
                            aria-label={`Go to review ${i + 1}`}
                            style={{
                                width: active ? 9 : 8,
                                height: active ? 9 : 8,
                                borderRadius: 999,
                                backgroundColor: active
                                    ? '#1C1C89'
                                    : 'rgba(0,0,0,0.25)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 250ms ease',
                                transform: active ? 'scale(1.1)' : 'scale(1)',
                                userSelect: 'none',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
