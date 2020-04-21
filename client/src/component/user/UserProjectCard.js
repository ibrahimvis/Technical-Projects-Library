//------------------------------------------------
// USER

//------------------------------------------------
import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditProject from "../project/EditProject";
import { Redirect } from "react-router-dom";
export default class ProjectCard extends Component {
  // ALL PROJECT HOME PAGE
  // SENDING THE PROJECT OBJ
  // DeleteProject = async () => {
  // axios
  //   .get(`/api/project/delete/${this.props.project._id}`)
  //   .then((res) => {
  //     //   .get(`/api/project/delete/${this.props.project._id}`)
  //     //   .then((res) => {
  //     //   })
  //     //   .catch((err) => console.log(err));
  //   })
  //   .catch((err) => console.log(err));
  // };
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
                    // onClick={this.DeleteProject}
                    variant="primary"
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
