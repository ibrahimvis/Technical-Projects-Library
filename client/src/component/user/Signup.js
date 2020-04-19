import React, { Component } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import Axios from "axios";

export default class Signup extends Component {
  state = {};

  registerHandler = async (e) => {
    e.preventDefault();
    Axios.post("/api/auth/signup", this.state)
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.props.history.push("/login");
        } else {
          console.log(res)
        }
      })
      .catch((err) => console.log(err));
  };

  changeHandler = (e) => {
    let temp = { ...this.state };
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };

  render() {
    return (
      <>
        <Form className="mt-5">
          <Row className="justify-content-center mt-5">
            <Col md={8}>
              <Form.Row>
                <Col md={6}>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    placeholder="First name"
                    name="firstName"
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    placeholder="Last name"
                    name="lastName"
                    onChange={this.changeHandler}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.changeHandler}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.changeHandler}
                  />
                </Form.Group>
              </Form.Row>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => this.registerHandler(e)}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}
