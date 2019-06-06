import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './core/store/configureStore';
import StreetMap from './components/Map/StreetMap';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

let app = (
    <Provider store={store}>
        <StreetMap />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
