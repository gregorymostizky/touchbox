$(document).ready(function() {

//  /* Bar Resize */
//  $('.bar').click(function(){
//    var bar = $('.bar');
//
//    if(bar.hasClass('bar_collapsed')) {
//      bar.removeClass('bar_collapsed').addClass('bar_expanded');
//    } else {
//      bar.removeClass('bar_expanded').addClass('bar_collapsed');
//    }
//  });

  /* LIGHT BOX POPUP */

  $('.image_box').click(function(){
    if($('.light_box_wrapper').hasClass('light_box_wrapper_inactive')) {
      $('.overlay').removeClass('overlay_inactive').addClass('overlay_active');
      $('.light_box_wrapper').removeClass('light_box_wrapper_inactive').addClass('light_box_wrapper_active');
    }
  });

  $('.overlay').click(function(){
    if($('.light_box_wrapper').hasClass('light_box_wrapper_active')){
      $('.overlay').removeClass('overlay_active').addClass('overlay_inactive');
      $('.light_box_wrapper').removeClass('light_box_wrapper_active').addClass('light_box_wrapper_inactive');
    }
  });

  $('.light_box_wrapper').click(function() {
    if($('.light_box_menu_top').hasClass('light_box_menu_top_inactive')){
      $('.light_box_menu_top').removeClass('light_box_menu_top_inactive').addClass('light_box_menu_top_active');
      $('.light_box_menu_bottom').removeClass('light_box_menu_bottom_inactive').addClass('light_box_menu_bottom_active');
    } else {
      $('.light_box_menu_top').removeClass('light_box_menu_top_active').addClass('light_box_menu_top_inactive');
      $('.light_box_menu_bottom').removeClass('light_box_menu_bottom_active').addClass('light_box_menu_bottom_inactive');
    }
  });
});