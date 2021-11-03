import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { useEffect, useState } from 'react';
import Figure from 'react-bootstrap/Figure';
import './ReadBookReviews.css';
import UserReview from './User Review/UserReviwes';
import PropTypes from 'prop-types';


const ReadBookReviews = ({ match }) => {
  const id = match.params.id;

  const [bookInfo, setBookInfo] = useState({});
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/books/${id}/reviews`, {
      headers: {
        // Hardcoded authorization token//
        // eslint-disable-next-line max-len
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibW9ycGhldXMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1NzgwMzUsImV4cCI6MTY0MzIxODAzNX0.HWMHorMgf3a2EvNPVsvtKxJOFVedn-3kLOANnSiFzmk',
      },
    })
      .then(response => response.json())
      .then(data => {
        setReviews(data);
        setBookInfo(data[0] || {});
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <>
      {reviews.length ?
        <>
          <Container className='book-container'>
            <Figure>
              <Figure.Image
                thumbnail
                width={171}
                height={180}
                alt={bookInfo.bookTitle}
                src={`http://localhost:5000/covers/${bookInfo.cover}`}
              />
              <Figure.Caption>
                Book Title: {bookInfo.bookTitle}
              </Figure.Caption>
            </Figure>
          </Container>

          <Container className="heading">
            <h2> User Reviews: </h2>
          </Container>

          <Container>
            <Row className="reviews-container">
              {reviews.map(review => <UserReview
                key={review.userId}
                bookId={+id}
                title={review.title}
                content={review.content}
                userId={review.userId}
                avatar={review.avatar}
                votes={review.votes} />)}
            </Row>
          </Container>
        </> :
        <Container className="no-reviews-msg align-self-center">
          <h3> There are no user reviews for this book yet! Be the first to write one.</h3>
          <Button variant="outline-dark">Back to Book</Button>
        </Container>}
    </>
  );
};

ReadBookReviews.propTypes = {
  match: PropTypes.object,
};
export default ReadBookReviews;
