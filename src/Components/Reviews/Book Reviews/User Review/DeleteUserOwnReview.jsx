import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/auth-context';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { getToken } from '../../../../context/auth-context';

const DeleteUserOwnReview = ({ userId, bookId, setReRender }) => {

  const { user } = useContext(AuthContext);

  const deleteReview = () => {
    fetch(`http://localhost:5000/api/v1/books/${bookId}/reviews`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setReRender({});
      })
      .catch(err => console.error(err));
  };

  return user.sub === userId ?(
    <Button variant="outline-danger" size="sm" onClick={deleteReview}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708
         0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5
         0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293
         8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      Delete your review
    </Button>
  ) :
    null;

};

DeleteUserOwnReview.propTypes = {
  userId: PropTypes.number,
  bookId: PropTypes.number,
  setReRender: PropTypes.func
};

export default DeleteUserOwnReview;
