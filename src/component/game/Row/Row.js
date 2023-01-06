import React from "react";
import Col from "../Col/Col";

import "./Row.css";

export default function Row(props) {
    const cols = props.cols.map((color, col) => {
        return (
            <Col
                key={col}
                col={col}
                color={color}
            />
        );
    });
    return (
        <div
            id={"row-" + props.row}
            className="row"
        >
            {cols}
        </div>
    );
}
 