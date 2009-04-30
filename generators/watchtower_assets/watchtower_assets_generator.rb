class WatchtowerAssetsGenerator < Rails::Generator::Base
  
  def manifest
    record do |m|
      m.directory File.join("public", "stylesheets", "watchtower")
      m.directory File.join("public", "stylesheets", "watchtower", "images")
      m.directory File.join("public", "stylesheets", "watchtower", "assets", "images")
      m.directory File.join("public", "stylesheets", "watchtower", "assets", "images", "buttons")
      m.directory File.join("public", "stylesheets", "watchtower", "assets", "images", "icons")
      m.directory File.join("public", "javascripts", "watchtower")
      
      root = File.join(File.dirname(__FILE__), "templates")
      Dir.glob(File.join(root, "**", "*.*")).each do |f|
        file = f.gsub("#{root}/", "")
        m.file file, file
      end
    end
  end
end
