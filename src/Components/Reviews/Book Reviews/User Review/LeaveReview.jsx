import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';


const LeaveReview = (props) => {

  const writeReview = () => {
    props.history.push(`${props.id}/create-review`);
  };

  return (
    <Button disabled={props.isBannedUser} variant="outline-dark" size="sm" onClick={writeReview}>Leave a review</Button>
  );
};

LeaveReview.propTypes = {
  history: PropTypes.object,
  id: PropTypes.string,
  isBannedUser: PropTypes.bool
};


export default withRouter(LeaveReview);
