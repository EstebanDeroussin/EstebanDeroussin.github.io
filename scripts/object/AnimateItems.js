class AnimateItems{
    constructor(selector){
        inView.threshold(0.2);
        inView(selector)
        .on('enter', function(c) {
            c.classList.add('active');

        }).on('exit', function(c){
            c.classList.remove('active');
        });
    }
}