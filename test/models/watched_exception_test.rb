require 'test_helper'

class WatchedExceptionTest < ActiveSupport::TestCase
  should_have_named_scope :recent, :limit => 5
  should_have_named_scope "recent(20)", :limit => 20
  should_have_default_scope :order => "#{WatchedException.quoted_table_name}.created_at DESC"
  
  context "A watched exception instance" do
    setup { @watched_exception = Factory(:watched_exception) }
    should_validate_uniqueness_of :key
    should_validate_presence_of :key
    
    should "generate the controller_action attribute on save" do
      @watched_exception.controller_name = "test"
      @watched_exception.action_name = "test"
      assert_not_equal @watched_exception.controller_action, "test/test"

      @watched_exception.save
      assert_equal @watched_exception.controller_action, "test/test"
    end
    
    should "generate a key when created" do
      @watched_exception = Factory.build(:watched_exception, :key => nil)
      ActiveSupport::SecureRandom.expects(:hex).with(12).returns("new key")
      @watched_exception.save
      assert_equal "new key", @watched_exception.key
    end
    
    should "know how to generate its name attribute" do
      @watched_exception.exception_class = "My Exception"
      @watched_exception.stubs(:controller_action).returns("Controller Action")
      assert_equal "My Exception in Controller Action", @watched_exception.name
    end
  end
  
  should "list all exception classes" do
    WatchedException.expects(:all).with(:select => "DISTINCT exception_class", :order => "exception_class").returns([])
    WatchedException.exception_classes
  end
  
  should "list all controller actions" do
    WatchedException.expects(:all).with(:select => "DISTINCT controller_action", :order => "controller_action").returns([])
    WatchedException.controller_actions
  end
  
end