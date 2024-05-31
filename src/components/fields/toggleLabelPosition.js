export const toggleLabelPosition = () => {
	try {
        let $items = $('.js-input');

        $items.each(function() {
            let $this = $(this),
                $input = $this.find('.js-input__input, textarea');

            ['keypress.checkempty', 'input.checkempty'].forEach(event => {
                $input.off(event);
            });
            ['keypress.checkerror', 'input.checkerror'].forEach(event => {
                $input.off(event);
            });

            $input.on('focus.checkempty', function() {
                $this.removeClass('isEmpty');
            });
            $input.on('blur.checkempty', function() {
                if($input.val() == '') $this.addClass('isEmpty');
            });

            ['keypress.checkempty', 'input.checkempty'].forEach(event => {
                $input.on(event, function() {
                    $this.removeClass('isEmpty');
                });
            });
            
            ['keypress.checkerror', 'input.checkerror'].forEach(event => {
                $input.on(event, function() {
                    if($this.hasClass('isError')) $this.removeClass('isError')
                });
            });
            
            if($input.val() == '') $this.addClass('isEmpty');
            else $this.removeClass('isEmpty');
        });
	} catch (error) {
		console.log(error)
	}
};
