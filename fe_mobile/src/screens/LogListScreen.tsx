import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

// 더미 데이터 (나중에 서버 연결 시 삭제)
const DUMMY_LOGS = [
  { id: '1', painLevel: 2, memo: '오늘 점심은 가벼운 죽을 먹음.', category: 'health', created_at: '2026-06-27' },
  { id: '2', painLevel: 4, memo: '오후에 통증이 조금 있었음.', category: 'health', created_at: '2026-06-26' },
];

export default function LogListScreen() {
  const [logs, setLogs] = useState(DUMMY_LOGS);
  const [loading, setLoading] = useState(false);

  // 나중에 서버에서 데이터를 가져올 함수
  const fetchLogs = async () => {
    setLoading(true);
    // await getLogs(); // 나중에 구현할 API
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 건강 기록 리스트</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.created_at}</Text>
            <Text style={styles.memo}>{item.memo}</Text>
            <Text style={styles.pain}>통증 정도: {item.painLevel}/5</Text>
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
  date: { fontSize: 12, color: '#8C9196' },
  memo: { fontSize: 16, marginVertical: 5 },
  pain: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' },
});