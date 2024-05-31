export const dropdown = (name, message) => {
  try {

      let $dropdowns = $('.js-dropdown');

      $dropdowns.each(function() {
          let $dropdown = $(this),
              $items = $dropdown.find('.js-dropdown__item');

          $items.each(function() {
              let $item = $(this),
                  $label = $item.find('.js-dropdown__label'),
                  $subMenu = $item.find('.js-dropdown__submenu');

              if($item.hasClass('isActive')) {
                  $subMenu.slideDown(300);
              } else {
                  $subMenu.slideUp(300);
              }

              $label.on('click', function(e) {
                  e.preventDefault();

                  $item.toggleClass('isActive');

                  if($item.hasClass('isActive')) {
                      $subMenu.slideDown(300);
                  } else {
                      $subMenu.slideUp(300);
                  }
              });
          });
      });
  } catch (error) {
      console.log(error)
  }
}
