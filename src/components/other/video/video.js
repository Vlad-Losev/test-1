import Plyr from 'plyr';

export const video = () => {
    try {
        (function() {
            let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            let items = document.querySelectorAll('.js-video');

            items.forEach(item => {
                let player = new Plyr(item, {
                    iconUrl: window.___browserSync___ ? '/img/symbol/symbol.svg' : '/local/templates/cemeq/img/symbol/symbol.svg',
                    settings: ['captions', 'quality', 'loop'],
                    controls: isSafari
                        ? ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay']
                        : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']

                });
            });
        })();

        (function() {
            let items = document.querySelectorAll('.js-video-yt');

            items.forEach(item => {
                let player = new Plyr(item, {
                    // settings: ['captions', 'quality', 'loop'],
                    // controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay']
                });
            });
        })();
    } catch (error) {
        console.log(error)
    }
};
