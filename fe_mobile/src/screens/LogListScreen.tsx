import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// 더미 데이터 (나중에 API 연동 시 삭제)
const DUMMY_LOGS = [
  { id: '1', painLevel: 2, memo: '죽을 먹었더니 속이 편하다.', category: 'health', created_at: '2026-06-27' },
  { id: '2', painLevel: 5, memo: '갑자기 통증이 심해짐.', category: 'health', created_at: '2026-06-26' },
];

export default function LogListScreen() {
  const [logs, setLogs] = useState(DUMMY_LOGS);
  const [loading, setLoading] = useState(false);

  useFocusEffect(useCallback(() => {
    // API 연동 전까지 더미 데이터 사용
  }, []));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>건강 기록 리스트</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.date}>{item.created_at}</Text>
              <Text style={styles.badge}>{item.category}</Text>
            </View>
            <Text style={styles.memo}>{item.memo}</Text>
            <Text style={[styles.pain, { color: item.painLevel >= 4 ? '#FF3B30' : '#007AFF' }]}>
              통증 지수: {item.painLevel} / 5
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 10, borderWidth: 1, borderColor: '#E2E4E8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  date: { fontSize: 12, color: '#8C9196' },
  badge: { backgroundColor: '#E1E8ED', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, fontSize: 10, fontWeight: 'bold' },
  memo: { fontSize: 16, marginVertical: 5 },
  pain: { fontSize: 14, fontWeight: 'bold' }
});