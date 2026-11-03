"use client";

import * as React from "react";
import Link from "next/link";
import { useSpecularEffect } from "./SpecularEffect";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  isLoading?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", tone = "light", isLoading, children, disabled, href, ...props }, ref) => {
    // Wewnętrzny ref dla efektu WebGL
    const internalRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

    // Synchronizujemy przekazany ref z wewnętrznym
    React.useImperativeHandle(ref, () => internalRef.current as HTMLButtonElement | HTMLAnchorElement);

    const isPrimary = variant === "primary";
    const isDark = tone === "dark";
    const isDisabledOrLoading = disabled || isLoading;

    // Kolory efektu w zależności od wariantu
    const getEffectColors = () => {
      if (variant === "primary") {
        return { lineColor: '#E8EEF5', baseColor: '#1E3A5F' }; // Jasny połysk na granatowym tle
      }
      // Pogłębiony granat dla mocniejszego kontrastu
      return { lineColor: '#0A1E3F', baseColor: '#ffffff' }; 
    };
    const effectColors = getEffectColors();

    const isSmall = size === "sm";

    // Wywołanie hooka WebGL tylko dla głównych przycisków (primary), pomijane dla secondary/outline
    // aby uniknąć problemów z renderowaniem canvasu (broken icon) na białych przyciskach w Headerze
    const fxRef = useSpecularEffect({
      targetRef: internalRef,
      enabled: !isDisabledOrLoading && isPrimary,
      radius: 8,
      lineColor: effectColors.lineColor,
      baseColor: effectColors.baseColor,
      // Znacznie wyższa intensywność bazowa + boost dla małych przycisków
      intensity: (isDark && !isPrimary ? 2.5 : 1.8) * (isSmall ? 1.5 : 1),
      shineSize: 10,
      shineFade: 40,
      // Grubsza linia ułatwiająca zauważenie efektu na małym obwodzie
      thickness: (isDark && !isPrimary ? 4.0 : 3.2) + (isSmall ? 1.0 : 0),
      speed: 0.35,
      followMouse: true,
      autoAnimate: false,
    });

    // Bazowe klasy dla każdego przycisku
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-body font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    // Warianty (kolory)
    const variants = {
      primary: "relative overflow-visible bg-brand-primary text-white border border-[#2c4f82]", 
      secondary: "relative overflow-visible bg-white hover:bg-brand-surface text-brand-text border border-brand-border",
      outline: "relative overflow-visible bg-transparent hover:bg-brand-surface text-brand-text border border-brand-border",
    };

    // Rozmiary (korzystamy z bazy 8px)
    const sizes = {
      sm: "py-[11px] px-4 text-small-desktop leading-none", // 11+11+14 = 36px
      md: "py-[14px] px-6 text-body-medium leading-none", // 14+14+16 = 44px
      lg: "py-[17px] px-8 text-[1.125rem] leading-none", // 17+17+18 = 52px
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    // Zawartość wspólna (żeby tekst i spinner miały wyższy z-index niż canvas z efektem)
    const content = (
      <>
        {fxRef && (
          <span ref={fxRef} className="absolute -inset-5 pointer-events-none" aria-hidden="true" />
        )}
        <span className="relative z-10 flex items-center justify-center pointer-events-none">
          {isLoading && (
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {children}
        </span>
      </>
    );

    if (href) {
      return (
        <Link 
          href={href} 
          className={classes} 
          ref={internalRef as React.Ref<HTMLAnchorElement>} 
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={internalRef as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={isDisabledOrLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
