import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import './ReadBookReviews.css';
import UserReview from '../User Review/UserReviews';
import { getToken } from '../../../context/auth-context';
import LeaveReview from '../User Review/LeaveReview';
import { AuthContext } from '../../../context/auth-context';
import fetchRequest from '../../../requests/server-requests';


const ReadBookReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  // This will be used by child components
  // to trigger useEffect on some change in the child.
  const [reRender, setReRender] = useState({});
  const { user, isBanned } = useContext(AuthContext);
  useEffect(() => {

    const args = {
      path: `books/${id}/reviews`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      handler: data =>{
        setReviews(data);
      }
    };

    fetchRequest(args);
  }, [id, reRender]);


  return (
    <>
      {reviews.length ?
        <>
          <Container className="heading">
            <h2> User Reviews: </h2>
            {reviews.find(review => review.userId === user.id) ?
              null:
              <LeaveReview id={id} isBannedUser={isBanned} />}
          </Container>

          <Container>
            <Row className="reviews-container">
              {reviews.map(review => <UserReview
                key={review.userId}
                bookId={+id}
                setReRender={setReRender}
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
          <LeaveReview id={id} isBannedUser={isBanned} />
        </Container>}
    </>
  );
};

ReadBookReviews.propTypes = {
  id: PropTypes.string,
};
export default ReadBookReviews;
