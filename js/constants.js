'use strict';

window.constants = (function () {
  var OBJECTS_COUNT = 5;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
  var PRICE_POINT1 = 10000;
  var PRICE_POINT2 = 50000;

  var MapPinMainPosition = {
    LEFT: '570px',
    TOP: '375px'
  };

  var HOUSING_PHOTO_WIDTH = 45;
  var HOUSING_PHOTO_HEIGHT = 40;
  var HOUSING_PHOTO_PREVIEW_WIDTH = 70;
  var HOUSING_PHOTO_PREVIEW_HEIGHT = 70;

  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var NODE = {
    general: 'z-index: 100; margin: 0 auto; text-align: center; background-color: white;',
    position: 'absolute',
    left: '0',
    right: '0',
    top: '50%',
    width: '50%',
    fontSize: '30px',
    color: 'red'
  };

  var DEBOUNCE_INTERVAL = 500;

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  return {
    OBJECTS_COUNT: OBJECTS_COUNT,
    TYPES: TYPES,
    FEATURES: FEATURES,
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    PIN_OFFSET_X: PIN_OFFSET_X,
    PIN_OFFSET_Y: PIN_OFFSET_Y,
    MAIN_PIN_OFFSET_X: MAIN_PIN_OFFSET_X,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_OFFSET_Y: MAIN_PIN_OFFSET_Y,
    PRICE_POINT1: PRICE_POINT1,
    PRICE_POINT2: PRICE_POINT2,
    HOUSING_PHOTO_WIDTH: HOUSING_PHOTO_WIDTH,
    HOUSING_PHOTO_HEIGHT: HOUSING_PHOTO_HEIGHT,
    HOUSING_PHOTO_PREVIEW_WIDTH: HOUSING_PHOTO_PREVIEW_WIDTH,
    HOUSING_PHOTO_PREVIEW_HEIGHT: HOUSING_PHOTO_PREVIEW_HEIGHT,
    URL_LOAD: URL_LOAD,
    URL_SAVE: URL_SAVE,
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    NODE: NODE,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    FILE_TYPES: FILE_TYPES,
    MapPinMainPosition: MapPinMainPosition
  };
})();
