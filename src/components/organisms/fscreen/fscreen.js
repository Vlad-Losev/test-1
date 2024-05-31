import ScrollMagic from "../../../../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js";

export class Sequence {
    images = [];

    settings = {
        frameRate: 30,
        totalFrameCount: null,
        sequenceFolder: null,
        currentFrame: null,
        firstPlay: {
            startFrame: 1,
            endFrame: 1
        }
    }

    constructor(canvasElSelector, settings) {
        this.canvasElement = document.querySelector(canvasElSelector);
        this.canvasContext = this.canvasElement.getContext("2d");

        this.settings = {...this.settings, ...settings};

        if(!this.settings.totalFrameCount || !this.settings.sequenceFolder) {
            console.error('В качетсве второго параметра должен быть передан путь к папке с изображениями, а так же общее число кадров');
            return;
        }

        this.setImages();
        this.startingPlay();
    }

    setImages() {
        let totalPercent = 0,
            percentOneImg = 100 / this.settings.totalFrameCount;

        for (let i = 1; i <= this.settings.totalFrameCount; i++) {
            const img = new Image();
            img.src = `${this.settings.sequenceFolder}${i}.${this.canvasElement.toDataURL('image/webp').indexOf('data:image/webp') === 0 ? 'webp' : 'jpg'}`;
            this.images[i] = img;

            img.onload = e => {
                totalPercent += +percentOneImg;
                this.canvasElement.dataset.loadedPercent = Math.ceil(totalPercent);
            }
        }
    }

    startingPlay() {
        let interval;
        
        this.settings.currentFrame = this.settings.firstPlay.startFrame;
        this.images[this.settings.currentFrame].onload = () => {
            interval = setInterval(() => {
                this.render();

                if(this.settings.currentFrame >= this.settings.firstPlay.endFrame) clearInterval(interval); 

                this.settings.currentFrame += 1;
            }, 1000/this.settings.frameRate)
        }
    }

    scaleImage(img, ctx) {
        if(img == undefined) return;

        let canvas = ctx.canvas,
            canvasWidth = canvas.getBoundingClientRect().width,
            canvasHeight = canvas.getBoundingClientRect().height;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        let scale_factor = Math.min(canvasWidth / img.width, canvasHeight / img.height);
        scale_factor = scale_factor > 1 ? 1 : scale_factor;
    
        // Lets get the new width and height based on the scale factor
        let newWidth = img.width * scale_factor;
        let newHeight = img.height * scale_factor;
            
        let x = (canvasWidth / 2) - (newWidth / 2);
        let y = (canvasHeight) - (newHeight);
            
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.drawImage(img, x, y, newWidth, newHeight);

        console.log(canvasWidth, canvasHeight, img.width, img.height);
    }

    render() {
        this.scaleImage(this.images[this.settings.currentFrame], this.canvasContext);
    }
}

export const fscreen = (settings = {}) => {
    try {
        if(window.innerWidth <= 1023) return;

        let controller = new ScrollMagic.Controller();
        let sequence = new Sequence('.js-fscreen__canvas', settings);

        let block = document.querySelector('.js-fscreen'),
            container = block.querySelector('.js-fscreen__scrollContainer'),
            canvas = block.querySelector('.js-fscreen__canvas');

        let appHeight = window.innerHeight;

        canvas.style.top = `200px`;

        new ScrollMagic.Scene({
            triggerElement: block,
            offset: appHeight,
            duration: appHeight/2,
            triggerHook: 1
        })
        .addIndicators({
            colorTrigger: "blue",
            colorStart: "blue",
            colorEnd: "blue",
            indent: 10
        })
        .on('progress', function (event) {
            container.style.top = `${Math.floor(300 * event.progress)}px`;
            canvas.style.top = `${Math.floor(200 - 200 * event.progress)}px`;
        })
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: block,
            offset: appHeight,
            duration: appHeight * 4,
            triggerHook: 1
        })
        // .addIndicators({
        //     colorTrigger: "blue",
        //     colorStart: "blue",
        //     colorEnd: "blue",
        //     indent: 10
        // })
        .on('progress', function (event) {
            let newFrame = Math.floor(sequence.settings.totalFrameCount * event.progress);
			if(newFrame == sequence.settings.currentFrame || newFrame < 1) return;
			sequence.settings.currentFrame = newFrame;
			sequence.render();
        })
        .on('end', function (event) {
			if(event.state == 'DURING') {
                canvas.style.position = 'fixed';
				canvas.style.top = '';
            }
			if(event.state == 'AFTER') {
                canvas.style.position = 'absolute';
				canvas.style.top = `${appHeight * 4}px`;
			}
		})
        .addTo(controller);
    } catch (error) {
        console.log(error);
    }
}
