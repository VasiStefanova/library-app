import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

// under construction
// eslint-disable-next-line react/prop-types
const BorrowBook = ({ status, userId }) =>{
  const [BookStatus, setBookStatus] = useState(status);
  const [BookUserId, setBookUserId] = useState(userId);
  const { user } = useContext(AuthContext);
  console.log(BookStatus, BookUserId);

  const borrowBook = () =>{
    setBookStatus('borrowed');
    setBookUserId(user.sub);

  };
  const returnBook = () =>{
    setBookStatus('available');
    setBookUserId(null);
  };
  // userId = null av || userId===user Idlogin return, userId!==
  if (BookUserId===null) {
    return <Button onClick={borrowBook}>Borrow</Button>;
  } else if (BookUserId===user.sub) {
    return <Button onClick={returnBook}>Return</Button>;
  } else {
    return null;
  }
  // const [isBorrowed, setIsBorrowed] = useState(status==='available');
  // const borrow = isBorrowed ? (
  //   <Button onClick={() => {
  //     status='borrowed';
  //     setIsBorrowed(false);
  //   }}
  //   >Borrow
  //   </Button>
  // ) : (
  //   <Button onClick={() => {
  //     status='available';
  //     setIsBorrowed(true);
  //   }}
  //   >Return
  //   </Button>
  // );
  // return borrow;

};

BorrowBook.propsTypes={
  status: PropTypes.string,
  userId: PropTypes.any
};

export default BorrowBook;
