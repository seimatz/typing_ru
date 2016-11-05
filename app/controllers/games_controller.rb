class GamesController < ApplicationController

  def index
    level = params[:level]
    if level == "0" then
      @questions = Question.where(level: level).order("RAND()")
    elsif level == "1" then
      @questions = Question.where(level: level).order("RAND()").first(30)
    else
      @questions = Question.where(level: level).order("RAND()").first(15)
    end

    q_array = []
    @questions.each do |q|
      # q.question.gsub(/,/,"\,")
      q_array.push(q.question)
    end
    @q_sentence = q_array.join("/")
  end
end
