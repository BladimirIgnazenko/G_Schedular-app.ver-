// fe_mobile/src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useUser } from '../context/UserContext';

const ProfileScreen = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 프로필</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>닉네임: {user?.nickname || '설정 필요'}</Text>
        <Text style={styles.label}>관심사: {user?.interest || '설정 필요'}</Text>
        <Text style={styles.label}>건강 상태: {user?.healthStatus || '미설정'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  infoBox: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10 },
  label: { fontSize: 18, marginVertical: 5 },
});

export default ProfileScreen;