Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :schedules, only: [:index, :show, :create]
    end
  end

  if Rails.env.development?
    mount GoodJob::Engine => 'good_job'
  end
end