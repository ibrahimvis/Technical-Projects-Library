import React, { Component } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Nave extends Component {
  render() {
    const authNavDetails = this.props.user ? (
      <>
        {this.props.user.isSuperAdmin ? (
          <Nav.Link as={Link} to="/admin" user={this.props.user}>
            Dashboard
          </Nav.Link>
        ) : (
          <></>
        )}
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
            <Nav.Link as={Link} to="/allproject" user={this.props.user}>
              Projects
            </Nav.Link>
            {authNavDetails}
          </Nav>
        </Navbar>
        {/* <Image src="https://miro.medium.com/max/10944/1*Eh3ftzvlQzIPk-nhaPedTQ.jpeg" className="center"/> */}
      </div>
    );
  }
}
