export const preloader = () => {
  // document.documentElement.classList.add('isLoading');
  try {
      let preloader = document.querySelector('.js-preloader');

      setTimeout(function() {
          preloader.classList.add('isAnimated');

          setTimeout(function() {
              preloader.classList.add('isLoaded');
              document.documentElement.classList.remove('isLoading');
          }, 4000)
      }, 0);
  } catch (error) {
      console.log(error)
  }
};
