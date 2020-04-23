import React, { Component } from "react";
import { Row, Form, Col, Button, Container, Card } from "react-bootstrap";
import Axios from "axios";

export default class ChangePassword extends Component {
  state = { _id: this.props.user._id }; // need to be checked when login works

  changePasswordHandler = async (e) => {
    e.preventDefault();
    Axios.post("/api/auth/ChangePassword", this.state)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeHandler = (e) => {
    let temp = { ...this.state }; //  temp = { _id: this.props.user._id

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
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Old Password:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Old Password"
                          name="oldpassword"
                          onChange={this.changeHandler}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="New Password"
                          name="newpassword"
                          onChange={this.changeHandler}
                        />
                      </Form.Group>
                    </Form.Row>
                  </Card.Body>
                  <Card.Footer className="text-muted bg-secondary">
                    <Button
                      className="mt-2"
                      variant="dark"
                      type="submit"
                      onClick={(e) => this.changePasswordHandler(e)}
                      block
                    >
                      Change Password
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
