/* eslint-disable no-lone-blocks */
import React from 'react';
import './UserList.css'

const UsersList = (props) => (
    <>
    
    <ul>
        {props.users.map((user) => (
        <li key={user.id}>
            
                <div className="contact">
                    <div >Name:{user.name}</div>
                    <div>UserName:{user.username}</div>
                    <div>Phone:{user.phone}</div>
                    <div>Email:{user.email}</div>
                    <div className="btn2">
            <button className="button1" onClick={() => props.onUserClick(user.id)} style={{ cursor: 'pointer' }}>Изменить</button>
            </div>
                </div>
           <div className="avatar">
            <img src={user.avatar}></img>
             </div>
        </li>
        ))}
    </ul>
    </>
)

export default UsersList