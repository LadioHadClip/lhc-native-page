/*
Attempting to bring a version of Jordan Jenkins' Halloween ghost to life in the browser. Check out the inspiration and originals at https://dribbble.com/shots/3055734-Have-a-Happy-Halloween and https://dribbble.com/shots/3878696-Happy-Halloween!
*/

class Ghost {

    constructor(el) {
        this.scene = el;
        this.clone = el.cloneNode(true);
        this.isEscaping = false;
        this.ghost = el.querySelector('.ghost');
        this.face = el.querySelector('.ghost-face');
        this.eyes = el.querySelector('.eyes-row');
        this.leftEye = this.eyes.querySelector('.left');
        this.rightEye = this.eyes.querySelector('.right');
        this.mouth = el.querySelector('.mouth');
        this.mouthState = 'neutral';
        this.shadow = el.querySelector('.shadow-container');
        this.leftCheek = el.querySelector('.left.cheek');
        this.leftCheek = el.querySelector('.right.cheek');
        this.leftHand = el.querySelector('.hand-left');
        this.rightHand = el.querySelector('.right-hand');
        this.target = document.querySelector('.image');
        this.activityInterval = null;
    }

    intersectTarget() {
        let l = parseInt(this.scene.style.left.replace('px', ''));
        let t = parseInt(this.scene.style.top.replace('px', ''));
        let w = 140;
        let h = 160;

        let x1 = Math.max(l, this.target.offsetLeft);
        let y1 = Math.max(t, this.target.offsetTop);
        let x2 = Math.min(l + w, this.target.offsetLeft + this.target.offsetWidth);
        let y2 = Math.min(t + h, this.target.offsetLeft + this.target.offsetHeight);

        let dx = Math.max(x2 - x1, 0);
        let dy = Math.max(y2 - y1, 0);
        if (dx * dy > 0)
            return true;
        else
            return false;
    }
    
    reset() {
        this.scene.remove();
        this.scene = this.clone.cloneNode(true);
        this.resetRefs();
        this.scene.classList.remove('stars-out');
        this.scene.style.position = 'absolute';
        do {
            this.scene.style.left = Math.floor(Math.random() * (document.querySelector('body').getBoundingClientRect().width - 140)) + 'px';
            this.scene.style.top = Math.floor(Math.random() * (document.querySelector('body').getBoundingClientRect().height - 160)) + 'px';
        } while (this.intersectTarget());
        this.scene.classList.add('descend');
        this.shadow.classList.add('disappear');
        document.querySelector('body').append(this.scene);
        this.enter();
    }
    
    resetRefs() {
        this.ghost = this.scene.querySelector('.ghost');
        this.face = this.scene.querySelector('.ghost-face');
        this.eyes = this.scene.querySelector('.eyes-row');
        this.leftEye = this.eyes.querySelector('.left');
        this.rightEye = this.eyes.querySelector('.right');
        this.mouth = this.scene.querySelector('.mouth');
        this.mouthState = 'neutral';
        this.isEscaping = false;
        this.shadow = this.scene.querySelector('.shadow-container');
        this.leftCheek = this.scene.querySelector('.left.cheek');
        this.leftCheek = this.scene.querySelector('.right.cheek');
        this.leftHand = this.scene.querySelector('.hand-left');
        this.rightHand = this.scene.querySelector('.right-hand');
    }
    
    blink() {
        this.leftEye.classList.add('blink');
        this.rightEye.classList.add('blink');
        setTimeout(() => {
            this.leftEye.classList.remove('blink');
            this.rightEye.classList.remove('blink');
        }, 50)
    }
    
    wave() {
        this.leftHand.classList.add('waving');
        setTimeout(() => {
            this.leftHand.classList.remove('waving');
        }, 500);
    }
    
    openMouth() {
        this.mouth.classList.remove('closed');
        this.mouth.classList.add('open');
        this.mouthState = 'open';
    }
    
    closeMouth() {
        this.mouth.classList.remove('open');
        this.mouth.classList.add('closed');
        this.mouthState = 'closed';
    }
    
    neutralMouth() {
        this.mouth.classList.remove('open');
        this.mouth.classList.remove('closed');
        this.mouthState = 'neutral';
    }
    
    hover() {
        this.ghost.classList.add('hover');
    }
    
    surprise() {
        this.face.classList.add('surprised');
    }
    
    runAway() {
        clearInterval(this.activityInterval);
        if (!this.isEscaping) {
            this.isEscaping = true;
            this.scene.classList.add('run-away', 'move-stars-in');
            this.scene.classList.remove('stars-out');
            setTimeout(() => {
                this.shadow.classList.add('disappear');
                setTimeout(() => {
                    this.reset();
                }, Math.floor(Math.random()*1000) + 500);
            }, 450);
        }
    }
    
    enter() {
        setTimeout(() => {
            this.shadow.classList.remove('disappear');
        }, 5);
        setTimeout(() => {
            this.scene.classList.remove('descend');
            this.scene.classList.add('stars-out', 'move-stars-out');
        }, 600);
        setTimeout(() => {
            this.hover();
            this.prepareEscape();
            this.startActivity();
        }, 1200)
    }
    
    startActivity() {
        this.activityInterval = setInterval(() => {
            switch (Math.floor(Math.random()*4)) {
                case 0:
                    this.blink();
                    setTimeout(() => { this.blink() }, 400);
                    setTimeout(() => { this.blink() }, 1300);
                    break;
                case 1:
                    this.wave();
                    break;
                default:
                    break;
            }
        }, 7000);
    }
    
    prepareEscape() {
        this.scene.addEventListener('click', () => { this.runAway() }, false);
        this.scene.addEventListener('mouseover', () => { this.runAway() }, false);
        this.scene.addEventListener('focus', () => { this.runAway() }, false);
    }
}

window.alert("Catch a shy ghost and a dumb pumpkin!")

let ghost = new Ghost(document.querySelector('.scene-container'));

ghost.hover();
ghost.startActivity();
ghost.prepareEscape();
// initial run away
ghost.runAway();

