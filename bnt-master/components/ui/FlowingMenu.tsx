'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

import './FlowingMenu.css';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  speed?: number;
  textColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

interface FlowingMenuProps {
  items: MenuItemProps[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = 'transparent',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#0A0E14',
  borderColor = 'rgba(255,255,255,0.1)'
}: FlowingMenuProps) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const animationDefaults = { duration: 0.5, ease: 'expo' };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    const timer = setTimeout(calculateRepetitions, 50);
    window.addEventListener('resize', calculateRepetitions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateRepetitions);
    };
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;
      if (animationRef.current) animationRef.current.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };
    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [text, image, repetitions, speed]);

  const handleTap = () => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    const next = !isActive;
    setIsActive(next);

    if (next) {
      gsap
        .timeline({ defaults: animationDefaults })
        .set(marqueeRef.current, { y: '101%' }, 0)
        .set(marqueeInnerRef.current, { y: '-101%' }, 0)
        .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    } else {
      gsap
        .timeline({ defaults: animationDefaults })
        .to(marqueeRef.current, { y: '101%' }, 0)
        .to(marqueeInnerRef.current, { y: '-101%' }, 0);
    }
  };

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <a
        className="menu__item-link"
        href={link}
        onClick={e => {
          if (!isActive) {
            e.preventDefault();
            handleTap();
          } else {
            // Drugie kliknięcie - nawigacja Next.js (jeśli to wewnętrzny link)
            if (link.startsWith('/')) {
              e.preventDefault();
              router.push(link);
            }
          }
        }}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
