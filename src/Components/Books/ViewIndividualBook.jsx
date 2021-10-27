import React from 'react';
import PropTypes from 'prop-types';

const ViewIndividualBook = (props) =>{

  return (
    <div id={props.id} className='ViewIndividualBook'>
      <img src={`http://localhost:5000/covers/${props.cover}`} />
      <div>{props.title} - {props.author}</div>
      <div>Status: {props.status} | Rating: {props.rating}</div>
    </div>
  );

};

ViewIndividualBook.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
  status: PropTypes.string,
  cover: PropTypes.string,
  rating: PropTypes.number

};

export default ViewIndividualBook;
