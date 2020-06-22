'use strict';

window.backend = (function () {
  return {
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('GET', window.constants.URL_LOAD);
      xhr.send();
    }
  };
})();
