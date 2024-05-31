export const citySelect = () => {
  let $selects = $('.js-citySelect');

  $selects.each(function() {
      let $select = $(this),
          $openBtn = $select.find('.js-citySelect__openBtn');

      $openBtn.on('click', function() {
          $select.toggleClass('isActive');
      });
  });
}
