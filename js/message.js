'use strict';

(function () {
  var main = document.querySelector('main');

  window.createMessage = function (messageTemplate) {
    main.insertAdjacentElement('afterbegin', messageTemplate);

    var onMousedownPress = function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        closeMessage();
      }
    };
    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeMessage();
      }
    };
    var closeMessage = function () {
      main.removeChild(messageTemplate);
      document.removeEventListener('mousedown', onMousedownPress);
      document.removeEventListener('keydown', onEscPress);
    };

    document.addEventListener('mousedown', onMousedownPress);
    document.addEventListener('keydown', onEscPress);

    var button = messageTemplate.querySelector('button');
    if (button) {
      button.addEventListener('click', function () {
        main.removeChild(messageTemplate);
      });
    }
  };
})();
