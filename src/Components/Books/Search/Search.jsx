import React from 'react';
import Form from 'react-bootstrap/Form';


const Search = () => {
  return (
    <Form.Control size="lg" type="text" placeholder="Search Book" onChange={search} />
  );
};

export default Search;
