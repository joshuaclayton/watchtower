class WatchedExceptionsPresenter
  include Enumerable
  
  def initialize(params)
    scope = WatchedException
    scope = scope.search("%#{params[:query]}%") if params[:query]
    scope = scope.scoped_by_action_name(params[:action_name]) if params[:action_name]
    scope = scope.scoped_by_controller_name(params[:controller_name]) if params[:controller_name]
    scope = scope.scoped_by_controller_action(params[:controller_action]) if params[:controller_action]
    scope = scope.scoped_by_exception_class(params[:exception_class]) if params[:exception_class]
    @watched_exceptions = scope.paginate(:page => params[:page], :per_page => 10)
  end
  
  def each(&block)
    @watched_exceptions.each(&block)
  end
  
  def method_missing(call, *args)
    @watched_exceptions.send call, *args
  end
end