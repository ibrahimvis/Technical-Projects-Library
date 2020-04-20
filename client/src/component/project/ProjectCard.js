import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class ProjectCard extends Component {
  // ALL PROJECT HOME PAGE
  // SENDING THE PROJECT OBJ
  render() {
    let { title, user, _id, image } = this.props.project;
    return (
      <div>
        <div className="mb-5">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>Project Title {title}</Card.Title>
              {user.firstName != null ? (
                <Card.Text>
                  Dony By : {user.firstName} {user.lastName}
                </Card.Text>
              ) : (
                <Card.Text>
                  Dony By : user deleted from the db
                </Card.Text>
              )}
              <Button as={Link} to={`/api/project/${_id}`} variant="primary">
                More Info
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
