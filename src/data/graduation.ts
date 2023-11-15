import Wow from 'wow.js';

export class Graduation {

    constructor() { }
    init() {
        const wow = new Wow();
        console.log('wow: ', wow);
        wow.init();
        
        console.log("init");
        
        this.setupGallery();
        this.setupActionsGallery();
        this.setupAudioControls();
        this.setupScrollActions();
        this._coundown();
    }

    setupGallery() {
        const box: any = document.querySelector(".box");
        const boxItems = document.querySelectorAll(".box .item");
      
        document.documentElement.style.setProperty(
          "--numGraduates",
          `${boxItems.length}`
        );
        const list = getComputedStyle(document.documentElement).getPropertyValue(
          "--numGraduates"
        );
      
        let step = 0;
        let steps = 360 / boxItems.length;
      
        setInterval(() => {
          if (step > 360) {
            step = 0;
          }
          box.style.transform = `perspective(1000px) rotateY(${step}deg)`;
          step = step + steps;
        }, 1000);
    }

    setupActionsGallery() {
        const graduates = document.querySelectorAll(".graduates .graduateUser");
        graduates.forEach((graduate) => {
            graduate.addEventListener("click", () => {
            if (graduate.classList.contains("show")) {
                graduate.classList.remove("show");
            } else {
                graduate.classList.add("show");
            }
            });
        });
    }

    setupAudioControls() {
        const controlAudio = document.querySelector(".control-audio");
        controlAudio.addEventListener("click", () => {
            const current = this._playPause("#audio-background");
            const icon = document.querySelector(".control-audio img");
            if (current) {
            icon.setAttribute("src", "/invitations/img/volume.svg");
            } else {
            icon.setAttribute("src", "/invitations/img/mute.svg");
            }
        });

        // setTimeout(() => {
        //     this._playPause("#audio-background");
        //     console.log('activate sound')
        // }, 000);

        const toggleButton = document.getElementById("toggleButton");
        toggleButton.addEventListener("click", () => {
            this._playPause("#myAudio");
        });
    }

    setupScrollActions() {
        const florenceImage = document.querySelector('#florence-img');
        window.addEventListener("scroll", () => {
            const scrollPercentage = this._getPercentScroll();
            console.log("scrollPercentage: ", scrollPercentage);

            
            florenceImage.classList.remove('florence-img-scroll');

            if(scrollPercentage > 37 && scrollPercentage < 45) {
              florenceImage.classList.add('florence-img-scroll');
              florenceImage.setAttribute('stryle', ``);

            }

        
            // Aplica la rotación en el eje Y basada en el porcentaje de desplazamiento
            // animatedDiv.style.transform = `translate(-50%, -50%) rotateX(${scrollPercentage * 10}deg)`;
          });
    }

    _playPause(audioTag) {
        const audio: any = document.querySelector(audioTag);
        if (audio.paused) {
          // Si está pausado, reprodúcelo
          audio.play();
        } else {
          // Si se está reproduciendo, paúsalo
          audio.pause();
        }
    
        return audio.paused;
      }
    
    _coundown() {
        const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
    
        //I'm adding this section so I don't have to keep updating this pen every year :-)
        //remove this if you don't need it
        let today: any = new Date(),
          dd = String(today.getDate()).padStart(2, "0"),
          mm = String(today.getMonth() + 1).padStart(2, "0"),
          yyyy = today.getFullYear(),
          nextYear = yyyy,
          dayMonth = "12/16/",
          goal = "12/16/2023";
    
        today = mm + "/" + dd + "/" + yyyy;
        if (today > goal) {
          goal = dayMonth + nextYear;
        }
        //end
    
        const countDown = new Date(goal).getTime(),
          x = setInterval(() => {
            const now = new Date().getTime(),
              distance = countDown - now;
    
            document.getElementById("days").innerText = String(
              Math.floor(distance / day)
            );
            document.getElementById("hours").innerText = String(
              Math.floor((distance % day) / hour)
            );
            document.getElementById("minutes").innerText = String(
              Math.floor((distance % hour) / minute)
            );
            document.getElementById("seconds").innerText = String(
              Math.floor((distance % minute) / second)
            );
    
            //do something later when date is reached
            if (distance < 0) {
              console.log("distance: ", distance);
              // document.getElementById("headline").innerText = "It's my birthday!";
              // document.getElementById("countdown").style.display = "none";
              // document.getElementById("content").style.display = "block";
              clearInterval(x);
            }
            //seconds
          }, 0);
      }
    
      _getPercentScroll() {
        return Math.round(
          ((document.documentElement.scrollTop + window.innerHeight) /
            document.documentElement.scrollHeight) *
            100
        );
      }
}





