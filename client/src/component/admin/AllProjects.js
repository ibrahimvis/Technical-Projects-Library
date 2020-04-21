import React, { Component } from "react";

export default class AllProjects extends Component {
  render() {
    return (
      <>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map((user, key) => {
            return (
              <UserCard
                key={key}
                index={key}
                user={user}
                onEditClick={() => this.props.onEditClick(user)}
              />
            );
          })}
        </tbody>
      </>
    );
  }
}
