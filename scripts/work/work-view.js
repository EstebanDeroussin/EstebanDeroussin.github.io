// Ajout de l'horloge 
const horloge = document.getElementById('horloge');
setInterval(() => {
    horloge.textContent = heure_horloge.toString();
}, 1000);


// Ajout du calendrier
const calendrier = document.getElementById('calendrier');
calendrier.textContent = localDate.toString();


// Ajout de l'animation du rectangle
inView('.rectangle').on('enter', function(c){
    c.classList.add('active');
});
// Ajout d'une pause de 600ms (durée de l'animation du rectangle) avant d'ajouter les lignes

// Ajout des lignes dynamiques
const lignes = new AnimateItems('.lignes');

// Ajout d'une pause supplémentaire de 250ms (850ms - 600ms) avant d'ajouter les textes
// const texts = new AnimateParagraphe('.fade-in');
const texts = new AnimateItems('.fade-in');

// Ajout des animations de textes
const texts2 = new AnimateItems('.opacity');
document.body.style.overflow = 'auto';


// Ajout de l'effet parallax sur les images portant la classe parallax
const paralax = document.getElementsByClassName('parallax');
new simpleParallax(paralax, {
    scale: 1.5
});
// Surveille les changements de style sur le corps de la page
const observer = new MutationObserver((mutationsList) => {
    // Parcourt chaque mutation
    for (let mutation of mutationsList) {
        // Vérifie si la propriété 'overflow-x' a été modifiée
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const newValue = body.style.overflowX;
            // Si la valeur est différente de 'hidden', réapplique 'hidden'
            if (newValue !== 'hidden') {
                body.style.overflowX = 'hidden';
            }
        }
    }
});

// Ajout du Slider (Meg Tech)
const meg_techslider = new Slider('meg_tech', '.slider img', '#meg_tech .slider-puces li');
meg_techslider.init();