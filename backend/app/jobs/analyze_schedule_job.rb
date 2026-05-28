class AnalyzeScheduleJob < ApplicationJob
  queue_as :default

  retry_on AiService::RetryableError, attempts: 3, wait: :exponentially_longer


  discard_on AiService::FatalError do |job, error|
    job.handle_dead_letter(error)
  end


  retry_on StandardError, attempts: 3 do |job, error|
    job.handle_dead_letter(error)
  end


  def perform(schedule_id)
    @schedule = Schedule.find_by(id: schedule_id)
    return if @schedule.blank?

    @schedule.update!(ai_status: "processing")

    ai_service = AiService.new
    result = ai_service.analyze_schedule(@schedule.title, @schedule.description)

    if result[:success]
      ai_data = result[:data]
      @schedule.update!(
        category: ai_data["category"],
        priority: ai_data["priority"],
        ai_summary: ai_data["ai_summary"],
        ai_status: "success"
      )
    end
  end


  def handle_dead_letter(error)
    Rails.logger.error "[AnalyzeScheduleJob Fatal Error] Job ID: #{job_id} | Message: #{error.message}"
    

    schedule_id = arguments.first
    schedule = Schedule.find_by(id: schedule_id)
    
    if schedule
      schedule.update!(
        ai_status: "failed",
        ai_summary: "AI 분석 실패: #{error.message.truncate(100)}"
      )
    end
  end
end