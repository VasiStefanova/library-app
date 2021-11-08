import React, { useHistory } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';


const LeaveReview = (props) => {
  // const history = useHistory();


  const writeReview = () => {
    props.history.push(`${props.id}/create-review`);
  };

  return (
    <Button variant="outline-dark" size="sm" onClick={writeReview}>Leave a review</Button>
  );
};

LeaveReview.propTypes = {
  history: PropTypes.object,
  id: PropTypes.string,
};


export default withRouter(LeaveReview);
