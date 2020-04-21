import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Allusers from "./AllUsers";
import EditUser from "./EditUser";

export default class AdminDashboard extends Component {
  state = {
    token: null,
    users: [],
    projects: [],
    editClicked: false,
    currentUser: null,
  };

  showEditPopup(user) {
    this.setState({
      editClicked: true,
      currentUser: user,
    });

    //console.log(user);
  }

  closeEditPopup() {
    this.setState({
      editClicked: false,
      currentUser: null,
    });
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ token: localStorage.getItem("token") });
      this.getData();
    } else {
    }
  }

  getData = async () => {
    try {
      let data = await axios.get("/api/admin/", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      await this.setState({
        users: data.data.users,
        project: data.data.projects,
      });
    } catch (error) {
      console.log(error);
      this.props.history.push("/allproject");
    }
  };

  render() {
    return (
      <div>
        {this.state.editClicked ? (
          <EditUser
            user={this.state.currentUser}
            onEditClick={this.showEditPopup.bind(this)}
            onCloseClick={this.closeEditPopup.bind(this)}
          />
        ) : (
          <></>
        )}
        <Table striped bordered hover>
          {this.state.users ? (
            <Allusers
              users={this.state.users}
              onEditClick={this.showEditPopup.bind(this)}
            />
          ) : (
            <></>
          )}
        </Table>
      </div>
    );
  }
}
