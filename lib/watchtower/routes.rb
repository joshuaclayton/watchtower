class ActionController::Routing::RouteSet
  def load_routes_with_watchtower!
    lib_path = File.dirname(__FILE__)
    custom_routes = File.join(lib_path, *%w[.. .. config watchtower_routes.rb])
    unless configuration_files.include?(custom_routes)
      add_configuration_file(custom_routes)
    end
    load_routes_without_watchtower!
  end
  
  alias_method_chain :load_routes!, :watchtower
end