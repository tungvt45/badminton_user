import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import {API_URL} from "../../constants/config";
class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      address: "",
      account: "",
      fullname: "",
      show: false,
      error: ""
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false, error: "" });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  async register() {
    this.setState({ error: "" });
    let {
      userName,
      password,
      address,
      confirmPassword,
      error,
      fullname
    } = this.state;
    if (userName.length <= 6 || !userName.includes("@")) {
      error = "The length of the name must be greater than 6 characters and must be a email";
      this.setState({ error });
      return;
    }
    if (password.length <= 6) {
      error = "The length of the password must be greater than 6 characters";
      this.setState({ error });
      return;
    }
    if (address.length <= 10) {
      error = "The length of the address must be greater than 10 characters";
      this.setState({ error });
      return;
    }
    if (fullname.length <= 6) {
      error = "The length of the name must be greater than 6 characters";
      this.setState({ error });
      return;
    }
    if (password !== confirmPassword) {
      error = "Confirm password not match";
      this.setState({ error });
      return;
    }
    let account = {};
    account.email = userName;
    account.password = password;
    account.address = address;
    account.name = fullname;
    account.role = "ROLE_USER";
    account.active = true;
    await axios
      .post(API_URL + "/user/sign-up", account)
      .then(response => {
        if (response.status === 200) {
          if (response.data === "Email existed") {
            this.setState({ error: "Email existed" });
            return;
          }
          this.handleClose();
          alert("register success!!");
        } else {
          alert("some error occur!!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleShow}>Register</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/register" method="post">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user-o" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Email"
                  required="required"
                  name="username"
                  value={this.state.userName}
                  onChange={text =>
                    this.setState({ userName: text.target.value })
                  }
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control w-75"
                  placeholder="Password"
                  required="required"
                  value={this.state.password}
                  onChange={text =>
                    this.setState({ password: text.target.value })
                  }
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control w-75"
                  placeholder="Confirm Password"
                  required="required"
                  value={this.state.confirmPassword}
                  onChange={text =>
                    this.setState({ confirmPassword: text.target.value })
                  }
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-phone" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Address"
                  required="required"
                  value={this.state.address}
                  onChange={text =>
                    this.setState({ address: text.target.value })
                  }
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Full name"
                  required="required"
                  value={this.state.fullname}
                  onChange={text =>
                    this.setState({ fullname: text.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  value="Register"
                  id="login_button"
                  onClick={() => this.register()}
                />
              </div>
              <div style={{ color: "red" }}>{this.state.error}</div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;
