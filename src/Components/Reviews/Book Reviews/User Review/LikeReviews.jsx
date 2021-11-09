import { AuthContext, getToken } from '../../../../context/auth-context';
import { useContext } from 'react';

const Like = (bookId) => {
  const { user } = useContext(AuthContext);

  fetch(`http://localhost:5000/api/v1/books/${bookId}/reviews`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    }
  })
    .then(response => response.json())
    .then(book => book.votes.push({ userId: user.id, username: user.username }));


};


export default Like;
