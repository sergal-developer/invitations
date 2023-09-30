export class APP {
    constructor() {
        this.percentageScroll = 0;
        this.animations = [];
    }
    init() {
        this.setupIntro();
        //this.setupEvents();
    }
    setupIntro() {
        // reset when refresh screen
        window.scrollTo(0, 0);
        const sections = document.querySelectorAll('.application');
        console.log('sections: ', sections);
        sections.forEach((section) => {
            section.classList.add('stage0');
            section.addEventListener('click', () => {
                const maxStage = parseInt(section.getAttribute('max-stage'));
                const lastStage = section.classList[1];
                let currentStage = parseInt(lastStage.replace('stage', ''));
                let newStage = currentStage + 1;
                console.log('lastStage: ', lastStage);
                console.log('newStage: ', newStage);
                newStage = newStage <= maxStage ? newStage : 0;
                section.classList.replace(lastStage, `stage${newStage}`);
            });
        });
    }
    setupEvents() {
        // reset when refresh screen
        window.scrollTo(0, 0);
        // set animation for all items 
        this.setupAnimations();
        // enable event scroll
        window.addEventListener('scroll', () => {
            console.clear();
            this.percentageScroll = this.percentageScrolled();
            console.log('percentageScroll: ', this.percentageScroll);
            this.updateLayout(this.percentageScroll);
        });
    }
    setupAnimations() {
        this.animations = [
            {
                start: 0, end: 10,
                items: [
                    { id: 'asteroids-main', style: 'opacity: 1;' },
                    { id: 'planet-main', style: 'transform: scale(calc( {RANGE} * ({STEPS} / {RANGE} ) ));' },
                    { id: 'developer', style: 'opacity: 0;' },
                    { id: 'title-intro', style: 'opacity: 1; top: calc(10% * {SCROLL});' },
                    { id: 'intro', style: 'opacity: 1;' },
                ]
            },
            {
                start: 10, end: 20,
                items: [
                    { id: 'asteroids-main', style: 'opacity: 0;' },
                    { id: 'planet-main', style: 'transform: scale(calc(5 / ({SCROLL})));' },
                    { id: 'developer', style: 'opacity: 0;' },
                    { id: 'title-intro', style: 'opacity: 1; top: calc(5 * {SCROLL}%);' },
                    { id: 'intro', style: 'opacity: 1;' },
                ]
            },
            {
                start: 20, end: 30,
                items: [
                    { id: 'asteroids-main', style: 'opacity: 1;' },
                    { id: 'planet-main', style: 'transform: scale(1);' },
                    { id: 'developer', style: 'opacity: 1;' },
                    { id: 'title-intro', style: 'opacity: 1;' },
                    { id: 'intro', style: 'opacity: 0;' },
                ]
            },
        ];
        this.updateLayout(0);
    }
    updateLayout(percentageScroll) {
        this.animations.forEach(anim => {
            if (this.percentageScroll >= anim.start && this.percentageScroll <= anim.end) {
                console.log('item.id: ', anim.start);
                const values = {
                    steps: (anim.end - anim.start),
                    range: (anim.end - anim.start) - this.percentageScroll,
                };
                console.log('values: ', values);
                anim.items.forEach(item => {
                    const element = document.querySelector(`#${item.id}`);
                    let style = item.style.replace('{SCROLL}', this.percentageScroll);
                    style = style.replace('{RANGE}', values.range);
                    style = style.replace('{STEPS}', values.steps);
                    element === null || element === void 0 ? void 0 : element.setAttribute('style', style);
                });
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
