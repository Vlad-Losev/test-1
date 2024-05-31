console.log(34234534534);

import Swiper, { Navigation, Pagination, EffectFade } from 'swiper';

Swiper.use([Navigation, Pagination, EffectFade]);

// Swiper Слайдер - 2
const swiper2 = new Swiper('.um-swiper-2', {
  direction: 'horizontal',
  loop: true,
  speed: 500,
  // slidesPerView: 1,
  effect: 'slider', //slider, cards, coverflow, flip, fade, cube (способ перелистывания),

  // autoplay: {
  //   delay: 1000,
  // },

  // disableOnInteraction: false,

});

// Swiper Слайдер - 1
const swiper1 = new Swiper('.um-swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 500,
  effect: 'slider', //slider, cards, coverflow, flip, fade, cube (способ перелистывания),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  pagination: {
    el: '.um-sliderPagination',
    type: 'bullets',
    clickable: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0, 
    },
    769: {
      slidesPerView: 2,
      spaceBetween: 30, 
    },
    1231: {
      slidesPerView: 3,
    }
  }
});

console.log(2312);
