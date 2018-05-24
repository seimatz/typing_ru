Rails.application.routes.draw do
  get '' => redirect_to("https://cyrillic.typing-up.pro/", status: 301)
  # get '' => 'games#top'
  get 'games/level/:level' => 'games#index'
  get 'contents/setting' => 'contents#setting'
end
