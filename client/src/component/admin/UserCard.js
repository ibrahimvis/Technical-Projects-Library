import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default class UserCard extends Component {
  state = { isDeleted: false };

  deleteUser = async (e, id) => {
    try {
      let data = await axios.get("/api/admin/delete/user/" + id, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (data.status === 200) {
        this.setState({ isDeleted: true });
      } else {
      }
    } catch (error) {}
  };

  render() {
    const { _id, firstName, lastName, email } = this.props.user;
    const index = this.props.index;
    return !this.state.isDeleted ? (
          <tr>
            <td>{index + 1}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>
              <Button
                variant="primary"
                block
                onClick={() => this.props.onEditClick()}
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                onClick={(e) => this.deleteUser(e, _id)}
                variant="danger"
                block
              >
                Delete
              </Button>
            </td>
          </tr>
    ) : (
      <></>
    );
  }
}
