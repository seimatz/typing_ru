class ChangeTimestampOnQuestions < ActiveRecord::Migration
  def change
    change_column_null :questions, :created_at, true
    change_column_null :questions, :updated_at, true
  end
end
