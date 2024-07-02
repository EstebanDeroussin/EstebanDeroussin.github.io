const galerieButton = document.getElementById('galerieButton');
const closeGalerieButton = document.getElementById('closeButton');
const galerie = document.getElementById('galerie');
const body = document.body;

galerieButton.addEventListener('click', () => {
    galerie.style.display = 'block';
    body.style.overflowY = 'hidden';

    setTimeout(() => {
        closeGalerieButton.addEventListener('click', () => {
            galerie.classList.add('disparition');
            setTimeout(() => {
                galerie.style.display = 'none';
                body.style.overflowY = 'auto';
                galerie.classList.remove('disparition');
            }, 800);
        });
    }, 800);
});

window.addEventListener('reload', () => {
    window.location = "index.php";
});
