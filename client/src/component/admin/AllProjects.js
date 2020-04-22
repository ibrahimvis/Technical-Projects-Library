import React, { Component } from "react";
import ProjectCard from './ProjectCard';

export default class AllProjects extends Component {
  render() {
    return (
      <>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Created By</th>
            <th>Email Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.props.projects.map((project, key) => {
            return (
              <ProjectCard
                key={key}
                index={key}
                project={project}
                onEditClick={() => this.props.onEditClick(project)}
              />
            );
          })}
        </tbody>
      </>
    );
  }
}
