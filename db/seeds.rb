# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require "csv" questions_csv = CSV.readlines("db/questions.csv") questions_csv.shift questions_csv.each do |row| Question.create(id: row[1], question: row[2], level: row[3]) end