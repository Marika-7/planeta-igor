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

  // ---------- text_hide ----------
  $('#read_show').on('click', function() {
    $('#text_hide').addClass('text_show');
    $(this).addClass('read_btn_hide');
  });
  
  $('#read_hide').on('click', function() {
    $('#text_hide').removeClass('text_show');
    $('#read_show').removeClass('read_btn_hide');
  });

  // ---------- scroll to up ----------
  $(window).scroll(function() {
    if($(this).scrollTop() > 1000) {
      $('#btn-up').removeClass('hide');
    } else {
      $('#btn-up').addClass('hide');
    }
  });
  
  // ---------- cart ----------
  $('#add_to_cart').on('click', function() {
    let count = parseInt($('#cart_count').text());
    count++;
    $('#cart_count').text(count);
    $('#btn-cart').removeClass('hide');

    // Створюємо копію зображення
    const imgClone = $('#img_game').clone();
    imgClone.attr('id', 'img_game_clone');
    
    // Встановлюємо початкові стилі для копії
    imgClone.css({
      position: 'absolute',
      top: $('#img_game').offset().top,
      left: $('#img_game').offset().left,
      width: $('#img_game').width(),
      height: $('#img_game').height(),
      zIndex: 9999
    });

    // Додаємо копію на сторінку
    $('body').append(imgClone);

    // Анімація переміщення
    imgClone.animate({
      top: $('#btn-cart').offset().top,
      left: $('#btn-cart').offset().left,
      width: 50,
      height: 50,
      opacity: 0.5
    }, 500, function() {
      // Видаляємо копію після завершення анімації
      $(this).remove();
    });
  });

  // Додати обробник кліку для кнопки корзина
  $('#btn-cart').on('click', function() {});

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
  
  // ---------- add video ----------
  $('.btn-play').on('click', function() {
    const slideScreen = $(this).siblings('.slide_screen');
    const link = slideScreen.attr('data-video');
    slideScreen.append(`
      <iframe width="100%" height="100%" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `);
    slideScreen.find('.slide_img').addClass('opacity');
    slideScreen.siblings('.caption_blue').addClass('opacity');
    $(this).addClass('opacity');
  });
});

// ---------- input phone ----------
document.getElementById('phone').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.startsWith("380")) {
      value = "+" + value;
  } else {
      value = "+380" + value;
  }
  
  e.target.value = value
      .replace(/\+(\d{3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/, 
               "+$1 ($2) $3-$4-$5");
});
