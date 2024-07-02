class Slider {
    /// Construteur de la classe
    constructor(parent, slides, puces, intervalDuration=null) {
        // On lance la construction du slider
        this.loadParent(parent);
        this.loadSlides(slides);
        this.loadPuces(puces);

        console.log("Slider construit avec succès !");
        console.log("Liste des images: ");
        console.log(this.slides);
        console.log("Liste des puces");
        console.log(this.puces);

        // On initialise l'index
        this.currentIndex = 0;

        // On paramètre l'interval du slider
        if(typeof intervalDuration === 'integer')
            this.intervalDuration = intervalDuration;
        else 
            this.intervalDuration = 3000;
    }

    init() {
        // On empêche le défilment manuel
        this.parent.style.overflowX = 'hidden';

        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startInterval();
                } else {
                    this.stopInterval();
                }
            });
        }, {
            threshold: 0.1
        });
        this.observer.observe(this.parent);
    }


    // Téléchargement des données //

    /// Méthode télchargeant le parent du slider
    loadParent(parent) {
        if(parent == null)
            throw new Error('Erreur lors de la construction du slider. Impossible de construire un slider sans image !');
        else if(parent instanceof HTMLElement)
            this.parent = parent;
        else if(typeof(parent) === "string")
            this.parent = document.getElementById(parent);
        else 
            throw new Error('Erreur lors de la construction du slider. Type des images non-reconnu lors du téléchargement !');
    }
    /// Méthode téléchargeant les slides dans le slider
    loadSlides(slides) {
        if(slides == null) 
            throw new Error('Erreur lors de la construction du slider. Impossible de construire un slider sans image !');
        else if(slides instanceof NodeList)
            this.slides = slides;
        else if(typeof(slides) === "string")
            this.slides = this.parent.querySelectorAll(slides);
        else 
            throw new Error('Erreur lors de la construction du slider. Type des images non-reconnu lors du téléchargement !');
    }
    /// Méthode téléchargeant les puces dans le slider
    loadPuces(puces) {
        if(puces == null)
            throw new Error('Erreur lors de la construction du slider. Impossible de construire un slider sans puces !');
        else if(puces instanceof NodeList)
            this.puces = puces;
        else if(typeof(puces) === "string")
            this.puces = document.querySelectorAll(puces);
        else 
            throw new Error('Erreur lors de la construction du slider. Type des puces non-reconnu lors du téléchargement !');
    }


    // Gestion du défilement // 

    /// Méthode sélectionnant une puce
    setPuces(index) {
        // On vérifie l'intégrité de l'index
        if(index < 0 || this.puces.length <= index)
            throw new Error("Erreur lors de la sélection d'une puce. L'indice d'une puce ne peut être nul ou dépasser le nombre de puces !");
        
        // On désélectionne l'ancienne puce
        if(index === 0)
            this.puces[this.puces.length - 1].classList.remove('visible');
        else 
            this.puces[index - 1].classList.remove('visible');

        // On sélectionne la nouvelle puce
        this.puces[index].classList.add('visible');
    }
    /// Méthode sélectionnant une image
    setImage(index) {
        // On vérifie l'intégrité de l'index
        if(index < 0 || this.slides.length <= index)
            throw new Error("Erreur lors de la sélection d'une image. L'indice d'une image ne peut être nul ou dépasser le nombre d'images !");

        // On désélectionne l'ancienne image
        if(index === 0)
            this.slides[this.slides.length - 1].classList.remove('visible');
        else 
            this.slides[index - 1].classList.remove('visible');

        // On sélectionne la nouvelle image
        this.slides[index].classList.add('visible');
    }
    /// Méthode sélectionnant une page du slider
    setFocus(index) {
        try {
            this.setPuces(index);
            this.setImage(index);

        } catch(err){
            alert(err.message);
            this.stopInterval();
        }
    }
    /// Méthode faisant défiler automatiquement le slider
    autoScrollFocus() {
        console.log('Index actuel : ' + this.currentIndex);

        // On implémente le compteur
        this.currentIndex++;
        // On fait empèche le dépassement
        this.currentIndex %= this.slides.length;

        console.log('index après implémentation : ' + this.currentIndex);

        // On sélectionnne la nouvelle page
        this.setFocus(this.currentIndex);
    }


    // Gestion de l'automatisation //

    // Méthode initialisant l'autoScrollFocus
    startInterval() {
        if (this.interval) 
            return; 
        
        this.interval = setInterval(() => {
            this.autoScrollFocus();
        }, this.intervalDuration);
    }
    // Méthode arrêtant l'autoScrollFocus
    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    // Méthode relançant l'autoScrollFocus
    resetInterval() {
        console.log("On réinitialise l'interval !");
        
        this.stopInterval();
        console.log("AutoScrollFocus arrêté.");

        this.startInterval();
        console.log("AutoScrollFocus relancé.");
    }
}

class scrollSlider extends Slider {
    init() {
        // On initialise l'index
        this.currentIndex = 0;
        this.setPuces(this.currentIndex);
        // On empêche le défilment manuel
        this.parent.style.overflowX = 'hidden';

        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startInterval();
                } else {
                    this.stopInterval();
                }
            });
        }, {
            threshold: 0.6
        });
        this.observer.observe(this.parent);
    }

    /// Méthode sélectionnant une image
    setImage(index) {
        // On vérifie l'intégrité de l'index
        if(index < 0 || this.slides.length <= index)
            throw new Error("Erreur lors de la sélection d'une image. L'indice d'une image ne peut être nul ou dépasser le nombre d'images !");

        // On fait défiler le slider vers la nouvelle image
        this.slides[index].scrollIntoView({ behavior: 'smooth' }); 
    }
}