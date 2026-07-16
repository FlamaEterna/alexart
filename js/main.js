import { initHeaderScroll } from './components/headerScroll.js';
import { initModal } from './components/modal.js';
import { initPortfolioFilter } from './components/portfolioFilter.js';
import { initFormHandler, resetFormOnPageShow } from './components/formHandler.js';
import { loadYoutubeVideos } from './services/youtubeLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initModal();
    initPortfolioFilter();
    initFormHandler();
    loadYoutubeVideos();
});

resetFormOnPageShow();
