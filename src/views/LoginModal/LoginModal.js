import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import {API_URL} from "../../constants/config";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      account: "",
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  async login() {
    const { userName, password } = this.state;
    let account = {};
    account.email = userName;
    account.password = password;
    
    await axios
      .post(API_URL + "/user/login", account)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          alert("login success");
          let token = response.headers.authorization;
          token = token.replace("Bearer ", "");
          localStorage.setItem("token", token);
          localStorage.setItem("username", response.data);
          this.setState({
            account: response.data
          });
          this.props.loadUser(this.state.account);
        } else {
          alert("Wrong email or password");
        }
      })
      .catch(error => {
        alert("Wrong email or password")
      });
  }

  render() {
    return (
      <div>
        <a
          onClick={this.handleShow}
          href=""
          role="button"
          data-toggle="modal"
          data-placement="bottom"
          title="Account"
          className="navbar-brand fa fa-user fa-2x"
        />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/login" method="post" id="login_form">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user-o" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Username"
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
              <div className="form-group">
                <input
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  value="Login"
                  id="login_button"
                  onClick={() => this.login()}
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
