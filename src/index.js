import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter, Match, Miss } from 'react-router'

import App from './components/app'
import Login from './components/login'
import './css/style.css'

const Root = () => {
    return (
        <BrowserRouter basename='/Fest-App-BoilerPlate/'>
            <div>
                <Match exactly pattern='/' component={ App }/>
                <Match exactly pattern='/login' component={ Login }/>
                <Miss component={ App } />
            </div>
        </BrowserRouter>
    )
};

render(<Root />, document.getElementById('main'));