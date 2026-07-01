import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      <Stack.Screen 
        name="welcome" 
        options={{
          title: 'Welcome',
        }}
      />
      <Stack.Screen 
        name="personal-info" 
        options={{
          title: 'Personal Info',
        }}
      />
      <Stack.Screen 
        name="goals" 
        options={{
          title: 'Goals',
        }}
      />
    </Stack>
  );
} 