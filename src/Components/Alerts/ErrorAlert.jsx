import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';


const AlertDismissible = ({ isBanned, history }) => {
  const [show, setShow] = useState(true);


  const goBackToLogIn = () => {
    setShow(false);
    history.push('/nothing');
    history.goBack();
    // setRefresh({});
  };

  if (show) {
    return isBanned ?
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You have been banned!</Alert.Heading>
        <p>
          Looks like you won't be able to use the main
          functionalities of the site for a while.
        </p>
      </Alert> :
      <Alert variant="danger" onClose={goBackToLogIn} dismissible>
        <Alert.Heading>Oh snap! Looks like there is an error!</Alert.Heading>
        <p>
          There isn't a user matching the username/password.
        </p>
      </Alert>;

  }
  return null;
};

AlertDismissible.propTypes = {
  isBanned: PropTypes.bool,
  history: PropTypes.object
};
export default AlertDismissible;
