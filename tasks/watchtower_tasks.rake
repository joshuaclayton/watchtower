namespace :watchtower do
  task :sync do
    system "rsync -ruv vendor/plugins/watchtower/db/migrate db"
    system "rsync -ruv vendor/plugins/watchtower/public ."
  end
end