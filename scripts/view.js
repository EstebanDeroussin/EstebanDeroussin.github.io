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
setTimeout(() => {
    // Ajout des lignes dynamiques
    // const lignes = new AnimateLignes('.lignes');
    const lignes = new AnimateItems('.lignes');
}, 600);
// Ajout d'une pause supplémentaire de 250ms (850ms - 600ms) avant d'ajouter les textes
setTimeout(() => {
    // const texts = new AnimateParagraphe('.fade-in');
    const texts = new AnimateItems('.fade-in');
}, 600 + 850);
setTimeout(() => {
    // const texts = new AnimateParagraphe('.opacity');
    const texts = new AnimateItems('.opacity');
    document.body.style.overflow = 'auto';
}, 600 + 850 + 600);



// Ajout de l'effet parallax sur les images portant la classe parallax
const paralax = document.getElementsByClassName('parallax');
new simpleParallax(paralax, {
    scale: 1.225
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

// Définit les options pour l'observateur
const observerOptions = { attributes: true };
// Commence à observer les changements de style sur le corps de la page
observer.observe(body, observerOptions);


// Gestion de la preview
const learnLink = document.getElementById('learn-link');
const preview = document.getElementById('preview');
const projets = preview.querySelectorAll('main .projet');
const intitule = preview.querySelectorAll('.projet-liste ul li');

// Initialisation du contrôleur ScrollMagic
var controller = new ScrollMagic.Controller();

// Création d'une scène pour la section #preview
var scene = new ScrollMagic.Scene({
    triggerElement: "#preview", // Élément déclencheur
    triggerHook: 0, // Déclenchement lorsque le haut de l'élément atteint le haut de la fenêtre
    offset: -68, // Ajustez cette valeur à la hauteur de votre barre de navigation
    duration: '35%' // Durée pendant laquelle l'élément reste épinglé (peut être ajustée)
})
.setPin("#preview") // Fixe l'élément #preview en place
.addTo(controller); // Ajoute la scène au contrôleur

const observerProjets = new IntersectionObserver((entries) => {
    isFirstVisible = false;
    isLastVisible = false;
    entries.forEach(entry => {
        // On retire la classe 'active' de tous les éléments sauf celui correspondant à l'entrée actuelle
        intitule.forEach(item => {
            if (item !== intitule[Array.from(projets).indexOf(entry.target)]) {
                item.classList.remove('active');
            }
        });

        if (entry.isIntersecting) {
            const index = Array.from(projets).indexOf(entry.target);

            // Mise à jour de la visibilité pour le premier et le dernier projet
            if (index === 0 && entry.isIntersecting) {
                isFirstVisible = true;
            }
            if (index === projets.length - 1 && entry.isIntersecting) {
                isLastVisible = true;
            }

            intitule[index].classList.add('active');
            switch (index) {
                case 0:
                    learnLink.href = "work.html#La-Vuelta";
                    break;
                case 1:
                    learnLink.href = "work.html#Tapis-Roulant";
                    break;
                case 2:
                    learnLink.href = "work.html#Les-Vielles-Charrues";
                    break;
                case 3:
                    learnLink.href = "work.html#Au-dela-de-la-peur";
                    break;
                case 4:
                    learnLink.href = "work.html#Make-technologie";
                    break;
                case 5:
                    learnLink.href = "work.html#Foire-aux-oignons";
                    break;
                case 6:
                    learnLink.href = "work.html#Louis-vuitton";
                    break;
            }
        }
    });
}, {
    root: null, // par défaut, la racine est la fenêtre de visualisation
    rootMargin: '0px',
    threshold: 0.8 // déclenche lorsque 10% de chaque projet est visible
});

projets.forEach(projet => {
    observerProjets.observe(projet);
});

const preview_slider = new scrollSlider('#preview main .projet', '#projet-puce li');
preview_slider.init();