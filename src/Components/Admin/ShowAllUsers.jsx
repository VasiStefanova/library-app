import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import SingleUser from './SingleUser';
import { getToken } from '../../context/auth-context';
import './ShowAllUsers.css';
import fetchRequest from '../../requests/server-requests';

const ShowAllUsers = () => {

  const [users, setUsers] = useState([]);
  const [render, setRender] = useState([]);

  useEffect(() => {

    const args = {
      path: 'admin/users',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      handler: data => setUsers(data)
    };

    fetchRequest(args);
  }, [render]);

  return (
    <>
      {users.length ?
        <Table className='users-table' striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>user Id</th>
              <th>username</th>
              <th>avatar</th>
              <th>role</th>
              <th>points</th>
              <th>ban status</th>
              <th>deleted</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <SingleUser
                setRender={setRender}
                key={user.id}
                userId={user.id}
                username={user.username}
                avatar={user.avatar}
                role={user.role}
                points={user.points}
                banstatus={user.banstatus}
                deleted={user.deleted}
              />)}
          </tbody>
        </Table> :
        <div>
          No users!
        </div>}
    </>
  );
};

export default ShowAllUsers;
