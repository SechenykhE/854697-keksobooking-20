'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
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
  var housingTypesPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  housingType.addEventListener('change', function () {
    housingPrice.min = housingTypesPrice[housingType.value];
    housingPrice.placeholder = housingTypesPrice[housingType.value];
  });

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
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
})();
