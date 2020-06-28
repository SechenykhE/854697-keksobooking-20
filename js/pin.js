'use strict';

(function () {
  var createPinElement = function (template, ad, offsetX, offsetY) {
    var pin = template.cloneNode(true);
    pin.style.left = ad.location.x - offsetX + 'px';
    pin.style.top = ad.location.y - offsetY + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.title;
    pin.addEventListener('click', function () {
      window.createOrUpdateCard(ad);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.createOrUpdateCard(ad);
      }
    });

    return pin;
  };

  window.createPinsBlock = function (count, template, adsList, blockLocation, offsetX, offsetY) {
    var takeNumber = adsList.length > count ? count : adsList.length;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      var blockElement = createPinElement(template, adsList[i], offsetX, offsetY);
      fragment.appendChild(blockElement);
    }
    window.checkPinsOnMap();
    blockLocation.appendChild(fragment);
  };
})();
