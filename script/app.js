document.addEventListener("DOMContentLoaded", function () {
    let bigSlider = new Accueil('.btn', '.Slider img', 'button', '.btn p');
    bigSlider.init();

    let Slider1 = new Slider('.slider1 img');
    let Slider2 = new Slider('.slider2 img');
    let Slider3 = new Slider('.slider3 img');
    let Slider4 = new Slider('.slider4 img');
    let Slider5 = new Slider('.slider5 img');
    let Slider6 = new Slider('.slider6 img');
    let Slider7 = new Slider('.slider7 img');
    Slider1.init();
    Slider2.init();
    Slider3.init();
    Slider4.init();
    Slider5.init();
    Slider6.init();
    Slider7.init();
  
    const options = {
      offset: 10000
    };

    inView('.titre img', options).on('enter', function(c) {
        c.classList.add('inview');
    }).on('exit', function (c) {
        c.classList.remove('inview');
    });

    inView('.explication', options).on('enter', function(c) {
        c.classList.add('inview');
    }).on('exit', function (c) {
        c.classList.remove('inview');
    });

    inView('.images', options).on('enter', function(c) {
        c.classList.add('inview');
    }).on('exit', function(c) {
        c.classList.remove('inview');
    });

    inView('video', options).on('enter', function(c) {
        c.classList.add('inview');
    }).on('exit', function(c) {
        c.classList.remove('inview');
    });

    let menu = new menuDéroulant('.sous-menu', '.menu-icon', '.sous-menu a', 'header');
    menu.init();
});
  