class simpleSlider {
    constructor(sources) {
        // On déclare les variables de traitements
        this.currentIndex = 0;
        this.interval = null;

        // On stocke les données
        this.sources = sources;
        if(typeof sources === 'string')
            this.slides = document.querySelectorAll(sources);
        else if(sources instanceof HTMLElement) 
            this.slides = sources;
        else
            this.slides = [];

        console.log(this.slides);
    }

    init() {
        inView(this.sources)
            .on('enter', () => { this.startInterval(); })
            .on('exit', () => { this.stopInterval(); });
    }

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

    setFocus(index) {
        this.currentIndex = index;
        this.changeImage(index);
    }
    changeImage(index) {
        this.slides.forEach((slide) => {
            slide.style.display = 'none';
        });

        this.slides[index].style.display = 'block';
    }
    autoScrollFocus() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.changeImage(this.currentIndex);
    }
}

class puceSlider extends simpleSlider {
    constructor(sources, sources_puce) {
        super(sources);
        this.puces = document.querySelectorAll(sources_puce);
    }

    init() {
        super.init();
        this.setPuce(this.currentIndex);
    }

    setFocus(index) {
        super.setFocus(index);
        this.setPuce(index);
    }
    setPuce(index) {
        this.puces.forEach((puce) => {
            puce.classList.remove('active');
        });

        this.puces[index].classList.add('active');
    }
}
class scrollSlider extends puceSlider {
    constructor(sources, sources_puce) {
        super(sources, sources_puce);
        this.lastScrollTime = 0;
    }

    init() {
        inView(this.sources)
            .on('enter', () => { 
                this.startInterval(); 
                this.updateVisibleSlideIndex(); 
                this.setFocus(this.currentIndex);

            }).on('exit', () => { 
                this.stopInterval(); 
            });
        // window.addEventListener('wheel', (e) => this.onScroll(e));
    }

    changeImage(index) {
        const selectedSlide = this.slides[index];
        if (selectedSlide) {
            selectedSlide.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Selected slide not found');
        }
    }
    updateVisibleSlideIndex() {
        // On récupère la largeur de l'écran
        const screenWidth = window.innerWidth;

        // On cherche quel item est dans la vue
        let i = 0, isFind = false;
        while(!isFind && i < this.slides.length) {
            // On récupère les coordonnées de l'item
            const rect = this.slides[i].getBoundingClientRect();
            // On calcule        
            if (rect.left >= screenWidth / 3) {
                console.log('L\'item visible est le numéro : ' + i);
                this.currentIndex = i;
                isFind = true;
            }
            i++;
        }
    }
    onScroll(e) {
        // On limite le nombre de modifications
        const now = Date.now();
        if (this.lastScrollTime !== null && now - this.lastScrollTime < 1000) 
            return;
        this.lastScrollTime = now;
    
        // On analyse le type de scroll
        if (e.deltaX > 0) 
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    
        else if (e.deltaX < 0) 
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        else return;
    
        // On modifie l'index et on met à jour l'image
        this.setFocus(this.currentIndex);
        this.resetInterval();
    }
}
