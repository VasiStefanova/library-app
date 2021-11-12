import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Figure from 'react-bootstrap/Figure';
import UpdateUserReviewsLink from './UpdateUserReviewsLink';
import defaultAvatar from '../../../Data/default-avatar.png';
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
          <Like bookId={bookId} reviewerId={userId} setReRender={setReRender} votes={votes} />
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
