//появление и скрытие меню
const hamburger = document.querySelector(".hamburger"), //назначаем переменную
     menu = document.querySelector(".menu"), //назначаем переменную
     closeElem = document.querySelector(".menu__close");
     menuItem = document.querySelectorAll(".menu__item"); //назначаем переменную

hamburger.addEventListener("click", () => { //клик по переменной hamburger
    menu.classList.add("active"); //перменной menu добавляется класс active 
});

closeElem.addEventListener("click", () => { //клик по переменной closeElem
    menu.classList.remove("active"); //e переменной menu удаляется класс active 
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove("active");
    })
})


$(document).ready(function(){ /* скрипт для карусели */
    $("input[name=phone]").mask("+7 (999) 999-99-99");

    $('.carousel').slick({
        /* autoplay: true,  */
        infinite: true,
        /* autoplaySpeed: 2000, */
        /* fade: true, */
        dots: true,
        arrows: false,
        /* pauseOnFocus: false, */
        /* pauseOnHover: false, */
    });

    $('.thanks__close').on("click", function() { //закрытие всплывающего ока
        $('.overlay, .thanks').fadeOut('slow');
        $('.pageup').fadeOut();
    });
    
    $('.contacts__form').validate({ //валидация формы
        rules: {
            name: "required",
            phone: "required",
            triggers: "required",
        },
        messages: {
            name: "Заполните поле",
            phone: "Заполните поле",
            triggers: "Поставьте отметку",
        }
    });

    $('.contacts__form').submit(function(e) { //отправка запроса на почту
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
            $('.overlay, .thanks').fadeIn('slow');
            $('.contacts__form').trigger('reset');
        });
        return false;
    });

});

document.getElementById('btnProduct').onclick = function() {
    calcCost();
}; //при нажатии на кнопку запускается функция calcCost

function calcCost() {
    let wP = Math.trunc(document.getElementById('widthProduct').value); 
    let hP = Math.trunc(document.getElementById('heightProduct').value);
    let lP = Math.trunc(document.getElementById('lightProduct').value);
    let total = ((wP * hP) * 0.03) + (lP * 500);
    document.getElementById('priceProduct').innerHTML = total;
    document.getElementById('infoProduct').style.display = 'block';
    document.getElementById('messageProduct').style.display = 'block';
    document.getElementById('infoError').style.display = 'none';

    if (wP == 0 || hP == 0) {
        document.getElementById('infoProduct').style.display = 'none';
        document.getElementById('messageProduct').style.display = 'none';
        document.getElementById('infoError').style.display = 'block';
        return;
    }
}


$(window).scroll(function() {
    if ($(this).scrollTop() > 1400) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});




