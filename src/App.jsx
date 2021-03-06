/* eslint-disable require-jsdoc */
import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navigation/Navbar.jsx';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import LogIn from './Components/LogIn/LogIn';
import ShowAllBooks from './Components/Books/ShowAllBooks';
import ViewIndividualBook from './Components/Books/ViewIndividualBook';
import ReadBookReviews from './Components/Reviews/Book Reviews/ReadBookReviews';
import { AuthContext, getUser, getDecodedUser } from './context/auth-context';
import PropTypes from 'prop-types';
import CreateBookReview from './Components/Reviews/Create Book Review/CreateBookReview';
import UpdateBookReview from './Components/Reviews/User Review/UpdateBookReview';
import ShowAllUsers from './Components/Admin/ShowAllUsers';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest} render={(props) => {
        return auth ?
          <Component {...props} /> :
          <Redirect to='/login' />;
      }}
    />
  );
};

// eslint-disable-next-line func-style
function App() {
  const user = getDecodedUser();
  const [auth, setAuth] = useState({
    user,
    isLoggedIn: !!user
  });

  useEffect(() => {
    getUser()
      .then(setAuth)
      .catch(err => console.error(err));
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route exact path="/">
            <Redirect to={auth?.isLoggedIn ? '/books' : '/login'} />
          </Route>
          <Route path="/login" component={LogIn} />
          <PrivateRoute path="/books" exact auth={auth?.isLoggedIn} component={ShowAllBooks} />
          <PrivateRoute path="/books/:id" exact auth={auth?.isLoggedIn} component={ViewIndividualBook} />
          <PrivateRoute path="/books/:id/reviews" exact auth={auth?.isLoggedIn} component={ReadBookReviews} />
          <PrivateRoute path="/books/:id/create-review" exact auth={auth?.isLoggedIn} component={CreateBookReview} />
          <PrivateRoute path="/books/:id/update-review" exact auth={auth?.isLoggedIn} component={UpdateBookReview} />
          <PrivateRoute path="/users/admin" exact auth={auth?.isLoggedIn} component={ShowAllUsers} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  auth: PropTypes.bool
};
export default App;
