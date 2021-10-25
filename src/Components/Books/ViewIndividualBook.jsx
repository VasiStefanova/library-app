import React from 'react';
import { data } from '../../Data/data.js';
// import PropTypes from 'prop-types';

const ViewIndividualBook = () =>{

  debugger;
  const foundBook = data.find(book => book.id === 3);
  return (
    <div id={foundBook.id} className='ViewIndividualBook'>
      <img scr={foundBook.cover} />
      <div>{foundBook.title} - {foundBook.author}</div>
      <div>Status: {foundBook.status} | Rating: {foundBook.rating}</div>
    </div>
  );

};

// ViewIndividualBook.propTypes = {
//   id: PropTypes.string,
//   title: PropTypes.string,
//   author: PropTypes.string,
//   status: PropTypes.string,
//   cover: PropTypes.string,
//   rating: PropTypes.number

// };

export default ViewIndividualBook;
