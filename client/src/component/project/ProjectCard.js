import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
export default class ProjectCard extends Component {
  // ALL PROJECT HOME PAGE
  // SENDING THE PROJECT OBJ
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

              {user.firstName != null ? (
                <Card.Text>
                  {user.firstName} {user.lastName}
                </Card.Text>
              ) : (
                <Card.Text>Dony By : user deleted from the db</Card.Text>
              )}
            </Card.Body>

            <Card.Footer className="text-muted bg-dark">
              {" "}
              <Button
                as={Link}
                to={`/api/project/${_id}`}
                variant="success"
                block
              >
                More Details
              </Button>
            </Card.Footer>
          </Card>
          <br />
        </Col>{" "}
      </div>
    );
  }
}
