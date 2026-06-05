import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      
      {/* 1. 상단 프로필 / 타이틀 영역 */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>G_User</Text>
        <Text style={styles.profileEmail}>user@example.com</Text>
      </View>

      {/* 2. 중앙 설정 메뉴 리스트 */}
      <ScrollView style={styles.menuContainer}>
        <View style={styles.menuGroup}>
          <Text style={styles.groupTitle}>アカウント</Text>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
            <Text style={styles.menuText}>プロフィール編集</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
            <Text style={styles.menuText}>通知設定</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuGroup}>
          <Text style={styles.groupTitle}>アプリ設定</Text>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
            <Text style={styles.menuText}>テーマ設定 (ダークモード)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
            <Text style={styles.menuText}>データバックアップ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 3. 하단 버전 정보 영역 */}
      <View style={styles.footerContainer}>
        <Text style={styles.versionText}>Version 1.0.0 (Beta)</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  profileContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E4E8',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8C9196',
  },
  menuContainer: {
    flex: 1,
  },
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
    paddingTop: 8,
    paddingBottom: 4,
    textTransform: 'uppercase',
  },
  menuItem: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  menuText: {
    fontSize: 15,
    color: '#1F2024',
  },
  footerContainer: {
    padding: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#A0A5AB',
  },
});