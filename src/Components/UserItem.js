import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'


const UserItem = memo(({index, user, onDelete, onEdit}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="text-center">
                <Button variant="outline-info" className="border-0 mx-1" onClick={()=> {onEdit(user)}}>
                    <FontAwesomeIcon icon={faUserEdit} />
                </Button>
                <Button variant="outline-info" className="border-0 mx-1" onClick={()=> {onDelete(user.id)}}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </td>
        </tr>
    );
});

export default UserItem;
