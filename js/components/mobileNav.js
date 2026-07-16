function initMobileNav() {
    const hamburger = document.querySelector('.hamburger-btn');
    const overlay = document.querySelector('.mobile-overlay');

    if (!hamburger || !overlay) return;

    const overlayLinks = overlay.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        overlay.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    });

    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            hamburger.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
}

export { initMobileNav };
