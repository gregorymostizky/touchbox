$(document).ready(function() {

  /* Bar Resize */
  $('.bar').click(function(){
    var bar = $('.bar');

    if(bar.hasClass('bar_collapsed')) {
      bar.removeClass('bar_collapsed').addClass('bar_expanded');
    } else {
      bar.removeClass('bar_expanded').addClass('bar_collapsed');
    }
  });

});