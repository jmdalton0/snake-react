import React from "react";
import Screen from "../screen/Screen";
import Controls from "../controls/Controls";
import Game from "../game/Game";
import Score from "../score/Score";

import "./Console.css";

export default class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'start',
            score: 0,
            blink: false,
        }
    }

    nextScreen() {
        switch(this.state.screen) {
            case 'start': return 'controls';
            case 'controls': return 'play';
            case 'play': return 'score';
            case 'score': return 'play';
            default: return 'start';
        }
    }

    updateScreen = () => {
        if (this.state.screen === 'score') {
            this.setState({score: 0});
        }
        this.setState({screen: this.nextScreen()});
    }

    updateScore = () => {
        this.setState({score: this.state.score + 256});
    }

    strobe = () => {
        this.setState({blink: true});
        setTimeout(() => {
            this.setState({blink: false});
        }, 100);
    }

    renderScreen() {
        let screen = this.state.screen;
        if (screen === 'start') {
            return (
                <Screen
                    type={screen}
                    label='start'
                    action={this.updateScreen}
                />
            );
        } else if (this.state.screen === 'controls') {
            return (
                <Controls
                    type={screen}
                    label='next'
                    action={this.updateScreen}
                />
            );
        } else if (this.state.screen === 'play') {
            return (
                <Game
                    updateScore={this.updateScore}
                    strobe={this.strobe}
                    action={this.updateScreen}
                />
            );
        } else if (this.state.screen === 'score') {
            return (
                <Score
                    type={this.state.screen}
                    label='replay'
                    score={this.state.score}
                    action={this.updateScreen}
                />
            );
        } else {
            return (
                <Screen
                    type={this.state.screen}
                    label='start'
                    action={this.updateScreen}
                />
            );
        }
    }

    render() {
        return (
            <main className={this.state.blink ? 'blink' : ''}>
                <div id="console">
                    {this.renderScreen()}
                </div>
            </main>
        );
    }
}