import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";

export default class OneProject extends Component {
  state = {
    project: [],
  };
  componentDidMount() {
    axios
      .get("/api/project")
      .then((res) => {
        this.setState({
          project: res.data.projects.filter(
            (project) => project._id === this.props.match.params.id
          )[0],
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    // <div>{this.state.project.title}</div>
    const {
      title,
      user,
      _id,
      image,
      contributor,
      description,
      github,
    } = this.state.project;
    const dateString = this.state.project.createdAt;
    return (
      <div className="mb-5">
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>Project Title {title}</Card.Title>
            <Card.Text>Contributor with {contributor} </Card.Text>
            <Card.Text>Description {description}</Card.Text>
            <Card.Text>
              Date Created {<Moment format="YYYY/MM/DD" date={dateString} />}
            </Card.Text>
            <Card.Text>GitHub {github}</Card.Text>
            {/* <Card.Text>Dony By :{user.firstName}</Card.Text> */}
            <Button as={Link} to={`/allproject`} variant="primary">
              Back
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
