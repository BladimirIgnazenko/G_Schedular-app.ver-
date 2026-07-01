import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function LogListScreen() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // 나중에 실제 API 호출: const data = await getLogs();
      // setLogs(data);
      console.log('서버에서 데이터 불러오는 중...');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLogs();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 건강 기록 리스트</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: any) => (
            <View style={styles.card}>
              <Text style={styles.date}>{item.created_at}</Text>
              <Text style={styles.memo}>{item.memo}</Text>
              <Text style={styles.pain}>통증: {item.painLevel}/5</Text>
            </View>
          )}
        />
      )}
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