import React from 'react';
import PropTypes from 'prop-types';

const ViewIndividualBook = (props) =>{

  return (
    <div id={props.id} className='ViewIndividualBook'>
      <img scr={props.cover} />
      <div>{props.title} - {props.author}</div>
      <div>Status: {props.status} | Rating: {props.rating}</div>
    </div>
  );

};

ViewIndividualBook.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  status: PropTypes.string,
  cover: PropTypes.string,
  rating: PropTypes.number

};

export default ViewIndividualBook;
