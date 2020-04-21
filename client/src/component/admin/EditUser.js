import React, { Component } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import axios from "axios";

export default class EditUser extends Component {
  state = {
    _id: null,
    isSuperAdmin: false,
    isAdmin: false,
  };

  componentDidMount() {
    this.setState({
        _id: this.props.user._id
    });
  }

  changeUserType = async () => {
    try {
      let data = await axios.post("/api/admin/edit/user/", this.state, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      console.log(data.data)
    } catch (error) {
      console.log(error);
    }
  };

  onChangeHandler = (e) => {
    let temp = { ...this.state };
    temp[e.target.id] = e.target.checked;
    this.setState(temp);
  };

  render() {
    return (
      <>
        <div className="popup">
          <div className="popup_inner">
            <Form className="mt-5">
              <Row className="justify-content-center mt-5">
                <Col md={8}>
                  <Form.Row>
                    <Form.Check
                      onChange={this.onChangeHandler}
                      className="mr-2"
                      custom
                      type="checkbox"
                      id={`isAdmin`}
                      label={`Admin`}
                    />
                  </Form.Row>
                  <Form.Row>
                    <Form.Check
                      onChange={this.onChangeHandler}
                      className="mb-2"
                      custom
                      type="checkbox"
                      id={`isSuperAdmin`}
                      label={`Super admin`}
                    />
                  </Form.Row>
                  <Button
                    className="ml-5 mr-2"
                    variant="primary"
                    type="button"
                    onClick={(e) => this.changeUserType(e)}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => this.props.onCloseClick()}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        );
      </>
    );
  }
}
