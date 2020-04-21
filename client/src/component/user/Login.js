import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Container, Card } from "react-bootstrap";
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
                      <Form.Label>Email Address:</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email address"
                        name="email"
                        onChange={(e) => onChangeInput(e)}
                      />
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => onChangeInput(e)}
                      />
                    </Form.Group>
                  </Form.Row>





                </Card.Body>
                <Card.Footer className="text-muted bg-dark">
                  <Button
                    variant="success"
                    type="submit"
                    onClick={(e) => onSubmit(e)}
                    block
                  >
                    Sign In
                  </Button>
                </Card.Footer>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};
