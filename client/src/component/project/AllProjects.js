import React, { Component } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import axios from "axios";
export default class AllProjects extends Component {
  state = {
    allproject: [],
    findAny: true,
  };

  deleteTheProject = (project) => {
    // console.log("HERE");
    let tempArr = this.state.allproject.filter((ele) => ele._id != project._id);

    let temp = { ...this.state };
    temp["allproject"] = tempArr;
    this.setState(temp);
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get("/api/project/")
      .then((res) => {
        this.setState({
          allproject: res.data.projects,
        });
        // console.log(res.data.projects);
      })
      .catch((err) => console.log(err));
  };

  searchHandler = (e) => {
    if (e.target.value === "") {
      this.getData();
    } else {
      axios
        .get(`/api/search/${e.target.value}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            this.setState({
              allproject: res.data,
              findAny: true,
            });
          } else {
            this.setState({
              allproject: [],
              findAny: false,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    // console.log(this.state.allproject);
    let allproject = this.state.allproject.map((project) => (
      <ProjectCard
        project={project}
        key={project._id}
        getData={() => this.getData()}
        deleteProject={() => this.deleteTheProject(project)}
      />
    ));

    return (
      <div>
        <Container className="mt-5" fluid>

          <Row className="mt-5 justify-content-center">
            <input
              size="40"
              type="text"
              placeholder="Search by Title. . . ."
              onChange={this.searchHandler}
            />
          </Row>

          <Row className="mt-5 mb-5 justify-content-center">
            <Col md={12}>
              {this.state.findAny ? (
                <Row className="justify-content-center">{allproject}</Row>
              ) : (
                <Row className="mt-5 justify-content-center">
                  Couldn't Find Any Project with that title
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
