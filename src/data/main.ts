import { tsParticles } from "tsparticles-engine";
import Wow from 'wow.js';

export class APP {

    configs = {
        background: {
            color: "#000" // this sets a background color for the canvas
        },
        fullScreen: {
            enable: true, // enabling this will make the canvas fill the entire screen, it's enabled by default
            zIndex: -1 // this is the z-index value used when the fullScreen is enabled, it's 0 by default
        },
        interactivity: {
            events: {
                onClick: {
                    enable: true, // enables the click event
                    mode: "push" // adds the particles on click
                },
                onHover: {
                    enable: true, // enables the hover event
                    mode: "repulse" // make the particles run away from the cursor
                }
            },
            modes: {
                push: {
                    quantity: 10 // number of particles to add on click
                },
                repulse: {
                    distance: 100 // distance of the particles from the cursor
                }
            }
        },
        particles: {
            links: {
                enable: true, // enabling this will make particles linked together
                distance: 200 // maximum distance for linking the particles
            },
            move: {
                enable: true, // enabling this will make particles move in the canvas
                speed: { min: 1, max: 5 } // using a range in speed value will make particles move in a random speed between min/max values, each particles have its own value, it won't change in time by default
            },
            number: {
                value: 50 // number of particles
            },
            opacity: {
                value: { min: 0.3, max: 0.7 } // using a different opacity, to have some semitransparent effects
            },
            size: {
                value: { min: 1, max: 3 } // let's randomize the particles size a bit
            }
        }
    };

    constructor() { }
    init() {
        //this.setupIntro();
        // this.setupEvents();
        const wow = new Wow();
        wow.init();
        
        console.log("init");
        // this.loadParticles(this.configs);
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

    async loadParticles(options) {
        // await loadFull(tsParticles);
        await tsParticles.load(options);
    }
}





