export class ComunionApp {
    constructor() { }
    init() {
        this.setupEvents();
    }
    setupEvents() {
        // const invitationEvt = document.querySelector('#invitation');
        // invitationEvt.addEventListener('click', (e) => {
        //     this.toogleAnimation();
        // });
        const parallaxLayers = document.querySelectorAll('.parallax-bg');
        const parallaxContent = document.querySelector('.parallax-content');
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxLayers.forEach((layer) => {
                const speed = parseFloat(layer.dataset.speed);
                const offset = -(scrollPosition * speed);
                layer.style.transform = `translateY(${offset}px)`;
            });
            const contentSpeed = 1;
            const contentOffset = -(scrollPosition * contentSpeed);
            parallaxContent.style.transform = `translateY(${contentOffset}px)`;
        });
    }
}
const comunionApp = new ComunionApp();
window.onload = () => {
    comunionApp.init();
};
