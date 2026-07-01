import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { BorderRadius, Colors, Shadow, Spacing } from '../constants/Colors';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  style,
  onPress,
  disabled = false,
}: CardProps) {
  const paddingStyleMap = {
    none: styles.paddingNone,
    sm: styles.paddingSm,
    md: styles.paddingMd,
    lg: styles.paddingLg,
  };

  const cardStyles = [
    styles.base,
    styles[variant],
    paddingStyleMap[padding],
    disabled && styles.disabled,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={cardStyles}
        activeOpacity={0.95}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
  },
  default: {
    ...Shadow.md,
  },
  elevated: {
    ...Shadow.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    ...Shadow.sm,
  },
  flat: {
    backgroundColor: Colors.background.primary,
  },
  paddingNone: {
    padding: 0,
  },
  paddingSm: {
    padding: Spacing.md,
  },
  paddingMd: {
    padding: Spacing.lg,
  },
  paddingLg: {
    padding: Spacing.xl,
  },
  disabled: {
    opacity: 0.6,
  },
}); 