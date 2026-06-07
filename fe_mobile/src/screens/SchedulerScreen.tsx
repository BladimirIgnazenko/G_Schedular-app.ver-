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

// 1. 独立したファイルに分離したAIレイアウトコンポーネントのインポート
import AIRecommendationSection from '../components/AIRecommendationSection';
import AIRescheduleModal from '../components/AIRescheduleModal';

// 2. スケジュールデータのインターフェース定義
interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  tags: string[];         // AIが自動分類するタグ配列
  isAIOptimized: boolean; // AIが配置した最適な時間帯（ゴールデンタイム）かどうか
  isCompleted: boolean;
}

export default function SchedulerScreen({ navigation }: { navigation?: any }) {
  // 3. 状態管理 (State)
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: '1',
      title: 'デザインミーティング（フィードバック反映）',
      time: '09:00 AM',
      tags: ['#外注', '#3Dモデリング'],
      isAIOptimized: true,
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Svelte 5 状態管理手法の学習',
      time: '11:00 AM',
      tags: ['#開発勉強', '#ウェブUI'],
      isAIOptimized: true,
      isCompleted: false,
    },
    {
      id: '3',
      title: 'ラオンサーバー パートナーシップ告知作成',
      time: '02:00 PM',
      tags: ['#協業', '#企画'],
      isAIOptimized: false,
      isCompleted: false,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [freeTime, setFreeTime] = useState(90); // 擬似的な空き時間状態（分単位）

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
      time: '04:00 PM', // AIがタイムライン内の最適な空き時間を計算したと仮定
      tags: detectedTags,
      isAIOptimized: true,
      isCompleted: false,
    };

    setSchedules([...schedules, newSchedule]);
    setInputText('');
  };

  // 5. AIリスケジュール（再配置）確定処理ハンドラー
  const handleConfirmReschedule = () => {
    // シミュレーションのため、特定のスケジュール時間を変更する擬似アップデート
    const updatedSchedules = schedules.map(item => {
      if (item.id === '3') {
        return { ...item, time: '02:30 PM', isAIOptimized: true };
      }
      return item;
    });
    setSchedules(updatedSchedules);
    setIsModalOpen(false);
  };

  // 6. 空き時間おすすめチップ選択時のスケジュール追加ハンドラー
  const handleSelectRecommendAction = (actionTitle: string) => {
    let recommendedTags = ['#おすすめ'];
    if (actionTitle.includes('Svelte')) recommendedTags = ['#開発勉強', '#ウェブUI'];
    if (actionTitle.includes('外注')) recommendedTags = ['#外注', '#3Dモデリング'];
    if (actionTitle.includes('休憩')) recommendedTags = ['#休憩', '#コンディショニング'];

    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      title: actionTitle,
      time: '12:30 PM', // 空き時間帯にスケジュールをインサート
      tags: recommendedTags,
      isAIOptimized: true,
      isCompleted: false,
    };

    setSchedules([...schedules, newSchedule]);
    setFreeTime(0); // おすすめタスクを登録したため、空き時間を初期化するシミュレーション
  };

  // 7. 個別のスケジュールカードレンダー関数
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
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  // 8. FlatListの上部に固定されるヘッダーコンポーネント（入力欄＋拡張レイアウトラップ）
  const ListHeader = () => (
    <View>
      {/* メインタイトルエリア */}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.dateText}>2026年6月15日 (月)</Text>
        <Text style={styles.subDateText}>今日の効率的な動線を確認しましょう。</Text>
      </View>

      {/* AIスマートクイック入力欄 */}
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

      {/* 手動 AIタイムライン最適化トリガーボタン */}
      <TouchableOpacity 
        style={styles.optimizeTriggerButton} 
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={styles.optimizeTriggerButtonText}>🔄 AIタイムライン動線を最適化する</Text>
      </TouchableOpacity>

      {/* [レイアウト 1] 空き時間おすすめセクションの統合（条件付きレンダー） */}
      {freeTime > 0 && (
        <AIRecommendationSection 
          freeTimeMinutes={freeTime} 
          onSelectAction={handleSelectRecommendAction}
        />
      )}

      {/* リスト本文のセクションタイトル */}
      <Text style={styles.listSectionTitle}>本日のスケジュール</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* メインリストビュー */}
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={renderScheduleItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* [レイアウト 2] AIリスケジュール確定モダンの統合 */}
      <AIRescheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmReschedule}
      />
    </SafeAreaView>
  );
}

// スタイルシート定義
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