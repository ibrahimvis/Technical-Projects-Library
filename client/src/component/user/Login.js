import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import Axios from "axios";

export const Login = (props) => {
  const [login, setLogin] = useState({});

  let onChangeInput = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };
  useEffect(() => {
    //console.log(login);
  });

  let onSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api/auth/login", login)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          props.history.push("/allproject");
          props.userLogin(localStorage.getItem("token"));
        } else {
          console.log("email or password not correct");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Form className="mt-5">
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Group>
            </Form.Row>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
