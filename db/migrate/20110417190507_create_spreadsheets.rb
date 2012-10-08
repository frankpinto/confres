class CreateSpreadsheets < ActiveRecord::Migration
  def self.up
    create_table :datasheets do |t|
      t.string :file_file_name
      t.string :file_content_type
      t.integer :file_file_size
      t.datetime :file_updated_at
      t.string :file_type
      t.string :file_category

      t.timestamps
    end
  end

  def self.down
    drop_table :datasheets
  end
end
