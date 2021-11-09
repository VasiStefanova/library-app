import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Figure from 'react-bootstrap/Figure';
import UpdateUserReviewsLink from './UpdateUserReviewsLink';
import defaultAvatar from '../../../../Data/default-avatar.png';
import DeleteUserOwnReview from './DeleteUserOwnReview';
import Like from './LikeReviews';
import Button from '@restart/ui/esm/Button';

const UserReview = ({ title, content, avatar, votes, userId, bookId, setReRender }) => {


  return (
    <Col>
      <Figure>
        <Figure.Image
          src={avatar ? `http://localhost:5000/covers/${avatar}` : defaultAvatar}
          roundedCircle
          width={171}
          height={171}
        />
        <Figure.Caption>
          <h4>{title}</h4>
          <p>"{content}"</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
            <path
              d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784
            0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"
            />
          </svg>
          <Button onClick={Like} bookId>Like</Button>
          <p> {votes.length} Likes!</p>
        </Figure.Caption>
        <UpdateUserReviewsLink userId={userId} bookId={bookId} />
        <DeleteUserOwnReview userId={userId} bookId={bookId} setReRender={setReRender} />
      </Figure>
    </Col>
  );
};

export default UserReview;

UserReview.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  avatar: PropTypes.string,
  votes: PropTypes.array,
  userId: PropTypes.number,
  bookId: PropTypes.number,
  setReRender: PropTypes.func
};
