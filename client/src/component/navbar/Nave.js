import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Nave extends Component {
  render() {
    const authNavDetails = this.props.user ? (
      <>
        <Nav.Link as={Link} to="/profile" user={this.props.user}>
          Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/logout" onClick={this.props.logout}>
          Logout
        </Nav.Link>
      </>
    ) : (
      <>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
        <Nav.Link as={Link} to="/signup">
          Register
        </Nav.Link>
      </>
    );
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Navbar.Brand>Technical Projects Library</Navbar.Brand>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/" user={this.props.user}>
              Projects
            </Nav.Link>
            {authNavDetails}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
