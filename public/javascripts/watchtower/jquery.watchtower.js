(function($) {
  var $doc = $(document);
  
  $.watchtower = function(options) {
    var self = {
      params: {},
      data: {
        update: function() {
          var fn = arguments[0] || function() {};
          $.get("/watchtower", self.params, function(data) { eval(data); fn(); });
        },
        destroy: function(id) {
          var fn = arguments[1] || function() {};
          $.post("/watchtower/destroy_multiple", $.extend({id: id, "_method": "delete", authenticity_token: $(document).data("authToken")}, self.params), function(data) { eval(data); fn(); });
        }
      },
      filters: function(name) {
        var watchtower = $(document).data("watchtower");
        if(self.params["page"] && name != "page") { delete(self.params["page"]); }
        return {
          set: function(filter, fn) {
            if(self.params[name]) { $doc.trigger("watchtower-filter-remove", {filter: filter, name: name}); }
            self.params[name] = filter;
            watchtower.data.update(fn);
          },
          clear: function(fn) {
            var oldFilter = self.params[name];
            delete(self.params[name]);
            watchtower.data.update(fn);
          }
        };
      }
    };
    
    $doc.data("watchtower", self);
    return $doc.data("watchtower");
  };
  
  $(function() {
    var watchtower = $doc.data("watchtower");
    $("a.delete-visible").click(function(evt) {
      $(document).trigger("delete-visible.watchtower");
      evt.preventDefault();
      return false;
    });

    $("a.delete-selected").click(function(evt) {
      $(document).trigger("delete-selected.watchtower");
      evt.preventDefault();
      return false;
    });
    
    $(".pagination a").live("click", function(evt) {
      var anchor = $(this);
      watchtower.filters("page").set(anchor.attr("href").match(/page\=(\d+)/)[1], function() {});
      evt.preventDefault();
      return false;
    });
    
    $("ul.watched-exceptions li").live("click", function(evt) {
      $(this).toggleClass("selected");
    });

    $("#watchtower-search").submit(function(e) {
      var $form = $(this);
      watchtower.filters("query").set($("input[type=text]", $form).val(), function() {});
      e.preventDefault();
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
    
    $(document).bind("delete-visible.watchtower", function(data) {
      var idsToDelete = [];
      $("ul.watched-exceptions li").map(function(idx, li) {
        idsToDelete.push($(li).attr("id").match(/\d+/)[0]);
      });
      watchtower.data.destroy(idsToDelete.join(","));
    });
    
    $(document).bind("delete-selected.watchtower", function(data) {
      var idsToDelete = [];
      $("ul.watched-exceptions li.selected").map(function(idx, li) {
        idsToDelete.push($(li).attr("id").match(/\d+/)[0]);
      });
      watchtower.data.destroy(idsToDelete.join(","));
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