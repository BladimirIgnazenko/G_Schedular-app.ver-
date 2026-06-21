class Api::V1::UsersController < ApplicationController
  # 필요시 authenticate_user! 같은 필터 추가
  
  def show
    render json: current_user, status: :ok
  end

  def update
    if current_user.update(user_params)
      # 닉네임이나 컨디션이 변경되었을 때 AI가 전체 스케줄을 재평가해야 한다면
      # 비동기 큐를 트리거할 수 있음
      if user_params[:health_status].present?
        # 예: 사용자 상태 변경 시 모든 관련 스케줄 재분석 큐 투입
        # AnalyzeAllSchedulesJob.perform_later(current_user.id)
      end
      render json: current_user, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:nickname, :interest, :health_status)
  end
end