export const file = () => {
  try {
      function initFileInput() {
          let $files = $('.js-file');

          $files.each(function() {
              let $file = $(this),
                  $input = $file.find('.js-file__input'),
                  $capture = $file.find('.js-file__capture'),
                  $fileName = $file.find('.js-file__capture-name'),
                  $delete = $file.find('.js-file__capture-delete'),
                  $error = $file.find('.js-file__error');

              $input.on('change', function() {
                  let file = this.files[0];

                  console.log(file);

                  $error.slideUp();
                  $error.text('');

                  if(file) {
                      $fileName.text(file.name);
                      $capture.slideDown();
                  } else {
                      $fileName.text('');
                      $capture.slideUp();
                  }
              });

              $delete.on('click', function() {
                  $input.val('');
                  $capture.slideUp();
              });
          });
      };
      initFileInput();

      umGlobal.initFileInput = initFileInput;
  } catch (error) {
      console.log(error);
  }

};
