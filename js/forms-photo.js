'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formsAvatar = adForm.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = adForm.querySelector('.ad-form-header__preview img');
  var formsHousingPhoto = adForm.querySelector('.ad-form__upload input[type=file]');
  var previewHousingPhoto = adForm.querySelector('.ad-form__photo');

  var showsImagePreview = function (inputPlace, previewPlace) {
    var file = inputPlace.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPlace.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.checkHousingPhoto = function () {
    var housingPhoto = previewHousingPhoto.querySelector('img');

    if (housingPhoto) {
      previewHousingPhoto.removeChild(housingPhoto);
    }
  };

  formsAvatar.addEventListener('change', function () {
    showsImagePreview(formsAvatar, previewAvatar);
  });

  formsHousingPhoto.addEventListener('change', function () {
    window.checkHousingPhoto();

    var picture = document.createElement('img');

    picture.width = window.constants.HOUSING_PHOTO_PREVIEW_WIDTH;
    picture.height = window.constants.HOUSING_PHOTO_PREVIEW_HEIGHT;
    showsImagePreview(formsHousingPhoto, picture);

    previewHousingPhoto.appendChild(picture);
  });
})();
