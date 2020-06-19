'use strict';

(function () {
  var getPinsCoordinates = function (pin, offsetX, offsetY) {
    var pinTop = pin.style.top;
    var pinLeft = pin.style.left;
    var pinX = parseInt(pinLeft, 10) + offsetX;
    var pinY = parseInt(pinTop, 10) + offsetY;
    return pinX + ', ' + pinY;
  };

  var addDisabled = function (array, disabled) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = disabled;
    }
  };

  var map = document.querySelector('.map');

  var closeCard = function () {
    map.removeChild(map.querySelector('.map__card'));
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  window.createOrUpdateCard = function (ad) {
    var mapCard = map.querySelector('.map__card');
    if (mapCard !== null) {
      map.removeChild(mapCard);
    }
    mapCard = window.createCardElement(cardTemplate, ad);
    map.insertBefore(mapCard, mapFiltersContainer);

    mapCard.querySelector('.popup__close').addEventListener('click', closeCard);
    document.addEventListener('keydown', onCardEscPress);
  };

  var adForm = document.querySelector('.ad-form');
  var formFieldsets = document.querySelectorAll('fieldset');
  var mapFiltersForm = map.querySelector('.map__filters');
  var mapFiltersSelects = mapFiltersForm.querySelectorAll('select');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var pins = [];

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    addDisabled(formFieldsets, false);
    addDisabled(mapFiltersSelects, false);
    if (pins.length === 0) {
      pins = window.createPinsBlock(window.main.OBJECTS_COUNT, pinTemplate, window.ads, mapPins, window.main.PIN_OFFSET_X, window.main.PIN_OFFSET_Y);
    }
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('.ad-form--disabled');
    addDisabled(formFieldsets, true);
    addDisabled(mapFiltersSelects, true);
  };

  deactivatePage();

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  adForm.querySelector('#address').value = getPinsCoordinates(mapPinMain, window.main.MAIN_PIN_OFFSET_X, window.main.MAIN_PIN_OFFSET_Y);

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();
      adForm.querySelector('#address').value = getPinsCoordinates(mapPinMain, window.main.MAIN_PIN_OFFSET_X, window.main.MAIN_PIN_HEIGHT);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      adForm.querySelector('#address').value = getPinsCoordinates(mapPinMain, window.main.MAIN_PIN_OFFSET_X, window.main.MAIN_PIN_HEIGHT);
    }
  });
})();
