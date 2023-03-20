var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class WebApp {
    constructor() {
        this.inNavigation = false;
    }
    init() {
        //this.setupIntro();
        // this.setupEvents();
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
        // this.effectTerminal.text(
        //     'console', 
        //     ['Hello'], 
        //     'text',
        //     ['#fff']);
        this.getInfo();
        const appFrame = document.querySelector('.app-frame');
        appFrame.classList.add('intro');
        setTimeout(() => {
            appFrame.classList.remove('intro');
        }, 1500);
    }
    setupEvents() {
        this.frameCollector = document.querySelector('.frame-container');
        this.frames = document.querySelectorAll('.frame-horizontal > .item');
        this.links = document.querySelectorAll('.navbar .item.page');
        this.links.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                this.gotoPage(index);
            });
        });
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.TEMPLATES = yield this.getAssert('./asserts/json/templates.json');
            console.log('templates: ', this.TEMPLATES);
            this.SKILLS = yield this.getAssert('./asserts/json/tech.json');
            console.log('technologies: ', this.SKILLS);
            this.PORTFOLIO = yield this.getAssert('./asserts/json/portfolio.json');
            console.log('portfolio: ', this.PORTFOLIO);
            this.EXPERIENCE = yield this.getAssert('./asserts/json/experience.json');
            console.log('experience: ', this.EXPERIENCE);
            this.EDUCATION = yield this.getAssert('./asserts/json/education.json');
            console.log('education: ', this.EDUCATION);
            this.setData();
        });
    }
    getAssert(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield fetch(filename)
                    .then((response) => response.json())
                    .then((json) => json);
            }
            catch (error) {
                return null;
            }
        });
    }
    setData() {
        //#region PORTAFOLIO
        this.assingData('#portfolio-title', this.PORTFOLIO.title);
        this.assingData('#portfolio-description', this.PORTFOLIO.description);
        this.assingData('#portfolio-content', this.interateData(this.PORTFOLIO.collection, this.TEMPLATES.portfolio));
    }
    assingData(id, data) {
        const element = document.querySelector(id);
        if (element) {
            var doc = new DOMParser().parseFromString(data, "text/xml");
            element.innerHTML = '';
            // element.insertAdjacentHTML(afterend, doc)
        }
    }
    interateData(collection, templateName) {
        let result = '';
        collection.forEach(item => {
            const keys = Object.keys(item);
            let template = templateName;
            keys.forEach(key => {
                const content = item[key] ? item[key] : '';
                template = template.replace(`{${key.toUpperCase()}}`, content);
            });
            result += template;
        });
        return result;
    }
}
const webApp = new WebApp();
window.onload = () => {
    webApp.init();
};
