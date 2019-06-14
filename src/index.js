import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/App';
import {Provider} from 'react-redux'
import store from './store'


store.subscribe(
    ()=> {
    }
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

