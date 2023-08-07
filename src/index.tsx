import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppWithRedux} from "./AppWithRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";


ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>,
    document.getElementById('root'));