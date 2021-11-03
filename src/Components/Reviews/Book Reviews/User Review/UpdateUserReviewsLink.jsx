
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/auth-context';
import './UpdateUserReviewsLink.css';

const UpdateUserReviewsLink = ({ userId, bookId }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();


  return user.sub === userId ?
    <a
      onClick={() => history.push(`/books/${bookId}/update-review`)}
      className="btn btn-link update-reviews-link"
    > Update your review
    </a> :
    null;
};

UpdateUserReviewsLink.propTypes = {
  userId: PropTypes.number,
  bookId: PropTypes.number
};
export default UpdateUserReviewsLink;
