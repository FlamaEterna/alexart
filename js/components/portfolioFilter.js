function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetFilter = button.getAttribute('data-target');

            portfolioItems.forEach(item => {
                if (targetFilter === 'all') {
                    item.classList.remove('hide');
                } else {
                    item.classList.toggle('hide', !item.classList.contains(targetFilter));
                }
            });

            window.dispatchEvent(new CustomEvent('filterChanged'));
        });
    });
}

export { initPortfolioFilter };
