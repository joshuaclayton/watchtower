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
    end
  end
end
  