$(document).ready(function(){ /* скрипт для карусели */
    $('.carousel__inner').slick({
        /* infinite: true, карусель движется по кругу */
        /* slidesToShow: 1, показывает кол-во слайдов за раз */
        /* slidesToScroll: 1, переключает кол-во слайдов за раз */
        speed: 700, /* скорость переключения между слайдами в млс */
        /* adaptiveHeight: true,  *//* адаптация по высоте */
        /* autoplay: true, автопереключение слайдов */
        /* autoplaySpeed: 2000 скорость автопереключения слайдов */
        /* fade: true, слайды не перелистываются, а проявляются */
        /* cssEase: 'linear' проявление происходит равномерно */
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [ /* для адаптации слайдеров */
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
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

    //Modal
     //ищет на странице дата-тег modal=consultation, нажатие на него запускает функцию, которая делает видимым класс overlay (темный экран) и id #consultation (всплывающее окно)
    $('[data-modal=consultation]').on("click", function() {
        $('.overlay, #consultation').fadeIn('slow');
    });



    //закрытие, по нажатию на крестик или на изображение
    //ищет на странице класс modal__close, нажатие на него запускает функцию, которая делает НЕ видимым класс overlay (темный экран) и все id (всплывающее окно)
    $('.modal__close, #img').on("click", function() {
        $('.overlay, #consultation, #order, #thanks, #img').fadeOut('slow');
    }); 

    //в модальном окне меняется название модели
    //находит модификаторы button_mini - запускает функию, которая отслеживает кнопку, на которую нажал - запускает функцию, которая внутри #order ищет модификатор modal__descr и ищет тескт из заголовка карточки (.catalog-item__subtitle), где в зависимости от порядкового номера карточки (меняется "I") вставляется соответствующий текст
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    //при нажатии на картинку ('.catalog-item__img') вместо картинки в модальном окне ('#img .modal__img') подставляет изображение из того блока, на который кликнули. 
    //('.overlay, #img').fadeIn - делаеют видимым прозрачный фон и само модальное окно
    $('.catalog-item__img').each(function(i) {
        $(this).on('click', function() {
            $('#img .modal__img').attr("src", $('.catalog-item__img').eq(i).attr("src"))
            $('.overlay, #img').fadeIn('slow');
        })
    });

    function valideForms (form) {
        $(form).validate({
            rules: {
                name: 'required', /* поле обязательно для ввода */
                phone: 'required', /* поле обязательно для ввода */
                email: {
                    required: true, /* поле обязательно для ввода */
                    email: true /* проверяет корректность введеного адреса */
                }
            },
            messages: { /* изменение стандартных сообщений при ошибочном вводе данных пользователем */
                name: "Введите Ваше имя",
                phone: 'Введите Ван номер телефона',
                email: {
                  required: "Введите адрес электронной почты",
                  email: "Некорректно указан адрес электронной почты"
                }
            }
        });
    };
    //селекторы, для которых выполняется скрипт проверки валидности
    valideForms('#consultation-form'); /* id consultation-form */
    valideForms('#consultation form');/*  внутри id consultation класс form */
    valideForms('#order form'); /* внутри id order класс form */

    //маска ввода формы
    //внутри тега input есть атрибут name равный phone    
    $("input[name=phone]").mask("+7 (999) 999-99-99");

    //отправка форм на почту
    $('form').submit(function(e) {
        e.preventDefault(); //отключить перезагрузку страници при отправке форм
        if (!$(this).valid()) { //останавливает обработку если форма не прошла валидацию
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() { //функция очищает форму и выводит окно #thanks
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    //плавный скрол и скрытие шеврона
    //шеврон становится виимым, когда пользователь пролистал 1600 пикселей, иначе - скрыт
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    //скрипт, для плавной работы скрола по внутренним ссылкам
    /* $("a[href^=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    }); */

    //скрипт активации библиотеки wow для работы с анимацией animate.scc
    new WOW().init();

});