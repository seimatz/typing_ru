Rails.application.routes.draw do
  get '' => 'games#top'
  get 'games/level/:level' => 'games#index'
  get 'contents/setting' => 'contents#setting'
end
