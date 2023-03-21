export class ComunionApp {
    constructor() { }
    init() {
        //this.setupIntro();
        this.setupEvents();
    }
    setupEvents() {
        this.paralaxInvitation();
    }
    paralaxInvitation() {
        window.scrollTo(0, 0);
        const element = document.querySelector('#header-hero');
        const title = document.querySelector('#title-inv');
        const trees = document.querySelectorAll('.tree');
        let scrollSpeed = 0.5;
        let titleContent = '';
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const percentageScroll = this.percentageScrolled();
            console.log('percentageScroll: ', percentageScroll);
            if (percentageScroll > 5) {
                element.classList.add('small');
                titleContent = 'Nos Casamos!!';
            }
            else {
                element.classList.remove('small');
            }
            if (percentageScroll > 6) {
                element.classList.add('closeup');
            }
            else {
                element.classList.remove('closeup');
            }
            if (percentageScroll > 23) {
                element.classList.add('kiss');
            }
            else {
                element.classList.remove('kiss');
            }
            if (percentageScroll > 30) {
                titleContent = 'Estas Invitado';
            }
            else { }
            if (percentageScroll > 69) {
                titleContent = 'Te esperamos';
            }
            else { }
            if (percentageScroll > 90) {
                element.classList.add('hide');
            }
            else {
                element.classList.remove('hide');
            }
            // title.innerHTML = titleContent;
            // trees.forEach((layer: any) => {
            //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            //     var skewAmount = scrollTop / 10; // Ajusta este valor para cambiar la cantidad de distorsión
            //     layer.style.transform = "skewY(" + skewAmount + "deg)";
            // });
        });
    }
    percentageScrolled() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        return percentage;
    }
}
const comunionApp = new ComunionApp();
window.onload = () => {
    comunionApp.init();
};
