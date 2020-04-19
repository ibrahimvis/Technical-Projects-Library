import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import CreateProject from "./component/project/CreateProject";
export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/create"
            render={() => <CreateProject user={this.state.user} />}
          />
        </Switch>
      </div>
    );
  }
}
