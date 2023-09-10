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

class MenuDeroulant {
    constructor(source_icon, source_liens) {
        this.icon = document.querySelector(source_icon);
        this.liens = document.querySelectorAll(source_liens);
        this.isClicked = false;

        this.icon.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.isClicked) {
                this.icon.classList.add('is-opened');
                this.liens.style.display = 'block';
                this.isClicked = false;
            } else {
                this.icon.classList.remove('is-opened');
                this.liens.style.display = 'none';
                this.isClicked = true;
            }
        });

        this.liens.forEach(lien => {
            lien.addEventListener('mouseover', () => {
                this.liens.style.display = 'block';
            });

            lien.addEventListener('mouseout', () => {
                this.liens.style.display = 'none';
            });

            lien.addEventListener('click', () => {
                this.liens.style.display = 'none';
            });
        });
    }
}

function ProtectionData(source){
    document.querySelectorAll(source).forEach(element => {
        element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    let liens = document.querySelectorAll('.sous-menu li a');
    let menu = document.querySelector('.sous-menu');
    let icon = document.querySelector('.menu-icon');
    let entete = document.querySelector('.entete');
    let isClicked = false;

    icon.addEventListener('click', (e) => {
        e.preventDefault();
        if (isClicked) {
            icon.classList.add('is-opened');
            menu.classList.add('visible');
            entete.classList.add('not-focused');
            isClicked = false;
        } else {
            icon.classList.remove('is-opened');
            menu.classList.remove('visible');
            entete.classList.remove('not-focused');
            isClicked = true;
        }
    });

    liens.forEach(lien => {
        lien.addEventListener('click', () => {
            icon.classList.remove('is-opened');
            entete.classList.remove('not-focused');
            menu.classList.remove('visible');
            isClicked = false;
        });
    });

    ProtectionData('img');
    ProtectionData('video');

    let slider_principal = new BigSlider('.Slides img', '.btn','.navigation button', '.navigation p');
});