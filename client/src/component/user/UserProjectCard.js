//------------------------------------------------
// USER

//------------------------------------------------
import React, { Component } from "react";
import { Card, Button, Col, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditProject from "../project/EditProject";
import { Redirect } from "react-router-dom";
import Axios from "axios";

export default class UserProjectCard extends Component {
  // ALL PROJECT HOME PAGE
  // SENDING THE PROJECT OBJ

  deleteHandler = async () => {
    try {
      let token = localStorage.getItem("token");

      let projectDeleted = await Axios.get(
        `/api/project/delete/${this.props.project._id}`,
        { headers: { "x-auth-token": token } }
      );
      // console.log(projectDeleted);
      this.props.deleteProject(this.props.project);
      this.props.history.push("/profile");
    } catch (error) {}
  };

  render() {
    // console.log(localStorage.getItem("token") == null);
    let { title, user, _id, image } = this.props.project;
    // console.log(this.props.project);
    // if (!localStorage.getItem) {
    //   console.log("empty");
    // } else {
    //   // not login there is no Token
    //   // console.log("Not empty");
    //   // let btn=
    // }
    return (
      <div>
        <Col md={3} className="mb-5">
          {" "}
          <Card
            className="bg-secondary text-white text-center"
            border="dark"
            style={{ width: "18rem" }}
          >
            <Card.Header className="bg-dark"></Card.Header>

            <Card.Img variant="top" src={image} height="200" width="200" />
            <Card.Body>
              <Card.Title className="text-warning">{title}</Card.Title>
            </Card.Body>
            {localStorage.getItem("token") == null ? (
              <Button as={Link} to={`/api/project/${_id}`} variant="primary">
                More Info
              </Button>
            ) : (
              <>
                <Card.Footer className="text-muted bg-dark">
                  <Button
                    as={Link}
                    to={`/api/project/${_id}`}
                    variant="success"
                    block
                  >
                    More Details
                  </Button>
                </Card.Footer>
                <Card.Footer className="text-muted bg-dark">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm">
                        <Button
                          as={Link}
                          to={`/api/project/EditeProject/${_id}`}
                          variant="primary"
                          block
                          // project={this.state.project}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="col-sm">
                        <Button
                          // as={Link}
                          // to={`/api/project/${_id}`}
                          variant="danger"
                          onClick={this.deleteHandler}
                          block
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Footer>
              </>
            )}
          </Card>
        </Col>
      </div>
    );
  }
}
