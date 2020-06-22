'use strict';

(function () {
  var FEATURES = window.constants.FEATURES;
  var housingTypes = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  window.createCardElement = function (template, ad) {
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
    for (var i = 0; i < window.constants.FEATURES.length; i++) {
      checkFeatures(i);
    }

    card.querySelector('.popup__description').textContent = ad.offer.description;

    var popupPhotos = card.querySelector('.popup__photos');
    var fragmentForPhotos = document.createDocumentFragment();

    var getNewPhoto = function (index) {
      var newPhoto = document.createElement('img');
      newPhoto.src = ad.offer.photos[index];
      newPhoto.classList.add('popup__photo');
      newPhoto.width = window.constants.HOUSING_PHOTO_WIDTH;
      newPhoto.height = window.constants.HOUSING_PHOTO_HEIGHT;
      newPhoto.alt = 'Фотография жилья';

      return newPhoto;
    };

    if (ad.offer.photos.length === 0) {
      popupPhotos.style.display = 'none';
    } else {
      for (var j = 0; j < ad.offer.photos.length; j++) {
        var housingPhoto = getNewPhoto(j);
        fragmentForPhotos.appendChild(housingPhoto);
      }
    }

    var popupPhoto = popupPhotos.querySelector('.popup__photo');
    popupPhotos.replaceChild(fragmentForPhotos, popupPhoto);

    card.querySelector('.popup__avatar').src = ad.author.avatar;

    return card;
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
})();
