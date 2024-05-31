import Swiper, { Navigation, Pagination, EffectFade } from 'swiper';

Swiper.use([Navigation, Pagination, EffectFade]);

export const cardsSlider = () => {
    try {
        let items = document.querySelectorAll('.js-cards-slider');

        items.forEach(item => {
            let prevBtn = item.querySelector('.js-cards-slider__prev'),
                nextBtn = item.querySelector('.js-cards-slider__next');

            let slides_count = item.getElementsByClassName("swiper-slide");
            let slides_count_dup = item.getElementsByClassName("swiper-slide-duplicate");
            let total = (slides_count.length - slides_count_dup.length);

            var swiper = new Swiper(item, {
                spaceBetween: 15,
                watchOverflow: true,
                loop: total  > 2,
                slidesPerView: 1.05,
                speed: 300,
                loopedSlides: 4,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                    disabledClass: 'isDisabled',
                },
                breakpoints:{
                    1024:{
                        spaceBetween: 30,
                        slidesPerView: 3,
                        loop: total  > 3,
                    },
                    768:{
                        slidesPerView: 2,
                    },
                },
            });
        });
    } catch (error) {
        console.log(error)
    }
};
