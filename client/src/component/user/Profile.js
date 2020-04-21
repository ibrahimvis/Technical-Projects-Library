import React, { Component } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserProjectCard from "./UserProjectCard";
import axios from "axios";

export default class Profile extends Component {
  state = {
    user: this.props.user, //user obj
    project: [], //make it array og obj
  };

  componentDidMount() {
    this.state.user.project.map(
      (projectID) =>
        axios
          .get(`/api/project/${projectID}`) //return obj
          .then((res) => {
            this.setState({
              project: [...this.state.project, res.data.project],
            });
          })
          .catch((err) => console.log(err))
      // <ProjectCard project={project} key={project._id} />
    );
  }

  render() {
    console.log(this.state.project);
    let allproject = <div> </div>;

    allproject = this.state.project
      .filter((x) => x)
      .map((project) => {
        return <UserProjectCard project={project} key={project._id} />;
      });
    // let allproject =<div> </div>

    // console.log(this.state.project);
    return (
      <div>
        <Container className="mt-5" fluid>
          {/* <Form className="mt-5"> */}
          <Row className="justify-content-center mt-5">
            <Col md={3}>
            <Button
                // className="ml-5"
                as={Link}
                to={`/ChangePassword`}
                user={this.state.user}
                variant="success"
                block
              >
                Change Password
              </Button>

              <Button
                as={Link}
                to={`/create`}
                user={this.state.user}
                variant="success"
                block
              >
                Add New project
              </Button>
            </Col>




          </Row>
          <Row className="mt-5 justify-content-center">
            <Col md={12}>
              <Row className="justify-content-center"> {allproject}</Row>
              {/* {console.log(this.state.project)} */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
