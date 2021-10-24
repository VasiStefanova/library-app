import React from 'react';
import './Home.css';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <Container fluid className="welcome-msg">
      <h1>Welcome to Library Project!</h1>
    </Container>
  );
};

export default Home;
