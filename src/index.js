import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  injectGlobalStyle,
  injectResetStyle,
} from 'reactackle';

injectGlobalStyle();
injectResetStyle();

ReactDOM.render(<App />, document.getElementById('root'));
