import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import CreateProject from "./component/project/CreateProject";
import Signup from "./component/user/Signup";
import ChangePassword from "./component/user/ChangePassword";
import Nave from "./component/navbar/Nave";

export default class App extends Component {
  state = {
    isAuth: false,
    user: {_id: "5e9c1cd7bc5da5114f224aab"}, // temp change it to null
    message: null,
  };

  logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({
      isAuth: false,
      user: null,
      message: null,
    });
  };

  render() {
    const { isAuth, message, user } = this.state;
    return (
      <div>
        <Nave user={user} logout={this.logoutHandler} />
        <Switch>
          <Route
            path="/create"
            render={() => <CreateProject user={this.state.user} />}
          />
          <Route path="/signup" component={Signup} />} />
          <Route
            path="/changepassword"
            render={(props) => <ChangePassword {...props} user={this.state.user} />}
          />
        </Switch>
      </div>
    );
  }
}
