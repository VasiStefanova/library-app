import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/auth-context';
import './UpdateUserReviewsLink.css';

import Button from 'react-bootstrap/Button';
const UpdateUserReviewsLink = ({ userId, bookId }) => {
  const { user, isBanned } = useContext(AuthContext);
  const history = useHistory();

  return user.id === userId ?
    <Button
      disabled={isBanned}
      variant="outline-secondary" size="sm"
      onClick={() => history.push(`/books/${bookId}/update-review`)}
    > Update your review
    </Button> :
    null;
};

UpdateUserReviewsLink.propTypes = {
  userId: PropTypes.number,
  bookId: PropTypes.number
};
export default UpdateUserReviewsLink;
