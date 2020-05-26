import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
    render() {
        return (
            <h1>Hello Playground</h1>
        );
    }
}

ReactDOM.render(<App/>,
    document.getElementById('app')
)