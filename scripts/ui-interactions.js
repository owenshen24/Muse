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
  var togglePost = function(post) {
    // Toggle + or -
    if ($(post).hasClass("fa-minus-circle")) {
      $(post).removeClass("fa-minus-circle");
      $(post).addClass("fa-plus-circle");
    }
    else {
      $(post).addClass("fa-minus-circle");
      $(post).removeClass("fa-plus-circle");
    }
    // Toggle content
    $(post).parent().parent().find(".content").toggle();
  }

  $(".minimize-button").click(function() {
    togglePost(this);
  });

  $(".hide-all-button").click(function() {
    var showAll = $(this).hasClass("showAll");
    $.each($(".minimize-button"), function() {
      if (showAll) {
        if (! $(this).hasClass("fa-minus-circle")) {
          togglePost(this);
        }
      }
      else {
        if ($(this).hasClass("fa-minus-circle")) {
          togglePost(this);
        }
      }
    });
    if (showAll) {
      $(this).removeClass("showAll");
      $(this).empty().text("Hide All");
    }
    else {
      $(this).addClass("showAll");
      $(this).empty().text("Open All");
    }
  });

});
