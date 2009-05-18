ActionController::Routing::Routes.draw do |map|
  map.resources :watchtower, 
                :only => [:index, :show, :destroy, :destroy_multiple],
                :collection => {:destroy_multiple => :delete}
end