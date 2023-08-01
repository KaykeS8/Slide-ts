import Timeout from "./Timeout.js";
export default class Slide {
    container;
    slides;
    time;
    controls;
    index;
    slide;
    timeout;
    paused;
    pausedTimeout;
    constructor(container, slides, controls, time = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.timeout = null;
        this.pausedTimeout = null;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.paused = false;
        this.init();
    }
    hide(el) {
        el.classList.remove('active');
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        this.slides.forEach(el => this.hide(el));
        this.slides[index].classList.add('active');
        this.auto(this.time);
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }
    prev() {
        if (this.paused)
            return;
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev);
    }
    next() {
        if (this.paused)
            return;
        const next = (this.index + 1) < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }
    pause() {
        this.pausedTimeout = new Timeout(() => {
            this.timeout?.pause();
            this.paused = true;
        }, 300);
    }
    continue() {
        this.pausedTimeout?.clear();
        if (this.paused)
            this.paused = false;
        this.timeout?.continue();
    }
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = 'slide anterior';
        nextButton.innerText = 'proximo slide';
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        this.controls.addEventListener('pointerdown', () => this.pause());
        this.controls.addEventListener("pointerup", () => this.continue());
        nextButton.addEventListener('pointerup', () => this.next());
        prevButton.addEventListener("pointerup", () => this.prev());
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map