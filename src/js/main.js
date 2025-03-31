$(document).ready(function() {
  // ---------- mobile_menu ----------
  $('.burger_menu').on('click', function() {
    $('.burger_open').toggleClass('hide');
    $('.burger_close').toggleClass('hide');
    $('.mobile_menu').toggleClass('mobile_menu_show');
  });

  $('.link_mobile').on('click', function() {
    console.log('Click');
    $('.burger_open').removeClass('hide');
    $('.burger_close').addClass('hide');
    $('.mobile_menu').removeClass('mobile_menu_show');
  });

  // ---------- scroll to up ----------
  $(window).scroll(function() {
    if($(this).scrollTop() > 1000) {
      $('#btn-up').removeClass('hide');
    } else {
      $('#btn-up').addClass('hide');
    }
  });

  // ---------- slider setting ----------
  $('.slider').slick({
    dots: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });
});