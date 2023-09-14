function ProtectionData(source){
    document.querySelectorAll(source).forEach(element => {
        element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    ProtectionData('img');
    ProtectionData('video');

    let slider_principal = new BigSlider('.Slides img', '.btn','.navigation button', '.navigation p');

    let menu_nav = new menu('.sous-menu', '.menu-icon', '.sous-menu a', '.entete');
    menu_nav.init();

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