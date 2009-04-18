module Watchtower
  module WatchedExceptionBase
    def self.included(base)
      base.send :include, Callbacks
      base.send :include, Validations
      base.send :include, Scopes
    end
    
    module Callbacks
      def self.included(base)
        base.send :include, InstanceMethods
        base.before_validation_on_create :generate_key
      end
      
      module InstanceMethods
        def generate_key
          self.key = ActiveSupport::SecureRandom.hex(12)
        end
      end
    end
    
    module Validations
      def self.included(base)
        base.validates_presence_of :key
        base.validates_uniqueness_of :key
      end
    end
    
    module Scopes
      def self.included(base)
        base.class_eval do
          default_scope :order => "#{WatchedException.quoted_table_name}.created_at DESC"
          named_scope :recent, lambda {|*ct| ct = ct.first || 5; { :limit => ct }}
        end
      end
    end
    
  end
end