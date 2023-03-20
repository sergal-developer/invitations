

export class WebApp {
    frames: any;
    frameCollector: HTMLElement;
    links: any;
    inNavigation = false;

    TEMPLATES;
    SKILLS;
    EDUCATION;
    PORTFOLIO;
    EXPERIENCE;

    constructor() {}

    init() {
        //this.setupIntro();
        // this.setupEvents();
    }

    scrollHorizontally(e: any) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        var scrollSpeed = 60;
        document.documentElement.scrollLeft -= (delta * scrollSpeed);
        document.body.scrollLeft -= (delta * scrollSpeed);
        e.preventDefault();
    }

    getLeftScroll(parent: any, position = 0) {
        const _parent = document.querySelector(parent);
        const width = _parent.clientWidth;
        const widthChild = this.frames[0].clientWidth;
        return width != widthChild ? widthChild * position : width * position;
    }

    gotoPage(page: number) {
        if( this.inNavigation ) { return }
        this.inNavigation = true;
        const _parent = document.querySelector('.frame-container');
        const left = this.getLeftScroll('.frame-container', page);
        const container = document.querySelector('.frame-horizontal');
        container.setAttribute('style', `margin-left: -${ left }px`);
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
        
        this.links.forEach((link: HTMLElement, index: number) => {
            link.addEventListener('click', (e) => {
                this.gotoPage(index);
            });
        });
    }

    async getInfo() {
        this.TEMPLATES = await this.getAssert('./asserts/json/templates.json');
        console.log('templates: ', this.TEMPLATES);
        this.SKILLS = await this.getAssert('./asserts/json/tech.json');
        console.log('technologies: ', this.SKILLS);
        this.PORTFOLIO = await this.getAssert('./asserts/json/portfolio.json');
        console.log('portfolio: ', this.PORTFOLIO);
        this.EXPERIENCE = await this.getAssert('./asserts/json/experience.json');
        console.log('experience: ', this.EXPERIENCE);
        this.EDUCATION = await this.getAssert('./asserts/json/education.json');
        console.log('education: ', this.EDUCATION);

        this.setData();
    }

    async getAssert(filename) {
        try {
            return await fetch(filename)
            .then((response) => response.json())
            .then((json) => json);
        } catch (error) {
            return null;
        }
    }

    setData() {
        //#region PORTAFOLIO
        this.assingData('#portfolio-title', this.PORTFOLIO.title);
        this.assingData('#portfolio-description', this.PORTFOLIO.description);
        this.assingData('#portfolio-content', this.interateData(this.PORTFOLIO.collection,  this.TEMPLATES.portfolio));
    }

    assingData(id, data) {
        const element:HTMLElement = document.querySelector(id);
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
            let template: string = templateName;
            keys.forEach(key => {
                const content = item[key] ? item[key] : '';
                template = template.replace(`{${ key.toUpperCase() }}`, content);
            });
            result += template;
        });
        return result;
    }

}

const webApp = new WebApp();

window.onload = () => {
    webApp.init();
}