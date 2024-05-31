// import SmoothScroll from "../../node_modules/smoothscroll-for-websites/SmoothScroll.js";

import {notify} from '../components/other/notify/notify.js';
import {scrollToTop} from './modules/scrollToTop.js';
import {cookie} from '../components/other/cookie/cookie.js';
import {btnUp} from '../components/other/btnUp/btnUp.js';
import {inputMasks} from './modules/inputMasks.js';
import { togglePopup } from '../components/other/popup/togglePopup.js';
import { urlGenerator } from './modules/urlGenerator.js';
import {runScriptOnUserEvent} from './modules/runScriptOnUserEvent.js';
import {initContainerLink} from './modules/initContainerLink.js';
import {setAppHeight} from './modules/setAppHeight.js';
import {lightgallery} from './modules/lightgallery.js';

// Скрипты компонентов
import {showFieldError} from '../components/fields/showFieldError.js';
import {toggleLabelPosition} from '../components/fields/toggleLabelPosition.js';
import {searchField} from '../components/fields/search/searchField.js';
import {video} from '../components/other/video/video.js';

import {header} from '../components/organisms/header/header.js';
import {citySelect} from '../components/other/citySelect/citySelect.js';
import {file} from "../components/fields/file/file.js";
import { scrollTrigger } from './modules/scrollTrigger.js';
import {preloader} from "../components/other/preloader/preloader.js";
import { lazyLoad } from './modules/lazyLoad.js';
import {cardsSlider} from "../components/organisms/cardsSlider/cardsSlider.js";
import {select} from "../components/organisms/select/select.js";
import {dropdown} from "../components/other/dropdown/dropdown.js";

document.addEventListener("DOMContentLoaded", function () {
    // Глобальный объект для доступа к функциям извне
	window.umGlobal = window.umGlobal || {};

    // Блок уведомлений
    umGlobal.showNotify = notify();

    // Скролл к элементу
	umGlobal.scrollToTop = scrollToTop;

    // Плашка принятия куки
	cookie();


    // Кнопка "Наверх"
	btnUp();

    // Инициализация масок
	umGlobal.inputMasks = inputMasks;
	inputMasks();

	// Галерея
	umGlobal.initLightgallery = lightgallery;
	lightgallery();

	//thumbSlider();

	// Попапы
	umGlobal.togglePopup = togglePopup();

	// Управление параметрами в урле
	umGlobal.urlGenerator = urlGenerator;

	// Вызов колбэк функции при любом пользовательском действии
	// Полезно для отложки счетчиков
	umGlobal.runScriptOnUserEvent = runScriptOnUserEvent

	// Ссылка с вложенными интерактивными элементами
	initContainerLink();

	setAppHeight();

	file();

	// Плавный скролл страницы
	// SmoothScroll({ stepSize: 10 });

	// Компоненты
	{
		// Функция для вывода ошибок поля 
		umGlobal.showFieldError = showFieldError;

		// Функция для вывода ошибок поля 
		umGlobal.toggleLabelPosition = toggleLabelPosition;
		toggleLabelPosition();

		// Поле поиска
		searchField();

		// Видео
		video();

		scrollTrigger();
		umGlobal.scrollTrigger = scrollTrigger;

		// Скрипты шапки
		header();

		// Дропдаун
		umGlobal.initDropdown = dropdown;
		dropdown();

		citySelect();

		cardsSlider();

		select();

		dropdown();

	}
});

window.addEventListener('load', function() {
	// Прелоадер
	preloader();

	// Lazy load для src
	umGlobal.runScriptOnUserEvent(lazyLoad);
});
