import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * 프로젝트의 진입점입니다.
 * 1. SafeAreaProvider: 기기별 노치 및 하단 영역 처리를 위한 설정
 * 2. UserProvider: 앱 전역 상태 관리 (닉네임, 관심사 등)
 * 3. AppNavigator: 화면 전환 관리 로직
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        {/* 다크모드 기반 앱이므로 light-content 고정 */}
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        
        {/* 모든 화면 전환은 여기서 관리됨 */}
        <AppNavigator />
      </UserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // 전역 스타일이 필요하면 여기에 추가
});