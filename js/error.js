'use strict';

(function () {
  var NODE = window.constants.NODE;

  window.onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = NODE.general;
    node.style.position = NODE.position;
    node.style.left = NODE.left;
    node.style.right = NODE.right;
    node.style.top = NODE.top;
    node.style.width = NODE.width;
    node.style.fontSize = NODE.fontSize;
    node.style.color = NODE.color;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
