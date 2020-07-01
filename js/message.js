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
    var onButtonPress = function () {
      closeMessage();
    };
    var closeMessage = function () {
      var error = main.querySelector('.error');
      var success = main.querySelector('.success');
      if (error) {
        main.removeChild(error);
      }
      if (success) {
        main.removeChild(success);
      }

      document.removeEventListener('mousedown', onMousedownPress);
      document.removeEventListener('keydown', onEscPress);
      button.removeEventListener('click', onButtonPress);
    };

    document.addEventListener('mousedown', onMousedownPress);
    document.addEventListener('keydown', onEscPress);

    var button = messageTemplate.querySelector('button');
    if (button) {
      button.addEventListener('click', onButtonPress);
    }
  };
})();
