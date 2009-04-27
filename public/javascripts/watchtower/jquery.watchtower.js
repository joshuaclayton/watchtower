(function($) {
  var $doc = $(document);
  
  $.watchtower = function(options) {
    var self = {
      params: {},
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
    var watchtower = $doc.data("watchtower");
    $(".delete-visible").click(function(evt) {
      $(document).trigger("delete-visible.watchtower");
    });

    $(".delete-selected").click(function(evt) {
      $(document).trigger("delete-selected.watchtower");
    });
    
    $(".pagination a").live("click", function(evt) {
      watchtower.filters("page").set($(this).attr("href").match(/page\=(\d+)/)[1]);
    });
    
    $("ul.watched-exceptions li").live("click", function(evt) {
      $(this).toggleClass("selected");
    });

    $("#watchtower-search").submit(function(evt) {
      watchtower.filters("query").set($("input[type=text]", $(this)).val());
      evt.preventDefault();
      return false;
    });

    $(document).keydown(function(e) {
      if (/(input|textarea|select)/i.test(e.target.nodeName)) { return; }
      if(e.which == "37") { /* left */
        e.preventDefault();
        $(".pagination a[rel*=prev]:first").trigger("click");
      } else if(e.which == "39") { /* right */
        e.preventDefault();
        $(".pagination a[rel*=next]:first").trigger("click");
      }
    });
    
    var deleteIds = function(elements) {
      var idsToDelete = [];
      elements.map(function(idx, li) {
        idsToDelete.push($(li).attr("id").match(/\d+/)[0]);
      });
      watchtower.data.destroy(idsToDelete.join(","));
    };
    
    $(document).bind("delete-visible.watchtower", function(data) {
      deleteIds($("ul.watched-exceptions li"));
    });
    
    $(document).bind("delete-selected.watchtower", function(data) {
      deleteIds($("ul.watched-exceptions li.selected"));
    });
    
    $("ul[class^=filter-] li a").each(function(idx, a) {
      var $a     = $(a),
          filter  = $a.parent().parent().attr("class").replace("filter-", ""),
          name    = $a.text();
      
      $a.click(function(e) {
        var item = $(this).parent();
        if(item.hasClass("active-filter")) {
          watchtower.filters(filter).clear(function() {
            item.removeClass("active-filter");
          });
        } else {
          watchtower.filters(filter).set(name, function() {
            item.siblings().removeClass("active-filter");
            item.addClass("active-filter");
          });
        }
        e.preventDefault();
        return false;
      });
    });
  });
})(jQuery);