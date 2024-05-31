import {videoPopup} from "../components/organisms/videoPopup/videoPopup.js";

import SmoothScroll from "../../node_modules/smoothscroll-for-websites/SmoothScroll.js";
import { Sequence } from "../components/organisms/fscreen/fscreen.js";

import ScrollMagic from "../../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js";
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';

document.addEventListener("DOMContentLoaded", function () {
	// Глобальный объект для доступа к функциям извне
	window.umGlobal = window.umGlobal || {};

	// Плавный скролл страницы
	SmoothScroll({ stepSize: 150 });

	videoPopup();

	// umGlobal.scrollTrigger('.js-scrollContainer__figures', {rootMargin: `-${window.innerHeight/2}px`});	

	try {
		(function() {
			// return;
			if(window.innerWidth <= 1023) return;
		
			let controller = new ScrollMagic.Controller();

			let scrollContainer = document.querySelector('.js-scrollContainer'),
				directions = scrollContainer.querySelectorAll('.js-scrollContainer__direction'),
				figures = scrollContainer.querySelectorAll('.js-scrollContainer__figures'),
				stepNumbers = scrollContainer.querySelectorAll('.js-scrollContainer__steps'),
				canvas = scrollContainer.querySelector('.js-scrollContainer__canvas');

			let sequence = new Sequence('.js-scrollContainer__canvas', {
				frameRate: 30,
				totalFrameCount: 636,
				sequenceFolder: '/files/sequences/main/',
				firstPlay: {
					startFrame: 1,
					endFrame: 100
				}
			});

			let appHeight = window.innerHeight,
				durationScrollForScreen = appHeight * 3,
				durationScrollBetweenScreen = appHeight * 3;

			let triggers = {
				first: {
					offset: directions[0].getBoundingClientRect().top + window.pageYOffset,
					duration: durationScrollForScreen,
				},
				second: {},
				third: {},
			}
			triggers.second = {
				offset: directions[1].getBoundingClientRect().top + window.pageYOffset,
				duration: durationScrollForScreen,
			};
			triggers.third = {
				offset: directions[2].getBoundingClientRect().top + window.pageYOffset,
				duration: durationScrollForScreen,
			};

			function toggleFixedScreen(el, status = true) {
				el.style.position = status ? 'fixed' : 'relative';
				el.style.top = status ? '0' : '';
				el.style.left = status ? '0' : '';
				el.style.width = status ? '100%' : '';
			}

			// Before start first screen
			new ScrollMagic.Scene({
				triggerElement: scrollContainer,
				offset: 0,
				duration: triggers.first.offset,
				triggerHook: 0
			})
			// .addIndicators({
			// 	colorTrigger: "blue",
			// 	colorStart: "blue",
			// 	colorEnd: "blue",
			// 	indent: 10
			// })
			.on('progress', function (event) {
				stepNumbers[0].style.transform = `translateY(-${300 - 300*event.progress}px)`;
				canvas.style.top = `${280 - (280 * event.progress)}px`
			})
			.addTo(controller);

			// Before first screen for transition
			// directions[0].style.transform = `translateY(-100px)`;
			// new ScrollMagic.Scene({
			// 	triggerElement: scrollContainer,
			// 	offset: triggers.first.offset - 100,
			// 	duration: 100,
			// 	triggerHook: 0
			// })
			// // .addIndicators({
			// // 	colorTrigger: "black",
			// // 	colorStart: "black",
			// // 	colorEnd: "black",
			// // 	indent: 10
			// // })
			// .on('progress', function(event) {
			// 	directions[0].style.transform = `translateY(-${100 - 100 * (event.progress*event.progress)}px)`
			// })
			// .addTo(controller);

			// First screen
			new ScrollMagic.Scene({
				triggerElement: scrollContainer,
				offset: triggers.first.offset,
				duration: triggers.first.duration,
				triggerHook: 0
			})
			// .addIndicators({
			// 	colorTrigger: "red",
			// 	colorStart: "red",
			// 	colorEnd: "red",
			// 	indent: 10
			// })
			.on('start', function (event) {
				if(event.state == 'DURING') toggleFixedScreen(directions[0]);
				if(event.state == 'BEFORE') toggleFixedScreen(directions[0], false);
			})
			.on('end', function (event) {
				if(event.state == 'DURING') toggleFixedScreen(directions[0]);
				if(event.state == 'AFTER') {
					toggleFixedScreen(directions[0], false);
					directions[0].style.top = `${triggers.first.duration}px`;
				}
			})
			.on('progress', function(event) {
				if(event.progress > .5) figures[0].style.opacity = 1;
				else figures[0].style.opacity = 0;

				// Проигрываем переход между 1 и 2 позицией модели
				let newFrame = 100 + Math.floor(50 * event.progress);
				if(newFrame == sequence.settings.currentFrame) return;
				sequence.settings.currentFrame = newFrame;
				sequence.render();
			})
			.addTo(controller);

			// After first screen for transition
			// new ScrollMagic.Scene({
			// 	triggerElement: scrollContainer,
			// 	offset: triggers.first.offset + triggers.first.duration,
			// 	duration: 100,
			// 	triggerHook: 0
			// })
			// // .addIndicators({
			// // 	colorTrigger: "black",
			// // 	colorStart: "black",
			// // 	colorEnd: "black",
			// // 	indent: 10
			// // })
			// .on('progress', function(event) {
			// 	directions[0].style.transform = `translateY(${100 * (event.progress*event.progress)}px)`
			// })
			// .addTo(controller);

			// Between first and second screen
			new ScrollMagic.Scene({
				triggerElement: scrollContainer,
				offset: triggers.first.offset + triggers.first.duration,
				duration: durationScrollBetweenScreen,
				triggerHook: 0
			})
			// .addIndicators({
			// 	colorTrigger: "black",
			// 	colorStart: "black",
			// 	colorEnd: "black",
			// 	indent: 10
			// })
			.on('progress', function(event) {
				// Скрываем цифры этапов
				if(event.progress > 0) stepNumbers[0].style.opacity = 0;
				else stepNumbers[0].style.opacity = 1;

				// Скрываем цифры 
				if(event.progress > .2) figures[0].style.opacity = 0;
				else figures[0].style.opacity = 1;

				// Проигрываем переход между 1 и 2 позицией модели
				let newFrame = 150 + Math.floor(215 * event.progress);
				if(newFrame == sequence.settings.currentFrame) return;
				sequence.settings.currentFrame = newFrame;
				sequence.render();
			})
			.addTo(controller);
			
			// Before second screen for transition
			// directions[1].style.transform = `translateY(-100px)`;
			// new ScrollMagic.Scene({
			// 	triggerElement: scrollContainer,
			// 	offset: triggers.second.offset - 100,
			// 	duration: 100,
			// 	triggerHook: 0
			// })
			// .addIndicators({
			// 	colorTrigger: "black",
			// 	colorStart: "black",
			// 	colorEnd: "black",
			// 	indent: 10
			// })
			// .on('progress', function(event) {
			// 	directions[1].style.transform = `translateY(-${100 - 100 * (event.progress*event.progress)}px)`
			// })
			// .addTo(controller);

			// Second screen
			new ScrollMagic.Scene({
				triggerElement: scrollContainer,
				offset: triggers.second.offset,
				duration: triggers.second.duration,
				triggerHook: 0
			})
			// .addIndicators({
			// 	colorTrigger: "blue",
			// 	colorStart: "blue",
			// 	colorEnd: "blue",
			// 	indent: 10
			// })
			.on('start', function (event) {
				if(event.state == 'DURING') toggleFixedScreen(directions[1]);
				if(event.state == 'BEFORE') toggleFixedScreen(directions[1], false);
			})
			.on('end', function (event) {
				if(event.state == 'DURING') toggleFixedScreen(directions[1]);
				if(event.state == 'AFTER') {
					toggleFixedScreen(directions[1], false);
					directions[1].style.top = `${triggers.first.duration}px`;
				}
			})
			.on('progress', function(event) {
				if(event.progress > .5) figures[1].style.opacity = 1;
				else figures[1].style.opacity = 0;

				if(event.progress > .2) stepNumbers[1].style.opacity = 1;
				else stepNumbers[1].style.opacity = 0;

				// проигрываем модель на этапе
				let newFrame = 365 + Math.floor(50 * event.progress);
				if(newFrame == sequence.settings.currentFrame) return;
				sequence.settings.currentFrame = newFrame;
				sequence.render();
			})
			.addTo(controller);

			// After second screen for transition
			// new ScrollMagic.Scene({
			// 	triggerElement: scrollContainer,
			// 	offset: triggers.second.offset + triggers.second.duration,
			// 	duration: 100,
			// 	triggerHook: 0
			// })
			// // .addIndicators({
			// // 	colorTrigger: "black",
			// // 	colorStart: "black",
			// // 	colorEnd: "black",
			// // 	indent: 10
			// // })
			// .on('progress', function(event) {
			// 	directions[1].style.transform = `translateY(${100 * (event.progress*event.progress)}px)`
			// })
			// .addTo(controller);

			// Between second and third screen
			new ScrollMagic.Scene({
				triggerElement: scrollContainer,
				offset: triggers.second.offset + triggers.second.duration,
				duration: durationScrollBetweenScreen,
				triggerHook: 0
			})
			// .addIndicators({
			// 	colorTrigger: "black",
			// 	colorStart: "black",
			// 	colorEnd: "black",
			// 	indent: 10
			// })
			.on('progress', function(event) {
				// Скрываем цифры этапов
				if(event.progress > 0) stepNumbers[1].style.opacity = 0;
				else stepNumbers[1].style.opacity = 1;

				// Скрываем цифры 
				if(event.progress > .2) figures[1].style.opacity = 0;
				else figures[1].style.opacity = 1;

				// Проигрываем переход между 2 и 3 позицией модели
				let newFrame = 415 + Math.floor(120 * event.progress);
				if(newFrame == sequence.settings.currentFrame) return;
				sequence.settings.currentFrame = newFrame;
				sequence.render();
			})
			.addTo(controller);

			// Before second screen for transition
			// directions[2].style.transform = `translateY(-100px)`;
			// new ScrollMagic.Scene({
			// 	triggerElement: scrollContainer,
			// 	offset: triggers.third.offset - 100,
			// 	duration: 100,
			// 	triggerHook: 0
			// })
			// .addIndicators({
			// 	colorTrigger: "black",
			// 	colorStart: "black",
			// 	colorEnd: "black",
			// 	indent: 10
			// })
			// .on('progress', function(event) {
			// 	directions[2].style.transform = `translateY(-${100 - 100 * (event.progress*event.progress)}px)`
			// })
			// .addTo(controller);

			// Third screen
			new ScrollMagic.Scene({
				triggerElement: scrollContainer,
				offset: triggers.third.offset,
				duration: triggers.third.duration,
				triggerHook: 0
			})
			// .addIndicators({
			// 	colorTrigger: "green",
			// 	colorStart: "green",
			// 	colorEnd: "green",
			// 	indent: 10
			// })
			.on('start', function (event) {
				if(event.state == 'DURING') toggleFixedScreen(directions[2]);
				if(event.state == 'BEFORE') toggleFixedScreen(directions[2], false);
			})
			.on('end', function (event) {
				if(event.state == 'DURING') toggleFixedScreen(directions[2]);
				if(event.state == 'AFTER') {
					toggleFixedScreen(directions[2], false);
					directions[2].style.top = `${triggers.first.duration}px`;
				}
			})
			.on('progress', function (event) {
				if(event.progress > .5) figures[2].style.opacity = 1;
				else figures[2].style.opacity = 0;

				if(event.progress > .2) stepNumbers[2].style.opacity = 1;
				else stepNumbers[2].style.opacity = 0;

				// Проигрываем модель на 3 этупе
				let newFrame = 535 + Math.floor((sequence.settings.totalFrameCount - 535) * event.progress);
				if(newFrame == sequence.settings.currentFrame) return;
				sequence.settings.currentFrame = newFrame;
				sequence.render();
			})
			.addTo(controller);

			// After third screen for transition
			// new ScrollMagic.Scene({
			// 	triggerElement: scrollContainer,
			// 	offset: triggers.third.offset + triggers.third.duration,
			// 	duration: 100,
			// 	triggerHook: 0
			// })
			// // .addIndicators({
			// // 	colorTrigger: "black",
			// // 	colorStart: "black",
			// // 	colorEnd: "black",
			// // 	indent: 10
			// // })
			// .on('progress', function(event) {
			// 	directions[2].style.transform = `translateY(${100 * (event.progress*event.progress)}px)`
			// })
			// .addTo(controller);

			// After third screen
			new ScrollMagic.Scene({
				triggerElement: scrollContainer,
				offset: triggers.third.offset + triggers.third.duration,
				duration: appHeight/2,
				triggerHook: 0
			})
			.on('progress', function (event) {
				canvas.style.top = `-${(appHeight/1.7) * event.progress}px`;
				canvas.style.opacity = 1 - event.progress;

				// Скрываем цифры этапов
				if(event.progress > 0) stepNumbers[2].style.opacity = 0;
				else stepNumbers[2].style.opacity = 1;

				// Скрываем цифры 
				if(event.progress > .5) figures[2].style.opacity = 0;
				else figures[2].style.opacity = 1;
			})
			.addTo(controller);
		})();
	} catch (error) {
		console.error(error);
	}
});

window.addEventListener('load', function() {
	umGlobal.runScriptOnUserEvent(function() {
		setTimeout(() => {
			globus();
		}, 4000);
	});
});
