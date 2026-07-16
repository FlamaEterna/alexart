function initFormHandler() {
    const formulario = document.querySelector('.booking-form');
    if (!formulario) return;

    let seEstaEnviando = false;

    formulario.addEventListener('submit', () => {
        seEstaEnviando = true;
    });

    window.addEventListener('beforeunload', (event) => {
        if (seEstaEnviando) return;

        const nameInput = document.getElementById('name')?.value.trim();
        const emailInput = document.getElementById('email')?.value.trim();
        const descriptionInput = document.getElementById('description')?.value.trim();

        if (nameInput || emailInput || descriptionInput) {
            event.preventDefault();
            event.returnValue = '¿Seguro que quieres salir? Los datos ingresados se perderán.';
            return '¿Seguro que quieres salir? Los datos ingresados se perderán.';
        }
    });
}

function resetFormOnPageShow() {
    window.addEventListener('pageshow', () => {
        const formulario = document.querySelector('.booking-form');
        if (formulario) {
            formulario.reset();
        }
    });
}

export { initFormHandler, resetFormOnPageShow };
