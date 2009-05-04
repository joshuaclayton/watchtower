require 'test_helper'

class WatchedExceptionTest < ActiveSupport::TestCase
  should_have_named_scope :recent, :limit => 5
  should_have_named_scope "recent(20)", :limit => 20
  should_have_default_scope :order => "#{WatchedException.quoted_table_name}.created_at DESC"
  
  should "list all exception classes" do
    WatchedException.expects(:all).with(:select => "DISTINCT exception_class", :order => "exception_class").returns([])
    WatchedException.exception_classes
  end
  
  should "list all controller actions" do
    WatchedException.expects(:all).with(:select => "DISTINCT controller_action", :order => "controller_action").returns([])
    WatchedException.controller_actions
  end
end