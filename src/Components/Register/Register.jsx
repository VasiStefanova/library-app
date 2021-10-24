import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.css';


const Register = () => {
  const [isUserNameValid, setUserNameValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [isRepeatPasswordValid, setRepeatPasswordValid] = useState(false);

  const checkUserNameValid = (event) => {
    const currentUserName = event.target.value;
    let isValid = false;
    if (currentUserName && currentUserName.length >= 3 && currentUserName.length <= 25) {
      isValid = true;
    }

    setUserNameValid(isValid);
  };

  const checkPasswordValid = (event) => {
    const currentPassword = event.target.value;
    let isValid = false;
    let isRepPassValid = false;
    if (currentPassword && currentPassword.length >= 3 && currentPassword.length <= 25) {
      isValid = true;
    }

    isRepPassValid = currentPassword === repeatPasswordValue;

    setRepeatPasswordValid(isRepPassValid);
    setPasswordValid(isValid);
    setPasswordValue(currentPassword);
  };

  const checkRepeatPasswordValid = (event) => {
    const currentRepeatPassword = event.target.value;
    let isValid = false;

    if (currentRepeatPassword === passwordValue) {
      isValid = true;
    }

    setRepeatPasswordValid(isValid);
    setRepeatPasswordValue(currentRepeatPassword);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    alert(isRepeatPasswordValid && isPasswordValid && isUserNameValid);
  };

  return (
    <Form className="register-form" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" onChange={checkUserNameValid} />
        <Form.Text className="text-muted">
          Note: Your username must be between 3-25 characters.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={checkPasswordValid} />
        <Form.Text className="text-muted">
          Note: Your password must be between 3-25 characters.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={checkRepeatPasswordValid} />
      </Form.Group>

      <Button variant="dark" type="submit" disabled={!isUserNameValid || !isPasswordValid || !isRepeatPasswordValid}>
        Submit
      </Button>
    </Form>
  );
};

export default Register;
