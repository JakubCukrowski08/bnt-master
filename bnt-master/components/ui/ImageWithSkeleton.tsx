"use client";

import React, { useState, forwardRef } from "react";
import { Skeleton } from "./Skeleton";

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export const ImageWithSkeleton = forwardRef<HTMLImageElement, ImageWithSkeletonProps>(
  ({ wrapperClassName = "", className = "", alt, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div className={`relative overflow-hidden ${wrapperClassName}`}>
        {/* Shimmer Skeleton widoczny dopóki obrazek się nie załaduje */}
        {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}

        {/* Rzeczywisty obrazek */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...props}
          ref={(node) => {
            if (node?.complete) {
              setIsLoaded(true);
            }
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          alt={alt || ""}
          className={`${className} transition-opacity duration-500 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    );
  }
);

ImageWithSkeleton.displayName = "ImageWithSkeleton";
