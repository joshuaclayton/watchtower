(function($) {
  $(function() {
    var $doc = $(document),
        watchtower = $doc.data("watchtower");
    
    $(".delete-visible").click(function() {
      $doc.trigger("delete-visible.watchtower");
    });
    
    $(".delete-selected").click(function() {
      $doc.trigger("delete-selected.watchtower");
    });
    
    $(".select-all").click(function() {
      $doc.trigger("select-all.watchtower");
    });
    
    $(".select-none").click(function() {
      $doc.trigger("select-none.watchtower");
    });
    
    $(".clear-watchtower-start-at").click(function() {
      $doc.trigger("clear-start-at.watchtower");
    });
    
    $(".clear-watchtower-end-at").click(function() {
      $doc.trigger("clear-end-at.watchtower");
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

    $doc.keydown(function(e) {
      if (/(input|textarea|select)/i.test(e.target.nodeName)) { return; }
      
      if(e.which == "37") { /* left */
        e.preventDefault();
        $(".pagination a[rel*=prev]:first").trigger("click");
      } else if(e.which == "39") { /* right */
        e.preventDefault();
        $(".pagination a[rel*=next]:first").trigger("click");
      } else if(String.fromCharCode(e.which) == "X") {
        e.preventDefault();
        $doc.trigger("delete-selected.watchtower");
      } else if(String.fromCharCode(e.which) == "A") {
        e.preventDefault();
        $doc.trigger("select-all.watchtower");
      } else if(String.fromCharCode(e.which) == "V") {
        e.preventDefault();
        $doc.trigger("delete-visible.watchtower");
      } else if(String.fromCharCode(e.which) == "N") {
        e.preventDefault();
        $doc.trigger("select-none.watchtower");
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
        return false;
      });
    });
  });
})(jQuery);