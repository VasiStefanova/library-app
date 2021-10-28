import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';


const ViewIndividualBook = (props) => {
  console.log(props);
  const id = props.match.params.id;
  const [book, setBook] = useState({});

  const back = () => props.history.goBack();
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
        <button onClick={back}>Back</button>
      </div>
    </>
  );

};

ViewIndividualBook.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,

};

export default ViewIndividualBook;
