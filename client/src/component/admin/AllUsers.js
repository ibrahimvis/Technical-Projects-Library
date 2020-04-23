import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "./UserCard";

export default class AllUsers extends Component {

  render() {
    return (
      <>
        <thead bgcolor="#FFFFFF">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody bgcolor="#FFFFFF">
          {this.props.users.map((user, key) => {
            return <UserCard key={key} index={key} user={user} onEditClick={() => this.props.onEditClick(user)} />;
          })}
        </tbody>
      </>
    );
  }
}
