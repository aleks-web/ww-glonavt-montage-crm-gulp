// Start Функции для создания и удаления заднего фона
/*
    Создано для использования модалками.
    Может пригодиться в каких-нибудь других случаях.
    Функции вызываются в других скриптах.
*/
function add_body_bg() {
    $('body').addClass('bg');
}

function remove_body_bg() {
    $('body').removeClass('bg');
}
// End Функции для создания и удаления заднего фона



// Start функция ресайза таблицы в модалке
/*
    Пусути костыль, т.к версткой выкрутиться не получилось. Нужно просто тянуть таблицу, если она одна на все занимаемое пространство
    Скрипт отрабатывает в модалках с классом .modal в табах.
*/
function resizeTableModal() {
    $('.modal.open').each(function (index, element) {

        if ($(this).find('.tabs__item--active .tabs__tableContainer').length > 0) {
            $(this).find('.tabs__item--active .tabs__tableContainer').removeAttr('style');

            let headerHeight = $(this).find('.modal__header').outerHeight(); // Высота шапки модалки
            let tabsHeight = $(this).find('.tabs__header').outerHeight(); // Высота шапки табов
            let tabsControl = $(this).find('.tabs__item--active .tabs__control').outerHeight(); // Высота контрольной панели
            let tableTitle = $(this).find('.tabs__item--active .tabs__tableTitle').outerHeight(); // Высота контрольной панели

            let css = `calc(100dvh - calc(${tabsHeight}px + ${headerHeight}px + calc(var(--bigModal-padding-y) * 2) + var(--modal-gap-main) + var(--tab-gap-main)))`;
            if (tabsControl) {
                css = `calc(100dvh - calc(${tabsControl}px + ${tabsHeight}px + ${headerHeight}px + calc(var(--bigModal-padding-y) * 2) + var(--modal-gap-main) + calc(var(--tab-gap-main) * 2)))`;
            }

            $(this).find('.tabs__item--active .tabs__tableContainer').css('height', css);
            $(this).find('.tabs__item--active .tabs__table').css('height', `calc(100% - ${tableTitle}px)`);

        }

        if ($(this).find('.tabs__item--active > *').not(".tabs__control").length == 1) {
            $(this).find('.tabs__item--active > *').not(".tabs__control").css('padding', '0');
        }
        
    });
}
// End функция ресайза таблицы в модалке




// Start различные скрипты по работе с модалками
$(document).ready(function (e) {
    // Start закрытие модального окна
    /*
        Это универсальный скрипт. Убирает затемнение фона. Функцией remove_body_bg;
        Убирает класс open у класса модалки.
        Атрибут data-modal-close можно ставить на любой элемент. Главное, чтобы элемент был дочерним по отношению к классу modal
    */
    $(document).on('click', '[data-modal-close]', function (e) {
        $(this).parents('.modal').removeClass('open');
        remove_body_bg();
    });
    // End закрытие модального окна

    $(window).on("resize", function (e) {
        resizeTableModal(); // При событии ресайза запускаем функцию-костыль для изменения высоты таблиц в открытых модалках
    });

    $(document).on('tabsClick', function (e) {
        resizeTableModal(); // tabsClick - это кастомное событие, которое срабатывает в момент клика по табу
    });
});
// End различные скрипты по работе с модалками




// Start скрипт для меню
$(document).ready(function (e) {
    $(document).on('click', '.menu__item-link', function (e) {
        let parent = $(this).parents('.menu__item');
        let list = $(this).next('.menu__item-list');

        if (list.length > 0) {
            e.preventDefault();

            if (parent.hasClass('menu__item--active')) {
                list.slideUp(200);
                parent.removeClass('menu__item--active');
            } else {
                list.slideDown(200);
                parent.addClass('menu__item--active');
            }
        }

    });
});
// End скрипт для меню