import React from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';


const ViewIndividualBook = () => {

  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(()=>{
    fetch(`http://localhost:5000/api/v1/books/${id}/`, {
      headers: {
      // Hardcoded authorization token//
      // eslint-disable-next-line max-len
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibW9ycGhldXMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1NzgwMzUsImV4cCI6MTY0MzIxODAzNX0.HWMHorMgf3a2EvNPVsvtKxJOFVedn-3kLOANnSiFzmk',
      },
    })

      .then(response => response.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div id={book.id} className='ViewIndividualBook'>
        <img src={`http://localhost:5000/covers/${book.cover}`} />
        <div>{book.title} - {book.author}</div>
        <div>Status: {book.status} | Rating: {book.rating}</div>
      </div>
    </>
  );

};

// ViewIndividualBook.propTypes = {
//   id: PropTypes.number,
//   title: PropTypes.string,
//   author: PropTypes.string,
//   status: PropTypes.string,
//   cover: PropTypes.string,
//   rating: PropTypes.number

// };

export default ViewIndividualBook;
