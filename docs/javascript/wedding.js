export class WeddingApp {
    constructor() {
        this.inNavigation = false;
    }
    init() {
        //this.setupIntro();
        this.setupEvents();
    }
    scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        var scrollSpeed = 60;
        document.documentElement.scrollLeft -= (delta * scrollSpeed);
        document.body.scrollLeft -= (delta * scrollSpeed);
        e.preventDefault();
    }
    getLeftScroll(parent, position = 0) {
        const _parent = document.querySelector(parent);
        const width = _parent.clientWidth;
        const widthChild = this.frames[0].clientWidth;
        return width != widthChild ? widthChild * position : width * position;
    }
    gotoPage(page) {
        if (this.inNavigation) {
            return;
        }
        this.inNavigation = true;
        const _parent = document.querySelector('.frame-container');
        const left = this.getLeftScroll('.frame-container', page);
        const container = document.querySelector('.frame-horizontal');
        container.setAttribute('style', `margin-left: -${left}px`);
        console.log('left: ', left);
        // _parent.scroll({ left: left, behavior: 'smooth' });
        container.classList.add('moveOn');
        setTimeout(() => {
            container.classList.remove('moveOn');
            this.inNavigation = false;
        }, 500);
    }
    setupIntro() {
        const appFrame = document.querySelector('.app-frame');
        appFrame.classList.add('intro');
        setTimeout(() => {
            appFrame.classList.remove('intro');
        }, 1500);
    }
    toogleAnimation() {
        const invitationEvt = document.querySelector('#invitation');
        if (invitationEvt.classList.contains('animate')) {
            invitationEvt.classList.remove('animate');
        }
        else {
            invitationEvt.classList.add('animate');
        }
    }
    setupEvents() {
        this.paralaxInvitation();
    }
    paralaxInvitation() {
        window.scrollTo(0, 0);
        // const invitationEvt = document.querySelector('#invitation');
        // invitationEvt.addEventListener('click', (e) => {
        //     this.toogleAnimation();
        // });
        const element = document.querySelector('#header-hero');
        let scrollSpeed = 0.5;
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const percentageScroll = this.percentageScrolled();
            if (percentageScroll > 5) {
                element.classList.add('small');
            }
            else {
                element.classList.remove('small');
            }
            if (percentageScroll > 30) {
                element.classList.add('closeup');
            }
            else {
                element.classList.remove('closeup');
            }
            if (percentageScroll > 40) {
                element.classList.add('kiss');
            }
            else {
                element.classList.remove('kiss');
            }
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
const weddingApp = new WeddingApp();
window.onload = () => {
    weddingApp.init();
};
