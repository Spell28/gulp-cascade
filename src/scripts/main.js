document.addEventListener( 'DOMContentLoaded', function() {
  var sliderElement = document.querySelector('.splide')

  if (sliderElement) {
    var splide = new Splide('.splide');
    splide.mount();
  }

});
