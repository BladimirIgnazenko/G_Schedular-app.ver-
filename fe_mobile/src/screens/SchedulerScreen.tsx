import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SchedulerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>スケジュール画面 (준비중)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#8C9196',
    fontWeight: '600',
  },
});