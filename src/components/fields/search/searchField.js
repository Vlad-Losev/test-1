export const searchField = () => {
	try {
        let $items = $('.js-search');
        let $openSearch = $('.js-openSearch'),
            $closeSearch = $('.js-closeSearch');

        $openSearch.on('click', function() {
            $('.js-header .js-search').addClass('isVisibled');
        });
        $closeSearch.on('click', function() {
            $('.js-header .js-search').removeClass('isVisibled');
        });

        $items.each(function() {
            let $item = $(this),
                $field = $item.find('input'),
                $clear = $item.find('.js-search__clear');

            function toggleClearBtn() {
                if($field.val().length > 0) {
                    $item.addClass('isNotEmpty');
                } else {
                    $item.removeClass('isNotEmpty');
                }
            }

            $clear.on('click', function() {
                $field.val('');
                toggleClearBtn();
            });

            $field.off('input.search');
            $field.on('input.search', function() {
                toggleClearBtn();
            });

            $field.trigger('input.search');
        });
	} catch (error) {
		console.log(error)
	}
};
