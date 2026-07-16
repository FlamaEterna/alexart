function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'), 10);
                const suffix = target.getAttribute('data-suffix') || '';
                const duration = 2000;
                const startTime = performance.now();

                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(eased * finalValue);

                    target.innerHTML = currentValue + '<span class="stat-suffix">' + suffix + '</span>';

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        target.innerHTML = finalValue + '<span class="stat-suffix">' + suffix + '</span>';
                    }
                }

                requestAnimationFrame(animate);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

export { initStatsCounter };
