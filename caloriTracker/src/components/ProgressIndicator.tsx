import React, { useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
  animated?: boolean;
}

export default function ProgressIndicator({ 
  currentStep, 
  totalSteps, 
  stepTitle,
  animated = true 
}: ProgressIndicatorProps) {
  const progressAnimation = useSharedValue(0);
  const titleOpacity = useSharedValue(0);

  useEffect(() => {
    const progress = currentStep / totalSteps;
    
    if (animated) {
      progressAnimation.value = withSpring(progress, {
        damping: 15,
        stiffness: 150,
      });
      
      titleOpacity.value = withTiming(1, { duration: 400 });
    } else {
      progressAnimation.value = progress;
      titleOpacity.value = 1;
    }
  }, [currentStep, totalSteps, animated]);

  const progressBarStyle = useAnimatedStyle(() => {
    const progressWidth = interpolate(
      progressAnimation.value,
      [0, 1],
      [0, width - 48], // 24px margin on each side
      Extrapolate.CLAMP
    );

    return {
      width: progressWidth,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
    };
  });

  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View style={[styles.progressBar, progressBarStyle]} />
        </View>
        
        {/* Step Counter */}
        <View style={styles.stepCounter}>
          <Text style={styles.stepText}>
            {currentStep} / {totalSteps}
          </Text>
          <Text style={styles.percentageText}>
            {percentage}%
          </Text>
        </View>
      </View>

      {/* Step Title */}
      {stepTitle && (
        <Animated.View style={[styles.titleContainer, titleStyle]}>
          <Text style={styles.stepTitle}>{stepTitle}</Text>
        </Animated.View>
      )}

      {/* Step Dots */}
      <View style={styles.dotsContainer}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <StepDot
            key={index}
            isActive={index < currentStep}
            isCurrent={index === currentStep - 1}
            animated={animated}
          />
        ))}
      </View>
    </View>
  );
}

interface StepDotProps {
  isActive: boolean;
  isCurrent: boolean;
  animated: boolean;
}

function StepDot({ isActive, isCurrent, animated }: StepDotProps) {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      scale.value = withSpring(isCurrent ? 1.2 : 1, {
        damping: 15,
        stiffness: 200,
      });
      
      backgroundColor.value = withTiming(isActive ? 1 : 0, {
        duration: 300,
      });
    } else {
      scale.value = isCurrent ? 1.2 : 1;
      backgroundColor.value = isActive ? 1 : 0;
    }
  }, [isActive, isCurrent, animated]);

  const dotStyle = useAnimatedStyle(() => {
    const bgColor = interpolate(
      backgroundColor.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: scale.value }],
      backgroundColor: bgColor === 1 ? '#FF6B35' : '#E5E7EB',
      borderColor: isCurrent ? '#FF6B35' : 'transparent',
      borderWidth: isCurrent ? 2 : 0,
    };
  });

  return <Animated.View style={[styles.dot, dotStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#F1F3F4',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 3,
  },
  stepCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
  },
  titleContainer: {
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
}); 