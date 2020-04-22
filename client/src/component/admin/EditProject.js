import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import axios from "axios";

export default class EditProject extends Component {
  state = {
    _id: null,
    image: null,
    title: null,
    contributor: null,
    description: null,
    github: null,
  };

  componentDidMount() {
    this.setState({
      _id: this.props.project._id,
      image: this.props.project.image,
      title: this.props.project.title,
      contributor: this.props.project.contributor,
      description: this.props.project.description,
      github: this.props.project.github,
    });
  }

  changeHandler = (e) => {
    let temp = { ...this.state };
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };

  updateProject = async () => {
    try {
      let data = await axios.post("/api/admin/edit/project/", this.state, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      this.props.update();
      this.props.onCloseClick();  

    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log(this.state)
    return (
      <div className="popupProject">
        <div className="popup_inner_Project">
          <Container>
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
                placeholder="image"
                name="image"
                value={this.state.image}
                onChange={(e) => this.changeHandler(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                name="title"
                onChange={(e) => this.changeHandler(e)}
                value={this.state.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contributor:</Form.Label>
              <Form.Control
                name="contributor"
                onChange={(e) => this.changeHandler(e)}
                value={this.state.contributor}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                value={this.state.description}
                onChange={(e) => this.changeHandler(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Github:</Form.Label>
              <Form.Control
                name="github"
                value={this.state.github}
                onChange={(e) => this.changeHandler(e)}
              />
            </Form.Group>

            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <Button
                    variant="primary"
                    type="button"
                    block
                    onClick={() => this.updateProject()}
                  >
                    Edit Project
                  </Button>
                </div>

                <div className="col-sm">
                  <Button
                    variant="danger"
                    type="button"
                    block
                    onClick={() => this.props.onCloseClick()}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
