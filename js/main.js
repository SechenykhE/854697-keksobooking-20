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

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createCardElement = function (template, ad) {
  var card = template.cloneNode(true);

  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

  var popupType = card.querySelector('.popup__type');
  switch (ad.offer.type) {
    case 'palace':
      popupType.textContent = 'Дворец';
      break;
    case 'flat':
      popupType.textContent = 'Квартира';
      break;
    case 'house':
      popupType.textContent = 'Дом';
      break;
    case 'bungalo':
      popupType.textContent = 'Бунгало';
      break;
  }

  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  var popupFeatures = card.querySelector('.popup__features');
  var checkFeatures = function (index) {
    if (!ad.offer.features.includes(FEATURES[index])) {
      popupFeatures.querySelector('.popup__feature--' + FEATURES[i]).style.display = 'none';
    }
  };
  for (var i = 0; i < FEATURES.length; i++) {
    checkFeatures(i);
  }

  card.querySelector('.popup__description').textContent = ad.offer.description;

  var popupPhotos = card.querySelector('.popup__photos');
  var fragmentForPhotos = document.createDocumentFragment();

  var getNewPhoto = function (index) {
    var newPhoto = document.createElement('img');
    newPhoto.src = ad.offer.photo[index];
    newPhoto.classList.add('popup__photo');
    newPhoto.width = 45;
    newPhoto.height = 40;
    newPhoto.alt = 'Фотография жилья';

    return newPhoto;
  };

  if (ad.offer.photo.length === 0) {
    popupPhotos.style.display = 'none';
  } else {
    for (var j = 0; j < ad.offer.photo.length; j++) {
      var housingPhoto = getNewPhoto(j);
      fragmentForPhotos.appendChild(housingPhoto);
    }
  }

  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  popupPhotos.replaceChild(fragmentForPhotos, popupPhoto);

  card.querySelector('.popup__avatar').src = ad.author.avatar;

  return card;
};

var adsCard = createCardElement(cardTemplate, ads[0]);

var mapFiltersContainer = document.querySelector('.map__filters-container');
map.insertBefore(adsCard, mapFiltersContainer);
