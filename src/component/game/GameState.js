import Inputs from "./Inputs";

export default class GameState {
    constructor() {
        this.state = 'start';
        this.direction = 'e';
        this.inputs = null;
        this.grid = [...Array(16)].map(() => {
            return [...Array(16).fill('off')];
        });
        this.snake = [];
        this.food = [];
        this.ate = false;
        this.count = 0;
        this.finalLength = 0;
        this.updateScore = null;
        this.strobe = null;
        this.action = null;
    }

    addHead() {
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
        const curHead = this.snake.at(0);
        if (this.direction === 'n') {
            this.snake.unshift([(curHead[0] + 15) % 16, curHead[1]]);
        } else if (this.direction === 's') {
            this.snake.unshift([(curHead[0] + 1) % 16, curHead[1]]);
        } else if (this.direction === 'e') {
            this.snake.unshift([curHead[0], (curHead[1] + 1) % 16]);
        } else if (this.direction === 'w') {
            this.snake.unshift([curHead[0], (curHead[1] + 15) % 16]);
        } else {
            return;
        }
    }

    addTail(segment) {
        this.snake.push(segment);
    }

    removeTail() {
        this.snake.pop();
    }

    eat() {
        for (let i = 1; i < this.snake.length; i++) {
            if (
                this.snake[i][0] === this.snake[0][0] &&
                this.snake[i][1] === this.snake[0][1]
            ) {
                this.state = 'end';
                this.food = [];
                this.count = 0;
                this.finalLength = this.snake.length;
                return true;
            }
        }

        if (
            this.food[0] === this.snake[0][0] &&
            this.food[1] === this.snake[0][1]
        ) {
            this.spawnFood();
            return true;
        }
        return false;
    }

    spawnFood() {
        const newFood = [];
        newFood[0] = Math.floor(Math.random() * 16);
        newFood[1] = Math.floor(Math.random() * 16);
        let newFoodOnSnake = false;
        for (let i = 0; i < this.snake.length; i++) {
            if (
                this.snake[i][0] === newFood[0] &&
                this.snake[i][1] === newFood[1]
            ) {
                newFoodOnSnake = true;
            }
        }

        if (newFoodOnSnake) {
            this.spawnFood();
        } else {
            this.food = newFood;
        }
    }

    start() {
        const PAUSE = 12;

        switch(this.count) {
            case PAUSE:
                this.addTail([7, 6]);
                break;
            case PAUSE + 1:
                this.addTail([7, 5]);
                break;
            case PAUSE + 2:
                this.addTail([7, 4]);
                break;
            case PAUSE + 3:
                this.addTail([7, 3]);
                break;
            case (PAUSE * 2) + 4:
                this.food = [7, 11];
                break;
            case (PAUSE * 3) + 4:
                this.state = 'play';
                this.inputs = new Inputs();
                break;
            default:
                break;
        }
        this.count++;
    }

    play() {
        this.ate = false;
        this.addHead();
        if (this.eat()) {
            this.ate = true;
            this.strobe();
        } else {
            this.removeTail();
        }
    }

    end() {
        const PAUSE = 8;
        if (this.count > PAUSE && this.snake.length > 0) {
            this.removeTail();
            this.updateScore();
            this.strobe();
        }
        if (this.count === (this.finalLength + (PAUSE * 3))) {
            this.action();
        }
        this.count++;
    }

    drawSnake() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                this.grid[i][j] = 'off';
            }
        }
        for (let i = 0; i < this.snake.length; i++) {
            const coord = this.snake[i];
            if (i % 2 === 0) {
                this.grid[coord[0]][coord[1]] = 'primary';
            } else {
                this.grid[coord[0]][coord[1]] = 'primary-dark';
            }
        }
        if (this.ate && this.snake.length > 0) {
            const segment = this.snake.at(0);
            this.grid[segment[0]][segment[1]] = 'secondary';
        }
        if (this.food.length == 2) {
            this.grid[this.food[0]][this.food[1]] = 'food';
        }
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