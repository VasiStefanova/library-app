/* eslint-disable require-jsdoc */
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navigation/Navbar.jsx';
import { BrowserRouter, Switch, Route, PrivateRoute } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import LogIn from './Components/LogIn/LogIn';
import ShowAllBooks from './Components/Books/ShowAllBooks';
import ViewIndividualBook from './Components/Books/ViewIndividualBook';
import ReadBookReviews from './Components/Reviews/Book Reviews/ReadBookReviews';


// eslint-disable-next-line func-style
function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={LogIn} />
        <PrivateRoute path="/books" exact component={ShowAllBooks} />
        <PrivateRoute path="/books/:id" exact component={ViewIndividualBook} />
        <PrivateRoute path="/books/:id/reviews" component={ReadBookReviews} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
