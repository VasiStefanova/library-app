import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

// under construction
const BorrowBook = ({ status }) =>{
  const [isBorrowed, setIsBorrowed] = useState(status==='available');
  const borrow = isBorrowed ? (
    <Button onClick={() => {
      status='borrowed';
      setIsBorrowed(false);
    }}
    >Borrow
    </Button>
  ) : (
    <Button onClick={() => {
      status='available';
      setIsBorrowed(true);
    }}
    >Return
    </Button>
  );

  return (
    { borrow }
  );
};

BorrowBook.propsTypes={
  status: PropTypes.string
};

export default BorrowBook;
