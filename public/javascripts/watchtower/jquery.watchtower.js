(function($) {
  var $doc = $(document);
  
  $.watchtower = function(options) {
    var $recordset = $(options.recordset);
    
    var self = {
      params: {},
      data: {
        handleResult: function(html) {
          $recordset.html(html);
        },
        update: function(callback, fn) {
          console.log($.extend({callback: callback}, self.params));
          $.get("/watchtower", $.extend({callback: callback}, self.params), function(data) { eval(data); fn(); console.log("completed ajax"); });
        }
      },
      filters: function(name) {
        var watchtower = $(document).data("watchtower");
        if(self.params["page"] && name != "page") { delete(self.params["page"]); }
        return {
          set: function(filter, fn) {
            if(self.params[name]) { $doc.trigger("watchtower-filter-remove", {filter: filter, name: name}); }
            self.params[name] = filter;
            $doc.trigger("watchtower-filter-add", {filter: filter, name: name, callback: fn});
            watchtower.data.update("$(document).data('watchtower').data.handleResult", fn);
          },
          clear: function(fn) {
            var oldFilter = self.params[name];
            delete(self.params[name]);
            $doc.trigger("watchtower-filter-remove", {filter: oldFilter, name: name, callback: fn});
            watchtower.data.update("$(document).data('watchtower').data.handleResult", fn);
          }
        };
      }
    };
    
    $doc.data("watchtower", self);
    $.watchtower.bindings();
    return $doc.data("watchtower");
  };
  
  $.watchtower.bindings = function() {
    $doc.bind("watchtower-filter-add", function(event, info) {
      console.log("triggered add");
      $doc.trigger("watchtower-filter-change", info);
    });
    
    $doc.bind("watchtower-filter-remove", function(event, info) {
      console.log("triggered remove");
      $doc.trigger("watchtower-filter-change", info);
    });
    
    $doc.bind("watchtower-filter-change", function(event, info) {
    });
  };
})(jQuery);