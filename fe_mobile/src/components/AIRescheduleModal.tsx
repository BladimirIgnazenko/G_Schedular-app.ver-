import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

interface AIRescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AIRescheduleModal({ isOpen, onClose, onConfirm }: AIRescheduleModalProps) {
  return (
    <Modal visible={isOpen} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          
          {/* モダンのインジケータバー */}
          <View style={styles.modalHandle} />

          <Text style={styles.modalTitle}>🧠 AIタイムライン最適化の提案</Text>
          <Text style={styles.modalDescription}>
            午前のスケジュールが遅延したため、午後のスケジュールを最も達成確率の高い動線に再配置しました。変更内容を確認してください。
          </Text>

          {/* Before & After の比較エリア */}
          <View style={styles.compareContainer}>
            {/* 変更前 */}
            <View style={styles.compareBox}>
              <Text style={styles.compareLabel}>元の計画</Text>
              <View style={styles.disabledCard}><Text style={styles.disabledText}>13:00 コーディングセッション</Text></View>
              <View style={styles.disabledCard}><Text style={styles.disabledText}>15:00 休憩</Text></View>
            </View>

            {/* 中央の矢印 */}
            <View style={styles.arrowBox}>
              <Text style={styles.arrowText}>➔</Text>
            </View>

            {/* 変更後 */}
            <View style={styles.compareBox}>
              <Text style={[styles.compareLabel, styles.activeLabel]}>AIの推奨</Text>
              <View style={styles.activeCard}><Text style={styles.activeText}>13:30 コーディングセッション</Text></View>
              <View style={styles.activeCard}><Text style={styles.activeText}>15:30 休憩</Text></View>
            </View>
          </View>

          {/* 効果の要約レポート */}
          <View style={styles.effectReport}>
            <Text style={styles.effectText}>📈 予測作業効率が 25% 向上</Text>
            <Text style={styles.effectSubText}>連続した集中時間を確保し、疲労度を最小限に抑えます。</Text>
          </View>

          {/* アクションボタンのグループ */}
          <View style={styles.modalActionArea}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>この動線で変更を確定</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>元の計画を維持する</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  compareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  compareBox: {
    flex: 0.45,
  },
  compareLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 6,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#4A90E2',
  },
  arrowBox: {
    flex: 0.1,
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 20,
    color: '#CCC',
  },
  disabledCard: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  disabledText: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  activeCard: {
    backgroundColor: '#E8F2FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  activeText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  effectReport: {
    backgroundColor: '#F8F9FA',
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  effectText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2B8A3E',
    marginBottom: 2,
  },
  effectSubText: {
    fontSize: 12,
    color: '#666',
  },
  modalActionArea: {
    gap: 10,
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
});