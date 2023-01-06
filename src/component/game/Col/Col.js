import React from "react";

import "./Col.css";

export default function Col(props) {
    return (
        <div
            id={"col-" + props.col.toString()}
            className={`col ${props.color}`}
        >
        </div>
    )
}
 