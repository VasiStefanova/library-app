import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

const Home = () => {
  const [books, setBooks] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);
  console.log(user, isLoggedIn);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/books/`, {
      headers: {
      // Hardcoded authorization token//
      // eslint-disable-next-line max-len
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibW9ycGhldXMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1NzgwMzUsImV4cCI6MTY0MzIxODAzNX0.HWMHorMgf3a2EvNPVsvtKxJOFVedn-3kLOANnSiFzmk',
      },
    })

      .then(response => response.json())
      .then(data => setBooks(data.books))
      .catch(err => console.error(err));
  }, []);

  const carouselBooks = books.map((book) => {
    return (
      <Carousel.Item key={book.id}>
        <Card style={{ width: '18rem', left: 525 }}>
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
      <h1>Welcome to Library Project!</h1>
      {isLoggedIn ? <h4>Hello {user.username}!</h4> : <h4>Please log in!</h4>}
      <Carousel>{carouselBooks}</Carousel>
    </Container>
  );
};

export default Home;
