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

document.addEventListener('DOMContentLoaded', function () {
    let illustration_titre = new Titre('.titre img');

    let explication = new apparition(".explication");
    let creation_video  = new apparition(".creation");
    let creation_images = new apparition(".images");

    let creation_1 = new apparition(".slider1");
    let creation_2 = new apparition(".slider2");
    let creation_3 = new apparition(".slider3");
    let creation_4 = new apparition(".slider4");
    let creation_5 = new apparition(".slider5");
    let creation_6 = new apparition(".slider6");
    let creation_7 = new apparition(".slider7");

    let Slider1 = new Slider('.slider1 img');
    let Slider2 = new Slider('.slider2 img');
    let Slider3 = new Slider('.slider3 img');
    let Slider4 = new Slider('.slider4 img');
    let Slider5 = new Slider('.slider5 img');
    let Slider6 = new Slider('.slider6 img');
    let Slider7 = new Slider('.slider7 img');
});