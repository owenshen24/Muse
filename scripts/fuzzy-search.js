// Set up the fuzzy search module
$(document).ready(function() {

  // Show notification function:
  var showNotification = function(text) {

    // Set text
    $("#search-notification").html(text);

    // Show notification
    $("#search-notification")
    .fadeToggle("slow", "linear").delay(1000)
    .fadeToggle("slow", "linear");
  };

  // Set up indexing for title and tags:
  var index = elasticlunr(function() {
    this.addField('title');
    this.addField('tags');
    this.setRef('anchor');
  });

  // Grab POSTS metadata:
  let post_data = [];
  $.getJSON("POSTS.json", function(json) {

    // Populate indexer:
    for (let item in json) {
      post_data.push(json[item]);
      index.addDoc(json[item]);
    }
  });

  // Set up search function
  var search = function(phrase) {
    let results = index.search(phrase);

    // If no search results, show all posts:
    if (results.length == 0) {
      $(".post").show();
      // Show notification that search failed:
      showNotification('No search results found. Showing all posts.');
      return null;
    }
    else {
      // Else, iterate through and show only the results:
      $(".post").hide();
      showNotification("Showing results for '" + phrase + "'");
      for (r in results) {
        $("#" + results[r].ref).show();
      }
    }
  };

  // Search on search button press
  $(".search-button").click(function() {
    search($(this).parent().find(".prompt").val());
  });

  // Search on enter key press
  $(".prompt").keypress(function(k) {
    if ((k.which && k.which == 13) ||
    (k.keyCode && k.keyCode == 13)) {
      search($(this).val());
    }
  });

  // Search on tag click
  $(".tag-item").click(function() {
    search($(this).text());
  });

});
