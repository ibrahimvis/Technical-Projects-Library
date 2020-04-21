import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
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
      console.log(this.state.project)
      let allproject =<div> </div>

      allproject = this.state.project.filter(x => x)
         .map((project) => {
            return  <UserProjectCard project={project} key={project._id} /> ;
          });
    // let allproject =<div> </div>



   
    // console.log(this.state.project);
    return (
      <div>
        <div>This is profile</div>
        <Form className="mt-5">
          <Row className="justify-content-center mt-5">
            <Col md={8}>
              <Button
                as={Link}
                to={`/create`}
                user={this.state.user}
                variant="success" block
              >
                Add project
              </Button>
              <Button
                className="ml-5"
                as={Link}
                to={`/ChangePassword`}
                user={this.state.user}
                variant="info"
              >
                Change Password
              </Button>
              {allproject}
              {/* {console.log(this.state.project)} */}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
