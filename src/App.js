import React, { useEffect, useState, useCallback } from 'react';
import Logo from './klogo.js';
import './App.css';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import UsersList from './Components/UsersList.js';
import UserModal from './Components/UserModal.js';

const STATUS = {
  ERROR: -1,
  LOADING: 1,
  LOADED: 2,
  DELETED: 3
};
export const SERVER_URL = 'http://localhost:3001/users/';

const App = () => {
  
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(STATUS.LOADING);
    const [modalShow, setModalShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // user that is selected for editing
  
    useEffect(() => {
      axios.get(`${SERVER_URL}`).then(res => {
          // console.log('useEffect - axios.get', res.data);
          setUsers(res.data);
          setStatus(STATUS.LOADED);
      }).catch(error => {
          setStatus(STATUS.ERROR);
      });
    }, []);
    
    const deleteUser = useCallback(async (userId) => {
      try {
        await axios.delete(`${SERVER_URL}${userId}`);
        const filteredUsers = users.filter((user) => userId !== user.id)
        setUsers(filteredUsers)
        setStatus(STATUS.DELETED);
      } catch (error) {
        console.warn('deleteUser', error);
        setStatus(STATUS.ERROR);
      }
        
    }, [users]);

    const onEditUser = useCallback((user) => {
      setSelectedUser(user)
      setModalShow(true)
    }, [users]);

    const onAddNewUser = useCallback(() => {
      setSelectedUser(null);
      setModalShow(true);
    }, [users]);

  const onHide = useCallback(async (userDetails) => {
    setModalShow(false);
    if (!userDetails) return;

    // if the returned from the Modal contains id, it means its an update request
    if (userDetails.id) {
      updateUser(userDetails);
    } else {
      saveUser(userDetails);
    }
  }, [users]);
  
    const saveUser = useCallback(async (user) => {
      try {
        const result = await axios.post(`${SERVER_URL}`,
          { ...user },
          {
            headers: {
              "Content-type": "application/json"
            }
          }
        );
        const newUser = result.data;
        setModalShow(false);
        setUsers(users.concat(newUser));
      } catch (error) {
        console.warn('onHide', error);
        setStatus(STATUS.ERROR);
        setModalShow(false)
      }
    }, [users]);
  
    const updateUser = useCallback(async(user) => {
      try {
        const result = await axios.patch(`${SERVER_URL}${user.id}`,
          { ...user },
          {
            headers: {
              "Content-type": "application/json"
            }
          }
        );
        const updatedUser = result.data;
        const updatedUsers = users.map((user) => {
          if (updatedUser.id === user.id) {
            user = { ...updatedUser };
          }
          return user;
        })
        setModalShow(false);
        setUsers(updatedUsers);
      } catch (error) { 
        console.warn('onUpdateUser', error);
        setStatus(STATUS.ERROR);
        setModalShow(false);
      }
    }, [users]);

  const statusMessage = () => {
      switch (status) {
        case STATUS.LOADING:
          return <Alert variant={'light'}>Loading...</Alert>;
        case STATUS.DELETED:
          return <Alert variant={'success'}>User deleted successfully</Alert>;
        case STATUS.ERROR:
          return <Alert variant={'danger'}>Error: Could not complete the operation</Alert>;
        default:
          return null;
      }
  }
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1 className="App-title py-2">Welcome to Kyruus</h1>
      </header>
      <div className="conntainer px-3 py-3 text-right" >
        <Button variant="outline-info" onClick={onAddNewUser}>
          <FontAwesomeIcon icon={faUserPlus} /> Add User
        </Button>
      </div>
      {statusMessage()}
      <UsersList users={users} onDelete={deleteUser} onEdit={onEditUser} />
      <UserModal
        show={modalShow}
        onHide={onHide}
        user={selectedUser}
      />
    </div>
  );
}

export default App;
