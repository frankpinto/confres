require 'roo'
require 'csv'

class HomeController < ApplicationController
  def index
  end

  def website
    f = save_file
    @csv = CSV.read(f.path)# do |row|
    @resolved = CSV.parse('')
    #end
  end

  def address
    f = save_file
  end

  def phone
    f = save_file
  end

  def update
  end

  private
  def save_file
    tempfile = params[:spreadsheet]
    f = File.open('spreadsheets/' + tempfile.original_filename, 'w')
    f.write(tempfile.gets(nil))
    f.rewind
    tempfile.close
    return f
  end
end