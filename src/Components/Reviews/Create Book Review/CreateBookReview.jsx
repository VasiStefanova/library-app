import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getToken } from '../../../context/auth-context';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Figure from 'react-bootstrap/Figure';
import './CreateBookReview.css';
import fetchRequest from '../../../requests/server-requests';

const CreateBookReview = ({ match, history }) => {

  const [form, setForm] = useState({});
  const setField = (field, value) => {
    form[field] = value;
    setForm(form);
  };
  const [bookInfo, setBookInfo] = useState({});

  useEffect(() => {

    const args = {
      path: `books/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      handler: data =>{
        setBookInfo(data);
      }
    };

    fetchRequest(args);
  }, [match.params.id]);


  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const args = {
      path: `books/${match.params.id}/reviews`,
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      handler: response => {
        if (response.message) {
          throw new Error(response.message);
        }
        history.goBack();
      }
    };

    fetchRequest(args);
  };

  return (
    <>
      <Container className='book-container'>
        <Figure>
          <Figure.Image
            thumbnail
            width={171}
            height={180}
            alt={bookInfo.title}
            src={`http://localhost:5000/covers/${bookInfo.cover}`}
          />
          <Figure.Caption>
            Book Title: {bookInfo.title}
          </Figure.Caption>
        </Figure>
      </Container>

      <Form className="create-review-form">
        <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
          <Form.Control
            required
            minLength={5}
            maxLength={50}
            as="textarea"
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
            style={{ height: '100px' }}
            onChange={e => setField('content', e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Review must be between 10-500 charcters long!
          </Form.Control.Feedback>
        </FloatingLabel>

        <Button style={{ margin: '10px auto' }} variant="dark" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

CreateBookReview.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

export default CreateBookReview;
