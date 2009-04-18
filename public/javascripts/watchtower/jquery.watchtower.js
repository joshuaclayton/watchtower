(function($) {
  var $doc = $(document);
  
  $.watchtower = function() {
    var self = {},
        filterCache = {};
        
    return {
      filters: function(name) {
        return {
          set: function(filter) {
            if(filterCache[name]) { $doc.trigger("watchtower-filter-remove", {filter: filter, name: name}); }
            filterCache[name] = filter;
            $doc.trigger("watchtower-filter-add", {filter: filter, name: name});
          },
          clear: function() {
            var oldFilter = filterCache[name];
            filterCache[name] = null;
            $doc.trigger("watchtower-filter-remove", {filter: oldFilter, name: name});
          }
        };
      }
    };
  };
  
  $.watchtower.bindings = function() {
    $doc.bind("watchtower-filter-add", function(event, info) {
      $doc.trigger("watchtower-filter-change", info);
    });
    
    $doc.bind("watchtower-filter-remove", function(event, info) {
      $doc.trigger("watchtower-filter-change", info);
    });
    
    $doc.bind("watchtower-filter-change", function(event, info) {
      
    });
  };
})(jQuery);