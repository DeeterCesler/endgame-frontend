import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CookiesProvider} from "react-cookie";
import HttpsRedirect from 'react-https-redirect';


ReactDOM.render(
    <HttpsRedirect>
        <CookiesProvider>
            <BrowserRouter>
                {/* <Provider store={store}> */}
                    <App />
                {/* </Provider> */}
            </BrowserRouter>
        </CookiesProvider>
    </HttpsRedirect>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
