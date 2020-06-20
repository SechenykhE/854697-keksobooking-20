'use strict';

window.pinCoordinates = (function () {
  return {
    getPinsCoordinateX: function (pin, offset) {
      var pinLeft = pin.style.left;

      return parseInt(pinLeft, 10) + offset;
    },
    getPinsCoordinateY: function (pin, offset) {
      var pinTop = pin.style.top;

      return parseInt(pinTop, 10) + offset;
    },
    getPinsCoordinates: function (pin, offsetX, offsetY) {
      var pinX = this.getPinsCoordinateX(pin, offsetX);
      var pinY = this.getPinsCoordinateY(pin, offsetY);

      return pinX + ', ' + pinY;
    }
  };
})();
