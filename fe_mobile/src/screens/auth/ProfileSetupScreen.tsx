import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';

interface Props {
  onComplete: () => void;
}

export default function ProfileSetupScreen({ onComplete }: Props) {
  const [nickname, setNickname] = useState('');
  const [interest, setInterest] = useState('');

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>プロフィールを作成</Text>
        <Text style={styles.description}>AIスケジューリングのために情報を入力してください。</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="ニックネーム" 
          placeholderTextColor="#999"
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput 
          style={styles.input} 
          placeholder="主な関心事 (例: 開発, デザイン)" 
          placeholderTextColor="#999"
          value={interest}
          onChangeText={setInterest}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={onComplete}
        >
          <Text style={styles.buttonText}>開始する</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, justifyContent: 'center', flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 12 },
  description: { fontSize: 16, color: '#A0A0A0', marginBottom: 32 },
  input: { backgroundColor: '#2A2A2A', borderRadius: 12, padding: 16, marginBottom: 16, color: '#FFF' },
  button: { backgroundColor: '#4A90E2', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});