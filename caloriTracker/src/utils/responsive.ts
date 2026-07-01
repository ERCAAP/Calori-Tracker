import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Breakpoints for different screen sizes
export const BREAKPOINTS = {
  small: 0,
  medium: 375,
  large: 768,
  xlarge: 1024,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

// Get current breakpoint based on screen width
export function getCurrentBreakpoint(width: number = SCREEN_WIDTH): BreakpointKey {
  if (width >= BREAKPOINTS.xlarge) return 'xlarge';
  if (width >= BREAKPOINTS.large) return 'large';
  if (width >= BREAKPOINTS.medium) return 'medium';
  return 'small';
}

// Check if current screen matches breakpoint
export function isBreakpoint(breakpoint: BreakpointKey, width: number = SCREEN_WIDTH): boolean {
  return getCurrentBreakpoint(width) === breakpoint;
}

// Check if screen is at least the specified breakpoint
export function isBreakpointUp(breakpoint: BreakpointKey, width: number = SCREEN_WIDTH): boolean {
  return width >= BREAKPOINTS[breakpoint];
}

// Check if screen is below the specified breakpoint
export function isBreakpointDown(breakpoint: BreakpointKey, width: number = SCREEN_WIDTH): boolean {
  return width < BREAKPOINTS[breakpoint];
}

// Responsive width based on percentage
export function widthPercentageToDP(widthPercent: number): number {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * widthPercent) / 100);
}

// Responsive height based on percentage
export function heightPercentageToDP(heightPercent: number): number {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * heightPercent) / 100);
}

// Scale font size based on screen width
export function scaleFont(size: number): number {
  const scale = SCREEN_WIDTH / 375; // Base width (iPhone X)
  const newSize = size * scale;
  
  // Ensure font doesn't become too small or too large
  return Math.max(newSize, size * 0.8);
}

// Scale spacing/dimensions based on screen width
export function scaleSize(size: number): number {
  const scale = SCREEN_WIDTH / 375;
  return PixelRatio.roundToNearestPixel(size * scale);
}

// Get responsive value based on breakpoints
export function getResponsiveValue<T>(
  values: Partial<Record<BreakpointKey, T>>,
  width: number = SCREEN_WIDTH
): T | undefined {
  const currentBreakpoint = getCurrentBreakpoint(width);
  const orderedBreakpoints: BreakpointKey[] = ['xlarge', 'large', 'medium', 'small'];
  
  // Find the best matching value
  for (const bp of orderedBreakpoints) {
    if (width >= BREAKPOINTS[bp] && values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  // Fallback to the smallest available value
  return values.small || values.medium || values.large || values.xlarge;
}

// Device type detection
export function isTablet(width: number = SCREEN_WIDTH): boolean {
  return width >= BREAKPOINTS.large;
}

export function isPhone(width: number = SCREEN_WIDTH): boolean {
  return width < BREAKPOINTS.large;
}

// Screen size utilities
export const SCREEN_UTILS = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallScreen: SCREEN_WIDTH < BREAKPOINTS.medium,
  isMediumScreen: SCREEN_WIDTH >= BREAKPOINTS.medium && SCREEN_WIDTH < BREAKPOINTS.large,
  isLargeScreen: SCREEN_WIDTH >= BREAKPOINTS.large,
  isTablet: isTablet(),
  isPhone: isPhone(),
  aspectRatio: SCREEN_WIDTH / SCREEN_HEIGHT,
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
  isPortrait: SCREEN_HEIGHT > SCREEN_WIDTH,
};

// Responsive padding/margin helpers
export const RESPONSIVE_SPACING = {
  xs: getResponsiveValue({ small: 4, medium: 6, large: 8 }),
  sm: getResponsiveValue({ small: 8, medium: 12, large: 16 }),
  md: getResponsiveValue({ small: 16, medium: 20, large: 24 }),
  lg: getResponsiveValue({ small: 24, medium: 28, large: 32 }),
  xl: getResponsiveValue({ small: 32, medium: 40, large: 48 }),
  xxl: getResponsiveValue({ small: 48, medium: 56, large: 64 }),
};

// Responsive font sizes
export const RESPONSIVE_FONTS = {
  xs: scaleFont(12),
  sm: scaleFont(14),
  md: scaleFont(16),
  lg: scaleFont(18),
  xl: scaleFont(20),
  '2xl': scaleFont(24),
  '3xl': scaleFont(30),
  '4xl': scaleFont(36),
  '5xl': scaleFont(48),
};

// Export shortcuts
export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;
export const rf = scaleFont;
export const rs = scaleSize; 