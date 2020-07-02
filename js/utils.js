'use strict';

(function () {
  window.utils = {
    addDisabled: function (array, disabled) {
      for (var i = 0; i < array.length; i++) {
        array[i].disabled = disabled;
      }
    },
    debounce: function (cb) {
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
    }
  };
})();
