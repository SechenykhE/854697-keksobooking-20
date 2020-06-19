'use strict';

(function () {
  var makeRandomAd = function (index) {
    var avatarAddress = 'img/avatars/user0' + (index + 1) + '.png';
    var locationX = window.main.getRandomNumber(window.main.LOCATION_X_MIN, window.main.LOCATION_X_MAX);
    var locationY = window.main.getRandomNumber(window.main.LOCATION_Y_MIN, window.main.LOCATION_Y_MAX);
    var location = locationX + ', ' + locationY;

    var ad = {
      author: {
        avatar: avatarAddress
      },
      offer: {
        title: window.main.TITLE,
        address: location,
        price: window.main.PRICE,
        type: window.main.getRandomElementOfArray(window.main.TYPES),
        rooms: window.main.getRandomNumber(window.main.ROOMS.min, window.main.ROOMS.max),
        guests: window.main.getRandomNumber(window.main.GUESTS.min, window.main.GUESTS.max),
        checkin: window.main.getRandomElementOfArray(window.main.CHECKINS),
        checkout: window.main.getRandomElementOfArray(window.main.CHECKOUTS),
        features: window.main.getRandomLengthArray(window.main.FEATURES, 0),
        description: window.main.DESCRIPTION,
        photo: window.main.getRandomLengthArray(window.main.PHOTOS, 0)
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

  var ads = getAdsList(window.main.OBJECTS_COUNT);
  window.ads = ads;
})();
