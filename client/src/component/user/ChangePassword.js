import React, { Component } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
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
        <Form>
          <Row className="justify-content-center">
            <Col>
              <Form.Row>
                <Col md={6}>
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="oldpassword"
                    onChange={this.changeHandler}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col md={6}>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="newpassword"
                    onChange={this.changeHandler}
                  />
                </Col>
              </Form.Row>
              <Button
                className="mt-2"
                variant="primary"
                type="submit"
                onClick={(e) => this.changePasswordHandler(e)}
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
