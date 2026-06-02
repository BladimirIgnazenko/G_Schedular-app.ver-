/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'; // React import 추가
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LoginScreen from './src/screens/auth/LoginScreen'; // 👈 윤선이 로그인 화면 import 추가!

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    // 로그인 화면이 기기 노치나 하단 바에 가려지지 않게 패딩(여백) 적용
    <View style={[
      styles.container, 
      { 
        paddingTop: safeAreaInsets.top, 
        paddingBottom: safeAreaInsets.bottom 
      }
    ]}>
      {/* 기존 NewAppScreen을 밀어내고 로그인 화면을 배치! */}
      <LoginScreen /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;