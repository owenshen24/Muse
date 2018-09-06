$(document).ready(function() {
  if (location.hash) {
    let PADDING_TOP = 25;
    let anchor_top = document.querySelector(location.hash).offsetTop;
    $(window).scrollTop(anchor_top - PADDING_TOP);
  } 
});
