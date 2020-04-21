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
    console.log("sdd");
    axios
      .get(`http://localhost:3002/api/profile/${this.state.user._id}`)
      .then((res) => {
        this.setState({
          project: res.data.project,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state.project);
    let allproject = this.state.project.map((project) => {
      return <UserProjectCard project={project} key={project._id} />;
    });

    // allproject = this.state.project
    //   .filter((x) => x)
    //   .map((project) => {
    //
    //   });
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
                variant="success"
                block
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
