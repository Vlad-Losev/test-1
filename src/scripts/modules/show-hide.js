export const showHide = () => {
  try {
      //let btnHide = `<span>Скрыть <div class="um-link__icon">${+svg('arrow-down')}</div></span>`;
      (function() {
          $(document).ready(function(){
              $('.js-content_btn').click(function(){
                  $('.js-content_block').toggleClass('hide');

                  if ($('.js-content_block').hasClass('hide')) {
                      $('.js-content_btn').html('Развернуть');
                      $('.js-content_toggle').removeClass('active');
                  } else {
                      $('.js-content_btn').html('Скрыть');
                      $('.js-content_toggle').toggleClass('active');
                  }
                  return false;
              });
          });
      })();

  } catch (error) {
      console.log(error)
  }
}
