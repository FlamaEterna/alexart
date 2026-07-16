function initStickyCta() {
    const cta = document.querySelector('.sticky-cta-mobile');
    if (!cta) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = currentScrollY / docHeight;

        if (scrollPercent > 0.15 && currentScrollY < docHeight - 100) {
            cta.classList.add('visible');
        } else {
            cta.classList.remove('visible');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });
}

export { initStickyCta };
