import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getToken } from '../../../../context/auth-context';

// eslint-disable-next-line react/prop-types
const CreateBookReview = ({ match }) => {
  console.log(match);

  const [form, setForm] = useState({});

  const setField = (field, value) => {
    form[field] = value;
    setForm(form);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // setValid(!valid);

    // eslint-disable-next-line react/prop-types
    fetch(`http://localhost:5000/api/v1/books/${match.params.id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      }
    })
      .then(response => response.json())
      .then((response)=> {
        console.log(response);
        if (response.message) {
          throw new Error(response.message);
        }
      })
      .catch(({ message }) => console.error(message));
  };

  return (
    <>
      <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
        <Form.Control
          required
          minLength={5}
          maxLength={50}
          as="textarea"
          style={{ width: '500px' }}
          placeholder="Leave a comment here"
          onChange={e => setField('title', e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          Title must be between 5-50 charcters long!
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Leave a comment here">
        <Form.Control
          required
          minLength={10}
          maxLength={500}
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }, { width: '500px' }}
          onChange={e => setField('content', e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          Review must be between 10-500 charcters long!
        </Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="dark" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </>
  );
};


export default CreateBookReview;
