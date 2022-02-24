$(document).ready(function(){ /* скрипт для карусели */
    $('.carousel__inner').slick({
        speed: 700,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [ /* для адаптации слайдеров */
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            },      
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on("click", function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close, #img').on("click", function() {
        $('.overlay, #consultation, #order, #thanks, #img').fadeOut('slow');
        $('.pageup').fadeOut();
    }); 

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
            $('.pageup').fadeOut();
        })
    });

    $('.catalog-item__img').each(function(i) {
        $(this).on('click', function() {
            $('#img .modal__img').attr("src", $('.catalog-item__img').eq(i).attr("src"))
            $('.overlay, #img').fadeIn('slow');
            $('.pageup').fadeOut();
        })
    });

    function valideForms (form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Введите Ваше имя",
                phone: 'Введите Ван номер телефона',
                email: {
                  required: "Введите адрес электронной почты",
                  email: "Некорректно указан адрес электронной почты"
                }
            }
        });
    };
    
    valideForms('#consultation-form'); 
    valideForms('#consultation form');
    valideForms('#order form');
  
    $("input[name=phone]").mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()) { 
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() { 
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('.pageup').fadeOut();
            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});