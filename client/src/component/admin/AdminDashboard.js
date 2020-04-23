import React, { Component } from "react";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Allusers from "./AllUsers";
import EditUser from "./EditUser";
import EditProject from "./EditProject";
import Allprojects from "./AllProjects";

export default class AdminDashboard extends Component {
  state = {
    token: null,
    users: [],
    projects: [],
    editClicked: false,
    editProjectClicked: false,
    currentUser: null,
    currentProject: null,
    showProjects: false,
    showUsers: false,
  };

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
        projects: data.data.projects,
      });
    } catch (error) {
      console.log(error);
      this.props.history.push("/allproject");
    }
  };

  showUsers = () => {
    this.setState({ showProjects: false, showUsers: true });
  };
  showProjects = () => {
    this.setState({ showProjects: true, showUsers: false });
  };

  render() {
    return (
      <div>
        <Container className="mt-5" fluid>
          <Row className="justify-content-center mt-5 mb-5">
            <Button
              className="mr-4 btn btn-info btn-lg"
              type="button"
              onClick={this.showUsers}
            >
              Users Panel
            </Button>

            <Button
              className="ml-4 btn btn-info btn-lg"
              type="button"
              onClick={this.showProjects}
            >
              Projects Panel
            </Button>
          </Row>

          <Row className="justify-content-center mt-5 mb-5">
            {this.state.editClicked ? (
              <EditUser
                user={this.state.currentUser}
                onEditClick={this.showEditPopup.bind(this)}
                onCloseClick={this.closeEditPopup.bind(this)}
              />
            ) : (
              <></>
            )}
            {this.state.editProjectClicked ? (
              <EditProject
                project={this.state.currentProject}
                onEditClick={this.showEditPopupProject.bind(this)}
                onCloseClick={this.closeEditProjectPopup.bind(this)}
                update={this.getData}
              />
            ) : (
              <></>
            )}
            {this.state.showUsers ? (
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
            ) : null}

            {this.state.showProjects ? (
              <Table striped bordered hover>
                {this.state.projects ? (
                  <Allprojects
                    projects={this.state.projects}
                    onEditClick={this.showEditPopupProject.bind(this)}
                  />
                ) : (
                  <></>
                )}
              </Table>
            ) : null}
          </Row>
        </Container>
      </div>
    );
  }

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

  showEditPopupProject(project) {
    this.setState({
      editProjectClicked: true,
      currentProject: project,
    });

    //console.log(user);
  }

  closeEditProjectPopup() {
    this.setState({
      editProjectClicked: false,
      currentProject: null,
    });
  }
}
