(function($) {
  var $doc = $(document);
  
  $.watchtower = function(options) {
    var self = {
      params: {},
      utilities: {
        handleDateChange: function(dateName, date) {
          var watchtower = $(document).data("watchtower");
          if(date.length > 0) {
            watchtower.filters(dateName).set(date);
          } else {
            watchtower.filters(dateName).clear();
          }
        }
      },
      data: {
        get: function() {
          var fn = arguments[0] || function() {};
          $.get("/watchtower", self.params, function(data) { eval(data); fn(); });
        },
        destroy: function(ids) {
          var fn = arguments[1] || function() {};
          $.post("/watchtower/destroy_multiple", $.extend({id: ids, "_method": "delete", authenticity_token: $(document).data("authToken")}, self.params), function(data) { eval(data); fn(); });
        }
      },
      filters: function(name) {
        var watchtower = $(document).data("watchtower");
        if(self.params["page"] && name != "page") { delete(self.params["page"]); }
        return {
          set: function(filter, fn) {
            self.params[name] = filter;
            watchtower.data.get(fn);
          },
          clear: function(fn) {
            var oldFilter = self.params[name];
            delete(self.params[name]);
            watchtower.data.get(fn);
          }
        };
      }
    };
    
    $doc.data("watchtower", self);
    return $doc.data("watchtower");
  };
  
  $(function() {
    $(".loading-progress").ajaxStart(function() {
      $(this).stop(true, true).fadeIn("slow");
    }).ajaxStop(function() {
      $(this).stop(true, false).animate({opacity: 1.0}, 100).fadeOut("slow");
    });
    
    var watchtower = $doc.data("watchtower");
    
    $("#watchtower_exceptions_start_at").datepicker({
      onClose: function(date, inst) { watchtower.utilities.handleDateChange("start_at", date); }
    });
    
    $("#watchtower_exceptions_end_at").datepicker({
      onClose: function(date, inst) { watchtower.utilities.handleDateChange("end_at", date); }
    });
  });
})(jQuery);