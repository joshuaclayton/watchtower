module Watchtower
  module ControllerBase
    def self.included(base)
      base.send :include, InstanceMethods
      base.class_eval do
        before_filter :find_exception, :only => [:show, :destroy]
      end
    end
    
    module InstanceMethods
      
      def index
        @watched_exceptions = WatchedException.all
      end
      
      def show
        
      end
      
      def destroy
        @watched_exception.destroy
      end
      
      protected
      
      def find_by_key?
        @show_by_key || false
      end
      
      def find_by_id?
        @show_by_id || false
      end
      
      private
      
      def find_exception
        key = params[:id]
        @watched_exception = WatchedException.find_by_key(key)
        if @watched_exception
          @show_by_key = true
          return
        end
        @watched_exception = WatchedException.find(key)
        @show_by_id = true if @watched_exception
      end
    end
  end
end