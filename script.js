function updateTime() {
    const timeDisplay = document.getElementById('current-time');
    const now = new Date();
    const time = now.toLocaleTimeString();
    timeDisplay.textContent = time;
}

setInterval(updateTime, 1000);
updateTime();

const lenis = new Lenis({
    // Valeur entre 0 et 1
    // Valeur par défaut : 0,1
    // Plus la valeur est faible, plus le scroll sera fluide
    lerp: 0.035, 
    // Valeur par défaut : 1
    // Plus la valeur est haute, plus le défilement sera rapide 
    wheelMultiplier: 1, 
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Menu burger responsive
const menuButton = document.querySelector('.menu-btn');
const overlayMenu = document.querySelector('.overlay-menu');
const closeButton = document.querySelector('.close-btn');

menuButton.addEventListener('click', () => {
    overlayMenu.style.opacity = '0';
    overlayMenu.style.display = 'flex';
    overlayMenu.classList.add('active');
    
    setTimeout(() => {
        overlayMenu.style.opacity = '1';
    }, 200);
});

closeButton.addEventListener('click', () => {
    overlayMenu.style.opacity = '0';
    
    setTimeout(() => {
        overlayMenu.classList.remove('active');
        overlayMenu.style.display = 'none';
    }, 200);
});

// Galerie
const galerieBtn = document.querySelector('.galerie-btn');
const galerieContainer = document.querySelector('.galerie-container');
const closeBtnGalerie = document.querySelector('.close-btn-galerie');

const barreGalerie = document.querySelector('.close-button');
const barreGallerieP = document.querySelector('.close-button p');


function openGalerie() {
    galerieContainer.style.display = 'flex';
    galerieContainer.style.opacity = '0';
    barreGalerie.style.width = '0';
    
    setTimeout(() => {
        galerieContainer.style.opacity = '1';
    }, 300);
    setTimeout(() => {
        barreGalerie.style.width = 'calc(100% - 2rem)';
        barreGalerie.style.transition = 'width 0.6s ease';
    }, 500);
    setTimeout(() => {
        barreGallerieP.style.opacity = '1';
    }, 2000);
}

function closeGalerie() {
    galerieContainer.style.opacity = '0';
    barreGalerie.style.width = '0';
    barreGalerie.style.transition = 'width 0.3s ease';

    setTimeout(() => {
        galerieContainer.style.display = 'none';
    }, 300);
    setTimeout(() => {
        barreGallerieP.style.opacity = '0';
    }, 100);
}

galerieBtn.addEventListener('click', openGalerie);
closeBtnGalerie.addEventListener('click', closeGalerie);


const profilephoto = document.querySelector('.profile-photo');
const paragraph = document.querySelector('.profile-photo p');

let hoverTimeout;
let isHovered = false;

profilephoto.addEventListener('mouseover', () => {
    isHovered = true;
    clearTimeout(hoverTimeout);
    profilephoto.style.width = '100%';
    setTimeout(() => {
        if (isHovered) {
            paragraph.classList.add('active');
        }
    }, 500);
});

profilephoto.addEventListener('mouseout', () => {
    isHovered = false;
    paragraph.classList.remove('active');
    profilephoto.style.width = '25%';
});

const rectangle = document.querySelector('.rectangle');
const heroLogoPlein = document.querySelector('.hero-logo #logo-plein');
const heroLogoVide = document.querySelector('.hero-logo #logo-vide');
const heroContentLeft = document.querySelector('.hero-content-top');

// Définir la largeur initiale à 0
rectangle.style.width = '0rem';

window.addEventListener('load', () => {
    setTimeout(() => {
        rectangle.style.width = '100%';
        rectangle.style.transition = 'width 1s ease';
    }, 1500);
});

heroLogoPlein.style.opacity = '0';
heroLogoVide.style.opacity = '0';

window.addEventListener('load', () => {
    setTimeout(() => {
        heroLogoPlein.style.opacity = '1';
        heroLogoPlein.style.transition = 'opacity 0.8s ease-in-out';
    }, 1000);
    setTimeout(() => {
        heroLogoVide.style.opacity = '1';
        heroLogoVide.style.transition = 'opacity 0.8s ease-in-out';
    }, 1500);
});



const HeroTitle = document.querySelector('.hero-content-top h1');
/**
 * Fonction pour faire apparaître un élément avec un effet de fade et un mouvement du bas vers le haut
 * @param {HTMLElement} element - L'élément à animer
 * @param {number} delay - Le délai avant l'animation (en millisecondes)
 */
function fadeReveal(element, delay) {
    // État initial de l'élément
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    
    // Animation après le délai spécifié
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}
fadeReveal(HeroTitle, 2000);
fadeReveal(heroContentLeft, 2500);

const imageProject1 = document.querySelector('.image-project-1');
const imageProject2 = document.querySelector('.image-project-2');
const imageProject0 = document.querySelector('.image-project-0');
const project1Hover = document.querySelector('.list-wrapper ul li:first-child');
const project2Hover = document.querySelector('.list-wrapper ul li:nth-child(2)');

// Fonction pour vérifier si l'écran est large
function isLargeScreen() {
    return window.innerWidth > 1130;
}

// Fonction pour gérer les événements hover
function handleProjectHover() {
    if (!isLargeScreen()) return;

    project1Hover.addEventListener('mouseover', () => {
        imageProject0.style.display = 'none';
        imageProject1.style.display = 'block';
    });

    project1Hover.addEventListener('mouseout', () => {
        imageProject0.style.display = 'flex';
        imageProject1.style.display = 'none';
    });

    project2Hover.addEventListener('mouseover', () => {
        imageProject0.style.display = 'none';
        imageProject2.style.display = 'block';
    });

    project2Hover.addEventListener('mouseout', () => {
        imageProject0.style.display = 'flex';
        imageProject2.style.display = 'none';
    });
}

// Initialiser les événements hover
handleProjectHover();

// Réinitialiser les événements lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Supprimer les anciens événements
    project1Hover.removeEventListener('mouseover', handleProjectHover);
    project1Hover.removeEventListener('mouseout', handleProjectHover);
    project2Hover.removeEventListener('mouseover', handleProjectHover);
    project2Hover.removeEventListener('mouseout', handleProjectHover);
    
    // Réinitialiser les événements
    handleProjectHover();
});


