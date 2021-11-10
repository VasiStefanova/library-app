import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext, getToken } from '../../context/auth-context';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

// under construction
// eslint-disable-next-line react/prop-types
const BorrowBook = ({ id, userId, changeBookStatus }) =>{
  const [BookUserId=userId, setBookUserId] = useState(userId);
  const { user, isBanned } = useContext(AuthContext);

  const borrowBook = () =>{
    fetch(`http://localhost:5000/api/v1/books/${id}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })

      .then(response => response.json())
      .then(data =>{
        changeBookStatus(data.status);
        setBookUserId(data.userId);
      }
      )
      .catch(err => console.error(err));

  };
  const returnBook = () =>{
    fetch(`http://localhost:5000/api/v1/books/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })

      .then(response => response.json())
      .then(data =>{
        changeBookStatus(data.status);
        setBookUserId(data.userId);
      }
      )
      .catch(err => console.error(err));
  };
  // userId = null av || userId===user Idlogin return, userId!==
  if (BookUserId===null ) {
    return <Button disabled={isBanned} onClick={borrowBook}>Borrow</Button>;
  } else if (BookUserId===user.id) {
    return <Button disabled={isBanned} onClick={returnBook}>Return</Button>;
  } else {
    return null;
  }

};

BorrowBook.propsTypes={
  id: PropTypes.number,
  userId: PropTypes.any,
  changeBookStatus: PropTypes.func
};

export default BorrowBook;
