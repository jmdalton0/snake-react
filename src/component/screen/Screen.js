import React from "react";

import "./Screen.css";

export default function Screen(props) {
    return (
        <section id={props.id}>
            <button
                id={props.id + "-btn"}
                className="btn"
                onClick={props.action}
            >
                {props.id}
            </button>
        </section>
    );
}
 