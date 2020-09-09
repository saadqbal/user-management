import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Logo from './klogo.js';
import './App.css';
import UsersList from './Components/UsersList.js';

export const SERVER_URL = 'http://localhost:3001/users/';
const STATUS = {
  ERROR: -1,
  LOADING: 1,
  LOADED: 2,
  DELETED: 3
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(STATUS.LOADING);


  useEffect(() => {
    axios.get(`${SERVER_URL}`).then(res => {
        // console.log('useEffect - axios.get', res.data);
        setUsers(res.data);
        setStatus(STATUS.LOADED);
    }).catch(error => {
        setStatus(STATUS.ERROR);
    });
  }, []);


  const onAddNewUser = () => {

  };

  const deleteUser = () => {

  };

  const onEditUser = () => {

  };



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
      
      <UsersList users={users} onDelete={deleteUser} onEdit={onEditUser} />
      
    </div>
    );
}

export default App;
