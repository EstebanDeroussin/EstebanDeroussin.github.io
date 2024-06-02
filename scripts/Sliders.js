class simpleSlider {
    /// Constructeur de la classe simpleSlider
    constructor(slides, puces) {
        // On récupère les données
        this.loadSlides(slides);
        this.loadPuces(puces);

        this.currentIndex = 0;
        this.interval = null;
    }

    init() {
        inView(this.sources)
            .on('enter', () => { this.startInterval(); })
            .on('exit', () => { this.stopInterval(); });
    }

    /// Méthodes téléchargeant les données dans la classe
    loadSlides(slides) {
        if(slides === null)
            throw new Error('Le paramètre slides ne peut pas être null');
        else if (typeof slides !== 'string') 
            throw new Error('Le paramètre slides doit être de type string');

        this.slides = document.querySelectorAll(slides);
        this.slides_sources = slides;
    }
    loadPuces(puces) {
        if(puces === null)
            throw new Error('Le paramètre puces ne peut pas être null');
        else if (typeof puces !== 'string') 
            throw new Error('Le paramètre puces doit être de type string');

        this.puces = document.querySelectorAll(puces);
        this.puces_sources = puces;    
    }

    /// Méthodes gérant les interval de la classe
    startInterval() {
        if (this.interval) 
            return; 
        
        this.interval = setInterval(() => {
            this.autoScrollFocus();
        }, 4000);
    }
    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    resetInterval() {
        this.stopInterval();
        this.startInterval();
    }

    /// Méthode permettant le scroll automatique du slider
    autoScrollFocus() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.setFocus(this.currentIndex);
    }

    /// Méthodes gérant l'item affiché 
    setFocus(index) {
        this.setImage(index);
        this.setPuces(index);
    }
    setImage(index) {
        this.slides.forEach((slide) => {
            slide.style.display = 'none';
        });

        this.slides[index].style.display = 'block';
    }
    setPuces(index) {
        this.puces.forEach((puce) => {
            puce.classList.remove('active');
        });

        this.puces[index].classList.add('active');
    }
}

class scrollSlider extends simpleSlider {
    init() {
        inView(this.slides_sources, {
            threshold: 0.67,  // Seuil de 67% pour les deux tiers à droite
            offset: {
                right: '0px',  
                left: '33vw',  // Décalage de 33% de la largeur de la fenêtre pour exclure le tiers gauche
                top: '0px',        
                bottom: '0px'     
            }
        }).on('enter', item => { 
            // On récupère l'élément dans la vue
            this.currentIndex = Array.from(this.slides).indexOf(item);

            console.log('L\'item visible est le numéro : ' + this.currentIndex);
            
            // On active le focus et l'auto-focuss
            this.setFocus(this.currentIndex);
            this.startInterval(); 

        }).on('exit', () => { 
            this.stopInterval(); 
        });
    }

    setImage(index) {
        const selectedSlide = this.slides[index];
        if (selectedSlide) {
            selectedSlide.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Selected slide not found');
        }
    }
}