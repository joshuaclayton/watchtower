module Watchtower
  module WatchedExceptionBase
    def self.included(base)
      base.send :include, Callbacks
      base.send :include, Validations
      base.send :include, Scopes
      base.send :include, InstanceMethods
      base.extend ClassMethods
    end
    
    module Callbacks
      def self.included(base)
        base.send :include, InstanceMethods
        base.before_validation_on_create :generate_key, :if => lambda {|watched_exception| watched_exception.key.blank? }
        base.before_save :generate_controller_action, :clean_backtrace
      end
      
      module InstanceMethods
        def generate_key
          self.key = ActiveSupport::SecureRandom.hex(12)
        end
        
        def generate_controller_action
          self.controller_action = "#{self.controller_name}/#{self.action_name}"
        end
        
        def clean_backtrace; end
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
          named_scope :search, lambda {|query| {
            :conditions => [
              [ :controller_name, :action_name, 
                :controller_action, :exception_class, 
                :parameters, :message].map {|attribute| "#{WatchedException.quoted_table_name}.#{attribute} LIKE :query"}.join(" OR "), {:query => query}
              ]
          }}
          
        end
      end
    end
    
    module ClassMethods
      def create_from_exception(controller, exception)
        create! :exception_class  => exception.class.name,
                :controller_name  => controller.controller_name,
                :action_name      => controller.action_name,
                :backtrace        => controller.send(:clean_backtrace, exception).first,
                :request          => controller.request.inspect,
                :parameters       => controller.request.parameters.inspect,
                :format           => controller.request.format.to_s,
                :message          => exception.message.to_s,
                :application_path => ::RAILS_ROOT
      end
      
      def exception_classes
        all(:select => "DISTINCT exception_class", :order => "exception_class").collect(&:exception_class)
      end
      
      def controller_actions
        all(:select => "DISTINCT controller_action", :order => "controller_action").collect(&:controller_action)
      end
    end
    
    module InstanceMethods
      def name
        "#{self.exception_class} in #{self.controller_action}"
      end
    end
    
  end
end