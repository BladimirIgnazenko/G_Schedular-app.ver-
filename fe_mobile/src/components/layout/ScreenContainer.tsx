import React from 'react';
import { View, StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function ScreenContainer({ children, style }: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  
  // 테마에 따른 배경색 설정
  const backgroundColor = isDarkMode ? '#121212' : '#F8F9FA';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});