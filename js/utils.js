'use strict';

window.utils = (function () {
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

  return {
    getRandomNumber: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomElementOfArray: function (values) {
      return values[Math.floor(Math.random() * values.length)];
    },
    getRandomLengthArray: function (array, min) {
      var newArray = shuffleArray(array);
      var randomLength = this.getRandomNumber(min, newArray.length - 1);

      var randomLengthArray = newArray.slice(0, randomLength);

      return randomLengthArray;
    },
    addDisabled: function (array, disabled) {
      for (var i = 0; i < array.length; i++) {
        array[i].disabled = disabled;
      }
    }
  };
})();
