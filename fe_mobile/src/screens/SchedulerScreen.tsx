import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Keyboard 
} from 'react-native';

import ScreenContainer from '../components/layout/ScreenContainer';
import AIRecommendationSection from '../components/AIRecommendationSection';
import AIRescheduleModal from '../components/AIRescheduleModal';
import { useUser } from '../context/UserContext';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  tags: string[];
  isAIOptimized: boolean;
}

export default function SchedulerScreen() {
  const { user } = useUser();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { id: '1', title: 'デザインミーティング', time: '09:00', tags: ['#外注', '#3Dモデリング'], isAIOptimized: true },
    { id: '2', title: 'Svelte 5 学習', time: '11:00', tags: ['#開発勉強', '#ウェブUI'], isAIOptimized: true },
    { id: '3', title: 'ラオンサーバー告知作成', time: '14:00', tags: ['#協業', '#企画'], isAIOptimized: false },
  ]);

  const [inputText, setInputText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [freeTime] = useState(90);

  const handleAIOptimize = () => {
    const optimizedSchedules = schedules.map(item => {
      if (item.id === '3') {
        return { ...item, time: '15:00', isAIOptimized: true };
      }
      return item;
    });
    setSchedules(optimizedSchedules);
    setIsModalOpen(false);
  };

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case '#外注': case '#3Dモデリング': return { bg: '#FFF9E6', text: '#D97706' };
      case '#開発勉強': case '#ウェブUI': return { bg: '#E6F4EA', text: '#137333' };
      case '#協業': case '#企画': return { bg: '#F3E8FF', text: '#6B21A8' };
      default: return { bg: '#F1F3F5', text: '#495057' };
    }
  };

  const renderScheduleItem = ({ item }: { item: ScheduleItem }) => (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.accentBar, item.isAIOptimized ? styles.aiAccent : styles.defaultAccent]} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.timeText}>{item.time}</Text>
          {item.isAIOptimized && <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>✨ AI最適化</Text></View>}
        </View>
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={styles.tagContainer}>
          {item.tags.map((tag, i) => {
            const s = getTagStyle(tag);
            return <View key={i} style={[styles.tagBadge, { backgroundColor: s.bg }]}><Text style={[styles.tagText, { color: s.text }]}>{tag}</Text></View>;
          })}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={renderScheduleItem}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.dateText}>안녕하세요, {user.nickname || '사용자'}님</Text>
              <Text style={styles.subDateText}>2026년 6월 20일</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="予定を入力..." placeholderTextColor="#999" value={inputText} onChangeText={setInputText} />
              <TouchableOpacity style={styles.inputButton} onPress={() => { setInputText(''); Keyboard.dismiss(); }}><Text style={styles.inputButtonText}>登録</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.optimizeTriggerButton} onPress={() => setIsModalOpen(true)}>
              <Text style={styles.optimizeTriggerButtonText}>🔄 AI動線最適化</Text>
            </TouchableOpacity>
            {freeTime > 0 && <AIRecommendationSection freeTimeMinutes={freeTime} />}
            <Text style={styles.listSectionTitle}>本日のスケジュール</Text>
          </View>
        )}
      />
      <AIRescheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleAIOptimize} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: { paddingHorizontal: 20, paddingVertical: 15 },
  dateText: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  subDateText: { fontSize: 14, marginTop: 4, color: '#A0A0A0' },
  inputContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 12 },
  input: { flex: 1, borderRadius: 12, paddingHorizontal: 16, height: 50, borderWidth: 1, backgroundColor: '#2A2A2A', borderColor: '#333', color: '#FFF' },
  inputButton: { backgroundColor: '#4A90E2', borderRadius: 12, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginLeft: 10 },
  inputButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  optimizeTriggerButton: { borderWidth: 1, borderColor: '#4A90E2', borderRadius: 12, marginHorizontal: 20, paddingVertical: 12, alignItems: 'center', marginBottom: 16, backgroundColor: '#1E1E1E' },
  optimizeTriggerButtonText: { color: '#4A90E2', fontWeight: '700' },
  listSectionTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, marginTop: 8, marginBottom: 12, color: '#FFF' },
  card: { borderRadius: 16, marginHorizontal: 20, marginBottom: 12, flexDirection: 'row', overflow: 'hidden', backgroundColor: '#1E1E1E' },
  accentBar: { width: 6 },
  aiAccent: { backgroundColor: '#4A90E2' },
  defaultAccent: { backgroundColor: '#AEB6BF' },
  cardContent: { flex: 1, padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  timeText: { fontSize: 13, fontWeight: '700', color: '#A0A0A0' },
  aiBadge: { backgroundColor: '#E8F2FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  aiBadgeText: { fontSize: 11, color: '#4A90E2', fontWeight: '700' },
  titleText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#E0E0E0' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tagBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginRight: 6 },
  tagText: { fontSize: 12, fontWeight: '600' },
});