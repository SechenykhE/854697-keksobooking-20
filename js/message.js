'use strict';

(function () {
  var main = document.querySelector('main');

  window.createMessage = function (messageTemplate) {
    main.insertAdjacentElement('afterbegin', messageTemplate);

    var onDocumentMousedownPress = function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        closeMessage();
      }
    };
    var onDocumentEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeMessage();
      }
    };
    var onButtonClick = function () {
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

      document.removeEventListener('mousedown', onDocumentMousedownPress);
      document.removeEventListener('keydown', onDocumentEscPress);
      button.removeEventListener('click', onButtonClick);
    };

    document.addEventListener('mousedown', onDocumentMousedownPress);
    document.addEventListener('keydown', onDocumentEscPress);

    var button = messageTemplate.querySelector('button');
    if (button) {
      button.addEventListener('click', onButtonClick);
    }
  };
})();
