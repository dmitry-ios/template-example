'use strict';

(function () {
  var numberImages = 3;
  var widthImage = 130;
  var padding = 10;

  var nextButton = document.querySelector('.carousel__button--next');
  var prevButton = document.querySelector('.carousel__button--prev');
  var listImages = document.querySelector('.carousel__images');
  var images = document.querySelectorAll('.carousel__images li');
  var position = 0;
  var offset = (widthImage + padding) * numberImages;

  nextButton.addEventListener('click', function () {
    if (images.length <= 3) {
      return;
    }
    position -= offset;
    position = Math.max(position, -(widthImage + padding) * (images.length - numberImages));
    listImages.style.marginLeft = position + 'px';
  });

  prevButton.addEventListener('click', function () {
    position += offset;
    position = Math.min(position, 0);
    listImages.style.marginLeft = position + 'px';
  });
})();
