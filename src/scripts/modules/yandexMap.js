export const yandexMap = () => {
  try {
      let items = document.querySelectorAll('.js-map');




      if(typeof ymaps == "undefined") {

          $.getScript('https://api-maps.yandex.ru/2.1/?apikey=152f8529-5513-4050-b5e0-25d5150b1976&lang=ru_RU', function() {
              ymaps.ready(init);
              function init() {
                  items.forEach(item => {
                      let coordinates = item.dataset.coordinates;
                      if(coordinates) coordinates = coordinates.split(',').map(coord => {return coord.trim()});

                      let placemarkPath = item.dataset.placemarkPath || '/img/blueMark.svg';

                      let myMap = new ymaps.Map(item, {
                              center: coordinates,
                              zoom: 13
                          }),
                          myPlacemark = coordinates && new ymaps.Placemark(coordinates, {}, {
                              iconLayout: 'default#image',
                              iconImageHref: placemarkPath,
                              iconImageSize: $(window).width() <= 1023 ? [54, 70] : [65, 85],
                              iconImageOffset: $(window).width() <= 1023 ? [-27, -70] : [-32.5, -85],
                          });
  
                      if(myPlacemark) myMap.geoObjects.add(myPlacemark);

                      myMap.behaviors.disable('scrollZoom');
                  });
              }
          });
      }
  } catch (error) {
      console.log(error)
  }
}
