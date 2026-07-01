// fe_mobile/src/screens/LogWriteScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postLog } from '../api/logApi';

export default function LogWriteScreen() {
  const [painLevel, setPainLevel] = useState('1');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSaveLog = async () => {
    setLoading(true);
    try {
      await postLog({ 
        painLevel: parseInt(painLevel), 
        memo, 
        category: 'health' // 현재는 고정값, 나중에 선택 UI로 변경 가능
      });
      Alert.alert('저장 완료', '오늘의 기록이 저장되었습니다.');
      setMemo('');
      navigation.navigate('기록보기' as never);
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
      <TextInput 
        style={styles.input} 
        value={painLevel} 
        onChangeText={setPainLevel} 
        keyboardType="numeric" 
      />
      
      <Text style={styles.label}>메모</Text>
      <TextInput 
        style={styles.memoInput} 
        value={memo} 
        onChangeText={setMemo} 
        multiline 
        placeholder="오늘의 상태나 이야기를 남겨주세요." 
      />
      
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
  label: { fontSize: 16, marginBottom: 8, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  memoInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5, height: 100, textAlignVertical: 'top' },
});