import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import BorrowBook from './BorrowBook';
import Card from 'react-bootstrap/Card';


const ViewIndividualBook = (props) => {

  const id = props.match.params.id;
  const [book, setBook] = useState({});
  const back = () => props.history.goBack();
  useEffect(()=>{
    fetch(`http://localhost:5000/api/v1/books/${id}/`, {
      headers: {
        // Hardcoded authorization token//
        // eslint-disable-next-line max-len
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibW9ycGhldXMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1NzgwMzUsImV4cCI6MTY0MzIxODAzNX0.HWMHorMgf3a2EvNPVsvtKxJOFVedn-3kLOANnSiFzmk',
      },
    })

      .then(response => response.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, []);


  return (
    <>
      <container key={book.id}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`http://localhost:5000/covers/${book.cover}`} />
          <Card.Body>
            <Card.Title>{book.title} - {book.author}</Card.Title>
          </Card.Body>
        </Card>
      </container>
      <div>Status: {book.status} | Rating: {book.rating ? (book.rating) : ('No ratings')}</div>
      <BorrowBook {...book} />
      <Button onClick={back}>Back</Button>
    </>
  );

};

ViewIndividualBook.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,

};

export default ViewIndividualBook;
