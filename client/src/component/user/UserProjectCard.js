//------------------------------------------------
// USER

//------------------------------------------------
import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
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

      let projectDeleted = await Axios.delete(
        `http://localhost:3002/api/project/delete/${this.props.project._id}`,
        { headers: { "x-auth-token": token } }
      );
      console.log(projectDeleted);
      this.props.history.push("/profile");
    } catch (error) {}
  };

  render() {
    // console.log(localStorage.getItem("token") == null);
    let { title, user, _id, image } = this.props.project;
    console.log(this.props.project);
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

              {localStorage.getItem("token") == null ? (
                <Button as={Link} to={`/api/project/${_id}`} variant="primary">
                  More Info
                </Button>
              ) : (
                <>
                  <Button
                    as={Link}
                    to={`/api/project/EditeProject/${_id}`}
                    variant="primary"
                    // project={this.state.project}
                  >
                    Edit
                  </Button>

                  <Button
                    className="ml-5"
                    // as={Link}
                    // to={`/api/project/${_id}`}
                    variant="primary"
                    onClick={this.deleteHandler}
                  >
                    Delete
                  </Button>
                  <Button
                    className="ml-5"
                    as={Link}
                    to={`/api/project/${_id}`}
                    variant="primary"
                  >
                    more info
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
