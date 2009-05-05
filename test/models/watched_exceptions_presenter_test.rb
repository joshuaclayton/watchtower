require 'test_helper'

class WatchedExceptionsPresenterTest < ActiveSupport::TestCase
  context "generating correct scope" do
    should "search if passed :query" do
      WatchedException.expects(:search).with("%term%").returns([])
      WatchedExceptionsPresenter.new(:query => "term")
    end
    
    should "filter by :action_name" do
      WatchedException.expects(:scoped_by_action_name).with("action").returns([])
      WatchedExceptionsPresenter.new(:action_name => "action")
    end
    
    should "filter by :controller_name" do
      WatchedException.expects(:scoped_by_controller_name).with("controller").returns([])
      WatchedExceptionsPresenter.new(:controller_name => "controller")
    end
    
    should "filter by :controller_action" do
      WatchedException.expects(:scoped_by_controller_action).with("controller/action").returns([])
      WatchedExceptionsPresenter.new(:controller_action => "controller/action")
    end
    
    should "filter by :exception_class" do
      WatchedException.expects(:scoped_by_exception_class).with("NoMethodError").returns([])
      WatchedExceptionsPresenter.new(:exception_class => "NoMethodError")
    end
    
    should "filter by :start_at" do
      WatchedException.expects(:scoped).with({:conditions => ["DATE(#{WatchedException.quoted_table_name}.created_at) >= ?", Date.parse("01/01/2009").to_s(:db)]}).returns([])
      WatchedExceptionsPresenter.new(:start_at => "01/01/2009")
    end
    
    should "filter by :end_at" do
      WatchedException.expects(:scoped).with({:conditions => ["DATE(#{WatchedException.quoted_table_name}.created_at) <= ?", Date.parse("01/01/2009").to_s(:db)]}).returns([])
      WatchedExceptionsPresenter.new(:end_at => "01/01/2009")
    end
    
    should "paginate results" do
      WatchedException.expects(:paginate).with({:page => 1, :per_page => 10}).returns([])
      WatchedExceptionsPresenter.new(:page => 1)
    end
  end
  
  context "method delegation" do
    should "pass any extra methods to WatchedException" do
      (result = []).expects(:my_method)
      WatchedExceptionsPresenter.stubs(:new).returns(result)
      WatchedExceptionsPresenter.new({}).my_method
    end
    
    should "allow iteration" do
      WatchedExceptionsPresenter.stubs(:new).returns([1,2,3])
      assert_equal ["1", "2", "3"], WatchedExceptionsPresenter.new({}).map(&:to_s)
    end
  end
end