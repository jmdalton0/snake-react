import React from "react";

import "./Screen.css";

export default function Screen(props) {
    return (
        <section id={props.type}>
            {props.children}
            <button
                id={props.type + "-btn"}
                className="btn screen-btn"
                onClick={props.action}
            >
                {props.label}
            </button>
        </section>
    );
}
 