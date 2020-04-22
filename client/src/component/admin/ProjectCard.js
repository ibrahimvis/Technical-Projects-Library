import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default class ProjectCard extends Component {
  state = { isDeleted: false };

  deleteProject = async (e, id) => {
    try {
      let data = await axios.get("/api/admin/delete/project/" + id, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(data.data);
      if (data.status === 200) {
        this.setState({ isDeleted: true });
      } else {
      }
    } catch (error) {}
  };

  render() {
    const { _id, title } = this.props.project;
    const { firstName, lastName, email } = this.props.project.user;
    const index = this.props.index;

    return !this.state.isDeleted ? (
      <tr>
        <td>{index + 1}</td>
        <td>{title}</td>
        {this.props.project.user ? (
          <>
            <td>
              {firstName} {lastName}
            </td>
            <td>{email}</td>
          </>
        ) : (
          <></>
        )}
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
            onClick={(e) => this.deleteProject(e, _id)}
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
