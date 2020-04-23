import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { decode } from "jsonwebtoken";
import axios from 'axios';

export default class ProjectCard extends Component {
  // ALL PROJECT HOME PAGE
  // SENDING THE PROJECT OBJ
  state = { isAdmin: false };

  /** get the token and chekc user if he is an admin or not */
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!(token == null)) {
      let user = decode(token).user;
      if (user) {
        if (user.isAdmin || user.isSuperAdmin) {
          this.setState({ isAdmin: true });
        } else {
          this.setState({ isAdmin: false });
        }
      }
    }
  }

  deleteHandler = async () => {
    try {
      let token = localStorage.getItem("token");

      let projectDeleted = await axios.get(
        `/api/project/delete/${this.props.project._id}`,
        { headers: { "x-auth-token": token } }
      );
      // console.log(projectDeleted);
      this.props.deleteProject(this.props.project);
      this.props.history.push("/allproject");
    } catch (error) {}
  };

  render() {
    // console.log(localStorage.getItem("token") == null);
    let { title, user, _id, image } = this.props.project;

    return (
      <div>
        <Col md={3} className="m-2">
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
{/* 
              <hr
                style={{
                  color: "#303030",
                  backgroundColor: "#303030",
                  borderColor: "#303030",
                }}
              /> */}

              {!(user == null) ? (
                <Card.Text className="text-center">
                 {user.firstName} {user.lastName}
                </Card.Text>
              ) : (
                <Card.Text className="text-center">Dony By : user deleted from the db</Card.Text>
              )}
            </Card.Body>

            <Card.Footer className="text-muted bg-secondary">
              {" "}
              <Button
                as={Link}
                to={`/api/project/${_id}`}
                variant="dark"
                block
              >
                More Details
              </Button>
            </Card.Footer>
            {this.state.isAdmin ? (
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
            ) : (
              <></>
            )}
          </Card>
          <br />
        </Col>{" "}
      </div>
    );
  }
}
