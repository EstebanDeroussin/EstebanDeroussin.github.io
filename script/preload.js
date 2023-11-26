let resourcesToPreload = [
    { type: 'style', url: 'styles/main.css' },
    { type: 'script', url: 'script/myComponents.js' },
    { type: 'script', url: 'script/app.js' },
    { type: 'image', url: 'src/img/Titres/ABOUT_ME_ILLU.png' },
    { type: 'image', url: 'src/img/Titres/Branding.png' },
    { type: 'image', url: 'src/img/Titres/Illustration.png' },
    { type: 'image', url: 'src/img/Titres/Motion.png' },
    { type: 'image', url: 'src/img/Titres/Typographie.png' },
    { type: 'image', url: 'src/img/Titres/UX-UI_DESIGN.png' },
    { type: 'image', url: 'src/img/Typographie/cover-mockup-paysage.jpg' },
    { type: 'image', url: 'src/img/Illustration/Recette.jpg' },
    { type: 'image', url: 'src/img/Branding/Magasin.jpg' },
    { type: 'image', url: 'src/img/UI:UX Design/Free_Iphone_14_Pro_Mockup_4.jpg' }
];

//{ type: 'style', url: 'style/main.css' },

let startTime = Date.now();

function preloadResources() {
    let promises = [];

    resourcesToPreload.forEach(resource => {
        let promise;

        switch (resource.type) {
            case 'style':
                let styleElement = document.createElement('link');
                styleElement.rel = 'stylesheet';
                styleElement.href = resource.url;
                document.head.appendChild(styleElement);
                promise = new Promise(resolve => {
                    styleElement.onload = resolve;
                });
                break;

            case 'script':
                let scriptElement = document.createElement('script');
                scriptElement.type = 'text/javascript';
                scriptElement.src = resource.url;
                document.head.appendChild(scriptElement);
                promise = new Promise(resolve => {
                    scriptElement.onload = resolve;
                });
                break;

            case 'image':
                promise = new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = resource.url;
                    img.onload = resolve;
                    img.onerror = reject;
                });
                break;

            default:
                console.error('Type de ressource non pris en charge :', resource.type);
                break;
        }

        promises.push(promise);
    });

    return Promise.all(promises);
}


preloadResources().then(() => {
    let endTime = Date.now();
    let elapsedTime = endTime - startTime;
    let delay = Math.max(2000 - elapsedTime, 0);

    setTimeout(() => {
        window.location.href = 'app.html';
    }, delay);
});
