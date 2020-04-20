import React, { Component } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

export default class EditProject extends Component {

  render() {
    return (
      <div>
        <Container>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              placeholder="image"
              name="image"
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contributor</Form.Label>
            <Form.Control
              name="contributor"
              onChange={this.changeHandler}
            />
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
            <Form.Control
              name="github"
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Button variant="primary" onClick={(e) => this.editProjectHandler(e)} block>
            Edit Project
          </Button>
        </Container>
      </div>
    );
  }
}
