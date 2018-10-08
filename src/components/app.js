import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Body from './body';
import '../../node_modules/react-vis/dist/style.css';
import '../style.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        );
    }
}

export default App;