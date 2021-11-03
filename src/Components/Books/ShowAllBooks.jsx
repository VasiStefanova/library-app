/* eslint-disable linebreak-style */
import React from 'react';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';


const ShowAllBooks = ({ history }) =>{

  const [books, setBooks] = useState([]);


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


  const routeChange = (id) =>{
    const path = `/books/${id}`;
    history.push(path);
  };


  return books.map(book =>{
    return (
      <Container key={book.id}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`http://localhost:5000/covers/${book.cover}`} />
          <Card.Body>
            <Card.Title>{book.title} - {book.author}</Card.Title>
            <Button onClick={() => routeChange(book.id)}>
              Details
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );

    // return (
    //   <Container key={book.id}>
    //     <div>
    //       <img src={`http://localhost:5000/covers/${book.cover}`} />
    //       <div>{book.title} - {book.author}</div>
    //       <Button onClick={() => routeChange(book.id)}>
    //         Details
    //       </Button>
    //     </div>
    //   </Container>
    // );
  });
};

export default ShowAllBooks;
