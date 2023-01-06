import React from "react";
import Screen from "../screen/Screen";

import "./Controls.css";

export default function Controls(props) {
    return (
        <Screen
            type={props.type}
            label={props.label}
            action={props.action}
        >
            <div className={props.type}>
                <h2>Controls</h2>
                <p><span className="control arrow">&uarr;</span></p>
                <p><span className="control key-control">8</span></p>
                <p>
                    <span className="control arrow">&larr;</span>
                    <span className="control key-control">4</span>
                    <span className="control key-control">5</span>
                    <span className="control key-control">6</span>
                    <span className="control swipe-control">SWIPE</span>
                    <span className="control arrow">&rarr;</span>
                </p>
                <p><span className="control arrow">&darr;</span></p>
            </div>
        </Screen>
    );
}