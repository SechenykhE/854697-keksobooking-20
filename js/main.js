'use strict';

var OBJECTS_COUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var pinX = PIN_WIDTH / 2;
var PIN_Y = 70;

var getAvatarsList = function (number) {
  var avatarsList = [];

  for (var i = 1; i <= number; i++) {
    avatarsList.push('img/avatars/user0' + i + '.png');
  }
  return avatarsList;
};

var avatars = getAvatarsList(OBJECTS_COUNT);

var title = 'Заголовок';
var price = 1000;
var rooms = [1, 2, 3, 4];
var guests = [1, 2, 3, 4, 5, 6];
var description = 'Описание';
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var getRandomArray = function (array, min) {
  var newArray = array.slice();
  var numberDel = getRandomNumber(min, array.length);

  for (var i = 0; i < numberDel; i++) {
    newArray.splice(getRandomNumber(0, newArray.length - 1), 1);
  }

  return newArray;
};

var makeRandomObject = function (index) {
  var avatarAddresses = avatars[index];
  var locationX = getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX);
  var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
  var location = locationX + ', ' + locationY;
  var typeObject = getRandomValue(TYPES);
  var roomsObject = getRandomValue(rooms);
  var guestsObject = getRandomValue(guests);
  var checkinObject = getRandomValue(CHECKINS);
  var checkoutObject = getRandomValue(CHECKOUTS);
  var featuresObjects = getRandomArray(FEATURES, 0);
  var photoObjects = getRandomArray(photos, 0);

  return {
    author: {
      avatar: avatarAddresses
    },
    offer: {
      title: title,
      address: location,
      price: price,
      type: typeObject,
      rooms: roomsObject,
      guests: guestsObject,
      checkin: checkinObject,
      checkout: checkoutObject,
      features: featuresObjects,
      description: description,
      photo: photoObjects
    },
    location: {
      x: locationX,
      y: locationY,
    }
  };
};

var getObjectList = function (number) {
  var objectList = [];

  for (var i = 0; i < number; i++) {
    objectList.push(makeRandomObject(i));
  }
  return objectList;
};

var objects = getObjectList(OBJECTS_COUNT);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPinElement = function (template, array, X, Y) {
  var element = template.cloneNode(true);

  element.style.left = array.location.x - X + 'px';
  element.style.top = array.location.y - Y + 'px';
  element.querySelector('img').src = array.author.avatar;
  element.querySelector('img').alt = array.title;

  return element;
};

var createDomBlock = function (count, template, array, blockLocation, X, Y) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    var blockElement = createPinElement(template, array[i], X, Y);

    fragment.appendChild(blockElement);
  }
  blockLocation.appendChild(fragment);
};

createDomBlock(OBJECTS_COUNT, pinTemplate, objects, mapPins, pinX, PIN_Y);
