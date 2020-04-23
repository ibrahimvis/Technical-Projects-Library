import React, { Component } from "react";
import { Form, Container, Button, Col, Row, Card } from "react-bootstrap";
import axios from "axios";

export default class EditProject extends Component {
  // console.log(this.props.match.params.id);
  state = {
    _id: this.props.match.params.id, //project obj
    project: null,
  };
  componentDidMount() {
    axios
      .get(`/api/project/${this.state._id}`)
      .then((res) => {
        this.setState({
          project: res.data.project,
        });
      })
      .catch((err) => console.log(err));
  }

  createHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/project/update", this.state.project, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.props.history.push("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeHandler = (e) => {
    let temp = { ...this.state };
    temp.project[e.target.name] = e.target.value;
    this.setState(temp);
  };

  render() {
    // let { user } = this.state;
    // console.log(user);
    // console.log(this.state);
    return (
      <div>
        {this.state.project && (
          <>
            <Container
              className="mt-5 mb-5 row justify-content-md-center"
              fluid
            >
              <Row className="mt-5 justify-content-center">
                <Col>
                  <Card
                    className="bg-secondary text-white"
                    border="dark"
                    style={{ width: "40rem" }}
                  >
                    <Card.Header className="bg-dark"></Card.Header>

                    <Card.Body>
                      <Form.Group>
                        <Form.Label>Image:</Form.Label>
                        {/* <Form.File
                name="image"
                id="formcheck-api-regular"
                label="Uploade image "
                lang="en"
                custom
              /> */}
                        <Form.Control
                          name="image"
                          value={this.state.project.image}
                          onChange={(e) => this.changeHandler(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                          name="title"
                          value={this.state.project.title}
                          onChange={(e) => this.changeHandler(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Contributor:</Form.Label>
                        <Form.Control
                          name="contributor"
                          value={this.state.project.contributor}
                          onChange={(e) => this.changeHandler(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          name="description"
                          value={this.state.project.description}
                          onChange={(e) => this.changeHandler(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Github:</Form.Label>

                        <Form.Control
                          name="github"
                          onChange={(e) => this.changeHandler(e)}
                          value={this.state.project.github}
                        />
                      </Form.Group>
                    </Card.Body>
                    <Card.Footer className="text-muted bg-dark">
                      <Button
                        variant="info"
                        onClick={this.createHandler}
                        block
                      >
                        Edit Project
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </div>
    );
  }
}
