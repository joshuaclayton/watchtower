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
    $(".delete-visible").click(function() {
      $(document).trigger("delete-visible.watchtower");
    });

    $(".delete-selected").click(function() {
      $(document).trigger("delete-selected.watchtower");
    });
    
    $(".select-all").click(function() {
      $(document).trigger("select-all.watchtower");
    });
    
    $(".select-none").click(function() {
      $(document).trigger("select-none.watchtower");
    });
    
    $(".pagination a").live("click", function() {
      watchtower.filters("page").set($(this).attr("href").match(/page\=(\d+)/)[1]);
    });
    
    $("ul.watched-exceptions li").live("click", function() {
      $(this).toggleClass("selected");
    });

    $("#watchtower-search").submit(function(evt) {
      watchtower.filters("query").set($("input[type=text]", $(this)).val());
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
      } else if(String.fromCharCode(e.which) == "X") {
        e.preventDefault();
        $(document).trigger("delete-selected.watchtower");
      } else if(String.fromCharCode(e.which) == "A") {
        e.preventDefault();
        $(document).trigger("select-all.watchtower");
      } else if(String.fromCharCode(e.which) == "V") {
        e.preventDefault();
        $(document).trigger("delete-visible.watchtower");
      } else if(String.fromCharCode(e.which) == "N") {
        e.preventDefault();
        $(document).trigger("select-none.watchtower");
      }
    });
    
    var deleteIds = function(elements) {
      var idsToDelete = [];
      if(elements.length > 0 && !confirm("Are you sure you want to delete these exceptions?")) { return; }
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
    
    $(document).bind("select-all.watchtower", function(data) {
      $("ul.watched-exceptions li").each(function(idx, li) {
        $(li).addClass("selected");
      });
    });
    
    $(document).bind("select-none.watchtower", function(data) {
      $("ul.watched-exceptions li").each(function(idx, li) {
        $(li).removeClass("selected");
      });
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
        return false;
      });
    });
  });
})(jQuery);