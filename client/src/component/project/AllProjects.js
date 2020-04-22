import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import axios from "axios";
export default class AllProjects extends Component {
  state = {
    allproject: [],
  };
  componentDidMount() {
    axios
      .get("/api/project/")
      .then((res) => {
        this.setState({
          allproject: res.data.projects,
        });
        console.log(res.data.projects);
      })
      .catch((err) => console.log(err));
  }

  searchHandler = (e) => {
    axios
      .get(`/api/search/${e.target.value}`)
      .then((res) => {
        this.setState({
          allproject: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    // console.log(this.state.allproject);
    let allproject = this.state.allproject.map((project) => (
      <ProjectCard project={project} key={project._id} />
    ));

    return (
      <div>
        <Container className="mt-5" fluid>
          {/* <Image src="holder.js/100px250" fluid /> */}

          <Row className="mt-5 justify-content-center">
              <input size="40"
                type="text"
                placeholder="Search by Title. . . ."
                onChange={this.searchHandler}
              />
          </Row>

              <Row className="mt-5 justify-content-center">{allproject}</Row>
        </Container>
      </div>
    );
  }
}
