import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import {
    BreakpointKey,
    getCurrentBreakpoint,
    getResponsiveValue,
    isBreakpointDown,
    isBreakpointUp,
    isPhone,
    isTablet,
    RESPONSIVE_FONTS,
    RESPONSIVE_SPACING,
} from '../utils/responsive';

interface ResponsiveScreen {
  width: number;
  height: number;
  breakpoint: BreakpointKey;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
  isTablet: boolean;
  isPhone: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  spacing: typeof RESPONSIVE_SPACING;
  fonts: typeof RESPONSIVE_FONTS;
  up: (breakpoint: BreakpointKey) => boolean;
  down: (breakpoint: BreakpointKey) => boolean;
  getValue: <T>(values: Partial<Record<BreakpointKey, T>>) => T | undefined;
}

export function useResponsiveScreen(): ResponsiveScreen {
  const { width, height } = useWindowDimensions();
  const [dimensions, setDimensions] = useState({ width, height });

  useEffect(() => {
    setDimensions({ width, height });
  }, [width, height]);

  const breakpoint = getCurrentBreakpoint(dimensions.width);
  const isLandscape = dimensions.width > dimensions.height;

  return {
    width: dimensions.width,
    height: dimensions.height,
    breakpoint,
    isSmall: breakpoint === 'small',
    isMedium: breakpoint === 'medium',
    isLarge: breakpoint === 'large',
    isXLarge: breakpoint === 'xlarge',
    isTablet: isTablet(dimensions.width),
    isPhone: isPhone(dimensions.width),
    isLandscape,
    isPortrait: !isLandscape,
    spacing: RESPONSIVE_SPACING,
    fonts: RESPONSIVE_FONTS,
    up: (bp: BreakpointKey) => isBreakpointUp(bp, dimensions.width),
    down: (bp: BreakpointKey) => isBreakpointDown(bp, dimensions.width),
    getValue: <T>(values: Partial<Record<BreakpointKey, T>>) => 
      getResponsiveValue(values, dimensions.width),
  };
}

// Helper hook for responsive values
export function useResponsiveValue<T>(
  values: Partial<Record<BreakpointKey, T>>
): T | undefined {
  const { getValue } = useResponsiveScreen();
  return getValue(values);
}

// Helper hook for responsive styles
export function useResponsiveStyles<T>(
  styleGenerator: (screen: ResponsiveScreen) => T
): T {
  const screen = useResponsiveScreen();
  return styleGenerator(screen);
} 