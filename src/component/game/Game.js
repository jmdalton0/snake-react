import React from "react";
import Row from "./Row/Row";
import GameState from "./GameState";

import "./Game.css";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.passScore = props.updateScore;
        this.gameState = new GameState();
        this.gameState.updateScore = this.updateScore;
        this.gameState.strobe = props.strobe;
        this.gameState.action = props.action;
        this.state = {
            grid: this.gameState.next(),
            score: 0,
        };
    }

    tick() {
        const next = this.gameState.next();
        this.setState({grid: next});
    }

    updateScore = () => {
        this.passScore();
        this.setState({score: this.state.score + 256});
    }

    componentDidMount() {
        this.ticker = setInterval(() => {
            this.tick();
        }, 150);
    }

    componentWillUnmount() {
        clearInterval(this.ticker);
    }

    render() {
        const grid = this.state.grid;
        const rows = grid.map((cols, row) => {
            return (
                <Row
                    key={row}
                    row={row}
                    cols={cols}
                />
            );
        });
        return (
            <div id="game">
                <h3
                    id="score-count"
                    className={this.state.score == 0 ? 'hide' : ''}
                >{ this.state.score }</h3>
                {rows}
            </div>
        );
    }
}
 