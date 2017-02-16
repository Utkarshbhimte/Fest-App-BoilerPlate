import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter, Match} from 'react-router'

import App from './components/app'
import Admin from './components/admin'

import './css/style.css'

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern='/' component={ App }/>
                <Match exactly pattern='/admin' component={ Admin }/>
            </div>
        </BrowserRouter>
    )
};

render(<Root />, document.getElementById('main'));