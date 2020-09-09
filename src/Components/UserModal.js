import React, { useEffect, memo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
const UserModal = memo((props) => {
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });
    const [buttonStatus, setButtonStatus] = useState('Save User');
    useEffect(() => {
        if (props.user) {
            setUserDetails(props.user)
            setButtonStatus('Update User')
        } else {
            setUserDetails({ name: '', email: '' })
            setButtonStatus('Save User')
        }
    }, [props.user]);

    const updateUserDetails = (event) => {
        const { name, value } = event.target;
        setUserDetails((prevState) => {
          return { ...prevState, [name]: value };
        });
    }
    const submit = (e) => {
        e.preventDefault();
        setButtonStatus('Please Wait...')
        if (userDetails.id) {
            props.onHide(userDetails);
        } else {
            props.onHide(userDetails);
        }
        return true
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="modal-add-user"
            centered
        >
            <Form onSubmit={submit}>
                <Modal.Header closeButton>
                    <Modal.Title id="modal-add-user">
                        {buttonStatus}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Please enter User's details</h5>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required value={userDetails.name} onChange={updateUserDetails} name="name" type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={userDetails.email} onChange={updateUserDetails} name="email" type="email" placeholder="Enter email" />
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> props.onHide()}>Cancel</Button>
                    <Button variant="info" type="submit">{buttonStatus}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
});

export default UserModal;
