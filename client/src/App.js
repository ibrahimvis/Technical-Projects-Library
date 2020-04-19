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
import axios from "axios";
import { decode } from "jsonwebtoken";

require("dotenv").config();

export default class App extends Component {
  state = {
    isAuth: false,
    user: null, // temp change it to null
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

  userLogin = async (token) => {
    try {
      let data = await axios.get("/api/auth/user", {
        headers: { "x-auth-token": token },
      });

      // console.log("getProfile", data.data.user);
      this.setState({
        isAuth: true,
        user: data.data.user,
        message: null,
      });
    } catch (err) {
      this.setState({
        user: null,
        isAuth: false,
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
    console.log(this.state);
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
