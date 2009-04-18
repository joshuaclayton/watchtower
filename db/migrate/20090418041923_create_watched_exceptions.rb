class CreateWatchedExceptions < ActiveRecord::Migration
  def self.up
    create_table :watched_exceptions do |t|
      t.string :controller_name, :action_name, :controller_action, :exception_class, :key
      t.string :parameters, :format, :application_path, :message
      t.text :backtrace, :request
      t.datetime :created_at
    end
    
    change_table :watched_exceptions do |t|
      [:controller_name, :action_name, :controller_action, :exception_class, :key, :created_at, :message].each do |col|
        t.index col
      end
    end
  end

  def self.down
    drop_table :watched_exceptions
  end
end
