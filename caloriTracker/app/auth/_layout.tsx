import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen 
        name="email" 
        options={{
          title: 'Email Sign In',
        }}
      />
    </Stack>
  );
} 