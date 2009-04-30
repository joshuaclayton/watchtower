class WatchtowerGenerator < Rails::Generator::Base
  def manifest
    record do |m|
      unless ActiveRecord::Base.connection.table_exists?(:watched_exceptions)
        m.migration_template "migrations/create_watched_exceptions.rb",
                             'db/migrate',
                             :migration_file_name => "create_watched_exceptions"
      end
      m.readme "README"
    end
  end
end
