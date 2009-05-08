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
    
    $(".clear-watchtower-query").click(function() {
      $doc.trigger("clear-search.watchtower");
    });
    
    $(".pagination a").live("click", function() {
      watchtower.filters("page").set($(this).attr("href").match(/page\=(\d+)/)[1]);
    });
    
    $("ul.watched-exceptions li").live("click", function() {
      $(this).toggleClass("selected");
    });
    
    $("ul.watched-exceptions li a").live("click", function(e) {
      $(this).stopImmediatePropagation();
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
    
    $("div.filter button").each(function(idx, button) {
      var $button = $(button),
          filter  = $button.parents("div.filter").attr("class").match(/filter\-(\w+)/).pop(),
          name    = $button.siblings(".action-name").text();
      
      $button.click(function(e) {
        var item = $(this).parent();
        $(this).parents("div.filter").find("button span").each(function(i, s) {
          $(s).html("");
        });
        
        if(item.hasClass("active-filter")) {
          $(this).find("span").html("");
          watchtower.filters(filter).clear(function() {
            item.removeClass("active-filter");
          });
        } else {
          $(this).find("span").html("&#10003;");
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