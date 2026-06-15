import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';

interface Props {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: Props) {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* 상단: 서비스 로고 및 타이틀 */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>G</Text>
          </View>
          <Text style={styles.title}>G_Schedularへようこそ</Text>
          <Text style={styles.subtitle}>
            精緻なスケジュール管理で、{"\n"}毎日をデザインしましょう。
          </Text>
        </View>

        {/* 하단: 소셜 로그인 버튼 섹션 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.googleButton} 
            activeOpacity={0.8} 
            onPress={onLoginSuccess}
          >
            <View style={styles.absoluteIconLeft}>
              <Text style={{ color: '#4285F4', fontWeight: 'bold', fontSize: 18 }}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Google で続ける</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.appleButton} 
            activeOpacity={0.8} 
            onPress={onLoginSuccess}
          >
            <View style={styles.absoluteIconLeft}>
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>A</Text>
            </View>
            <Text style={styles.appleButtonText}>Appleでサインイン</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton} activeOpacity={0.6}>
            <Text style={styles.footerButtonText}>他の方法でログイン</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#8C9196',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    marginBottom: 50,
    gap: 14, 
  },
  googleButton: {
    position: 'relative',
    height: 50, 
    backgroundColor: '#FFFFFF',
    borderRadius: 12, 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E4E8',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500', 
    color: '#1F2024',
    includeFontPadding: false,
  },
  appleButton: {
    position: 'relative',
    height: 50, 
    backgroundColor: '#000000',
    borderRadius: 12, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600', 
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  absoluteIconLeft: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
  },
  footerButton: {
    alignItems: 'center',
    marginTop: 6,
  },
  footerButtonText: {
    fontSize: 14,
    color: '#A0A5AB',
    textDecorationLine: 'underline',
  },
});