import React from "react";
import Screen from "../screen/Screen";

import "./Console.css";

export default class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "start",
        }
    }

    nextScreen = () => {
        let nextScreen;
        switch(this.state.screen) {
            case 'start': nextScreen = 'controls';
            break;
            case 'controls': nextScreen = 'play';
            break;
            case 'play': nextScreen = 'score';
            break;
            case 'score': nextScreen = 'controls';
            break;
            default: nextScreen = 'start';
            break;
        }
        this.setState({screen: nextScreen})
    }

    render() {
        return (
            <main>
                <div id="console">
                    <Screen
                        id={this.state.screen}
                        action={this.nextScreen}
                    />
                </div>
            </main>
        );
    }
}