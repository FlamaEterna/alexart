function initWhatsappFloat() {
    const existing = document.querySelector('.whatsapp-float');
    if (existing) return;

    const whatsappLink = document.createElement('a');
    whatsappLink.className = 'whatsapp-float';
    whatsappLink.href = 'https://wa.me/525645993515?text=Hola%20AlexArt,%20me%20gustaría%20saber%20más%20sobre%20tus%20servicios.';
    whatsappLink.target = '_blank';
    whatsappLink.title = 'WhatsApp';
    whatsappLink.setAttribute('aria-label', 'Contactar por WhatsApp');
    whatsappLink.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';

    document.body.appendChild(whatsappLink);
}

export { initWhatsappFloat };
