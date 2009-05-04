Factory.sequence :key do |n|
  "watched-exception-#{n}"
end

Factory.define :watched_exception do |watched_exception|
  watched_exception.controller_name "home"
  watched_exception.action_name "index"
  watched_exception.exception_class "ActionView::TemplateError"
  watched_exception.key { Factory.next :key }
  watched_exception.parameters "{\"action\"=>\"index\", \"controller\"=>\"home\"}"
  watched_exception.format "text/html"
  watched_exception.application_path "/Users/username/Sites/app_name"
  watched_exception.message "error"
  watched_exception.backtrace  "On line #1 of app/views/home/index.erb\n\n    1: <% raise 'error' %>\n\n    app/views/home/index.erb:1"
  watched_exception.request "#<ActionController::Request>"
end