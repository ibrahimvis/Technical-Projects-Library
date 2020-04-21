import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import axios from "axios";
export default class AllProjects extends Component {
  state = {
    allproject: [],
    selectedProject: [],
  };
  componentDidMount() {
    axios
      .get("/api/project/")
      .then((res) => {
        this.setState({
          allproject: res.data.projects,
          selectedProject: res.data.projects,
        });
      })
      .catch((err) => console.log(err));
  }

  searchHandler = (e) => {
    console.log(e.target.value);
    if (e.target.value !== null) {
      axios
        .get(`/api/search/${e.target.value}`)
        .then((res) => {
          this.setState({
            selectedProject: res.data,
          });
        })
        .catch((err) => console.log(err));
    } else {
      // this.setState({
      //   selectedProject: this.state.allproject.filter((project) => {
      //     return project.title.indexOf(e.target.value) !== -1;
      //   }),
      // });
      axios
        .get("/api/project/")
        .then((res) => {
          this.setState({
            allproject: res.data.projects,
            selectedProject: res.data.projects,
          });
        })
        .catch((err) => console.log(err));
    }
    // console.log("nvhkgjg");
  };

  render() {
    // console.log(this.state.allproject);
    // let allproject = this.state.selectedProject.map((project) => (
    //   <ProjectCard project={project} key={project._id} />
    // ));
    let allproject = this.state.allproject.map((project) => (
      <ProjectCard project={project} key={project._id} />
    ));

    return (
      <div>
        <Container className="mt-5" fluid>
          <input
            type="text"
            placeholder="search"
            onChange={this.searchHandler}
          />

          <Row className="mt-5 justify-content-center">
            <Col md={12}>
              <Row className="mt-5 justify-content-center">{allproject}</Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
