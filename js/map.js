'use strict';

(function () {
  var MAIN_PIN_OFFSET_X = window.constants.MAIN_PIN_OFFSET_X;
  var MAIN_PIN_HEIGHT = window.constants.MAIN_PIN_HEIGHT;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersForm = map.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFiltersForm.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFiltersForm.querySelectorAll('select');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var adsFromServer = [];

  var onLoad = function (response) {
    adsFromServer = response;
    window.createPinsBlock(window.constants.OBJECTS_COUNT, pinTemplate, adsFromServer, mapPins, window.constants.PIN_OFFSET_X, window.constants.PIN_OFFSET_Y);

    window.utils.addDisabled(mapFiltersFieldsets, false);
    window.utils.addDisabled(mapFiltersSelects, false);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.utils.addDisabled(formFieldsets, false);
    if (adsFromServer.length === 0) {
      window.connectingServer('GET', window.constants.URL_LOAD, onLoad, window.onError);
    }
  };

  var checkCardOpen = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard !== null) {
      map.removeChild(mapCard);
    }
  };

  window.checkPinsOnMap = function () {
    var pinsOnMap = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsOnMap) {
      for (var i = pinsOnMap.length - 1; i >= 0; i--) {
        mapPins.removeChild(pinsOnMap[i]);
      }
    }
  };

  window.deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.utils.addDisabled(formFieldsets, true);
    window.utils.addDisabled(mapFiltersFieldsets, true);
    window.utils.addDisabled(mapFiltersSelects, true);
    mapPinMain.style.left = window.constants.MapPinMainPosition.LEFT;
    mapPinMain.style.top = window.constants.MapPinMainPosition.TOP;
    adForm.querySelector('#address').value = window.pinCoordinates.getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, window.constants.MAIN_PIN_OFFSET_Y);

    window.checkPinsOnMap();
    adsFromServer = [];

    checkCardOpen();
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

  var filterByType = mapFiltersForm.querySelector('#housing-type');

  var updatePins = function () {
    var adsFilteredByType = adsFromServer.slice();

    if (filterByType.value !== 'any') {
      adsFilteredByType = adsFilteredByType.filter(function (ad) {
        return ad.offer.type === filterByType.value;
      });
    }
    window.createPinsBlock(window.constants.OBJECTS_COUNT, pinTemplate, adsFilteredByType, mapPins, window.constants.PIN_OFFSET_X, window.constants.PIN_OFFSET_Y);
  };

  filterByType.addEventListener('change', function () {
    updatePins();
  });

  mapFiltersForm.addEventListener('change', function () {
    checkCardOpen();
  });
})();
