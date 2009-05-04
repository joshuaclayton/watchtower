require "test_helper"

class WatchtowerControllerTest < ActionController::TestCase
  context "on GET to :index" do
    setup { get :index }
    should_respond_with :success
  end
  
  context "on GET to :show" do
    context "with an existing ID" do
      setup do
        @exception = Factory :watched_exception
        get :show, :id => @exception.id
      end
      
      should_respond_with :success
      should_render_template :show
    end
    
    context "with an existing key" do
      setup do
        @exception = Factory :watched_exception, :key => "my-key"
        get :show, :id => "my-key"
      end
      
      should_respond_with :success
      should_render_template :show
    end
    
    context "with invalid id" do
      should "raise a not found error" do
        assert_raise ActiveRecord::RecordNotFound do
          get :show, :id => "key doesn't exist"
        end
      end
    end
  end
end