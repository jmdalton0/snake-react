import React from "react";
import Console from "./component/console/Console.js";

import "./App.css";

export default function App() {
    return (
        <div>
            <header>
                <h1>Snake</h1>
            </header>
            <Console />
            <footer>
                <img src="./technologies.png" alt="React Logo" />
                <a href="https://github.com/jmdalton0/snake-react" target="_blank" rel="noreferrer" className="link">
                    <img src="./GitHub_Logo_White.png" alt="GitHub Logo" />
                </a>
            </footer>
        </div>
    );
}
