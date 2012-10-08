class Datasheet < ActiveRecord::Base
  has_attached_file :file, :path => ':rails_root/spreadsheets/:filename', :url => ':rails_root/public/404.html'
  validates_attachment_presence :file
end
