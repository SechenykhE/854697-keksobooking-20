'use strict';

(function () {
  var addDisabled = function (array, disabled) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = disabled;
    }
  };
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    addDisabled: addDisabled,
    debounce: debounce
  };
})();
