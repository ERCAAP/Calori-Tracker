export const Colors = {
  primary: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#FF6B35', // Main brand color (from Cal AI design)
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
    gradient: ['#FF6B35', '#FF8E53'],
  },
  secondary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
    gradient: ['#0EA5E9', '#3B82F6'],
  },
  background: {
    primary: '#F7F8FA', // Cal AI app background
    secondary: '#FFFFFF',
    card: '#FFFFFF',
    subtle: '#F1F3F4', // For subtle backgrounds
  },
  text: {
    primary: '#1F2937', // Darker for better contrast
    secondary: '#6B7280', // Cal AI secondary text color
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
    placeholder: '#D1D5DB',
  },
  status: {
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    error: '#EF4444', // Red
    info: '#3B82F6', // Blue
  },
  border: {
    light: '#F1F3F4', // Very subtle
    medium: '#E5E7EB',
    dark: '#D1D5DB',
  },
  // Cal AI specific colors for macros
  macros: {
    protein: '#EF4444', // Red for protein
    carbs: '#F59E0B', // Orange for carbs
    fat: '#3B82F6', // Blue for fat
    fiber: '#10B981', // Green for fiber
  },
  // Chart and progress colors
  chart: {
    primary: '#FF6B35',
    secondary: '#0EA5E9',
    tertiary: '#10B981',
    quaternary: '#F59E0B',
    background: '#F8FAFC',
    grid: '#F1F3F4',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

export const Shadow = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
}; 