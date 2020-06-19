'use strict';

(function () {
  var makeRandomAd = function (index) {
    var avatarAddress = 'img/avatars/user0' + (index + 1) + '.png';
    var locationX = window.utils.getRandomNumber(window.constants.LOCATION_X_MIN, window.constants.LOCATION_X_MAX);
    var locationY = window.utils.getRandomNumber(window.constants.LOCATION_Y_MIN, window.constants.LOCATION_Y_MAX);
    var location = locationX + ', ' + locationY;

    var ad = {
      author: {
        avatar: avatarAddress
      },
      offer: {
        title: window.constants.TITLE,
        address: location,
        price: window.constants.PRICE,
        type: window.utils.getRandomElementOfArray(window.constants.TYPES),
        rooms: window.utils.getRandomNumber(window.constants.ROOMS.min, window.constants.ROOMS.max),
        guests: window.utils.getRandomNumber(window.constants.GUESTS.min, window.constants.GUESTS.max),
        checkin: window.utils.getRandomElementOfArray(window.constants.CHECKINS),
        checkout: window.utils.getRandomElementOfArray(window.constants.CHECKOUTS),
        features: window.utils.getRandomLengthArray(window.constants.FEATURES, 0),
        description: window.constants.DESCRIPTION,
        photo: window.utils.getRandomLengthArray(window.constants.PHOTOS, 0)
      },
      location: {
        x: locationX,
        y: locationY
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

  window.ads = getAdsList(window.constants.OBJECTS_COUNT);
})();
