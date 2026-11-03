'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef = null,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    // Dzielimy na słowa, żeby nie łamać wpół słów przy zawijaniu
    return text.split(' ').map((word, wordIndex, wordsArray) => (
      <React.Fragment key={wordIndex}>
        <span className="scroll-float-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, index) => (
            <span className="char" key={index} style={{ display: 'inline-block' }}>
              {char}
            </span>
          ))}
        </span>
        {/* Dodajemy spację po każdym słowie, z wyjątkiem ostatniego */}
        {wordIndex < wordsArray.length - 1 ? ' ' : ''}
      </React.Fragment>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll('.char');
    
    // We remove the prefers-reduced-motion check to ensure the animation runs on all mobile devices
    // as requested by the user, since some mobile OS aggressively enable it.

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
