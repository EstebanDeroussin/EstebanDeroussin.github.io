let resourcesToPreload = [
    { type: 'style', url: 'style/main.css' },
    { type: 'script', url: 'script/animation.js' },
    { type: 'script', url: 'script/app.js' }
];

//{ type: 'style', url: 'style/main.css' },

let startTime = Date.now();

function preloadResources() {
    let promises = [];

    resourcesToPreload.forEach(resource => {
        let element;
        if (resource.type === 'style') {
            element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = resource.url;
        } else if (resource.type === 'script') {
            element = document.createElement('script');
            element.type = 'text/javascript';
            element.src = resource.url; // Utilisez src pour les fichiers JavaScript
        }

        document.head.appendChild(element);
        let promise = new Promise(resolve => {
            element.onload = resolve;
        });

        promises.push(promise);
    });

    return Promise.all(promises);
}

preloadResources().then(() => {
    let endTime = Date.now();
    let elapsedTime = endTime - startTime;
    let delay = Math.max(2000 - elapsedTime, 0);

    setTimeout(() => {
        let Presentation = document.querySelector('#Presentation');
        Presentation.scrollIntoView({
            behavior: 'smooth'
        });
        Presentation.classList.add('visible');

        setTimeout( () => {
            window.location.href = 'app.html';
        },3000);
    }, delay);
});
