import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext, getToken } from '../../context/auth-context';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import fetchRequest from '../../requests/server-requests';


const BorrowBook = ({ id, userId, changeBookStatus }) =>{
  const [BookUserId=userId, setBookUserId] = useState(userId);
  const { user, isBanned } = useContext(AuthContext);

  const borrowBook = () => {

    const args = {
      path: `books/${id}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      handler: data =>{
        changeBookStatus(data.status);
        setBookUserId(data.userId);
      }
    };

    fetchRequest(args);
  };

  const returnBook = () => {

    const args = {
      path: `books/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      handler: data =>{
        changeBookStatus(data.status);
        setBookUserId(data.userId);
      }
    };

    fetchRequest(args);
  };
  if (BookUserId===null ) {
    return <Button disabled={isBanned} onClick={borrowBook}>Borrow</Button>;
  } else if (BookUserId===user.id) {
    return <Button disabled={isBanned} onClick={returnBook}>Return</Button>;
  } else {
    return null;
  }

};

BorrowBook.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.any,
  changeBookStatus: PropTypes.func
};

export default BorrowBook;
