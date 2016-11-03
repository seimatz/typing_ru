Rails.application.routes.draw do
  get '' => 'games#top'
  get 'games' => 'games#index'
end
