$(document).ready(function() {
    let currentFloor = 2; // переменная, где храниться текущий этаж
    const floorPath = $('.home-image path'); // каждый отдельный этаж в SVG
    const counterUp = $('.counter-up'); /* кнопка увеличения этажа */
    const counterDown = $('.counter-down'); /* кнопка уменьшения этажа */
    const modal = $('.modal'); // переменная в которой находиться модальное окно
    const modalCloseButton = $('.modal-close-button'); // переменная, в которой находиться кнопка закрытия модального окна
    const viewFlatsButton = $('.view-flats'); // кнопка, при клике на которую будет показываться модальное окно

    const flatLink = $('.flat-link');
    const flatPath = $('.flats path');
    let currentFlat = 40;

    flatLink.on('mouseover', function() {
        flatPath.removeClass('current-flat');
        flatLink.removeClass('active');
        currentFlat = $(this).attr('data-flat-link');
        $(`[data-flat=${currentFlat}]`).toggleClass('current-flat');
    });

    flatPath.on('mouseover', function() {
        flatPath.removeClass('current-flat');
        flatLink.removeClass('active');
        currentFlat = $(this).attr('data-flat');
        $(`[data-flat-link=${currentFlat}]`).toggleClass('active');
    });

    // функция при наведении мышью на этаж
    floorPath.on('mouseover', function() {
        floorPath.removeClass('current-floor'); // удаляем активный класс у этажей
        currentFloor = $(this).attr('data-floor'); // получаем значение текущего этажа
        $('.counter').text(currentFloor); // записываем значение этажа в счетчик справа
    });

    floorPath.on('click', toggleModal); /* при клике на этаж, вызвать модальное окно */
    modalCloseButton.on('click', toggleModal); /* при клике на кнопку закрыть убирает окно */
    viewFlatsButton.on('click', toggleModal); /* при клике на кнопку смотреть квартиры на этаже вызвать модальное окно */

    // отслеживаем клик по кнопке вверх
    counterUp.on('click', function() {
        // проверяем значение этажа, оно не должно быть больше 18
        if (currentFloor < 18) { 
            currentFloor++; // прибавляем один этаж 
            usCurrentFloor = currentFloor.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }); // форматируем переменную с этажом, чтобы было 01, а не 1
            $('.counter').text(usCurrentFloor); // записываем значение этажа в счетчик справа
            floorPath.removeClass('current-floor'); // удаляем активный класс у этажей
            $(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor'); // подсвечиваем текущий этаж
        }
    });

    // отслеживаем клик по кнопке вниз
    counterDown.on('click', function() { 
        // проверяем значение этажа, оно не должно быть меньше 2
        if (currentFloor > 2) { 
            currentFloor--; // уменьшаем один этаж 
            usCurrentFloor = currentFloor.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }); // форматируем переменную с этажом, чтобы было 01, а не 1
            $('.counter').text(usCurrentFloor); // записываем значение этажа в счетчик справа
            floorPath.removeClass('current-floor'); // удаляем активный класс у этажей
            $(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor'); // подсвечиваем текущий этаж
        }
    });

    function toggleModal() {
        // функция открыть-закрыть окно
        modal.toggleClass('is-open');
    }
});