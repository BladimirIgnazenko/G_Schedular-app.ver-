class Api::V1::SchedulesController < ApplicationController
  # 1. 메인 화면 조회 (최적화: 무거운 description, ai_summary는 아예 쿼리에서 제외!)
  def index
    schedules = Schedule.select(:id, :title, :start_time, :end_time, :category, :priority, :ai_status, :ai_rating)
    render json: schedules, status: :ok
  end

  # 2. 특정 일정 상세 팝업 조회 (유저가 클릭했을 때만 무거운 필드를 포함해서 응답!)
  def show
    schedule = Schedule.find(params[:id])
    render json: schedule, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "일정을 찾을 수 없습니다." }, status: :not_found
  end

  # 3. 일정 생성 (일단은 AI 연동 전, 순수 일정 등록이 잘 되는지 포스트맨 테스트용)
  def create
    schedule = Schedule.new(schedule_params)

    if schedule.save
      AnalyzeScheduleJob.perform_later(schedule.id)
      render json: schedule, status: :created
    else
      render json: { errors: schedule.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def schedule_params
    params.require(:schedule).permit(:title, :description, :start_time, :end_time, :category, :priority)
  end
end