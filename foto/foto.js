$(document).ready(function() {

  var close_light_box = function(e) {
    e.preventDefault();
    if ($('.light_box_wrapper').hasClass('light_box_wrapper_active')) {
      $('.overlay').removeClass('overlay_active').addClass('overlay_inactive');
      $('.light_box_wrapper').removeClass('light_box_wrapper_active').addClass('light_box_wrapper_inactive');

      // clear out menu bars
      hide_overlays();
    }
  }, hide_overlays = function() {
    $('.light_box_menu_bottom').removeClass('light_box_menu_bottom_active').addClass('light_box_menu_bottom_inactive');
    $('.light_box_arrow_left').removeClass('opaque').addClass('transparent');
    $('.light_box_arrow_right').removeClass('opaque').addClass('transparent');
  }, fit_to_box = function(img_element) {
    var image_ratio = img_element.naturalWidth / img_element.naturalHeight;
    var box_ratio = 900 / 600; // from CSS of lightbox

    if (image_ratio < box_ratio) {
      $(img_element).css('height', '100%');
    } else {
      $(img_element).css('width', '100%');
    }
  }, next_image_src = function() {
    var idx = Math.floor(Math.random() * 4) + 1;
    return 'img' + idx + '.jpg';
  }, swipe_animation_complete = function(direction) {
    return function() {
      // run once
      if ($('.light_box_image_zone .current').css('left') != '0px') {
        var target = direction == 'right' ? 'next' : 'prev';
        var source = direction == 'right' ? 'prev' : 'next';

        // delete old target
        $('.light_box_image_zone .' + target).remove();

        // reset classes and styles
        $('.light_box_image_zone .current').css('left', '').removeClass('current').addClass(target);
        $('.light_box_image_zone .' + source).css('left', '').removeClass(source).addClass('current');

        // load new source
        var image_src = next_image_src();
        var image_html = "<div class='light_box_image_holder " + source + "'><img src='" + image_src + "'></div>";
        $('.light_box_image_zone').append(image_html);
        fit_to_box($('.light_box_image_zone .' + source + ' img')[0]);
      }
    }
  };

  /* LIGHT BOX POPUP */

  $('.image_box img').click(function(e) {
    if ($('.light_box_wrapper').hasClass('light_box_wrapper_inactive')) {

      // clear out menu bars
      hide_overlays();

      // insert the image
      var image_src = $(e.srcElement).attr('src');

      var images_html = "<div class='light_box_image_holder prev'><img src='" + image_src + "'></div>";
      images_html += "<div class='light_box_image_holder current'><img src='" + image_src + "'></div>";
      images_html += "<div class='light_box_image_holder next'><img src='" + image_src + "'></div>";

      $('.light_box_image_zone').html(images_html);

      // force image to fit inside the box
      $('.light_box_image_holder img').each(function(i, e) {
        fit_to_box(e);
      });

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
    e.stopPropagation();
    $('.light_box_image_zone .current, .light_box_image_zone .next').animate({
      left : '-=900'
    }, 1000, swipe_animation_complete('left'));
  });

  $('.light_box_arrow_left').click(function(e) {
    e.stopPropagation();
    $('.light_box_image_zone .current, .light_box_image_zone .prev').animate({
      left : '+=900'
    }, 1000, swipe_animation_complete('right'));
  });

  $('.light_box_image_zone').bind('touchstart', function(event) {
    event.stopPropagation();
    event.preventDefault();

    $('.light_box_image_zone').data('swipe_origin', event.originalEvent.touches.item(0).screenX);
  });

  $('.light_box_image_zone').bind('touchend', function(event) {
    event.stopPropagation();
    event.preventDefault();

    $('.light_box_image_zone .current').css('left', '0px');
    $('.light_box_image_zone').data('swipe_origin', '');
  });

  $('.light_box_image_zone').bind('touchmove', function(event) {
    event.stopPropagation();
    event.preventDefault();

    var touch = event.originalEvent.touches.item(0);
    var swipe_origin = $('.light_box_image_zone').data('swipe_origin');

    // move b**tch
    var new_left = -(swipe_origin - touch.screenX) + 'px';

    var debug = new_left + ':'+swipe_origin + ' : ' + touch.screenX + ' : ' + touch.screenY + '(' + event.originalEvent.touches.length + ')';

    $('.light_box_image_zone .current').css('left', new_left);

    $('.debug_console').html(debug);
  });

});