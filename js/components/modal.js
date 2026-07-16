function initModal() {
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('contact-modal');

    if (!openModalBtn || !closeModalBtn || !modal) return;

    openModalBtn.addEventListener('click', () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
}

export { initModal };
