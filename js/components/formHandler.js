function initFormHandler() {
    const formulario = document.querySelector('.booking-form');
    if (!formulario) return;

    const submitBtn = formulario.querySelector('.btn-submit');

    const campos = {
        name: formulario.querySelector('#name'),
        email: formulario.querySelector('#email'),
        size: formulario.querySelector('#size'),
        placement: formulario.querySelector('#placement'),
        reference: formulario.querySelector('#reference-img'),
        referenceUrl: formulario.querySelector('#reference-url'),
        description: formulario.querySelector('#description')
    };

    Object.values(campos).forEach(input => {
        if (!input) return;
        input.addEventListener('blur', () => validarCampo(input));
        input.addEventListener('input', () => {
            if (input.dataset.touched) validarCampo(input);
        });
    });

    function validarCampo(input) {
        input.dataset.touched = 'true';
        const errorEl = input.parentElement.querySelector('.field-error');
        let valido = true;
        let mensaje = '';

        if (input.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!input.value.trim()) {
                mensaje = 'El correo es obligatorio';
                valido = false;
            } else if (!emailRegex.test(input.value.trim())) {
                mensaje = 'Correo electrónico no válido';
                valido = false;
            }
        } else if (input.hasAttribute('required') && !input.value.trim()) {
            mensaje = 'Este campo es obligatorio';
            valido = false;
        }

        input.style.borderColor = valido ? 'rgba(0, 210, 255, 0.15)' : '#ff4444';
        if (errorEl) errorEl.textContent = valido ? '' : mensaje;

        return valido;
    }

    formulario.querySelectorAll('input[required], textarea[required]').forEach(input => {
        const errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.style.cssText = 'color:#ff4444;font-size:0.75rem;margin-top:4px;display:block;';
        input.parentElement.appendChild(errorEl);
    });

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const requiredInputs = formulario.querySelectorAll('input[required], textarea[required]');
        let formValido = true;

        requiredInputs.forEach(input => {
            if (!validarCampo(input)) formValido = false;
        });

        if (!formValido) return;

        const formData = new FormData(formulario);

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const response = await fetch(formulario.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formulario.innerHTML = `
                    <div style="text-align:center;padding:40px 20px;">
                        <div style="font-size:3rem;color:#25d366;margin-bottom:20px;">
                            <i class="fa-solid fa-check-circle"></i>
                        </div>
                        <h3 style="color:var(--color-accent);font-size:1.5rem;margin-bottom:10px;font-weight:900;">
                            ¡Mensaje Enviado!
                        </h3>
                        <p style="color:var(--color-text-secondary);font-size:1rem;line-height:1.6;">
                            Gracias por contactar a AlexArt. Revisaremos tu solicitud y te responderemos a la brevedad.
                        </p>
                        <p style="color:var(--color-text-muted);font-size:0.85rem;margin-top:15px;">
                            También puedes enviar un mensaje directo por WhatsApp para una respuesta más rápida.
                        </p>
                        <a href="https://wa.me/525645993515" target="_blank" class="btn btn-music" style="margin-top:20px;display:inline-block;">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp Directo
                        </a>
                    </div>
                `;
            } else {
                throw new Error('Error al enviar');
            }
        } catch (error) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';

            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);padding:16px;border-radius:8px;margin-top:16px;text-align:center;';
            errorDiv.innerHTML = `
                <p style="color:#ff4444;font-size:0.9rem;font-weight:700;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Error al enviar
                </p>
                <p style="color:var(--color-text-muted);font-size:0.85rem;margin-top:5px;">
                    Hubo un problema. Intenta de nuevo o escríbenos por WhatsApp.
                </p>
            `;
            formulario.appendChild(errorDiv);
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
