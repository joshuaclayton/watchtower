(function($) {
  $(function() {
    var $doc = $(document),
        watchtower = $doc.data("watchtower");
    
    var deleteIds = function(elements) {
      var idsToDelete = [];
      if(elements.length > 0 && !confirm("Are you sure you want to delete these exceptions?")) { return; }
      elements.map(function(idx, li) {
        idsToDelete.push($(li).attr("id").match(/\d+/)[0]);
      });
      watchtower.data.destroy(idsToDelete.join(","));
    };
    
    $doc.bind("delete-visible.watchtower", function(data) {
      deleteIds($("ul.watched-exceptions li"));
    });
    
    $doc.bind("delete-selected.watchtower", function(data) {
      deleteIds($("ul.watched-exceptions li.selected"));
    });
    
    $doc.bind("select-all.watchtower", function(data) {
      $("ul.watched-exceptions li").each(function(idx, li) {
        $(li).addClass("selected");
      });
    });
    
    $doc.bind("select-none.watchtower", function(data) {
      $("ul.watched-exceptions li").each(function(idx, li) {
        $(li).removeClass("selected");
      });
    });
    
    $doc.bind("clear-start-at.watchtower", function(data) {
      $("#watchtower_exceptions_start_at").val("");
      watchtower.utilities.handleDateChange("start_at", "");
    });
    
    $doc.bind("clear-end-at.watchtower", function(data) {
      $("#watchtower_exceptions_end_at").val("");
      watchtower.utilities.handleDateChange("end_at", "");
    });
  });
})(jQuery);