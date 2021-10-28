import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './LogIn.css';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { AuthContext } from '../../context/auth-context';

const LogIn = ({ history }) => {
  const [valid, setValid] = useState(false);
  const [form, setForm] = useState({});

  const { setAuth } = useContext(AuthContext);

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

    fetch(`http://localhost:5000/api/v1/users/login`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }

    })
      .then(response => response.json())
      .then((data)=> {

        if (data.message) {
          throw new Error(data.message);
        }

        try {
          const user = jwt.decode(data.token);
          localStorage.setItem('token', data.token);
          setAuth({ user, isLoggedIn: true });
          history.push('/home');

          console.log(user);
        } catch {
          throw new Error('Something went wrong!');
        }
      })
      .then(()=> history.goBack())
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

      <Button variant="dark" type="submit" onClick={onSubmit}>
        LogIn
      </Button>
    </Form>
  );
};

LogIn.propTypes = {
  history: PropTypes.object
};

export default LogIn;
