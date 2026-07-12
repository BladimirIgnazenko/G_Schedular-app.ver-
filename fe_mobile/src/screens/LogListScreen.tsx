import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DUMMY_LOGS = [
  { id: '1', painLevel: 2, memo: '죽을 먹었더니 속이 편하다.', category: 'health', created_at: '2026-06-27' },
  { id: '2', painLevel: 5, memo: '갑자기 통증이 심해짐.', category: 'health', created_at: '2026-06-26' },
];

export default function LogListScreen() {
  const [logs] = useState(DUMMY_LOGS);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 건강 기록</Text>
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
            
            {/* 통증 인디케이터 */}
            <View style={styles.painIndicatorContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View 
                  key={i} 
                  style={[
                    styles.dot, 
                    { backgroundColor: i <= item.painLevel ? (item.painLevel >= 4 ? '#FF3B30' : '#007AFF') : '#E1E4E8' }
                  ]} 
                />
              ))}
              <Text style={styles.painText}> {item.painLevel} / 5</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F0F2F5' },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 20, color: '#1A1A1A' },
  card: { backgroundColor: '#fff', padding: 16, marginBottom: 12, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  date: { fontSize: 13, color: '#666' },
  badge: { backgroundColor: '#E7F3FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, fontSize: 11, fontWeight: '700', color: '#007AFF' },
  memo: { fontSize: 15, color: '#333', lineHeight: 22, marginVertical: 4 },
  painIndicatorContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  painText: { fontSize: 12, fontWeight: 'bold', color: '#666', marginLeft: 4 }
});