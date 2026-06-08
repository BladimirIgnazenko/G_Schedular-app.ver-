import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  Keyboard // UX 개선을 위한 키보드 API 추가
} from 'react-native';

import AIRecommendationSection from '../components/AIRecommendationSection';
import AIRescheduleModal from '../components/AIRescheduleModal';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;         // 디테일 수정: 24시간 형식(HH:MM)으로 통일
  tags: string[];
  isAIOptimized: boolean;
  isCompleted: boolean;
}

export default function SchedulerScreen({ navigation }: { navigation?: any }) {
  // 3. 状態管理 (State) - 초기 데이터 시간 포맷을 24시간 형식으로 수정
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: '1',
      title: 'デザインミーティング（フィードバック反映）',
      time: '09:00',
      tags: ['#外注', '#3Dモデリング'],
      isAIOptimized: true,
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Svelte 5 状態管理手法の学習',
      time: '11:00',
      tags: ['#開発勉強', '#ウェブUI'],
      isAIOptimized: true,
      isCompleted: false,
    },
    {
      id: '3',
      title: 'ラオンサーバー パートナーシップ告知作成',
      time: '14:00',
      tags: ['#協業', '#企画'],
      isAIOptimized: false,
      isCompleted: false,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [freeTime, setFreeTime] = useState(90);

  // 디테일 수정 1: 태그 텍スト별로 고유한 스타일(배경색, 글자색)を 반환하는 헬パー関数
  const getTagStyle = (tag: string) => {
    switch (tag) {
      case '#外注':
      case '#3Dモデリング':
        return { bg: '#FFF9E6', text: '#D97706' }; // 따뜻한 옐로우/오렌지 (외주 작업)
      case '#開発勉強':
      case '#ウェブUI':
        return { bg: '#E6F4EA', text: '#137333' }; // 차분한 그린 (성장/공부)
      case '#協業':
      case '#企画':
        return { bg: '#F3E8FF', text: '#6B21A8' }; // 세련된 퍼플 (미팅/협업)
      case '#休憩':
      case '#コンディショニング':
        return { bg: '#FCE7F3', text: '#9D174D' }; // 부드러운 핑크 (휴식)
      default:
        return { bg: '#F1F3F5', text: '#495057' }; // 기본 그레이
    }
  };

  // 4. AIスマートクイック入力ハンドラー
  const handleAISmartInput = () => {
    if (!inputText.trim()) return;

    let detectedTags = ['#一般'];
    if (inputText.includes('モデリング') || inputText.includes('シュガ')) detectedTags = ['#外注', '#3Dモデリング'];
    if (inputText.includes('勉強') || inputText.includes('コーディング')) detectedTags = ['#開発勉強'];
    if (inputText.includes('告知') || inputText.includes('ラオン')) detectedTags = ['#協業'];

    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      title: inputText,
      time: '16:00', // 24시간 형식으로 입력되도록 수정
      tags: detectedTags,
      isAIOptimized: true,
      isCompleted: false,
    };

    setSchedules([...schedules, newSchedule]);
    setInputText('');
    
    // 디테일 수정 2: 등록 완료 시 키보드를 자동으로 닫아주는 UX 추가
    Keyboard.dismiss();
  };

  const handleConfirmReschedule = () => {
    const updatedSchedules = schedules.map(item => {
      if (item.id === '3') {
        return { ...item, time: '14:30', isAIOptimized: true }; // 24시간 형식으로 수정
      }
      return item;
    });
    setSchedules(updatedSchedules);
    setIsModalOpen(false);
  };

  const handleSelectRecommendAction = (actionTitle: string) => {
    let recommendedTags = ['#おすすめ'];
    if (actionTitle.includes('Svelte')) recommendedTags = ['#開発勉強', '#ウェブUI'];
    if (actionTitle.includes('外注')) recommendedTags = ['#外注', '#3Dモデリング'];
    if (actionTitle.includes('休憩')) recommendedTags = ['#休憩', '#コンディショニング'];

    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      title: actionTitle,
      time: '12:30',
      tags: recommendedTags,
      isAIOptimized: true,
      isCompleted: false,
    };

    setSchedules([...schedules, newSchedule]);
    setFreeTime(0);
  };

  const renderScheduleItem = ({ item }: { item: ScheduleItem }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation?.navigate('ScheduleDetail', {
        title: item.title,
        time: item.time,
        tags: item.tags
      })}
    >
      <View style={[styles.accentBar, item.isAIOptimized ? styles.aiAccent : styles.defaultAccent]} />
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.timeText}>{item.time}</Text>
          {item.isAIOptimized && (
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>✨ AI最適化</Text>
            </View>
          )}
        </View>

        <Text style={styles.titleText}>{item.title}</Text>

        <View style={styles.tagContainer}>
          {item.tags.map((tag, index) => {
            // 디테일 수정 1 반영: 태그별 스타일 매핑
            const tagStyle = getTagStyle(tag);
            return (
              <View 
                key={index} 
                style={[styles.tagBadge, { backgroundColor: tagStyle.bg }]}
              >
                <Text style={[styles.tagText, { color: tagStyle.text }]}>{tag}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.dateText}>2026年6月15日 (月)</Text>
        <Text style={styles.subDateText}>今日の効率的な動線を確認しましょう。</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="例：明日ラオンサーバーの告知を作成する"
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleAISmartInput}>
          <Text style={styles.inputButtonText}>AI登録</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.optimizeTriggerButton} 
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={styles.optimizeTriggerButtonText}>🔄 AIタイムライン動線を最適化する</Text>
      </TouchableOpacity>

      {freeTime > 0 && (
        <AIRecommendationSection 
          freeTimeMinutes={freeTime} 
          onSelectAction={handleSelectRecommendAction}
        />
      )}

      <Text style={styles.listSectionTitle}>本日のスケジュール</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={renderScheduleItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <AIRescheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmReschedule}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subDateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    color: '#1A1A1A',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  inputButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginLeft: 10,
    height: 50,
  },
  inputButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  optimizeTriggerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  optimizeTriggerButtonText: {
    color: '#4A90E2',
    fontWeight: '700',
    fontSize: 14,
  },
  listSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  accentBar: {
    width: 6,
  },
  aiAccent: {
    backgroundColor: '#4A90E2',
  },
  defaultAccent: {
    backgroundColor: '#AEB6BF',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700', // 가시성을 위해 폰트 굵기 약간 조정
    color: '#4A4A4A',  // 조금 더 진한 색상으로 변경
  },
  aiBadge: {
    backgroundColor: '#E8F2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  aiBadgeText: {
    fontSize: 11,
    color: '#4A90E2',
    fontWeight: '700',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    // 배경색은 인라인 스타일에서 동的に 주므로 제거
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600', // 뱃지 글씨 선명도 업그레이드
  },
});