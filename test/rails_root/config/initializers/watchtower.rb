# This simulates loading the clearance gem, but without relying on
# vendor/gems

watchtower_path = File.join(File.dirname(__FILE__), *%w(.. .. .. ..))
watchtower_lib_path = File.join(watchtower_path, "lib")

$LOAD_PATH.unshift(watchtower_lib_path)
load File.join(watchtower_path, 'rails', 'init.rb')
