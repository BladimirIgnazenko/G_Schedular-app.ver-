require 'net/http'
require 'uri'
require 'json'

class AiService
  class RetryableError < StandardError; end
  class FatalError < StandardError; end

  URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

  def initialize
    @api_key = ENV["GEMINI_API_KEY"]
    if @api_key.blank?
      raise FatalError, "제미나이 API 키가 존재하지 않습니다. 환경 변수를 확인해주세요."
    end
  end

  def analyze_schedule(title, description)
    prompt = <<~TEXT
      당신은 사용자의 일정을 분석하여 카테고리를 분류하고 직관적인 요약을 제공하는 비서 시스템입니다.
      다음 일정 정보를 바탕으로 분석 결과를 반드시 아래 지정된 JSON 형식으로만 응답하세요. 다른 설명이나 텍스트는 절대 포함하지 마십시오.

      [일정 제목]: #{title}
      [일정 내용]: #{description}

      [반드시 지켜야 할 응답 JSON 형식]:
      {
        "category": "일정의 성격에 따라 general, development, design, study, life 중 하나로 분류",
        "priority": 1,
        "ai_summary": "일정 내용을 분석하여 사용자가 한눈에 파악할 수 있도록 1~2문장으로 명확하게 요약한 문장"
      }
    TEXT

    payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    }

    uri = URI.parse("#{URL}?key=#{@api_key}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 5 
    
    request = Net::HTTP::Post.new(uri.request_uri, { 'Content-Type' => 'application/json' })
    request.body = payload.to_json

    response = http.request(request)
    status_code = response.code.to_i

    if status_code == 200
      response_data = JSON.parse(response.body)
      result_text = response_data.dig("candidates", 0, "content", "parts", 0, "text")
      
      {
        success: true,
        data: JSON.parse(result_text.strip)
      }
    elsif [429, 500, 502, 503, 504].include?(status_code)
      raise RetryableError, "구글 서버 일시적 오류 (HTTP #{status_code}): #{response.body}"
    else
      raise FatalError, "구글 API 인증 및 규격 오류 (HTTP #{status_code}): #{response.body}"
    end
  rescue Net::ReadTimeout, Net::OpenTimeout => e
    raise RetryableError, "구글 API 통신 타임아웃 발생: #{e.message}"
  rescue JSON::ParserError => e
    raise RetryableError, "AI 응답 파싱 실패 (재시도 필요): #{e.message}"
  end
end