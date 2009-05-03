ENV["RAILS_ENV"] = "test"
require File.expand_path(File.dirname(__FILE__) +
                         "/rails_root/config/environment")
require 'test_help'

$: << File.expand_path(File.dirname(__FILE__) + '/..')
require 'watchtower'

require 'redgreen' rescue LoadError

class ActiveSupport::TestCase
  self.use_transactional_fixtures = true
  self.use_instantiated_fixtures  = false
end