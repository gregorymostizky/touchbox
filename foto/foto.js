$(document).ready(function() {

  var close_light_box = function(e) {
    e.preventDefault();
    if ($('.light_box_wrapper').hasClass('light_box_wrapper_active')) {
      $('.overlay').removeClass('overlay_active').addClass('overlay_inactive');
      $('.light_box_wrapper').removeClass('light_box_wrapper_active').addClass('light_box_wrapper_inactive');

      // clear out menu bars
      hide_overlays();
    }
  },
    hide_overlays = function() {
      $('.light_box_menu_bottom').removeClass('light_box_menu_bottom_active').addClass('light_box_menu_bottom_inactive');
      $('.light_box_arrow_left').removeClass('opaque').addClass('transparent');
      $('.light_box_arrow_right').removeClass('opaque').addClass('transparent');
    };

  /* LIGHT BOX POPUP */

  $('.image_box img').click(function(e) {
    if ($('.light_box_wrapper').hasClass('light_box_wrapper_inactive')) {

      // clear out menu bars
      hide_overlays();

      // insert the image
      var image_src = $(e.srcElement).attr('src');
      var images_html = "<div class='light_box_image_holder current'><img src='" + image_src + "'></div>";
      images_html += "<div class='light_box_image_holder next'><img src='" + image_src + "'></div>";

      $('.light_box_image_zone').html(images_html);

      // force image to fit inside the box
      var image_ratio = $('.light_box_image_holder img')[0].naturalWidth / $('.light_box_image_holder img')[0].naturalHeight;
      var box_ratio = 900 / 600; // from CSS of lightbox //$('.light_box_wrapper')[0].clientWidth / $('.light_box_wrapper')[0].clientHeight;

      if (image_ratio < box_ratio) {
        $('.light_box_image_holder img').css('height', '100%');
      } else {
        $('.light_box_image_holder img').css('width', '100%');
      }

      // open the light box
      $('.overlay').removeClass('overlay_inactive').addClass('overlay_active');
      $('.light_box_wrapper').removeClass('light_box_wrapper_inactive').addClass('light_box_wrapper_active');
    }
  });

  $('.overlay').click(close_light_box);
  $('#light_box_done_button').click(close_light_box);

  $('.light_box_wrapper').click(function() {
    if ($('.light_box_menu_bottom').hasClass('light_box_menu_bottom_inactive')) {
      $('.light_box_menu_bottom').removeClass('light_box_menu_bottom_inactive').addClass('light_box_menu_bottom_active');
      $('.light_box_arrow_left').removeClass('transparent').addClass('opaque');
      $('.light_box_arrow_right').removeClass('transparent').addClass('opaque');
    } else {
      hide_overlays();
    }
  });

  /* IMAGE MOVEMENT */
  $('.light_box_arrow_right').click(function(e) {
    var movement_complete = function() {
      // run once
      if ($('.light_box_image_zone .current').css('left') != '0px') {
        // delete old prev

        // reset classes and styles
        $('.light_box_image_zone .current').css('left', '').removeClass('current').addClass('prev');
        $('.light_box_image_zone .next').css('left', '').removeClass('next').addClass('current');

        // load new next

      }
    };

    e.stopPropagation();
    $('.light_box_image_zone .current, .light_box_image_zone .next').animate({
      left : '-=900'
    }, 1000, movement_complete);
  });

});