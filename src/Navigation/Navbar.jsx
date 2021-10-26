import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="navbar navbar-default">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">HOME</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Log In</Nav.Link>
          <Nav.Link as={Link} to="/books/5/reviews">5</Nav.Link>
          <Nav.Link as={Link} to="/books/3/reviews">3</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
