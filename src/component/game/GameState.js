import Inputs from "./Inputs";

export default class GameState {
    constructor() {
        this.grid = [...Array(16)].map(() => {
            return [...Array(16).fill('off')];
        });
        this.inputs = new Inputs();
        this.update = null;
        this.action = null;
        this.state = 'start';
        this.count = 0;
        this.snake = [];
        this.food = [];
        this.direction = 'e';
        this.blinkHead = false;
        this.blinkTail = false;
        this.finalLength = 0;
    }

    getHead() {
        return this.snake[0];
    }

    getNextHead() {
        // update direction
        const nextDirection = this.inputs.next();
        if (nextDirection) {
            if (
                (nextDirection === 'n' && this.direction !== 's') ||
                (nextDirection === 's' && this.direction !== 'n') ||
                (nextDirection === 'e' && this.direction !== 'w') ||
                (nextDirection === 'w' && this.direction !== 'e')
            ) {
                this.direction = nextDirection;
            }
        }

        // apply new direction
        const curHead = this.getHead();
        if (this.direction === 'n') {
            return [(curHead[0] + 15) % 16, curHead[1]];
        } else if (this.direction === 's') {
            return [(curHead[0] + 1) % 16, curHead[1]];
        } else if (this.direction === 'e') {
            return [curHead[0], (curHead[1] + 1) % 16];
        } else if (this.direction === 'w') {
            return [curHead[0], (curHead[1] + 15) % 16];
        } else {
            return curHead;
        }
    }

    addHead(head) {
        this.snake.unshift(head);
    }

    getTail() {
        return this.snake[this.snake.length - 1];
    }

    addTail(tail) {
        this.snake.push(tail);
    }

    removeTail() {
        const tail = this.snake.pop();
        this.grid[tail[0]][tail[1]] = 'off';
    }

    placeFood(food) {
        this.food = food;
        this.grid[food[0]][food[1]] = 'food';
    }

    eat() {
        for (let i = 1; i < this.snake.length; i++) {
            if (
                this.snake[i][0] === this.getHead()[0] &&
                this.snake[i][1] === this.getHead()[1]
            ) {
                this.blinkHead = true;
                this.state = 'end';
                this.count = 0;
                this.finalLength = this.snake.length;
                return false;
            }
        }

        if (
            this.food[0] === this.getHead()[0] &&
            this.food[1] === this.getHead()[1]
        ) {
            this.blinkHead = true;
            this.update();
            this.spawnFood();
            return true;
        }
        return false;
    }

    spawnFood() {
        const newX = Math.floor(Math.random() * 16);
        const newY = Math.floor(Math.random() * 16);
        let newFoodOnSnake = false;
        for (let i = 0; i < this.snake.length; i++) {
            if (
                this.snake[i][0] === newX &&
                this.snake[i][1] === newY
            ) {
                newFoodOnSnake = true;
            }
        }

        if (newFoodOnSnake) {
            this.spawnFood();
        } else {
            this.placeFood([newX, newY]);
        }
    }

    drawSnake() {
        for (let i = 0; i < this.snake.length; i++) {
            const coord = this.snake[i];
            if (i % 2 === 0) {
                this.grid[coord[0]][coord[1]] = 'teal';
            } else {
                this.grid[coord[0]][coord[1]] = 'teal-dark';
            }
        }
        if (this.blinkHead) {
            const head = this.getHead();
            if (head) {
                this.grid[head[0]][head[1]] = 'pink';
            }
        }
        if (this.blinkTail) {
            const tail = this.getTail();
            if (tail) {
                this.grid[tail[0]][tail[1]] = 'pink';
            }
        }
        this.blinkHead = false;
        this.blinkTail = false;
    }

    play() {
        this.addHead(this.getNextHead());
        if (!this.eat()) {
            this.removeTail();
        }
    }

    start() {
        const PAUSE = 12;
        const START_SNAKE_INIT = PAUSE;

        switch(this.count) {
            case START_SNAKE_INIT:
                this.addTail([7, 6]);
                break;
            case START_SNAKE_INIT + 1:
                this.addTail([7, 5]);
                break;
            case START_SNAKE_INIT + 2:
                this.addTail([7, 4]);
                break;
            case START_SNAKE_INIT + 3:
                this.addTail([7, 3]);
                break;
            case START_SNAKE_INIT + 4 + PAUSE:
                this.placeFood([7, 11]);
                break;
            case START_SNAKE_INIT + 4 + (PAUSE * 2):
                this.state = 'play';
                break;
            default:
                break;
        }
        this.count++;
    }

    end() {
        const PAUSE = 8;
        if (this.count > PAUSE && this.getTail()) {
            this.blinkTail = true;
            this.removeTail();
        }
        if (this.count === (this.finalLength + (PAUSE * 3))) {
            this.action();
        }
        this.count++;
    }

    next() {
        if (this.state === 'start') {
            this.start();
        } else if (this.state === 'play') {
            this.play();
        } else {
            this.end();
        }
        this.drawSnake();
        return this.grid;
    }
}