'use strict';

(function () {
  var MAIN_PIN_OFFSET_X = window.constants.MAIN_PIN_OFFSET_X;
  var MAIN_PIN_HEIGHT = window.constants.MAIN_PIN_HEIGHT;
  var PRICE_POINT1 = window.constants.PRICE_POINT1;
  var PRICE_POINT2 = window.constants.PRICE_POINT2;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersForm = map.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFiltersForm.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFiltersForm.querySelectorAll('select');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var previewAvatar = adForm.querySelector('.ad-form-header__preview img');

  var adsFromServer = [];

  var onLoad = function (response) {
    adsFromServer = response;
    if (!adsFromServer.hasOwnProperty('offer')) {
      adsFromServer = adsFromServer.filter(function (ad) {
        return ad.hasOwnProperty('offer');
      });
    }
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
    window.checkPinActive();
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
    window.checkHousingPhoto();
    previewAvatar.src = window.constants.AVATAR_PREVIEW;
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
  var filterByPrice = mapFiltersForm.querySelector('#housing-price');
  var filterByRooms = mapFiltersForm.querySelector('#housing-rooms');
  var filterByGuests = mapFiltersForm.querySelector('#housing-guests');
  var filterByFeaturesFieldset = mapFiltersForm.querySelector('#housing-features');

  var getPriceValue = function (ad) {
    var priceValue;

    if (ad.offer.price < PRICE_POINT1) {
      priceValue = 'low';
    } else
    if ((ad.offer.price >= PRICE_POINT1) && (ad.offer.price < PRICE_POINT2)) {
      priceValue = 'middle';
    } else
    if (ad.offer.price >= PRICE_POINT2) {
      priceValue = 'high';
    }
    return priceValue;
  };

  var changingFilters = function () {
    var filterByFeatures = filterByFeaturesFieldset.querySelectorAll('input:checked');

    var filterByFeaturesList = [];
    filterByFeatures.forEach(function (it) {
      filterByFeaturesList.push(it.value);
    });

    var filteredAds = adsFromServer.slice();

    filteredAds = filteredAds.filter(function (ad) {
      var flag = true;
      if (filterByType.value !== 'any') {
        flag = flag && (ad.offer.type === filterByType.value);
      }
      if (filterByPrice.value !== 'any') {
        flag = flag && (getPriceValue(ad) === filterByPrice.value);
      }
      if (filterByRooms.value !== 'any') {
        flag = flag && (ad.offer.rooms === parseInt(filterByRooms.value, 10));
      }
      if (filterByGuests.value !== 'any') {
        flag = flag && (ad.offer.guests === parseInt(filterByGuests.value, 10));
      }
      if (filterByFeaturesList.length !== 0) {
        for (var i = 0; i < filterByFeaturesList.length; i++) {
          flag = flag && ad.offer.features.includes(filterByFeaturesList[i]);
        }
      }
      return flag;
    });

    filters(filteredAds);
    checkCardOpen();
  };

  var filters = window.utils.debounce(function (ads) {
    updatePins(ads);
  });

  var updatePins = function (ads) {
    window.createPinsBlock(window.constants.OBJECTS_COUNT, pinTemplate, ads, mapPins, window.constants.PIN_OFFSET_X, window.constants.PIN_OFFSET_Y);
  };

  mapFiltersForm.addEventListener('change', changingFilters);
})();
