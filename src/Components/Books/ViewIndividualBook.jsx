import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import BorrowBook from './BorrowBook';
import Card from 'react-bootstrap/Card';
import { getToken } from '../../context/auth-context';
import Container from 'react-bootstrap/Container';


const ViewIndividualBook = (props) => {

  const id = props.match.params.id;
  const [book, setBook] = useState({});
  const [bookStatus, setBookStatus] = useState('');
  const back = () => props.history.goBack();

  useEffect(()=>{
    fetch(`http://localhost:5000/api/v1/books/${id}/`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })

      .then(response => response.json())
      .then(data => {
        setBook(data);
        setBookStatus(data.status);
      })
      .catch(err => console.error(err));
  }, [bookStatus]);


  return (
    <>
      <Container key={book.id}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`http://localhost:5000/covers/${book.cover}`} />
          <Card.Body>
            <Card.Title>{book.title} - {book.author}</Card.Title>
          </Card.Body>
        </Card>
        <div>Status: {book.status} | Rating: {book.rating ? (book.rating) : ('No ratings')}</div>
        <BorrowBook id={book.id} userId={book.userId} changeBookStatus={setBookStatus} />
        <Button onClick={back}>Back</Button>
      </Container>
    </>
  );

};

ViewIndividualBook.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default ViewIndividualBook;
