import React, { useState } from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';
import SchedulerScreen from '../screens/SchedulerScreen';

// 화면 타입을 정의해서 관리하면 나중에 화면이 늘어나도 안전해
export type ScreenType = 'login' | 'profile' | 'scheduler';

export default function AppNavigator() {
  // 현재 어떤 화면을 보여줄지 결정하는 상태값
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');

  return (
    <>
      {/* 1. 로그인 화면: 성공하면 프로필 설정 화면으로 이동 */}
      {currentScreen === 'login' && (
        <LoginScreen onLoginSuccess={() => setCurrentScreen('profile')} />
      )}
      
      {/* 2. 프로필 설정 화면: 완료하면 스케줄러 메인으로 이동 */}
      {currentScreen === 'profile' && (
        <ProfileSetupScreen onComplete={() => setCurrentScreen('scheduler')} />
      )}
      
      {/* 3. 메인 스케줄러 화면 */}
      {currentScreen === 'scheduler' && (
        <SchedulerScreen />
      )}
    </>
  );
}