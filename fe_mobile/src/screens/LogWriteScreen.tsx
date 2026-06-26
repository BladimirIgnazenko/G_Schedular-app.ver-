// fe_mobile/src/screens/LogWriteScreen.tsx (수정본)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { postLog } from '../api/logApi';

export default function LogWriteScreen() {
  const [painLevel, setPainLevel] = useState('1');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveLog = async () => {
    setLoading(true);
    try {
      await postLog({ painLevel: parseInt(painLevel), memo });
      Alert.alert('저장 완료', '오늘의 건강 기록이 저장되었습니다.');
      setMemo(''); // 저장 후 초기화
    } catch (err) {
      Alert.alert('저장 실패', '서버 연결을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 컨디션 기록</Text>
      
      <Text style={styles.label}>통증 정도 (1-5)</Text>
      <TextInput style={styles.input} value={painLevel} onChangeText={setPainLevel} keyboardType="numeric" />

      <Text style={styles.label}>메모</Text>
      <TextInput style={styles.memoInput} value={memo} onChangeText={setMemo} multiline placeholder="메모를 입력하세요." />

      {loading ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : (
        <Button title="기록 저장하기" onPress={handleSaveLog} color="#007AFF" />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  memoInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5, height: 100 },
});