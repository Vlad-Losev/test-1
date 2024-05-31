export const select = () => {
  try {
      let $selects = $('.js-select');

      $selects.each(function() {
          let $select = $(this),
              $openBtn = $select.find('.js-select__open'),
              $window = $select.find('.js-select__window'),
              $label = $select.find('.js-select__label'),
              $activeOptionLabel = $select.find('.js-select__option.isSelected'),
              $options = $select.find('.js-select__option input');

          $openBtn.off('click.umSelect');
          $options.off('change.umSelect');

          $(document).on('click.umSelect', function(e) {
              let $target = $(e.target);

              if($target.is($select) || $target.closest('.js-select').is($select)) return;

              $select.removeClass('isOpen');
              $window.slideUp(200);
          });

          $openBtn.on('click.umSelect', function() {
              if(!$select.hasClass('isOpen')) $('.js-select.isOpen').find('.js-select__open').trigger('click.umSelect');

              $select.removeClass('isError');
              $select.toggleClass('isOpen');
              $window.slideToggle(200);
          });

          function umSelectHandler(option, toggleWindow = false, triggerEvent = false) {
              let $option = $(option),
                  $optionLabel = $option.closest('.js-select__option');

              if(option.checked == true) {
                  $label.text($optionLabel.attr('data-label'));

                  $activeOptionLabel.removeClass('isSelected');
                  $activeOptionLabel = $optionLabel;
                  $activeOptionLabel.addClass('isSelected');
              }

              if(triggerEvent) $option.trigger('change');

              if(option.type == 'radio' && toggleWindow) $openBtn.trigger('click.umSelect')
          }

          $options.each(function() {
              umSelectHandler(this);
          });

          $options.on('change.umSelect', function() {
              umSelectHandler(this, true);
          });
      });
  } catch (error) {
      console.log(error)
  }
};
