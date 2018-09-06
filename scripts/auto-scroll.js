$(document).ready(function() {
  if (location.hash) {
    let anchor_top = document.querySelector(location.hash).offsetTop;
    $(window).scrollTop(anchor_top);
  } 
});
