import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import CreateProject from "./component/project/CreateProject";
import { Signup } from "./component/user/Signup";
export default class App extends Component {
  state = {
    user: null,
    isLogin: false,
  };

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/create"
            render={() => <CreateProject user={this.state.user} />}
          />
          <Route path="/signup" component={Signup} />} />
        </Switch>
      </div>
    );
  }
}
