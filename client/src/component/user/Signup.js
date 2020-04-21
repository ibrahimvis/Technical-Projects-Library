import React, { Component } from "react";
import { Row, Form, Col, Button, Container, Card } from "react-bootstrap";
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
          console.log(res);
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
        <Container className="mt-5 row justify-content-center" fluid>
          <Row className="justify-content-center mt-5">
            <Col md={12} className="m-2">
              <Card
                className="bg-secondary text-white"
                border="dark"
                style={{ width: "40rem" }}
              >
                <Card.Header className="bg-dark"></Card.Header>
                <Form>
                  <Card.Body>
                    <Form.Row>
                      <Col md={6}>
                        <Form.Label>First name:</Form.Label>
                        <Form.Control
                          placeholder="First name"
                          name="firstName"
                          onChange={this.changeHandler}
                        />
                      </Col>

                      <Col md={6}>
                        <Form.Label>Last name:</Form.Label>
                        <Form.Control
                          placeholder="Last name"
                          name="lastName"
                          onChange={this.changeHandler}
                        />
                      </Col>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          onChange={this.changeHandler}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={this.changeHandler}
                        />
                      </Form.Group>
                    </Form.Row>
                  </Card.Body>

                  <Card.Footer className="text-muted bg-dark">
                    <Button
                      variant="success"
                      type="submit"
                      onClick={(e) => this.registerHandler(e)}
                      block
                    >
                      Sign Up
                    </Button>
                  </Card.Footer>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
