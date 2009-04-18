ActionController::Routing::Routes.draw do |map|
  map.resources :watchtower, :only => [:index, :show, :destroy]
end