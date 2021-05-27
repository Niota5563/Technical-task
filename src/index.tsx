import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "mobx-react";
import {MobxInput} from './mobxInput'
import { create } from "mobx-persist";
import * as serviceWorker from "./serviceWorker";


interface Inputs {
  [key: string]: any;
}

export const inputs: Inputs = {
  mobxInput: new MobxInput(),
};

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

Object.keys(inputs).map((val) => hydrate(val, inputs[val]));



ReactDOM.render(
  <Provider {...inputs}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
