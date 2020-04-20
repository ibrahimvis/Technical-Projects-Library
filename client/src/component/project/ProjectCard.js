import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class ProjectCard extends Component {
  // ALL PROJECT HOME PAGE
  // SENDING THE PROJECT OBJ
  render() {
    let { title, user, _id, image } = this.props.project;
    // if (!localStorage.getItem) {
    //   console.log("empty");
    // } else {
    //   // not login there is no Token
    //   // console.log("Not empty");
    //   // let btn=
    // }
    return (
      <div>
        <div className="mb-5">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>Project Title {title}</Card.Title>
              <Card.Text>
                Dony By : {user.firstName} {user.lastName}
              </Card.Text>
              {!localStorage.getItem ? (
                <Button as={Link} to={`/api/project/${_id}`} variant="primary">
                  More Info
                </Button>
              ) : (
                " <AddToQueueIcon />"
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
