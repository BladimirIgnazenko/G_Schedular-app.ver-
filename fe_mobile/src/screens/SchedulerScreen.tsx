import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  Keyboard 
} from 'react-native';

import AIRecommendationSection from '../components/AIRecommendationSection';
import AIRescheduleModal from '../components/AIRescheduleModal';

// 다크모드 색상 팔레트
const theme = {
  bg: '#121212', // 다크모드 배경
  card: '#1E1E1E', // 카드 배경
  text: '#E0E0E0', // 텍스트
  subText: '#A0A0A0', // 보조 텍스트
  inputBg: '#2A2A2A', // 입력창 배경
  border: '#333333', // 테두리
  accent: '#4A90E2', // 포인트 컬러
};

export default function SchedulerScreen({ navigation }: { navigation?: any }) {
  const [isDarkMode, setIsDarkMode] = useState(true); // 다크모드 상태
  const [schedules, setSchedules] = useState([
    { id: '1', title: 'デザインミーティング', time: '09:00', tags: ['#外注', '#3Dモデリング'], isAIOptimized: true },
    { id: '2', title: 'Svelte 5 学習', time: '11:00', tags: ['#開発勉強', '#ウェブUI'], isAIOptimized: true },
    { id: '3', title: 'ラオンサーバー告知作成', time: '14:00', tags: ['#協業', '#企画'], isAIOptimized: false },
  ]);

  const [inputText, setInputText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [freeTime, setFreeTime] = useState(90);

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case '#外注': case '#3Dモデリング': return { bg: '#FFF9E6', text: '#D97706' };
      case '#開発勉強': case '#ウェブUI': return { bg: '#E6F4EA', text: '#137333' };
      case '#協業': case '#企画': return { bg: '#F3E8FF', text: '#6B21A8' };
      default: return { bg: '#F1F3F5', text: '#495057' };
    }
  };

  // 조건부 스타일 적용 (다크모드면 theme 적용, 아니면 기존 스타일)
  const dynamicStyles = isDarkMode ? {
    container: { backgroundColor: theme.bg },
    text: { color: theme.text },
    subText: { color: theme.subText },
    card: { backgroundColor: theme.card },
    input: { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }
  } : { container: {}, text: {}, subText: {}, card: {}, input: {} };

  const renderScheduleItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.card, dynamicStyles.card]}>
      <View style={[styles.accentBar, item.isAIOptimized ? styles.aiAccent : styles.defaultAccent]} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.timeText, dynamicStyles.subText]}>{item.time}</Text>
          {item.isAIOptimized && <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>✨ AI最適化</Text></View>}
        </View>
        <Text style={[styles.titleText, dynamicStyles.text]}>{item.title}</Text>
        <View style={styles.tagContainer}>
          {item.tags.map((tag: string, i: number) => {
            const s = getTagStyle(tag);
            return <View key={i} style={[styles.tagBadge, { backgroundColor: s.bg }]}><Text style={[styles.tagText, { color: s.text }]}>{tag}</Text></View>;
          })}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <FlatList
        data={schedules}
        renderItem={renderScheduleItem}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.headerTitleContainer}>
              <Text style={[styles.dateText, dynamicStyles.text]}>2026年6月15日 (月)</Text>
              <Text style={[styles.subDateText, dynamicStyles.subText]}>今日の効率的な動線を確認しましょう。</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={[styles.input, dynamicStyles.input]} placeholder="予定を入力..." placeholderTextColor="#999" value={inputText} onChangeText={setInputText} />
              <TouchableOpacity style={styles.inputButton} onPress={() => { setInputText(''); Keyboard.dismiss(); }}><Text style={styles.inputButtonText}>登録</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.optimizeTriggerButton, { backgroundColor: isDarkMode ? theme.card : '#FFF' }]} onPress={() => setIsModalOpen(true)}>
              <Text style={styles.optimizeTriggerButtonText}>🔄 AI動線最適化</Text>
            </TouchableOpacity>
            {freeTime > 0 && <AIRecommendationSection freeTimeMinutes={freeTime} />}
            <Text style={[styles.listSectionTitle, dynamicStyles.text]}>本日のスケジュール</Text>
          </View>
        )}
      />
      <AIRescheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={() => setIsModalOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerTitleContainer: { paddingHorizontal: 20, paddingVertical: 15 },
  dateText: { fontSize: 24, fontWeight: 'bold' },
  subDateText: { fontSize: 14, marginTop: 4 },
  inputContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 12 },
  input: { flex: 1, borderRadius: 12, paddingHorizontal: 16, height: 50, borderWidth: 1 },
  inputButton: { backgroundColor: '#4A90E2', borderRadius: 12, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginLeft: 10 },
  inputButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  optimizeTriggerButton: { borderWidth: 1, borderColor: '#4A90E2', borderRadius: 12, marginHorizontal: 20, paddingVertical: 12, alignItems: 'center', marginBottom: 16 },
  optimizeTriggerButtonText: { color: '#4A90E2', fontWeight: '700' },
  listSectionTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, marginTop: 8, marginBottom: 12 },
  card: { borderRadius: 16, marginHorizontal: 20, marginBottom: 12, flexDirection: 'row', overflow: 'hidden' },
  accentBar: { width: 6 },
  aiAccent: { backgroundColor: '#4A90E2' },
  defaultAccent: { backgroundColor: '#AEB6BF' },
  cardContent: { flex: 1, padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  timeText: { fontSize: 13, fontWeight: '700' },
  aiBadge: { backgroundColor: '#E8F2FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  aiBadgeText: { fontSize: 11, color: '#4A90E2', fontWeight: '700' },
  titleText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tagBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginRight: 6 },
  tagText: { fontSize: 12, fontWeight: '600' },
});