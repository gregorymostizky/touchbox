$(document).ready(function() {

  var close_light_box = function(e){
    e.preventDefault();
    if($('.light_box_wrapper').hasClass('light_box_wrapper_active')){
      $('.overlay').removeClass('overlay_active').addClass('overlay_inactive');
      $('.light_box_wrapper').removeClass('light_box_wrapper_active').addClass('light_box_wrapper_inactive');

      // clear out menu bars
      $('.light_box_menu_top').removeClass('light_box_menu_top_active').addClass('light_box_menu_top_inactive');
      $('.light_box_menu_bottom').removeClass('light_box_menu_bottom_active').addClass('light_box_menu_bottom_inactive');
    }
  };

  /* LIGHT BOX POPUP */

  $('.image_box img').click(function(e){
    if($('.light_box_wrapper').hasClass('light_box_wrapper_inactive')) {

      // clear out menu bars
      $('.light_box_menu_top').removeClass('light_box_menu_top_active').addClass('light_box_menu_top_inactive');
      $('.light_box_menu_bottom').removeClass('light_box_menu_bottom_active').addClass('light_box_menu_bottom_inactive');

      // insert the image
      var image_src = $(e.srcElement).attr('src');
      $('.light_box_image_holder').html("<img src='" + image_src + "'>");

      // open the light box
      $('.overlay').removeClass('overlay_inactive').addClass('overlay_active');
      $('.light_box_wrapper').removeClass('light_box_wrapper_inactive').addClass('light_box_wrapper_active');

      // force image to fit inside the box
      var image_ratio = $('.light_box_image_holder img')[0].naturalWidth / $('.light_box_image_holder img')[0].naturalHeight;
      var box_ratio = $('.light_box_wrapper')[0].clientWidth / $('.light_box_wrapper')[0].clientHeight;

      console.log('img_ratio:' + image_ratio);
      console.log('box_ratio:' + box_ratio);

      if (image_ratio < box_ratio) {
        $('.light_box_image_holder img').css('height','100%');
      } else {
        $('.light_box_image_holder img').css('width','100%');
      }
    }
  });

  $('.overlay').click(close_light_box);
  $('#light_box_done_button').click(close_light_box);

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