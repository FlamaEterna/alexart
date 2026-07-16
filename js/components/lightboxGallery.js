function initLightboxGallery() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const existingOverlay = document.querySelector('.lightbox-overlay');

    if (portfolioItems.length === 0) return;
    if (existingOverlay) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay modal-overlay';
    overlay.innerHTML = `
        <div class="lightbox-content modal-content" style="padding:0;background:transparent;border:none;box-shadow:none;max-width:800px;">
            <button class="lightbox-close close-btn" id="lightbox-close">&times;</button>
            <div class="lightbox-image-wrapper" style="border-radius:12px;overflow:hidden;border:1px solid rgba(0,210,255,0.2);background:rgba(3,8,15,0.8);">
                <img class="lightbox-image" src="" alt="Imagen ampliada" style="width:100%;display:block;max-height:80vh;object-fit:contain;">
            </div>
            <div class="lightbox-info" style="padding:20px;text-align:center;">
                <span class="lightbox-category" style="color:var(--color-accent);font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;"></span>
                <p class="lightbox-title" style="color:#fff;font-size:1.1rem;font-weight:700;margin-top:5px;"></p>
            </div>
            <button class="lightbox-prev" style="position:absolute;top:50%;left:10px;transform:translateY(-50%);background:rgba(3,8,15,0.7);border:1px solid rgba(255,255,255,0.1);color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.2rem;cursor:pointer;transition:all 0.3s ease;z-index:2;">&#10094;</button>
            <button class="lightbox-next" style="position:absolute;top:50%;right:10px;transform:translateY(-50%);background:rgba(3,8,15,0.7);border:1px solid rgba(255,255,255,0.1);color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.2rem;cursor:pointer;transition:all 0.3s ease;z-index:2;">&#10095;</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const lightboxImg = overlay.querySelector('.lightbox-image');
    const lightboxCat = overlay.querySelector('.lightbox-category');
    const lightboxTitle = overlay.querySelector('.lightbox-title');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');

    let currentIndex = 0;
    let galleryImages = [];

    function collectGallery() {
        galleryImages = [];
        portfolioItems.forEach(item => {
            if (item.classList.contains('hide')) return;
            const overlayEl = item.querySelector('.item-overlay');
            const cat = overlayEl?.querySelector('span')?.textContent || 'Tatuaje';
            const title = overlayEl?.querySelector('p')?.textContent || 'AlexArt Tinta';

            const carousel = item.querySelector('.carousel-wrapper');
            if (carousel) {
                carousel.querySelectorAll('img').forEach(img => {
                    galleryImages.push({ src: img.src, alt: img.alt, cat, title });
                });
            } else {
                const img = item.querySelector('img');
                if (img) {
                    galleryImages.push({ src: img.src, alt: img.alt, cat, title });
                }
            }
        });
    }

    function openLightbox(index) {
        if (galleryImages.length === 0) return;
        currentIndex = index;
        updateLightbox();
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCat.textContent = img.cat;
        lightboxTitle.textContent = img.title;
    }

    function closeLightbox() {
        overlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightbox();
    }

    overlay.querySelector('.lightbox-content').addEventListener('click', (e) => e.stopPropagation());

    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.item-inner')) {
                collectGallery();
                const visibleItems = Array.from(portfolioItems).filter(i => !i.classList.contains('hide'));
                const visibleIndex = visibleItems.indexOf(item);
                let globalIndex = 0;
                for (let i = 0; i < visibleIndex; i++) {
                    const vi = visibleItems[i];
                    const carousel = vi.querySelector('.carousel-wrapper');
                    globalIndex += carousel ? carousel.querySelectorAll('img').length : 1;
                }
                openLightbox(globalIndex);
            }
        });
    });

    window.addEventListener('filterChanged', collectGallery);
}

export { initLightboxGallery };
