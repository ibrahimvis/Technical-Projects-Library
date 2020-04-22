import React, { Component, Profiler } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateProject from "./component/project/CreateProject";
import Signup from "./component/user/Signup";
import ChangePassword from "./component/user/ChangePassword";
import Nave from "./component/navbar/Nave";
import { Login } from "./component/user/Login";
import Profile from "./component/user/Profile";
import AllProjects from "./component/project/AllProjects";
import OneProject from "./component/project/OneProject";
import EditProject from "./component/project/EditProject";
import AdminDashboard from "./component/admin/AdminDashboard";
import axios from "axios";
import { decode } from "jsonwebtoken";
import PrivateRoute from "./PrivateRoute";
import { Alert } from "react-bootstrap";

require("dotenv").config();

export default class App extends Component {
  state = {
    isAuth: false,
    user: null, // temp change it to null
    message: null,
    isLogin: false,
    waiting: false,
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

  authLogin = () => {
    this.setState({
      isAuth: true,
    });
  };

  userLogin = async (token) => {
    try {
      let data = await axios.get("/api/auth/user", {
        headers: { "x-auth-token": token },
      });

      this.setState({
        isAuth: true,
        user: data.data.user,
        message: null,
        waiting: true,
      });
    } catch (err) {
      this.setState({
        user: null,
        isAuth: false,
        waiting: true,
        // message: err.response.data.message,
      });
    }
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!(token == null)) {
      let user = decode(token);

      if (!user) {
        localStorage.removeItem("token");
      }

      this.userLogin(token);
    }
  }

  render() {
    const { isAuth, message, user } = this.state;

    const errorMessage = message ? (
      <Alert variant="danger">{message}</Alert>
    ) : null;

    return (
      <div>
        <Nave user={user} logout={this.logoutHandler} />
        {errorMessage}
        <Switch>
          <Route exact path="/" component={AllProjects} />
          <Route
            path="/create"
            render={(props) => (
              <CreateProject {...props} user={this.state.user} />
            )}
          />
          <Route path="/api/project/EditeProject/:id" component={EditProject} />
          {/* <PrivateRoute
            exact
            path="/allproject"
            isAuth={isAuth}
            component={AllProjects}
          /> */}
          <Route path="/admin" component={AdminDashboard} />
          {this.state.waiting && (
            <PrivateRoute
              exact
              path="/profile"
              isAuth={isAuth}
              user={user}
              component={Profile}
            />
          )}
          {/* <Route path="/profile" render={() => <Profile user={user} />} /> */}
          <Route path="/allproject" component={AllProjects} />
          <Route path="/api/project/:id" component={OneProject} />
          <Route path="/signup" component={Signup} />} />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                authLogin={this.authLogin}
                userLogin={this.userLogin}
              />
            )}
          />
          <Route
            path="/changepassword"
            render={(props) => (
              <ChangePassword {...props} user={this.state.user} />
            )}
          />
          )} />
        </Switch>
      </div>
    );
  }
}
