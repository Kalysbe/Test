import React, { Component } from 'react'
import { loadUsers } from '../api/users';
import UsersList from './Users/UsersList.js';
import Modal from './Modal';

import 'bulma/css/bulma.css'

class Main extends Component {
  state = {
    users: [],
    clickedUserId: undefined,
  }

  onUserClick = (userId) => {
    this.setState({
      clickedUserId: userId
    })
  }

  getUserById = (id) => {
    for (let index = 0; index < this.state.users.length; index++) {
      const element = this.state.users[index];
      if(element.id === id) {
        return element;
      }
    }
  }

  onCloseClick = () => {
    this.setState({
      clickedUserId: undefined
    })
  }

  onUserUpdate = (id, updatedUserFields) => {
    const updatedUsers = this.state.users.map(user => {
      if(id === user.id) {
        return { ...user, ...updatedUserFields }
      }
      return user
    })

    this.setState({
      users: updatedUsers
    })

    localStorage.setItem('users', JSON.stringify(updatedUsers) )
  }
  
  async componentDidMount() {
    const response = await loadUsers();

    if(localStorage.getItem('users') !== null) {
      this.setState({
        users: JSON.parse(localStorage.getItem('users'))
      })
    } else {
      this.setState({
        users: response.data
      })
      localStorage.setItem('users', JSON.stringify(response.data))
    }

  }

  render() {

    return (
      <div>
     

        <div className="columns">
          <div className="column is-full">
            <table className="table is-fullwidth">
              <UsersList 
                users={this.state.users}
                onUserClick={this.onUserClick}
              />
            </table>
          </div>
        </div>

        {this.state.clickedUserId !== undefined
          ? <Modal
              isOpened={this.state.clickedUserId !== undefined} 
              user={this.getUserById(this.state.clickedUserId)}
              onCloseClick={this.onCloseClick}
              onUserUpdate={this.onUserUpdate}
            />
          : null
        }

      </div>
    )
  }
}

export default Main
