import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

interface AIRecommendationSectionProps {
  freeTimeMinutes?: number;
  onSelectAction?: (actionTitle: string) => void;
}

export default function AIRecommendationSection({ 
  freeTimeMinutes = 90, 
  onSelectAction 
}: AIRecommendationSectionProps) {
  return (
    <View style={styles.recommendSection}>
      <View style={styles.recommendHeader}>
        <Text style={styles.recommendIcon}>✨</Text>
        <View>
          <Text style={styles.recommendTitle}>空き時間ができましたか？</Text>
          <Text style={styles.recommendSub}>現在、タイムラインに {freeTimeMinutes} 分の空き時間があります。</Text>
        </View>
      </View>

      <Text style={styles.recommendGuideText}>
        脳の疲労度を考慮すると、今は複雑な作業よりも、後回しにしていた単純な繰り返し業務や軽い勉強がおすすめです。
      </Text>

      {/* おすすめアクションのチップリスト */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        <TouchableOpacity 
          style={styles.recommendChip} 
          onPress={() => onSelectAction?.('Svelte 5 ドキュメントの確認')}
        >
          <Text style={styles.chipText}>💻 Svelte 5 ドキュメント確認 (+30分)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.recommendChip}
          onPress={() => onSelectAction?.('外注フィードバックの整理')}
        >
          <Text style={styles.chipText}>📂 外注フィードバック整理 (+40分)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.recommendChip, styles.breakChip]}
          onPress={() => onSelectAction?.('ストレッチ休憩')}
        >
          <Text style={styles.breakChipText}>☕ 15分間のストレッチ休憩</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  recommendSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  recommendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#F5A623',
  },
  recommendTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  recommendSub: {
    fontSize: 12,
    color: '#666',
  },
  recommendGuideText: {
    fontSize: 13,
    color: '#4A4A4A',
    lineHeight: 18,
    marginBottom: 12,
  },
  chipScroll: {
    flexDirection: 'row',
  },
  recommendChip: {
    backgroundColor: '#F1F3F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    color: '#495057',
    fontWeight: '600',
  },
  breakChip: {
    backgroundColor: '#E6F4EA',
  },
  breakChipText: {
    fontSize: 12,
    color: '#137333',
    fontWeight: '600',
  },
});