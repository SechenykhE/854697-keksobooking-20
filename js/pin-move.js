'use strict';

(function () {
  var MAIN_PIN_OFFSET_X = window.constants.MAIN_PIN_OFFSET_X;
  var MAIN_PIN_HEIGHT = window.constants.MAIN_PIN_HEIGHT;
  var LOCATION_X_MIN = window.constants.LOCATION_X_MIN;
  var LOCATION_X_MAX = window.constants.LOCATION_X_MAX;
  var LOCATION_Y_MIN = window.constants.LOCATION_Y_MIN;
  var LOCATION_Y_MAX = window.constants.LOCATION_Y_MAX;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onDocumentMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        var mapPinMainX = window.pinCoordinates.getPinsCoordinateX(mapPinMain, MAIN_PIN_OFFSET_X);
        var mapPinMainY = window.pinCoordinates.getPinsCoordinateY(mapPinMain, MAIN_PIN_HEIGHT);

        if (mapPinMainX < LOCATION_X_MIN) {
          mapPinMain.style.left = LOCATION_X_MIN - MAIN_PIN_OFFSET_X + 'px';
        }
        if (mapPinMainX > LOCATION_X_MAX) {
          mapPinMain.style.left = LOCATION_X_MAX - MAIN_PIN_OFFSET_X + 'px';
        }
        if (mapPinMainY < LOCATION_Y_MIN) {
          mapPinMain.style.top = LOCATION_Y_MIN - MAIN_PIN_HEIGHT + 'px';
        }
        if (mapPinMainY > LOCATION_Y_MAX) {
          mapPinMain.style.top = LOCATION_Y_MAX - MAIN_PIN_HEIGHT + 'px';
        }
        address.value = window.pinCoordinates.getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, MAIN_PIN_HEIGHT);
      };

      var onDocumentMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);
        address.value = window.pinCoordinates.getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, MAIN_PIN_HEIGHT);
      };

      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    }
  });
})();
