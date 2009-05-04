ENV["RAILS_ENV"] = "test"
require File.expand_path(File.dirname(__FILE__) +
                         "/rails_root/config/environment")
require 'test_help'
$: << File.expand_path(File.dirname(__FILE__) + '/..')
require "watchtower"

gem "thoughtbot-factory_girl" # from github
require "factory_girl"

require "test/factories/watched_exception"

require "redgreen" rescue LoadError
require "mocha"

class ActiveSupport::TestCase
  self.use_transactional_fixtures = true
  self.use_instantiated_fixtures  = false
end

class Test::Unit::TestCase
  def self.should_have_default_scope(options = {})
    klass = self.name.gsub(/Test$/, '').constantize
    should "have the default scope #{options.inspect}" do
      assert klass.default_scoping.any? {|scope| scope[:find] == options }
    end
  end
end