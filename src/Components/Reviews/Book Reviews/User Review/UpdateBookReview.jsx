import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/auth-context';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { getToken } from '../../../../context/auth-context';


const UpdateBookReview = ({ match, history }) => {
  const { user } = useContext(AuthContext);
  const bookId = +match.params.id;

  const [bookReview, setBookReview] = useState({});

  const setField = (field, value) => {
    bookReview[field] = value;
    setBookReview(bookReview);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/users/${user.sub}/reviews`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      }
    })
      .then(respone => respone.json())
      .then(data => {
        const { title, content } = data.find(r => r.bookId === bookId);
        setBookReview({ title, content });
      })
      .catch(err => console.error(err));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // setValid(!valid);

    // eslint-disable-next-line react/prop-types
    fetch(`http://localhost:5000/api/v1/books/${bookId}/reviews`, {
      method: 'PUT',
      body: JSON.stringify(bookReview),
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
        history.goBack();
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
          defaultValue={bookReview.title}
          onChange={e => setField('title', e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          Title must be between 5-50 charcters long!
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Leave a comment here">
        <Form.Control
          defaultValue={bookReview.content}
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
      <Button
        variant="dark"
        type="submit"
        onClick={onSubmit}
      >
        Update
      </Button>
    </>
  );

};

UpdateBookReview.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};
export default UpdateBookReview;
