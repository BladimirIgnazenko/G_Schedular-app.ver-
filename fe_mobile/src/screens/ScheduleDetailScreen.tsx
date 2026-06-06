import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';

// 가상의 네비게이션 전달 데이터 타입 정의
interface DetailProps {
  route: {
    params: {
      title: string;
      time: string;
      tags: string[];
    };
  };
  navigation: any;
}

export default function ScheduleDetailScreen({ route, navigation }: DetailProps) {
  // 메인 화면에서 선택한 일정 데이터 (없으면 테스트용 더미 데이터 사용)
  const title = route?.params?.title || "디자인 미팅 (피드백 반영)";
  const time = route?.params?.time || "09:00 AM";
  const tags = route?.params?.tags || ['#외주', '#3D모델링'];

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 (뒤로가기 + 타이틀) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>일정 상세 분석</Text>
        <View style={{ width: 40 }} /> {/* 좌우 밸런스용 여백 */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* 1. 기본 정보 카드 */}
        <View style={styles.mainInfoCard}>
          <Text style={styles.detailTime}>{time}</Text>
          <Text style={styles.detailTitle}>{title}</Text>
          
          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tagBadge}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 2. AI 추천 근거 리포트 영역 (Reasoning) */}
        <View style={styles.aiReportSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.icon}>🧠</Text>
            <Text style={styles.sectionTitle}>AI 타임라인 배치 근거</Text>
          </View>
          <Text style={styles.aiReportText}>
            최근 4주간의 데이터 분석 결과, 윤선 님은 월요일 오전 9시에서 11시 사이에 고도의 집중력을 발휘하는 패턴을 보였습니다. {"\n\n"}
            정신적 에너지가 가장 높은 황금 시간대이므로, 뇌 피로도가 높은 이 작업을 우선 배치하여 당일 완수 확률을 극대화했습니다.
          </Text>
        </View>

        {/* 3. AI 작업 어시스트 가이드 영역 (Context Guide) */}
        <View style={styles.aiGuideSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.icon}>💡</Text>
            <Text style={styles.sectionTitle}>AI 효율성 가이드</Text>
          </View>
          <View style={styles.guideBullet}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.guideText}>이전 클라이언트 요청 사항(피드백 로그)을 먼저 10분간 검토 후 작업을 시작하면 시행착오를 줄일 수 있습니다.</Text>
          </View>
          <View style={styles.guideBullet}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.guideText}>예상 소요 시간은 약 1시간 30분이며, 연속 집중 후에는 15분간의 휴식을 권장합니다.</Text>
          </View>
        </View>

        {/* 4. 하단 액션 컨트롤러 버튼 레이아웃 */}
        <View style={styles.actionArea}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>🚀 지금 바로 시작 (집중 타이머)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>🔄 다른 황금 시간대 추천받기</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  scrollContainer: {
    padding: 20,
  },
  mainInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  detailTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 6,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 14,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    backgroundColor: '#E8F2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  aiReportSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  aiGuideSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  aiReportText: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 22,
  },
  guideBullet: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#4A90E2',
    marginRight: 8,
    lineHeight: 20,
  },
  guideText: {
    flex: 1,
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 20,
  },
  actionArea: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  secondaryButtonText: {
    color: '#4A90E2',
    fontSize: 15,
    fontWeight: '600',
  },
});