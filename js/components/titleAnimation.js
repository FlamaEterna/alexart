function splitChars(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const text = el.textContent.trim();
    el.textContent = '';
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--char-index', i);
        el.appendChild(span);
    });
}

function initTitleAnimations() {
    splitChars('.music-container .section-header h2');
    splitChars('.tattoo-container .section-header h2');
    splitChars('.contact-container .section-header h2');
}

export { initTitleAnimations };
