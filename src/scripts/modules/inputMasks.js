import IMask from 'imask';

export const inputMasks = () => {
	try {
        $(".js-mask-phone input, input.js-mask-phone").each(function() {
            let mask = IMask(this, {
                mask: '+{7}(000)000-00-00'
            });
        });
	} catch (error) {
		console.log(error)
	}
};
