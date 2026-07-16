import { listaVideos } from './youtubeData.js';

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';

    card.innerHTML = `
        <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="video-info">
            <h3 id="title-${video.id}">Cargando título...</h3>
            <p>${video.desc}</p>
        </div>
    `;

    return card;
}

function fetchVideoTitle(videoId) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    return fetch(url)
        .then(response => response.json())
        .then(data => data.title)
        .catch(error => {
            console.error("Error al recuperar el título de YouTube:", error);
            return null;
        });
}

function loadYoutubeVideos() {
    const musicGrid = document.getElementById('youtube-music-grid');
    const skeletonGrid = document.getElementById('skeleton-grid');
    if (!musicGrid) return;

    let loadedCount = 0;
    const totalVideos = listaVideos.length;

    function checkAllLoaded() {
        loadedCount++;
        if (loadedCount === totalVideos && skeletonGrid) {
            skeletonGrid.style.display = 'none';
            musicGrid.style.display = 'grid';
        }
    }

    listaVideos.forEach(video => {
        const card = createVideoCard(video);
        musicGrid.appendChild(card);

        fetchVideoTitle(video.id).then(title => {
            const titleElement = document.getElementById(`title-${video.id}`);
            if (titleElement) {
                titleElement.textContent = title || "Alexart Track";
            }
            checkAllLoaded();
        }).catch(() => {
            checkAllLoaded();
        });
    });

    setTimeout(() => {
        if (skeletonGrid && skeletonGrid.style.display !== 'none') {
            skeletonGrid.style.display = 'none';
            musicGrid.style.display = 'grid';
        }
    }, 8000);
}

export { loadYoutubeVideos };
