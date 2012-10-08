require 'roo'
require 'csv'

class HomeController < ApplicationController
  def index
    @spreadsheet = Datasheet.new
  end

  def website
    if request.post?
      spreadsheet = Datasheet.first(:conditions => {:file_file_name => params[:spreadsheet][:file].original_filename})
      spreadsheet = Datasheet.create(params[:spreadsheet]) if spreadsheet.nil?
    else
      spreadsheet = Datasheet.first(:order => 'updated_at DESC')
    end
    @conflicted = CSV.parse ''
    unless spreadsheet.nil?
      file = open_file spreadsheet
      @conflicted = CSV.parse(file.gets nil)
      column_filter @conflicted
    end
    @resolved = CSV.parse ''
    @headings = @conflicted.empty? ? [] : @conflicted.delete_at(0)
  end

  def address
  end

  def phone
  end

  def update
  end

  private
  def open_file spreadsheet
    f = File.open(spreadsheet.file.path)
    return f
  end

  def column_filter spreadsheet
    columns_to_keep = ['answer', 'description', 'input', 'title']
    indices = []
    spreadsheet[0].select! do |elem|
      t_val = false
      columns_to_keep.each_index do |i| 
        c = columns_to_keep[i]
        unless (elem =~ /#{c}/i).nil?
          indices << i
          t_val = true
          break 
        end
      end
      t_val
    end
    spreadsheet.collect! {|row| row = indices.collect {|i| row[i]}}
  end
end
