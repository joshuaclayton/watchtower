require "test_helper"

class WatchtowerControllerTest < ActionController::TestCase
  context "on GET to /watchtower" do
    setup { get :index }
    
    should_respond_with :success
  end
end