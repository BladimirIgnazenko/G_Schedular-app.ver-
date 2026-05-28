class CreateAiLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :ai_logs do |t|
      t.references :schedule, null: false, foreign_key: true # 외래키 및 인덱스 자동 생성
      t.jsonb :request_body   # 서버 메모리 보방용 jsonb 압축 타입
      t.jsonb :response_body  # 서버 메모리 보방용 jsonb 압축 타입
      t.integer :status_code  # 200, 429, 500 등 HTTP 상태 코드 숫자 저장
      t.integer :tokens_used  # 유저별 사용량 모니터링용 토큰 수
      t.text :error_message

      t.timestamps
    end
  end
end