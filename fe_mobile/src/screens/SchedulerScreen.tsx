import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView 
} from 'react-native';

// 1. 스케줄 데이터 인터페이스 정의 (AI 최적화 및 태그 필드 반영)
interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  tags: string[];         // AI가 자동 분류할 태그 배열
  isAIOptimized: boolean; // AI가 배치한 황금 시간대인지 여부
  isCompleted: boolean;
}

export default function SchedulerScreen() {
  // 임시 스케줄 데이터 상태 관리
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: '1',
      title: '디자인 미팅 (피드백 반영)',
      time: '09:00 AM',
      tags: ['#외주', '#3D모델링'],
      isAIOptimized: true,
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Svelte 5 상태 관리 기법 공부',
      time: '11:00 AM',
      tags: ['#개발공부', '#웹UI'],
      isAIOptimized: true,
      isCompleted: false,
    },
    {
      id: '3',
      title: '라온 서버 파트너십 공지 작성',
      time: '02:00 PM',
      tags: ['#협업', '#기획'],
      isAIOptimized: false,
      isCompleted: false,
    },
  ]);

  // 입력창 텍스트 상태
  const [inputText, setInputText] = useState('');

  // 가상의 AI 자연어 처리 등록 핸들러
  const handleAISmartInput = () => {
    if (!inputText.trim()) return;

    // TODO: 추후 여기에 백엔드 AI 파싱 API 연결
    // 지금은 프론트 단에서 대략적인 키워드로 가상 매칭 테스트
    let detectedTags = ['#일반'];
    if (inputText.includes('모델링') || inputText.includes('슈가')) detectedTags = ['#외주', '#3D모델링'];
    if (inputText.includes('공부') || inputText.includes('코딩')) detectedTags = ['#개발공부'];
    if (inputText.includes('공지') || inputText.includes('라온')) detectedTags = ['#협업'];

    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      title: inputText,
      time: '04:00 PM', // AI가 빈 시간대 계산해 배치했다고 가정
      tags: detectedTags,
      isAIOptimized: true,
      isCompleted: false,
    };

    setSchedules([...schedules, newSchedule]);
    setInputText('');
  };

  // 스케줄 카드 렌더링 함수
  const renderScheduleItem = ({ item }: { item: ScheduleItem }) => (
    <View style={styles.card}>
      {/* 왼쪽 데코 바: AI 최적화 일정은 좀 더 강조된 포인트 컬러 부여 */}
      <View style={[styles.accentBar, item.isAIOptimized ? styles.aiAccent : styles.defaultAccent]} />
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.timeText}>{item.time}</Text>
          {item.isAIOptimized && (
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>✨ AI 최적화</Text>
            </View>
          )}
        </View>

        <Text style={styles.titleText}>{item.title}</Text>

        {/* 태그 영역 */}
        <View style={styles.tagContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 타이틀 영역 */}
      <View style={styles.header}>
        <Text style={styles.dateText}>2026년 6월 15일 (월)</Text>
        <Text style={styles.subDateText}>오늘의 효율적인 동선을 확인하세요.</Text>
      </View>

      {/* 1. AI 스마트 퀵 입력창 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="예: 내일 라온서버 공지 작성해야 해"
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleAISmartInput}>
          <Text style={styles.inputButtonText}>AI 등록</Text>
        </TouchableOpacity>
      </View>

      {/* 2. 스케줄 리스트 영역 */}
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={renderScheduleItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// 가시성과 모던함을 챙긴 스타일시트
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // 눈이 편안한 밝은 배경색
  },
  header: {
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
    marginBottom: 15,
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
    // 그림자 효과 (iOS & Android)
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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
    backgroundColor: '#4A90E2', // AI 최적화는 블루 계열 강조
  },
  defaultAccent: {
    backgroundColor: '#AEB6BF', // 일반 일정은 차분한 그레이
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
    fontWeight: '600',
    color: '#666',
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
    backgroundColor: '#F1F3F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#495057',
    fontWeight: '500',
  },
});