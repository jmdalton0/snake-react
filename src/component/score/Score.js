import React from "react";
import Screen from "../screen/Screen";

import "./Score.css";

export default function Score(props) {
    return (
        <Screen
            type={props.type}
            label={props.label}
            action={props.action}
        >
            <div className={props.type}>
                <h2>Game Over</h2>
                <h3>Your Score:</h3>
                <h3 id="score-total">{props.score}</h3>
            </div>
        </Screen>
    );
}
 