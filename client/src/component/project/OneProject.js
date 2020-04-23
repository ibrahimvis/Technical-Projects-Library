import React, { Component } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Badge,
} from "react-bootstrap";
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
        <Container className="mt-5 mb-5 row justify-content-md-center" fluid>
          <Row className="mt-5 justify-content-center">
            <Col>
              <Card
                className="bg-secondary"
                border="dark"
                style={{ width: "40rem" }}
              >
                <Card.Header className="bg-dark"></Card.Header>

                <Card.Img variant="top" src={image} height="400" width="200" />
                <Card.Body>
                  {/* <Card.Title className="text-warning text-center">
                    {title}
                  </Card.Title> */}

                  <h2>{title}</h2>

                  <h5>Contributor:</h5>

                  {/* <Card.Text className="text-white">Contributor: </Card.Text> */}
                  <Row>
                    <p>{contributor}</p>
                  </Row>

                  <h5>Description:</h5>

                  {/* <Card.Text className="text-white">Description: </Card.Text> */}
                  {/* <Badge variant="primary">Description:</Badge>{" "} */}
                  <Row>
                    <p>{description}</p>
                  </Row>

                  <h5>Date Created: </h5>
                  {/* <Card.Text className="text-white">Date Created: </Card.Text> */}
                  <Row>
                    <p> {<Moment format="YYYY/MM/DD" date={dateString} />}</p>
                  </Row>

                  <h5>GitHub: </h5>

                  {/* <Card.Text className="text-white">GitHub:</Card.Text> */}
                  <Row>
                    <p>{github}</p>
                  </Row>
                </Card.Body>

                <Card.Footer className="text-muted bg-dark">
                  <Button as={Link} to={`/allproject`} variant="info" block>
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
