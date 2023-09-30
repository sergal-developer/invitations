export class APP {
    constructor() {
        this.frameCollector = null;
        this.inNavigation = false;
        this.currentPage = 0;
        this.transitionDurationFrame = 1000;
        this.frameName = '.page-frame-container';
        this.frameContainerName = '.pfc-area';
        this.frameContainerWidth = `width: calc(100%);`;
        this.frameItemsName = '.pfc-area > .item';
        this.linksName = '.navbar .item.page';
        this.navbarName = '.navbar';
        this.shapesName = '.shapes';
        this.navBar = null;
        this.frameContainer = null;
        this.currentPageClass = 'home';
        this.shapesContainer = null;
    }
    init() {
        this.setupEvents();
    }
    setupEvents() {
        var _a;
        this.navBar = document.querySelector(this.navbarName);
        this.frameCollector = document.querySelector(this.frameName);
        this.frames = document.querySelectorAll(this.frameItemsName);
        this.links = document.querySelectorAll(this.linksName);
        this.frameContainer = document.querySelector(this.frameContainerName);
        this.frameContainerWidth = `width: calc(100% * ${this.frames.length});`;
        (_a = this.frameContainer) === null || _a === void 0 ? void 0 : _a.setAttribute('style', `${this.frameContainerWidth}`);
        this.shapesContainer = document.querySelector(this.shapesName);
        this.links.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                this.gotoPage(index, link);
                const menu = document.querySelector('#navbar-menu');
                menu === null || menu === void 0 ? void 0 : menu.classList.remove('show');
            });
        });
        const menu = document.querySelector('#navbar-menu');
        const menuButton = document.querySelector('#navbar-menu-button');
        menuButton === null || menuButton === void 0 ? void 0 : menuButton.addEventListener('click', (e) => {
            if (menu === null || menu === void 0 ? void 0 : menu.classList.contains('show')) {
                menu === null || menu === void 0 ? void 0 : menu.classList.remove('show');
            }
            else {
                menu === null || menu === void 0 ? void 0 : menu.classList.add('show');
            }
        });
    }
    gotoPage(page, link) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (this.inNavigation || this.currentPage === page) {
            return;
        }
        this.inNavigation = true;
        this.currentPage = page;
        //get data atribute
        const dataClass = link.getAttribute('data-class');
        console.log('dataClass: ', dataClass);
        const left = `-${100 * page}%`;
        const transitionDurationByFrame = `transition-duration: ${this.transitionDurationFrame}ms;`;
        const marginLeftByFrame = `margin-left: ${left};`;
        (_a = this.frameContainer) === null || _a === void 0 ? void 0 : _a.setAttribute('style', `${this.frameContainerWidth}${transitionDurationByFrame}${marginLeftByFrame}`);
        if (dataClass) {
            (_b = this.frameContainer) === null || _b === void 0 ? void 0 : _b.classList.replace(this.currentPageClass, dataClass);
            (_c = this.shapesContainer) === null || _c === void 0 ? void 0 : _c.classList.replace(this.currentPageClass, dataClass);
            this.currentPageClass = dataClass;
        }
        (_d = this.frameContainer) === null || _d === void 0 ? void 0 : _d.classList.add('moveOn');
        setTimeout(() => {
            var _a;
            (_a = this.frameContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('moveOn');
            this.inNavigation = false;
        }, this.transitionDurationFrame);
        if (this.currentPage !== 0) {
            if (!((_e = this.navBar) === null || _e === void 0 ? void 0 : _e.classList.contains('collapsed'))) {
                (_f = this.navBar) === null || _f === void 0 ? void 0 : _f.classList.add('collapsed');
            }
        }
        else {
            (_g = this.navBar) === null || _g === void 0 ? void 0 : _g.classList.remove('collapsed');
        }
    }
}
