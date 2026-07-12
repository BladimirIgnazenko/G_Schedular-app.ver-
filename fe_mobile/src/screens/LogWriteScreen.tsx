import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postLog } from '../api/logApi';

const CATEGORIES = ['health', 'diary', 'food'] as const;

export default function LogWriteScreen() {
  const [painLevel, setPainLevel] = useState(1);
  const [memo, setMemo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('health');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSaveLog = async () => {
    setLoading(true);
    try {
      await postLog({ painLevel, memo, category: selectedCategory });
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
      <Text style={styles.title}>오늘의 컨디션 기록</Text>
      
      <Text style={styles.label}>통증 정도 (1-5)</Text>
      <View style={styles.painContainer}>
        {[1, 2, 3, 4, 5].map((level) => (
          <TouchableOpacity 
            key={level}
            style={[styles.painButton, painLevel === level && styles.painSelected]}
            onPress={() => setPainLevel(level)}
          >
            <Text style={painLevel === level ? styles.catTextSelected : styles.catText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
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
      <TextInput style={styles.memoInput} value={memo} onChangeText={setMemo} multiline placeholder="내용을 입력하세요." />
      
      {loading ? <ActivityIndicator size="small" color="#007AFF" /> : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveLog}>
          <Text style={styles.saveButtonText}>기록 저장하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 24, color: '#1A1A1A' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#555' },
  painContainer: { flexDirection: 'row', marginBottom: 24 },
  painButton: { width: 50, height: 50, borderRadius: 25, borderWidth: 1.5, borderColor: '#E1E4E8', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  painSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  categoryContainer: { flexDirection: 'row', marginBottom: 24 },
  catButton: { paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1.5, borderColor: '#E1E4E8', marginRight: 10, borderRadius: 12 },
  catSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  catText: { color: '#666' },
  catTextSelected: { color: '#fff', fontWeight: 'bold' },
  memoInput: { borderWidth: 1.5, borderColor: '#E1E4E8', padding: 14, marginBottom: 24, borderRadius: 12, height: 120, textAlignVertical: 'top', fontSize: 16 },
  saveButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});