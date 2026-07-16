function initCustomCursor() {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = document.querySelectorAll(
        'a, button, .btn, .filter-btn, .portfolio-item, .video-card, ' +
        '.footer-socials a, .hamburger-btn, .close-btn, .faq-question, ' +
        '.testimonial-dot, .whatsapp-float'
    );

    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('hover');
            isHovering = true;
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('hover');
            isHovering = false;
        });
    });

    document.addEventListener('mousedown', () => ring.classList.add('click'));
    document.addEventListener('mouseup', () => ring.classList.remove('click'));
}

export { initCustomCursor };
