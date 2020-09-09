import React, { memo } from 'react';
import { Table } from 'react-bootstrap';
import UserItem from './UserItem';


const UsersList = memo(({users, onDelete, onEdit}) => {
    
    const userRows = users.map( (user, index) => {
        return (
            <UserItem index={index} user={user} key={user.id} onDelete={onDelete} onEdit={onEdit} />
        );
    });
    return (
        <div className="table-responsive px-3 py-3">
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRows}
                    </tbody>
            </Table>
        </div>
    );
});

export default UsersList;
