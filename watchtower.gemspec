# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{watchtower}
  s.version = "0.1.4"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.2") if s.respond_to? :required_rubygems_version=
  s.authors = ["Joshua Clayton"]
  s.date = %q{2009-05-29}
  s.description = %q{An exception logger for Rails 2.3}
  s.email = %q{joshua.clayton@gmail.com}
  s.extra_rdoc_files = ["lib/watchtower/application_controller_base.rb", "lib/watchtower/controller_base.rb", "lib/watchtower/routes.rb", "lib/watchtower/watched_exception_base.rb", "lib/watchtower/watched_exceptions_presenter.rb", "lib/watchtower.rb", "README.textile", "tasks/watchtower_tasks.rake"]
  s.files = ["app/controllers/watchtower_controller.rb", "app/helpers/watchtower_helper.rb", "app/models/watched_exception.rb", "app/views/layouts/watchtower.erb", "app/views/watchtower/_recordset.erb", "app/views/watchtower/destroy.js.rjs", "app/views/watchtower/destroy_multiple.js.rjs", "app/views/watchtower/index.html.erb", "app/views/watchtower/index.js.rjs", "app/views/watchtower/show.html.erb", "config/watchtower_routes.rb", "generators/watchtower/templates/migrations/create_watched_exceptions.rb", "generators/watchtower/templates/README", "generators/watchtower/USAGE", "generators/watchtower/watchtower_generator.rb", "generators/watchtower_assets/templates/public/javascripts/watchtower/jquery-1.3.2.min.js", "generators/watchtower_assets/templates/public/javascripts/watchtower/jquery-ui-1.7.1.custom.min.js", "generators/watchtower_assets/templates/public/javascripts/watchtower/jquery.watchtower.bindings.js", "generators/watchtower_assets/templates/public/javascripts/watchtower/jquery.watchtower.events.js", "generators/watchtower_assets/templates/public/javascripts/watchtower/jquery.watchtower.js", "generators/watchtower_assets/templates/public/stylesheets/watchtower/admin.css", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/ajax-loader.gif", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/bullet-black.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/buttons/sprite-gray.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/buttons/x.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/icons/caution-sign-red.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/icons/caution-sign-sm.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/icons/caution-sign.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/icons/edit-template.gif", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/icons/success-badge.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/assets/images/nav-admin-shadow.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/extras.css", "generators/watchtower_assets/templates/public/stylesheets/watchtower/forms.css", "generators/watchtower_assets/templates/public/stylesheets/watchtower/ie.css", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-bg_flat_0_aaaaaa_40x100.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-bg_glass_55_fbf9ee_1x400.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-bg_glass_65_ffffff_1x400.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-bg_glass_75_dadada_1x400.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-bg_glass_75_e6e6e6_1x400.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-bg_glass_75_ffffff_1x400.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-bg_highlight-soft_75_cccccc_1x100.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-bg_inset-soft_95_fef1ec_1x100.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-icons_222222_256x240.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-icons_2e83ff_256x240.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-icons_454545_256x240.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-icons_888888_256x240.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/images/ui-icons_cd0a0a_256x240.png", "generators/watchtower_assets/templates/public/stylesheets/watchtower/jquery-ui-1.7.1.custom.css", "generators/watchtower_assets/templates/public/stylesheets/watchtower/reset.css", "generators/watchtower_assets/templates/public/stylesheets/watchtower/screen.css", "generators/watchtower_assets/templates/public/stylesheets/watchtower/watchtower.css", "generators/watchtower_assets/USAGE", "generators/watchtower_assets/watchtower_assets_generator.rb", "lib/watchtower/application_controller_base.rb", "lib/watchtower/controller_base.rb", "lib/watchtower/routes.rb", "lib/watchtower/watched_exception_base.rb", "lib/watchtower/watched_exceptions_presenter.rb", "lib/watchtower.rb", "Manifest", "MIT-LICENSE", "rails/init.rb", "Rakefile", "README.textile", "tasks/watchtower_tasks.rake", "watchtower.gemspec", "test/controllers/watchtower_controller_test.rb", "test/models/watched_exception_test.rb", "test/models/watched_exceptions_presenter_test.rb", "test/rails_root/test/test_helper.rb", "test/test_helper.rb"]
  s.has_rdoc = true
  s.homepage = %q{http://github.com/joshuaclayton/watchtower}
  s.rdoc_options = ["--line-numbers", "--inline-source", "--title", "Watchtower", "--main", "README.textile"]
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{watchtower}
  s.rubygems_version = %q{1.3.2}
  s.summary = %q{An exception logger for Rails 2.3}
  s.test_files = ["test/controllers/watchtower_controller_test.rb", "test/models/watched_exception_test.rb", "test/models/watched_exceptions_presenter_test.rb", "test/rails_root/test/test_helper.rb", "test/test_helper.rb"]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<activesupport>, [">= 0", ">= 2.3.0"])
      s.add_development_dependency(%q<will_paginate>, [">= 0", ">= 2.3.4"])
    else
      s.add_dependency(%q<activesupport>, [">= 0", ">= 2.3.0"])
      s.add_dependency(%q<will_paginate>, [">= 0", ">= 2.3.4"])
    end
  else
    s.add_dependency(%q<activesupport>, [">= 0", ">= 2.3.0"])
    s.add_dependency(%q<will_paginate>, [">= 0", ">= 2.3.4"])
  end
end
