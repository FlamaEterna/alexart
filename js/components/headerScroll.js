function initHeaderScroll() {
    const header = document.querySelector('.main-header-nav');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

export { initHeaderScroll };
