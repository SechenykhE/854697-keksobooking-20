'use strict';

(function () {
  var main = document.querySelector('main');

  window.createMessage = function (messageTemplate) {
    main.insertAdjacentElement('afterbegin', messageTemplate);
    document.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        main.removeChild(messageTemplate);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        main.removeChild(messageTemplate);
      }
    });
    var button = messageTemplate.querySelector('button');
    if (button) {
      button.addEventListener('click', function () {
        main.removeChild(messageTemplate);
      });
    }
  };
})();
