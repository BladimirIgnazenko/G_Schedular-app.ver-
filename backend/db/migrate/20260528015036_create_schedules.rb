class CreateSchedules < ActiveRecord::Migration[7.1]
  def change
    create_table :schedules do |t|
      t.string :title, null: false        # Null 차단 (최적화)
      t.text :description
      t.string :category, default: 'general'
      t.integer :priority, default: 0
      t.datetime :start_time, null: false # Null 차단
      t.datetime :end_time, null: false   # Null 차단
      t.text :ai_summary
      t.string :ai_status, null: false, default: 'pending' # 기본값 세팅 (UI 제어용)
      t.integer :ai_rating

      t.timestamps
    end
  end
end