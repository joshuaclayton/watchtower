(function($) {
  var $doc = $(document);
  
  $.watchtower = function(options) {
    var $recordset = $("#watched-exceptions-recordset");
    var self = {
      params: {},
      data: {
        handleResult: function(html) {
          $recordset.html(html);
        },
        update: function(callback, fn) {
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
            watchtower.data.update("$(document).data('watchtower').data.handleResult", fn);
          },
          clear: function(fn) {
            var oldFilter = self.params[name];
            delete(self.params[name]);
            watchtower.data.update("$(document).data('watchtower').data.handleResult", fn);
          }
        };
      }
    };
    
    $doc.data("watchtower", self);
    return $doc.data("watchtower");
  };
  
  $(function() {
    var watchtower = $doc.data("watchtower");
    
    $(".pagination a").live("click", function(evt) {
      var anchor = $(this);
      watchtower.filters("page").set(anchor.attr("href").match(/page\=(\d+)/)[1], function() {});
      evt.preventDefault();
      return false;
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