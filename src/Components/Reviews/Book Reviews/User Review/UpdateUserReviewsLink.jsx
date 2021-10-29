
import React, { useContext } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/auth-context';
import './UpdateUserReviewsLink.css';

const UpdateUserReviewsLink = ({ userId }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory;


  return user.sub === userId ?
    <a
      onClick={() => history.push('/book/:id/update-review')}
      className="btn btn-link disabled update-reviews-link"
    > Update your review
    </a> :
    null;
};

UpdateUserReviewsLink.propTypes = {
  userId: propTypes.number
};
export default UpdateUserReviewsLink;
