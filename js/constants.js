'use strict';

window.constants = (function () {
  var OBJECTS_COUNT = 8;
  var TITLE = 'Заголовок';
  var PRICE = 1000;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = {min: 1, max: 4};
  var GUESTS = {min: 1, max: 6};
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = 'Описание';
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 1200;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var PIN_WIDTH = 50;
  var PIN_OFFSET_X = PIN_WIDTH / 2;
  var PIN_OFFSET_Y = 70;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_OFFSET_X = Math.round(MAIN_PIN_WIDTH / 2);
  var MAIN_PIN_HEIGHT = 81;
  var MAIN_PIN_OFFSET_Y = Math.round(MAIN_PIN_HEIGHT / 2);

  var HOUSING_PHOTO_WIDTH = 45;
  var HOUSING_PHOTO_HEIGHT = 40;

  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';

  return {
    OBJECTS_COUNT: OBJECTS_COUNT,
    TITLE: TITLE,
    PRICE: PRICE,
    TYPES: TYPES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    DESCRIPTION: DESCRIPTION,
    PHOTOS: PHOTOS,
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    PIN_OFFSET_X: PIN_OFFSET_X,
    PIN_OFFSET_Y: PIN_OFFSET_Y,
    MAIN_PIN_OFFSET_X: MAIN_PIN_OFFSET_X,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_OFFSET_Y: MAIN_PIN_OFFSET_Y,
    HOUSING_PHOTO_WIDTH: HOUSING_PHOTO_WIDTH,
    HOUSING_PHOTO_HEIGHT: HOUSING_PHOTO_HEIGHT,
    URL_LOAD: URL_LOAD
  };
})();
