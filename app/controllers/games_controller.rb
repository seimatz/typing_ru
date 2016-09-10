class GamesController < ApplicationController

  def index
    @questions = Question.order("RAND()").first(30)
  end
end
