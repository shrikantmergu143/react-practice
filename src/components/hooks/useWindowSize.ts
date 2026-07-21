/* eslint-disable prettier/prettier */

import { useCallback, useEffect, useMemo, useState } from "react";

type WindowSize = {
  width: number;
  height: number;

  // Device
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;

  // Resolution
  isHD: boolean;
  isFullHD: boolean;
  is2K: boolean;
  isQHD: boolean;
  is4K: boolean;
  is8K: boolean;
  isTabView: boolean;
};
type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
const getWindowData = (): WindowSize => {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,

      isMobile: false,
      isTablet: false,
      isLaptop: false,
      isDesktop: false,
      isLargeDesktop: false,

      isHD: false,
      isFullHD: false,
      is2K: false,
      isQHD: false,
      is4K: false,
      is8K: false,
      isTabView: false,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,

    // Device
    isMobile: width < 640,
    isTablet: width >= 640 && width <= 1024,
    isLaptop: width >= 1024 && width < 1280,
    isDesktop: width >= 1280 && width < 1536,
    isLargeDesktop: width >= 1536,
    isTabView: width >= 768,

    // Resolution
    isHD: width >= 1280 && height >= 720,
    isFullHD: width >= 1920 && height >= 1080,
    is2K: width >= 2048 && height >= 1080,
    isQHD: width >= 2560 && height >= 1240,
    is4K: width >= 3840 && height >= 2160,
    is8K: width >= 7680 && height >= 4320,
  };
};

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowData);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowData());
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getInputSize = useCallback(
    (size: Size = "md"): Size => {
      if (windowSize.is4K) {
        return "3xl";
      }

      if (windowSize.isQHD) {
        return "2xl";
      }

      if (windowSize.is2K || windowSize.isFullHD) {
        return "xl";
      }

      if (windowSize.isDesktop) {
        return size === "sm" ? "md" : size;
      }

      if (windowSize.isLaptop) {
        return size;
      }

      if (windowSize.isTablet) {
        if (size === "3xl") return "2xl";
        if (size === "2xl") return "xl";
        return size;
      }

      // Mobile
      if (size === "3xl") return "xl";
      if (size === "2xl") return "lg";
      if (size === "xl") return "md";

      return size;
    },
    [windowSize],
  );
    const iconScale = useMemo(() => {
    if (windowSize.is8K) return 2.2;
    if (windowSize.is4K) return 1.8;
    if (windowSize.isQHD) return 1.5;
    if (windowSize.is2K) return 1.4;
    if (windowSize.isFullHD) return 1.25;
    if (windowSize.isDesktop) return 1.15;

    return 1;
  }, [
    windowSize.is8K,
    windowSize.is4K,
    windowSize.isQHD,
    windowSize.is2K,
    windowSize.isFullHD,
    windowSize.isDesktop,
  ]);
  const getIconSize = useCallback(
    (baseSize: number) => Math.round(baseSize * iconScale),
    [iconScale],
  );

  return {
    ...windowSize,
    getIconSize,
    getInputSize,
  };
}
