import React, { Component } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

export default class EditProject extends Component {
  // console.log(this.props.match.params.id);
  state = {
    _id: this.props.match.params.id, //user obj
  };

  createHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/project/update", this.state, {
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
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };

  render() {
    // let { user } = this.state;
    // console.log(user);
    console.log(this.state);
    return (
      <div>
        <div>This is Update page</div>
        <Container>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            {/* <Form.File
                name="image"
                id="formcheck-api-regular"
                label="Uploade image "
                lang="en"
                custom
              /> */}
            <Form.Control
              placeholder="image"
              name="image"
              onChange={(e) => this.changeHandler(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" onChange={this.changeHandler} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contributor</Form.Label>
            <Form.Control name="contributor" onChange={this.changeHandler} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Github Link</Form.Label>
            <Form.Control name="github" onChange={this.changeHandler} />
          </Form.Group>
          <Button variant="primary" onClick={this.createHandler} block>
            Edit Project
          </Button>
        </Container>
      </div>
    );
  }
}
