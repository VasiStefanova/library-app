import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.css';
import PropTypes from 'prop-types';


const Register = ({ history }) => {
  const [valid, setValid] = useState(false);
  const [form, setForm] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValid(!valid);
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(`${key}`, `${form[key]}`));


    fetch(`http://localhost:5000/api/v1/users/`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then((response)=> {
        if (response.id) {
          history.push('/login');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <Form className="register-form" onSubmit={onSubmit} validated={valid} noValidate autoComplete="off">
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" required minLength={3} maxLength={25} onChange={e => setField('username', e.target.value)} />
        <Form.Text className="text-muted">
          Note: Your username must be between 3-25 characters.
        </Form.Text>
        <Form.Control.Feedback type='invalid'>
          Invalid username! Username must be between 3-25 charcters long!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control type="password" required minLength={3} maxLength={25} placeholder="Password" onChange={e => setField('password', e.target.value)} />
        <Form.Text className="text-muted">
          Note: Your password must be between 3-25 characters.
        </Form.Text>
        <Form.Control.Feedback type='invalid'>
          Invalid password! Password must be between 3-25 charcters long!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Avatar</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Button variant="dark" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  );
};

Register.propTypes = {
  history: PropTypes.object,
};

export default Register;
