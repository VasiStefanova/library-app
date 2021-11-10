import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext, clearUser } from '../context/auth-context';

const NavigationBar = () => {
  const { user, isLoggedIn, setAuth } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('token');
    clearUser();
    setAuth({
      user: { role: '' },
      token: '',
      isLoggedIn: false
    });
  };

  return (
    <Navbar bg="dark" variant="dark" className="navbar navbar-default">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">HOME</Navbar.Brand>
        <Nav className="me">
          {isLoggedIn ?
            <>
              {user?.role === 'admin' && <Nav.Link as={Link} to="/users/admin">Users</Nav.Link>}
              <Nav.Link as={Link} to="/books">Books</Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </>:
            <>
              <Nav.Link as={Link} to="/login">Log In</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
