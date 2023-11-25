class Accueil{
    constructor(boutons, images, texteBoutons, imatextesges){
        this.buttons = document.querySelectorAll(boutons);
        this.images = document.querySelectorAll(images);
        this.texteButtons = document.querySelectorAll(texteBoutons);
        this.texts = document.querySelectorAll(imatextesges);
        this.currentIndex = 0;
        this.interval = null;
    }

    init(){
        this.setFocus(this.currentIndex);

        this.buttons.forEach((b, i) => {
            b.addEventListener('click', () => {
                this.setFocus(i);
                this.currentIndex = i;
                this.resetInterval();
            });
        });
    }

    setImage(index){
        this.images.forEach((i) => {
            i.style.display = 'none';
        });

        this.images[index].style.display = 'block';
    }

    setButton(index) {
        this.texteButtons.forEach((c) => {
            c.classList.remove('focused');
        });

        this.texteButtons[index].classList.add('focused');
    }

    setText(index) {
        this.texts.forEach((p) => {
            p.classList.remove('focused');
        });

        this.texts[index].classList.add('focused');
    }

    setDiv(index){
        this.buttons.forEach((c) => {
            c.classList.remove('focused');
            c.classList.remove('border');
        });

        if(index > 0){
            this.buttons[index - 1].classList.add('border');
        }
        this.buttons[index].classList.add('focused');
    }


    setFocus(index) {
        this.setImage(index);
        this.setButton(index);
        this.setText(index);
        this.setDiv(index);
    }

    autoScrollFocus() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.setFocus(this.currentIndex);

        let scrollPosition = this.images[this.currentIndex].offsetLeft;

        document.querySelector('.Slider').scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    startInterval() {
        this.interval = setInterval(() => {
            this.autoScrollFocus();
        }, 10000);
    }

    resetInterval() {
        clearInterval(this.interval);
        this.startInterval();
    }
}

/**
 * @brief Class représentant un slider avec images
 */
class Slider {
    constructor(sources) {
        this.slides = document.querySelectorAll(sources);
        this.currentIndex = 0;
    }

    init(){
        setInterval(() => {
            this.autoScrollFocus();
        }, 6000);
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

class menuDéroulant{
    constructor(menu, icon, liens, entete){
        this.menu = document.querySelector(menu);
        this.icon = document.querySelector(icon);
        this.liens = document.querySelectorAll(liens);
        this.entete = document.querySelector(entete);
        this.isClicked = false;
    };
    
    onShow(){
        this.menu.classList.add('visible');
        this.icon.classList.add('is-opened');
        this.entete.classList.add('not-focused');
        this.isClicked = false;
    }

    onHide(){
        this.menu.classList.remove('visible');
        this.icon.classList.remove('is-opened');
        this.entete.classList.remove('not-focused');
        this.isClicked = true;
    }

    onClick(){
        if(this.isClicked){
            this.onShow();
        } else {
            this.onHide();
        }
    }

    onSelectionne(objet){
        this.onHide();
        objet.scrollIntoView();   
    }

    init(){
        this.icon.addEventListener('click', () => {
            this.onClick();
        });

        const sections = document.querySelectorAll('section');
        this.liens.forEach((c) => {
            sections.forEach(c => { c.style.scrollSnapAlign = "none"; });
            c.addEventListener('click', () => {
                this.onSelectionne(c);
            });
            setTimeout(() => {
                sections.forEach(c => { c.style.scrollSnapAlign = "start"; });
            }, 500);
        });
    }
}