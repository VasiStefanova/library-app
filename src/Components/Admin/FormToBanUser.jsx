import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { getToken } from '../../context/auth-context';


const FormToBanUser = ({ userId, setRender }) => {

  const [valid, setValid] = useState(false);
  const [form, setForm] = useState({ 'banned': 1 });

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(form);
    setValid(!valid);
    fetch(`http://localhost:5000/api/v1//admin/users/${userId}/ban`, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }

    })
      .then(response => response.json())
      .then(() => setRender({}))
      .catch(err => console.error(err));

  };

  return (
    <Form onSubmit={onSubmit} validated={valid} noValidate autoComplete="off">
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter reason" required minLength={5} maxLength={50} onChange={e => setField('description', e.target.value)} />
        <Form.Control.Feedback type='invalid'>
          Invalid username! Username must be between 3-25 charcters long!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ban Until</Form.Label>
        <Form.Control type="date" required minLength={3} maxLength={25} placeholder="Password" onChange={e => setField('expiration', Date.parse(e.target.value))} />
        <Form.Control.Feedback type='invalid'>
          Invalid description! Description must be between 5-50 charcters long!
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="danger" type="submit" onClick={onSubmit}>
        Ban
      </Button>
    </Form>

  );
};

FormToBanUser.propTypes = {
  userId: PropTypes.number,
  setRender: PropTypes.func
};
export default FormToBanUser;
