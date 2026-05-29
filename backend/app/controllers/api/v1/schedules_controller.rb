class Api::V1::SchedulesController < ApplicationController

  def index
    schedules = Schedule.select(:id, :title, :start_time, :end_time, :category, :priority, :ai_status, :ai_rating)
    render json: schedules, status: :ok
  end


  def show
    schedule = Schedule.find(params[:id])
    render json: schedule, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "일정을 찾을 수 없습니다." }, status: :not_found
  end


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