import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function SchedulerScreen() {
  return (
    <View style={styles.container}>
      
      {/* 1. 상단 영역 (날짜 및 네비게이션) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>2026年 6月</Text>
        <Text style={styles.headerSubtitle}>今日のスケジュールをチェックしましょう。</Text>
      </View>

      {/* 2. 중앙 영역 (스크롤 가능한 스케줄 리스트 플레이스홀더) */}
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>予定가 없습니다. (준비중)</Text>
        </View>
      </ScrollView>

      {/* 3. 하단 영역 (플로팅 추가 버튼) */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // 로그인 화면과 통일감 있는 미색 배경
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E4E8',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8C9196',
  },
  listContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E4E8',
    borderStyle: 'dashed', // 점선 테두리로 준비중 느낌 물씬
  },
  emptyText: {
    color: '#A0A5AB',
    fontSize: 15,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    right: 24,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A1C1E', // 메인 브랜드 컬러 느낌의 다크 톤
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2, // + 기호 수직 정렬 미세 조정
  },
});