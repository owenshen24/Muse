$(document).ready(function() {

  // Auto-scroll on page load if there is an anchor in the URL:
  if (location.hash) {
    let PADDING_TOP = 25;
    let anchor_top = document.querySelector(location.hash).offsetTop;
    $(window).scrollTop(anchor_top - PADDING_TOP);
  }

  // Set up minimize-button functionality:
  $(".minimize-button").html("-");
  $(".minimize-button").click(function() {

    // Toggle + or -
    if ($(this).html() === "+") {
      $(this).html("-");
    }
    else {
      $(this).html("+");
    }

    // Toggle content
    $(this).parent().parent().find(".content").toggle();

  });

});
