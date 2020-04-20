import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  state = {
    user: this.props.user, //user obj
  };

  render() {
    console.log(this.state.user);
    // let { _id } = this.state.user;
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
                variant="primary"
              >
                Add project
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
