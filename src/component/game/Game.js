import React from "react";
import Row from "./Row/Row";
import GameState from "./GameState";

import "./Game.css";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.gameState = new GameState();
        this.gameState.update = props.update;
        this.gameState.action = props.action;
        this.state = {
            grid: this.gameState.next()
        };
    }

    tick() {
        const next = this.gameState.next();
        this.setState({grid: next});
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
            <div id="game">{rows}</div>
        );
    }
}
 