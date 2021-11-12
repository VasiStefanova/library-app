import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../.././Data/default-avatar.png';
import Figure from 'react-bootstrap/Figure';
import Badge from 'react-bootstrap/Badge';
import { getToken } from '../../context/auth-context';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/esm/Accordion';
import FormToBanUser from './FormToBanUser';
import fetchRequest from '../../requests/server-requests';


const SingleUser = ({ setRender, userId, username, avatar, role, points, banstatus, deleted }) => {

  const deleteUser = () => {

    const args = {
      path: `admin/users/${userId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      handler: () => setRender({})
    };

    fetchRequest(args);
  };

  const unDeleteUser = () => {

    const args = {
      path: `admin/users/${userId}`,
      method: 'PUT',
      body: JSON.stringify({ 'deleted': 0 }),
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      handler: () => setRender({})
    };

    fetchRequest(args);
  };

  const removeBan = () => {

    const args = {
      path: `admin/users/${userId}/ban`,
      method: 'PUT',
      body: JSON.stringify({
        'banned': 0,
        'description': 'unbanned',
        // just a random date in the future in ms so the unban server endpoint works//
        'expiration': 1637712000000
      }),
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      handler: () => setRender({})
    };

    fetchRequest(args);
  };

  return (
    <tr>
      <td>{userId}</td>
      <td>{username}</td>
      <td>
        <Figure.Image
          src={avatar ? `http://localhost:5000/covers/${avatar}` : defaultAvatar}
          roundedCircle
          width={50}
          height={50}
        />
      </td>
      <td>{role}</td>
      <td>{points}</td>
      <td>
        {banstatus && banstatus.banned === 1 ?
          <>
            <Badge bg="danger">
              banned
            </Badge>
            <Button className='remove-ban' variant='link' size="sm" onClick={removeBan}>
              remove ban
            </Button>
            <p className="h6">Reason: {banstatus.description}</p>
            <p className="h6">Banned until: {new Date(banstatus.expiration).toLocaleDateString('en-UK')}</p>
          </> :
          <Accordion defaultActiveKey="1" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Button>
                <h6>Ban User</h6>
              </Accordion.Button>
              <Accordion.Body>
                <FormToBanUser userId={userId} setRender={setRender} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>}
      </td>
      <td>{deleted === 0 ?
        <Badge pill bg="success" onClick={deleteUser} style={{ cursor: 'pointer' }}>
          active
        </Badge> :
        <Badge pill bg="danger" onClick={unDeleteUser} style={{ cursor: 'pointer' }}>
          non-active
        </Badge>}
      </td>
    </tr>
  );
};

SingleUser.propTypes = {
  setRender: PropTypes.func,
  userId: PropTypes.number,
  username: PropTypes.string,
  avatar: PropTypes.string,
  role: PropTypes.string,
  points: PropTypes.number,
  banstatus: PropTypes.object,
  deleted: PropTypes.number
};
export default SingleUser;
