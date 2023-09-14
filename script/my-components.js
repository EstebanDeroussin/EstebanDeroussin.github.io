class BigSlider {
    constructor(sources_images, sources_div, sources_buttons, sources_texts) {
        this.slides = document.querySelectorAll(sources_images);
        this.divs = document.querySelectorAll(sources_div);
        this.buttons = document.querySelectorAll(sources_buttons);
        this.texts = document.querySelectorAll(sources_texts);
        this.currentIndex = 0;
        this.interval = null;

        this.setFocus(this.currentIndex);

        this.buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.setFocus(index);
                this.currentIndex = index;

                let scrollPosition = this.slides[this.currentIndex].offsetLeft;

                document.querySelector('.Slides').scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });

                this.resetInterval();
            });
        });

        this.startInterval();
    }

    setImage(index) {
        this.slides.forEach((slide) => {
            slide.style.display = 'none';
        });

        this.slides[index].style.display = 'block';
    }

    setButton(index) {
        this.buttons.forEach((button) => {
            button.classList.remove('focused');
        });

        this.buttons[index].classList.add('focused');
    }

    setText(index) {
        this.texts.forEach((p) => {
            p.classList.remove('focused');
        });

        this.texts[index].classList.add('focused');
    }

    setDiv(index){
        this.divs.forEach((div) => {
            div.classList.remove('focused');
            div.classList.remove('border');
        });

        if(index > 0){
            this.divs[index - 1].classList.add('border');
        }
        this.divs[index].classList.add('focused');
    }

    setFocus(index) {
        this.setImage(index);
        this.setButton(index);
        this.setText(index);
        this.setDiv(index);
    }

    autoScrollFocus() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.setFocus(this.currentIndex);

        let scrollPosition = this.slides[this.currentIndex].offsetLeft;

        document.querySelector('.Slides').scrollTo({
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
class Slider {
    constructor(sources) {
        this.slides = document.querySelectorAll(sources);
        this.currentIndex = 0;

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

        let scrollPosition = this.slides[this.currentIndex].offsetLeft;

        document.querySelector('.Slides').scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}

class Titre {
    constructor(source) {
        this.images = document.querySelectorAll(source);
        this.imageStates = new Array(this.images.length).fill(false);

        this.images.forEach((image, index) => {
            window.addEventListener('scroll', () => {
                let rect = image.getBoundingClientRect();
                let windowHeight = window.innerHeight;

                if (rect.top <= windowHeight * 0.6 && rect.bottom >= 0.4 * windowHeight && !this.imageStates[index]) {
                    image.classList.add('visible');
                    this.imageStates[index] = true;
                } else if ((rect.top > windowHeight * 0.6 || rect.bottom < 0.4 * windowHeight) && this.imageStates[index]) {
                    image.classList.remove('visible');
                    this.imageStates[index] = false;
                }
            });
        });
    }
}


class apparition{
    constructor(source) {
        this.objects = document.querySelectorAll(source);
        this.objetstatus = new Array(this.objects.length).fill(false);

        this.objects.forEach((object, index) => {
            window.addEventListener('scroll', () => {
                let rect = object.getBoundingClientRect();
                let windowHeight = window.innerHeight;

                if(rect.top <= windowHeight * 0.8 && rect.bottom >= 0.2 * windowHeight && !this.objetstatus[index]){
                    object.classList.add('visible');
                    this.objetstatus[index] = true;
                } else if ((rect.top > windowHeight * 0.8 || rect.bottom < 0.2 * windowHeight) && this.objetstatus[index]){
                    object.classList.remove('visible');
                    this.objetstatus[index] = false;
                }
            })
        })
    }
}


class menu{
    constructor(source_menu, source_icon, source_liens, source_entete){
        this.menu = document.querySelector(source_menu);
        this.icon = document.querySelector(source_icon);
        this.liens = document.querySelectorAll(source_liens);
        this.entete = document.querySelector(source_entete);
        this.isClicked = false;
    };

    init(){
        this.icon.addEventListener('click', (e) => {
            e.preventDefault();
            this.onClick();
        });

        this.liens.forEach((element) => {
            element.addEventListener('click', (e) => {
                //e.preventDefault();
                this.onSelectionne(element);
            });
        });
    }

    onClick(){
        if(this.isClicked){
            this.menu.classList.add('visible');
            this.icon.classList.add('is-opened');
            this.entete.classList.add('not-focused');
            this.isClicked = false;
        } else {
            this.menu.classList.remove('visible');
            this.icon.classList.remove('is-opened');
            this.entete.classList.remove('not-focused');
            this.isClicked = true;
        }
    }

    onSelectionne(link){
        this.menu.classList.remove('visible');
        this.icon.classList.remove('is-opened');
        this.entete.classList.remove('not-focused');
        this.isClicked = true;

        /*
        let href = link.getAttribute('href');
        if (href) {
            let targetId = href.substring(1);
            let targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "instant"
                });
            }
        } else {
            console.log("La source du lien est introuvable");
        }
        */
    }
}