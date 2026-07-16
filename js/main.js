import { initHeaderScroll } from './components/headerScroll.js';
import { initModal } from './components/modal.js';
import { initPortfolioFilter } from './components/portfolioFilter.js';
import { initFormHandler, resetFormOnPageShow } from './components/formHandler.js';
import { loadYoutubeVideos } from './services/youtubeLoader.js';
import { initTitleAnimations } from './components/titleAnimation.js';
import { initCustomCursor } from './components/customCursor.js';
import { initScrollReveal } from './components/scrollReveal.js';
import { initLightboxGallery } from './components/lightboxGallery.js';
import { initWhatsappFloat } from './components/whatsappFloat.js';
import { initMobileNav } from './components/mobileNav.js';
import { initStickyCta } from './components/stickyCta.js';
import { initFaqAccordion } from './components/faqAccordion.js';
import { initTestimonialsSlider } from './components/testimonialsSlider.js';
import { initStatsCounter } from './components/statsCounter.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initModal();
    initPortfolioFilter();
    initFormHandler();
    loadYoutubeVideos();
    initTitleAnimations();
    initCustomCursor();
    initScrollReveal();
    initLightboxGallery();
    initWhatsappFloat();
    initMobileNav();
    initStickyCta();
    initFaqAccordion();
    initTestimonialsSlider();
    initStatsCounter();
});

resetFormOnPageShow();
