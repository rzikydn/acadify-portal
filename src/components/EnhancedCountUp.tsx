// src/components/EnhancedCountUp.tsx
import React, { useState, useEffect, useRef } from 'react';

interface EnhancedCountUpProps {
  from?: number;
  to: number;
  duration?: number;
  separator?: string;
  suffix?: string;
  prefix?: string;
  className?: string;
  threshold?: number; // Persentase visibility yang dibutuhkan untuk trigger (0-1)
}

const EnhancedCountUp: React.FC<EnhancedCountUpProps> = ({
  from = 0,
  to,
  duration = 2000,
  separator = '',
  suffix = '',
  prefix = '',
  className = '',
  threshold = 0.3
}) => {
  const [count, setCount] = useState(from);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Format number dengan separator
  const formatNumber = (num: number): string => {
    const rounded = Math.floor(num);
    let formatted = rounded.toString();
    
    if (separator) {
      formatted = rounded.toLocaleString('id-ID');
    }
    
    return `${prefix}${formatted}${suffix}`;
  };

  // Intersection Observer untuk detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation ketika element keluar dari viewport
          setIsVisible(false);
          setHasAnimated(false);
          setCount(from);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, from]);

  // Animasi count up
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      
      const startTime = Date.now();
      const startValue = from;
      const endValue = to;
      const totalChange = endValue - startValue;

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = startValue + (totalChange * easeOut);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, hasAnimated, from, to, duration]);

  return (
    <div ref={elementRef} className={className}>
      {formatNumber(count)}
    </div>
  );
};

export default EnhancedCountUp;