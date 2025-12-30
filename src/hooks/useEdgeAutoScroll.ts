'use client';

import { useRef } from 'react';

type Direction = 'left' | 'right';

export default function useEdgeAutoScroll(speed = 18, edgeOffset = 120) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isAutoScrolling = useRef(false);

  const startScroll = (direction: Direction) => {
    if (isAutoScrolling.current) return;

    isAutoScrolling.current = true;

    const step = () => {
      const container = containerRef.current;
      if (!container) return;

      container.scrollLeft += direction === 'right' ? speed : -speed;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const stopScroll = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    isAutoScrolling.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;

    //  Only trigger auto scroll at edges
    if (x > rect.width - edgeOffset) {
      startScroll('right');
    } else if (x < edgeOffset) {
      startScroll('left');
    } else {
      stopScroll();
    }
  };

  return {
    containerRef,
    handleMouseMove,
    stopScroll,
  };
}
