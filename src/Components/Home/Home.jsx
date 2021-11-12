import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import AlertDismissible from '../Alerts/ErrorAlert';
import fetchRequest from '../../requests/server-requests';


const Home = () => {
  const [books, setBooks] = useState([]);
  const { user, isLoggedIn, isBanned } = useContext(AuthContext);

  useEffect(() => {

    const args = {
      path: 'books',
      headers: {
        // hard-coded token to show carousel//
      // eslint-disable-next-line max-len
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoibmVvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM0NTc4MDEwLCJleHAiOjE2NDMyMTgwMTB9.Pt1dfv0OcyfThoF5hCbeFVq9KX4rN4QNL1EqlMd3-UI',
      },
      handler: data => {
        setBooks(data.books);
      }
    };

    fetchRequest(args);
  }, []);

  const carouselBooks = books.map((book) => {
    return (
      <Carousel.Item key={book.id}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`http://localhost:5000/covers/${book.cover}`} />
          <Card.Body>
            <Card.Title>{book.title} - {book.author}</Card.Title>
          </Card.Body>
        </Card>
      </Carousel.Item>
    );
  });

  return (
    <Container fluid className="welcome-msg">
      <h1>Welcome to our library!</h1>
      {isLoggedIn ? <h4>Hello {user.username}!</h4> : <h4>Please log in!</h4>}
      {isLoggedIn && isBanned ? <AlertDismissible isBanned={isBanned} /> : null}
      <Carousel>{carouselBooks}</Carousel>
    </Container>
  );
};

export default Home;
