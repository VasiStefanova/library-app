/* eslint-disable linebreak-style */
import React from 'react';
import { data } from '../../Data/data.js';
// import ViewIndividualBook from './ViewIndividualBook.jsx';

const ShowAllBooks = () =>{

  return data.map(book =>{

    return (
      <div key={book.id}>
        <img scr={book.cover} />
        <div>{book.title} - {book.author}</div>
        <button>Details</button>
      </div>

    );
  });
};

export default ShowAllBooks;
