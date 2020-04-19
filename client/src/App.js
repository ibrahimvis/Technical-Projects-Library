import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import CreateProject from "./component/project/CreateProject";
import Signup from "./component/user/Signup";
import ChangePassword from "./component/user/ChangePassword";
import Nave from "./component/navbar/Nave";
import { Login } from "./component/user/Login";
import AllProjects from "./component/project/AllProjects";
import OneProject from "./component/project/OneProject";
import jwt_decode from "jwt-decode";
export default class App extends Component {
  state = {
    user: null,
    isLogin: false,
  };

  componentDidMount() {
    this.userLogin();
  }

  userLogin = () => {
    if (localStorage.token) {
      let token = localStorage.token;
      let user = jwt_decode(token, "SECRET").user;
      this.setState({
        user: user,
        isLogin: true,
      });
    } else {
      this.setState({
        user: null,
        isLogin: false,
      });
    }
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
          <Route path="/api/project/:id" component={OneProject} />
          {/* <PrivateRoute
            exact
            path="/allproject"
            isAuth={isAuth}
            component={AllProjects}
          /> */}
          <Route path="/allproject" component={AllProjects} />
          <Route path="/signup" component={Signup} />} />
          <Route
            path="/login"
            render={(props) => <Login {...props} userLogin={this.userLogin} />}
          />
          <Route
            path="/changepassword"
            render={(props) => (
              <ChangePassword {...props} user={this.state.user} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
