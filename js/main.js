'use strict';

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

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElementOfArray = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var shuffleArray = function (array) {
  var shuffledArray = array.slice();
  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var randomElement = Math.floor(Math.random() * (i + 1));
    var buffer = shuffledArray[randomElement];
    shuffledArray[randomElement] = shuffledArray[i];
    shuffledArray[i] = buffer;
  }
  return shuffledArray;
};

var getRandomLengthArray = function (array, min) {
  var newArray = shuffleArray(array);
  var randomLength = getRandomNumber(min, newArray.length - 1);

  var randomLengthArray = newArray.slice(0, randomLength);

  return randomLengthArray;
};

var makeRandomAd = function (index) {
  var avatarAddress = 'img/avatars/user0' + (index + 1) + '.png';
  var locationX = getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX);
  var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
  var location = locationX + ', ' + locationY;

  var ad = {
    author: {
      avatar: avatarAddress
    },
    offer: {
      title: TITLE,
      address: location,
      price: PRICE,
      type: getRandomElementOfArray(TYPES),
      rooms: getRandomNumber(ROOMS.min, ROOMS.max),
      guests: getRandomNumber(GUESTS.min, GUESTS.max),
      checkin: getRandomElementOfArray(CHECKINS),
      checkout: getRandomElementOfArray(CHECKOUTS),
      features: getRandomLengthArray(FEATURES, 0),
      description: DESCRIPTION,
      photo: getRandomLengthArray(PHOTOS, 0)
    },
    location: {
      x: locationX,
      y: locationY,
    }
  };

  return ad;
};

var getAdsList = function (number) {
  var adsList = [];

  for (var i = 0; i < number; i++) {
    adsList.push(makeRandomAd(i));
  }
  return adsList;
};

var ads = getAdsList(OBJECTS_COUNT);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPinElement = function (template, ad, offsetX, offsetY) {
  var pin = template.cloneNode(true);

  pin.style.left = ad.location.x - offsetX + 'px';
  pin.style.top = ad.location.y - offsetY + 'px';
  pin.querySelector('img').src = ad.author.avatar;
  pin.querySelector('img').alt = ad.title;

  return pin;
};

var createPinsBlock = function (count, template, adsList, blockLocation, offsetX, offsetY) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    var blockElement = createPinElement(template, adsList[i], offsetX, offsetY);

    fragment.appendChild(blockElement);
  }
  blockLocation.appendChild(fragment);
};

createPinsBlock(OBJECTS_COUNT, pinTemplate, ads, mapPins, PIN_OFFSET_X, PIN_OFFSET_Y);
