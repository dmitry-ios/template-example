'use strict';

(function () {
  var accordion = document.querySelector('.accordion');

  accordion.classList.remove('accordion--nojs');

  var buttons = accordion.querySelectorAll('button');
  var items = accordion.querySelectorAll('.accordion__item');

  var closeOthers = function (current) {
    for (var i = 0; i < items.length; ++i) {
      if (items[i] !== current) {
        items[i].classList.add('accordion__item--close');
      }
    }
  };

  var toggleItem = function (item, button) {
    button.addEventListener('click', function () {
      item.classList.toggle('accordion__item--close');
      closeOthers(item);
    });
  };

  for (var i = 0; i < buttons.length; ++i) {
    toggleItem(items[i], buttons[i]);
  }
})();
