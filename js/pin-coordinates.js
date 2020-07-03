'use strict';

(function () {
  var getPinsCoordinateX = function (pin, offset) {
    var pinLeft = pin.style.left;

    return parseInt(pinLeft, 10) + offset;
  };
  var getPinsCoordinateY = function (pin, offset) {
    var pinTop = pin.style.top;

    return parseInt(pinTop, 10) + offset;
  };
  var getPinsCoordinates = function (pin, offsetX, offsetY) {
    var pinX = getPinsCoordinateX(pin, offsetX);
    var pinY = getPinsCoordinateY(pin, offsetY);

    return pinX + ', ' + pinY;
  };

  window.pinCoordinates = {
    getPinsCoordinateX: getPinsCoordinateX,
    getPinsCoordinateY: getPinsCoordinateY,
    getPinsCoordinates: getPinsCoordinates
  };
})();
