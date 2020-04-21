import React, { Component } from "react";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
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
      <div>
        <Container className="mt-5 row justify-content-md-center" fluid>
          <Row className="mt-5 justify-content-center">
            <Col>
              <Card
                className="bg-secondary text-white text-center"
                border="dark"
                style={{ width: "40rem" }}
              >
                <Card.Header className="bg-dark"></Card.Header>

                <Card.Img variant="top" src={image} height="400" width="200" />
                <Card.Body>
                  <Card.Title className="text-warning">{title}</Card.Title>
                  <Card.Text>Contributor: {contributor} </Card.Text>
                  <Card.Text>Description: {description}</Card.Text>
                  <Card.Text>
                    Date Created:{" "}
                    {<Moment format="YYYY/MM/DD" date={dateString} />}
                  </Card.Text>
                  <Card.Text>GitHub: {github}</Card.Text>
                  {/* <Card.Text>Dony By :{user.firstName}</Card.Text> */}
                </Card.Body>

                <Card.Footer className="text-muted bg-dark">
                  <Button as={Link} to={`/allproject`} variant="success" block>
                    Go Back
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
