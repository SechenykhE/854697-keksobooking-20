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

  var adsFromServer = [];

  var onLoad = function (response) {
    adsFromServer = response;
    window.createPinsBlock(pinTemplate, adsFromServer, mapPins, window.constants.PIN_OFFSET_X, window.constants.PIN_OFFSET_Y);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.utils.addDisabled(formFieldsets, false);
    window.utils.addDisabled(mapFiltersSelects, false);
    if (adsFromServer.length === 0) {
      window.backend.load(onLoad, window.onError);
    }
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('.ad-form--disabled');
    window.utils.addDisabled(formFieldsets, true);
    window.utils.addDisabled(mapFiltersSelects, true);
  };

  deactivatePage();

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  adForm.querySelector('#address').value = window.pinCoordinates.getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, window.constants.MAIN_PIN_OFFSET_Y);

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
