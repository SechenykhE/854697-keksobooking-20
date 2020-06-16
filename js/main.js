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
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_OFFSET_X = Math.round(MAIN_PIN_WIDTH / 2);
var MAIN_PIN_HEIGHT = 87;
var MAIN_PIN_OFFSET_Y = Math.round(MAIN_PIN_HEIGHT / 2);

var HOUSING_PHOTO_WIDTH = 45;
var HOUSING_PHOTO_HEIGHT = 40;

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
  var pins = [];
  for (var i = 0; i < count; i++) {
    var blockElement = createPinElement(template, adsList[i], offsetX, offsetY);
    pins.push(blockElement);
    fragment.appendChild(blockElement);
  }
  blockLocation.appendChild(fragment);
  return pins;
};

var adForm = document.querySelector('.ad-form');
var formFieldsets = document.querySelectorAll('fieldset');
var mapFiltersForm = map.querySelector('.map__filters');
var mapFiltersSelects = mapFiltersForm.querySelectorAll('select');

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

var mapPinMain = mapPins.querySelector('.map__pin--main');
var mapCard = null;

var createOrUpdateCard = function (ad) {
  if (mapCard === null) {
    mapCard = createCardElement(cardTemplate, ad);
    map.insertBefore(mapCard, mapFiltersContainer);
  } else {
    map.removeChild(mapCard);
    mapCard = createCardElement(cardTemplate, ad);
    map.insertBefore(mapCard, mapFiltersContainer);
  }
/* var mapsCard = map.querySelector('.map__card');
  var cardClose = mapsCard.querySelector('.popup__close');

  cardClose.addEventListener('click', function () {
    map.removeChild(card);
  });*/
};

var showCardOnClick = function (adsPin, ad) {
  adsPin.addEventListener('click', function () {
    createOrUpdateCard(ad);
  });
  adsPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      createOrUpdateCard(ad);
    }
  });
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addDisabled(formFieldsets, false);
  addDisabled(mapFiltersSelects, false);
};

var deactivatePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('.ad-form--disabled');
  addDisabled(formFieldsets, true);
  addDisabled(mapFiltersSelects, true);
};

deactivatePage();

adForm.querySelector('#address').value = getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, MAIN_PIN_OFFSET_Y);

var pins = [];
var adsPins = [];

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    if (pins.length === 0) {
      pins = createPinsBlock(OBJECTS_COUNT, pinTemplate, ads, mapPins, PIN_OFFSET_X, PIN_OFFSET_Y);
      adsPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < adsPins.length; i++) {
        showCardOnClick(adsPins[i], ads[i]);
      }
    }
    adForm.querySelector('#address').value = getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, MAIN_PIN_HEIGHT);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
    if (pins.length === 0) {
      pins = createPinsBlock(OBJECTS_COUNT, pinTemplate, ads, mapPins, PIN_OFFSET_X, PIN_OFFSET_Y);
      adsPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < adsPins.length; i++) {
        showCardOnClick(adsPins[i], ads[i]);
      }
    }
    adForm.querySelector('#address').value = getPinsCoordinates(mapPinMain, MAIN_PIN_OFFSET_X, MAIN_PIN_HEIGHT);
  }
});

var formsTitle = adForm.querySelector('#title');
formsTitle.addEventListener('invalid', function () {
  if (formsTitle.validity.tooShort) {
    formsTitle.setCustomValidity('Заголовок должен состоять минимум из 30-и символов');
  } else if (formsTitle.validity.tooLong) {
    formsTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (formsTitle.validity.valueMissing) {
    formsTitle.setCustomValidity('Это обязательное поле. Заполните его, пожалуйста');
  } else {
    formsTitle.setCustomValidity('');
  }
});

var housingType = adForm.querySelector('#type');
var housingPrice = adForm.querySelector('#price');
housingType.addEventListener('change', function () {
  switch (housingType.value) {
    case 'bungalo':
      housingPrice.min = '0';
      housingPrice.placeholder = '0';
      break;
    case 'flat':
      housingPrice.min = '1000';
      housingPrice.placeholder = '1000';
      break;
    case 'house':
      housingPrice.min = '5000';
      housingPrice.placeholder = '5000';
      break;
    case 'palace':
      housingPrice.min = '10000';
      housingPrice.placeholder = '10000';
      break;
  }
});

var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
timeIn.addEventListener('change', function () {
  switch (timeIn.value) {
    case '12:00':
      timeOut.value = '12:00';
      break;
    case '13:00':
      timeOut.value = '13:00';
      break;
    case '14:00':
      timeOut.value = '14:00';
      break;
  }
});
timeOut.addEventListener('change', function () {
  switch (timeOut.value) {
    case '12:00':
      timeIn.value = '12:00';
      break;
    case '13:00':
      timeIn.value = '13:00';
      break;
    case '14:00':
      timeIn.value = '14:00';
      break;
  }
});

var roomsNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var validateRoomsAndGuests = function () {
  if ((roomsNumber.value === '100') && (capacity.value !== '0')) {
    capacity.setCustomValidity('не для гостей');
  } else if (!(roomsNumber.value >= capacity.value) || (capacity.value === '0')) {
    switch (roomsNumber.value) {
      case '1':
        capacity.setCustomValidity('для 1 гостя');
        break;
      case '2':
        capacity.setCustomValidity('для 1 гостя или 2 гостей');
        break;
      case '3':
        capacity.setCustomValidity('для 1, 2-х или 3-х гостей');
        break;
    }
  } else {
    capacity.setCustomValidity('');
  }
};

roomsNumber.addEventListener('change', validateRoomsAndGuests);
capacity.addEventListener('change', validateRoomsAndGuests);


var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var housingTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var createCardElement = function (template, ad) {
  var card = template.cloneNode(true);

  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = housingTypes[ad.offer.type];
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
    newPhoto.width = HOUSING_PHOTO_WIDTH;
    newPhoto.height = HOUSING_PHOTO_HEIGHT;
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

var mapFiltersContainer = document.querySelector('.map__filters-container');


