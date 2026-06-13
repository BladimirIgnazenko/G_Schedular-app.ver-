import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ProfileSetupScreen({ navigation }: { navigation: any }) {
  const [nickname, setNickname] = useState('');
  const [interest, setInterest] = useState('');

  return (
    <SafeAreaView style={styles.container}>
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
          onPress={() => navigation.navigate('Scheduler')}
        >
          <Text style={styles.buttonText}>開始する</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 24, justifyContent: 'center', flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 12 },
  description: { fontSize: 16, color: '#A0A0A0', marginBottom: 32 },
  input: { backgroundColor: '#2A2A2A', borderRadius: 12, padding: 16, marginBottom: 16, color: '#FFF' },
  button: { backgroundColor: '#4A90E2', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});