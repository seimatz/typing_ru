class GamesController < ApplicationController

  def index
    @questions = Question.order("RAND()").first(3)
    q_array = []
    @questions.each do |q|
      q_array.push(q.question)
    end
    @q_sentence = q_array.join(",")
  end
end
