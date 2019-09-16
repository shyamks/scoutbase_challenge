import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from '@apollo/react-hooks';
import Loadable from 'react-loadable'

import AppContext from './appContext'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import client from './client.js'

console.log('herer')
window.onload = () => {
    hydrate(
        <BrowserRouter>
            <ApolloProvider client={client}>
                <AppContext.Provider value={{ serverData: window.__ROUTE_DATA__ }}>
                    <App />
                </AppContext.Provider>
            </ApolloProvider>
        </BrowserRouter>,
        document.getElementById('root')
    );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
