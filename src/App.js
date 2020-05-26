import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
    render() {
        return (
            React.createElement('h1', null, "Hello Playground")
        );
    }
}

ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('app')
)