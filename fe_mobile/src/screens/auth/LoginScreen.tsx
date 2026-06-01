import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native';

// ==========================================
// 🎨 스타일시트 (디바이스 대응 및 컴파일 에러 방지 최상단 배치)
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between', 
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? 24 : 40, 
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  logoContainer: {
    width: 84,
    height: 84,
    backgroundColor: '#F9FAFB',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  logoText: {
    fontSize: 38,
    fontWeight: '300',
    color: '#1F2937',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 22,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 340,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  appleButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain', 
  },
  appleIconTint: {
    tintColor: '#FFFFFF', 
  },
  otherLink: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecorationLine: 'underline',
    marginTop: 24,
  },
});

// ==========================================
// 📱 메인 로그인 화면 컴포넌트
// ==========================================
export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = (): void => {
    if (isLoading) return;
    console.log('Google 로그인 프로세스 시작');
  };

  const handleAppleLogin = (): void => {
    if (isLoading) return;
    console.log('Apple 로그인 프로세스 시작');
  };

  const handleOtherLoginMethods = (): void => {
    console.log('기타 소셜 계정 바텀시트 오픈');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. Top Section: 서비스 심플 로고 및 타이틀 영역 */}
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>G</Text>
        </View>

        <Text style={styles.mainTitle}>G_Schedularへようこそ</Text>
        <Text style={styles.subTitle}>
          精緻なスケジュール管理で、{"\n"}毎日をデザインしましょう。
        </Text>
      </View>

      {/* 2 & 3. Middle & Bottom Section: 최적화된 소셜 로그인 버튼 군 */}
      <View style={styles.bottomSection}>
        
        {/* Google 로그인 버튼 */}
        <TouchableOpacity 
          style={[styles.button, styles.googleButton]} 
          onPress={handleGoogleLogin}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png' }} 
            style={styles.icon} 
          />
          <Text style={styles.googleButtonText}>Googleで続ける</Text>
        </TouchableOpacity>

        {/* Apple 로그인 버튼 (iOS 심사 규격 충족) */}
        <TouchableOpacity 
          style={[styles.button, styles.appleButton]} 
          onPress={handleAppleLogin}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/18px-Apple_logo_black.svg.png' }} 
            style={[styles.icon, styles.appleIconTint]} 
          />
          <Text style={styles.appleButtonText}>Appleでサインイン</Text>
        </TouchableOpacity>

        {/* 하단 기타 로그인 진입 링크 */}
        <TouchableOpacity 
          onPress={handleOtherLoginMethods} 
          activeOpacity={0.7}
        >
          <Text style={styles.otherLink}>他の方法でログイン</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}