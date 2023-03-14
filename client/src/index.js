import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { GoogleOAuthProvider } from '@react-oauth/google';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = configureStore({ reducer: reducers })

ReactDOM.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>,
    document.getElementById('root'));