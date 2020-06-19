'use strict';

(function () {
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
      if (!ad.offer.features.includes(window.main.FEATURES[index])) {
        popupFeatures.querySelector('.popup__feature--' + window.main.FEATURES[i]).style.display = 'none';
      }
    };
    for (var i = 0; i < window.main.FEATURES.length; i++) {
      checkFeatures(i);
    }

    card.querySelector('.popup__description').textContent = ad.offer.description;

    var popupPhotos = card.querySelector('.popup__photos');
    var fragmentForPhotos = document.createDocumentFragment();

    var getNewPhoto = function (index) {
      var newPhoto = document.createElement('img');
      newPhoto.src = ad.offer.photo[index];
      newPhoto.classList.add('popup__photo');
      newPhoto.width = window.main.HOUSING_PHOTO_WIDTH;
      newPhoto.height = window.main.HOUSING_PHOTO_HEIGHT;
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
})();
