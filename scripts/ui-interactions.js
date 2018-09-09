$(document).ready(function() {

  // Auto-scroll on page load if there is an anchor in the URL:
  if (location.hash) {
    let PADDING_TOP = 25;
    let anchor_top = document.querySelector(location.hash).offsetTop;
    $(window).scrollTop(anchor_top - PADDING_TOP);
  }

  // Set up minimize-button functionality:
    $(".minimize-button").addClass("fa-minus-circle")

  // Change opacity upon hover:
  $(".minimize-button").mouseenter(function(){
    $(this).parent().parent().find(".content").css("opacity", "0.5");
  });
  $(".minimize-button").mouseleave(function(){
    $(this).parent().parent().find(".content").css("opacity", "1.0");
  });

  // Set up hide/show onclick:
  $(".minimize-button").click(function() {
    // Toggle + or -
    if ($(this).hasClass("fa-minus-circle")) {
      $(this).removeClass("fa-minus-circle");
      $(this).addClass("fa-plus-circle");
    }
    else {
      $(this).addClass("fa-minus-circle");
      $(this).removeClass("fa-plus-circle");
    }
    // Toggle content
    $(this).parent().parent().find(".content").toggle();

  });

});
