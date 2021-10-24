import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import LogIn from './Components/LogIn/LogIn';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={LogIn} />
    </Switch>
  </BrowserRouter>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

