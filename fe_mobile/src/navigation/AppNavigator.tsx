import React, { useState } from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';
import SchedulerScreen from '../screens/SchedulerScreen';

export type ScreenType = 'login' | 'profile' | 'scheduler';

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');

  return (
    <>
      {currentScreen === 'login' && (
        <LoginScreen onLoginSuccess={() => setCurrentScreen('profile')} />
      )}
      
      {currentScreen === 'profile' && (
        <ProfileSetupScreen onComplete={() => setCurrentScreen('scheduler')} />
      )}
      
      {currentScreen === 'scheduler' && (
        <SchedulerScreen />
      )}
    </>
  );
}