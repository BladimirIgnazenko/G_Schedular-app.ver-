import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useUser } from '../context/UserContext'; // Context 불러오기

export default function SettingScreen({ navigation }: any) {
  const { user, loading } = useUser();

  // 데이터 로딩 중 처리
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 1. 상단 프로필 영역 (동적 데이터) */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>{user?.nickname || '사용자'}</Text>
        <Text style={styles.profileEmail}>상태: {user?.healthStatus || '일반'}</Text>
      </View>

      {/* 2. 중앙 설정 메뉴 리스트 */}
      <ScrollView style={styles.menuContainer}>
        <View style={styles.menuGroup}>
          <Text style={styles.groupTitle}>ACCOUNT</Text>
          <TouchableOpacity 
            style={styles.menuItem} 
            activeOpacity={0.6}
            onPress={() => Alert.alert('알림', '프로필 편집 화면으로 이동합니다.')}
          >
            <Text style={styles.menuText}>프로필 편집</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
            <Text style={styles.menuText}>건강 상태 관리 (크론병 관리)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuGroup}>
          <Text style={styles.groupTitle}>APP SETTINGS</Text>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
            <Text style={styles.menuText}>알림 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
            <Text style={styles.menuText}>데이터 백업</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 3. 하단 버전 정보 */}
      <View style={styles.footerContainer}>
        <Text style={styles.versionText}>Version 1.0.0 (Beta)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E4E8',
  },
  profileName: { fontSize: 20, fontWeight: '700', color: '#1A1C1E', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: '#007AFF', fontWeight: '600' },
  menuContainer: { flex: 1 },
  menuGroup: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E4E8',
    paddingVertical: 4,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A0A5AB',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 4,
  },
  menuItem: { height: 55, justifyContent: 'center', paddingHorizontal: 24 },
  menuText: { fontSize: 16, color: '#1F2024' },
  footerContainer: { padding: 24, alignItems: 'center' },
  versionText: { fontSize: 12, color: '#A0A5AB' },
});