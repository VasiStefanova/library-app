import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { getToken } from '../../context/auth-context';
import fetchRequest from '../../requests/server-requests';

const FormToBanUser = ({ userId, setRender }) => {

  const [valid, setValid] = useState(false);
  const [form, setForm] = useState({ 'banned': 1 });

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate()+1);

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

    const args = {
      path: `admin/users/${userId}/ban`,
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      handler: () => setRender({})
    };

    fetchRequest(args);
  };

  return (
    <Form onSubmit={onSubmit} validated={valid} noValidate autoComplete="off">
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter reason" required minLength={5} maxLength={50} onChange={e => setField('description', e.target.value)} />
        <Form.Control.Feedback type='invalid'>
          Invalid description! Description must be between 5-50 charcters long!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ban Until</Form.Label>
        <Form.Control type="date" required min={tomorrowDate.toISOString().split('T')[0]} onChange={e => setField('expiration', Date.parse(e.target.value))} />
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
