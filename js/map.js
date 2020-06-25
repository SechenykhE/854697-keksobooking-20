'use strict';

(function () {
  var MAIN_PIN_OFFSET_X = window.constants.MAIN_PIN_OFFSET_X;
  var MAIN_PIN_HEIGHT = window.constants.MAIN_PIN_HEIGHT;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = document.querySelectorAll('fieldset');
  var mapFiltersForm = map.querySelector('.map__filters');
  var mapFiltersSelects = mapFiltersForm.querySelectorAll('select');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var pins = [];
  var adsFromServer = [];

  var onLoad = function (response) {
    adsFromServer = response;
    pins = window.createPinsBlock(pinTemplate, adsFromServer, mapPins, window.constants.PIN_OFFSET_X, window.constants.PIN_OFFSET_Y);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.utils.addDisabled(formFieldsets, false);
    window.utils.addDisabled(mapFiltersSelects, false);
    if ((adsFromServer.length === 0) && (pins.length === 0)) {
      window.connectingServer('GET', window.constants.URL_LOAD, onLoad, window.onError);
    } else if (pins.length === 0) {
      pins = window.createPinsBlock(pinTemplate, adsFromServer, mapPins, window.constants.PIN_OFFSET_X, window.constants.PIN_OFFSET_Y);
    }
  };

  window.deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.utils.addDisabled(formFieldsets, true);
    window.utils.addDisabled(mapFiltersSelects, true);
    mapPinMain.style.left = window.constants.MapPinMainPosition.LEFT;
    mapPinMain.style.top = window.constants.MapPinMainPosition.TOP;
    adForm.querySelector('#address').value = window.pinCoordinates.getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, window.constants.MAIN_PIN_OFFSET_Y);

    if (pins) {
      var pinsOnMap = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = pinsOnMap.length - 1; i >= 0; i--) {
        mapPins.removeChild(pinsOnMap[i]);
      }
      pins = [];
    }

    var mapCard = map.querySelector('.map__card');
    if (mapCard !== null) {
      map.removeChild(mapCard);
    }
  };

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  window.deactivatePage();

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();
      adForm.querySelector('#address').value = window.pinCoordinates.getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, MAIN_PIN_HEIGHT);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      adForm.querySelector('#address').value = window.pinCoordinates.getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, MAIN_PIN_HEIGHT);
    }
  });
})();
