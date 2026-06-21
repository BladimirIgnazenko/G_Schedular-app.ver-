class User < ApplicationRecord
  # 이미 JSONB를 사용 중이라고 가정하고, 설정을 명시함
  # preferences 컬럼이 JSONB 타입일 경우 store_accessor 사용
  store_accessor :preferences, :nickname, :interest, :health_status

  validates :nickname, presence: true, on: :update
  
  # 크론병 관련 상태값 검증
  validates :health_status, inclusion: { in: %w(good normal bad) }, allow_nil: true
  
  has_many :schedules, dependent: :destroy
end