require "ipaddr"

module Watchtower
  module ApplicationControllerBase
    
    def self.included(base)
      base.class_eval do
        def rescue_action_in_public_with_watchtower(*args)
          WatchedException.create_from_exception(self, args.first)
          rescue_action_in_public_without_watchtower(*args)
        end
        
        alias_method_chain :rescue_action_in_public, :watchtower
      end
      
      base.extend ClassMethods
    end
    
    module ClassMethods
      def force_public_request_handling!
        
        self.class_eval do
          def consider_all_requests_local_with_override(*args)
            false
          end
          
          def local_request_with_override?(*args)
            false
          end
          
          alias_method_chain :consider_all_requests_local, :override
          alias_method_chain :local_request?, :override
        end
        
      end
    end
    
  end
end
  