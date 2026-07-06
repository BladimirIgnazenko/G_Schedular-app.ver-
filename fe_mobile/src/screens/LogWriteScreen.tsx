import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postLog } from '../api/logApi';

const CATEGORIES = ['health', 'diary', 'food'] as const;

export default function LogWriteScreen() {
  const [painLevel, setPainLevel] = useState('1');
  const [memo, setMemo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('health');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSaveLog = async () => {
    setLoading(true);
    try {
      await postLog({ 
        painLevel: parseInt(painLevel), 
        memo, 
        category: selectedCategory 
      });
      Alert.alert('저장 완료', '기록되었습니다.');
      setMemo('');
      navigation.navigate('기록보기' as never);
    } catch (err) {
      Alert.alert('저장 실패', '서버 연결을 확인하세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 기록</Text>
      
      <Text style={styles.label}>통증 정도 (1-5)</Text>
      <TextInput style={styles.input} value={painLevel} onChangeText={setPainLevel} keyboardType="numeric" />
      
      <Text style={styles.label}>카테고리</Text>
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.catButton, selectedCategory === cat && styles.catSelected]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={selectedCategory === cat ? styles.catTextSelected : styles.catText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>메모</Text>
      <TextInput style={styles.memoInput} value={memo} onChangeText={setMemo} multiline placeholder="메모를 입력하세요." />
      
      {loading ? <ActivityIndicator size="small" color="#007AFF" /> : <Button title="기록 저장하기" onPress={handleSaveLog} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  memoInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5, height: 100 },
  categoryContainer: { flexDirection: 'row', marginBottom: 20 },
  catButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', marginRight: 10, borderRadius: 5 },
  catSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  catText: { color: '#333' },
  catTextSelected: { color: '#fff', fontWeight: 'bold' }
});