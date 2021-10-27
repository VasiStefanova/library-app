/* eslint-disable react/jsx-indent-props */
/* eslint-disable linebreak-style */
import React from 'react';
import { data } from '../../Data/data.js';
import ViewIndividualBook from './ViewIndividualBook';

const ShowAllBooks = () =>{

  return data.map(book =>{
    return (
      <div key={book.id}>
        <img src={`http://localhost:5000/covers/${book.cover}`} />
        <div>{book.title} - {book.author}</div>
        <button onClick={() =>
          <ViewIndividualBook
            id={book.id}
            title={book.title}
            author={book.author}
            status={book.status}
            cover={book.cover}
            rating={book.rating}
          />}
        >Details
        </button>
      </div>

    );
  });
};

export default ShowAllBooks;
