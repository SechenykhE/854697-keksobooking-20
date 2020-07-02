'use strict';

(function () {
  var createPinElement = function (template, ad, offsetX, offsetY) {
    var pin = template.cloneNode(true);
    pin.style.left = ad.location.x - offsetX + 'px';
    pin.style.top = ad.location.y - offsetY + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.title;
    pin.addEventListener('click', function () {
      window.pin.checkPinActive();
      pin.classList.add('map__pin--active');
      window.card.createOrUpdateCard(ad);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.pin.checkPinActive();
        pin.classList.add('map__pin--active');
        window.card.createOrUpdateCard(ad);
      }
    });

    return pin;
  };

  window.pin = {
    createPinsBlock: function (count, template, adsList, blockLocation, offsetX, offsetY) {
      var takeNumber = adsList.length > count ? count : adsList.length;

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < takeNumber; i++) {
        var blockElement = createPinElement(template, adsList[i], offsetX, offsetY);
        fragment.appendChild(blockElement);
      }
      window.map.checkPinsOnMap();
      blockLocation.appendChild(fragment);
    },
    checkPinActive: function () {
      var pinActiv = document.querySelector('.map__pin--active');
      if (pinActiv) {
        pinActiv.classList.remove('map__pin--active');
      }
    }
  };
})();
