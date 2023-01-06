export default class Inputs {
    constructor() {
        this.inputs = [];
        this.xDown = null;
        this.yDown = null;
        this.xUp = null;
        this.yUp = null;
        this.init();
    }

    next() {
        return this.inputs.shift();
    }

    init() {
        document.onkeydown = (key) => {
            key = key.key || key.keyCode;
            if (key === '8') {
                this.inputs.push('n');
            } else if (key === '5') {
                this.inputs.push('s');
            } else if (key === '6') {
                this.inputs.push('e');
            } else if (key === '4') {
                this.inputs.push('w');
            } else {
            }
        }

        document.addEventListener('touchstart', (e) => {
            this.xDown = e.touches[0].screenX;
            this.yDown = e.touches[0].screenY;
        });

        document.addEventListener('touchmove', (e) => {
            this.xUp = e.touches[0].screenX;
            this.yUp = e.touches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            if (this.xDown && this.yDown && this.xUp && this.yUp) {
                const xDelta = this.xDown - this.xUp;
                const yDelta = this.yDown - this.yUp;

                if (Math.abs(xDelta) > Math.abs(yDelta)) {
                    if (xDelta > 0) {
                        this.inputs.push('w');
                    } else {
                        this.inputs.push('e');
                    }
                } else {
                    if (yDelta > 0) {
                        this.inputs.push('n');
                    } else {
                        this.inputs.push('s');
                    }
                }
            }
        });
    }
}