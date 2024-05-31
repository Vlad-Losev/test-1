export const scrollToTop = (selector) => {
	try {
        // Скролл к элементу
        let $elementToScroll = $(selector);
        $([document.documentElement, document.body]).animate({
            scrollTop: $elementToScroll.offset().top - 200
        }, 800);
	} catch (error) {
		console.log(error)
	}
};
