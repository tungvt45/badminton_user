import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import LoginModal from "../LoginModal/LoginModal";
import ShoppingCartModal from "../ShoppingCartModal/ShoppingCartModal";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import { API_URL } from "../../constants/config";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      products: [],
      maxPage: 0,
      account: ""
    };
    this.setKeyword = this.setKeyword.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.getSearchProduct = this.getSearchProduct.bind(this);
  }

  changeKeyword(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ account: "" });
  };

  getSearchProduct() {
    let pageParam = encodeURIComponent(this.state.currentPage);
    let pageSizeParam = encodeURIComponent(this.state.pageSize);
    let searchValueParam = encodeURIComponent(this.state.keyword);
    fetch(API_URL + 
      "/products/getProductByName?page=" +
        pageParam +
        "&element=" +
        pageSizeParam +
        "&searchValue=" +
        searchValueParam,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(result => {
      console.log(result);
      if (result.status === 200) {
        // alert("create success");
        // this.props.history.push('view-new-request');
        result.json().then(data => {
          this.setState({
            products: data.data,
            maxPage: data.maxPage
          });
        });
      }
      //    else if(result.status === 401) {
      //     localStorage.setItem("isLoggedIn", false);
      //     this.props.history.push('/login-page')
      //   }
    });
    //   event.preventDefault();
  }

  async setKeyword() {
    await this.props.onChangeKeyword(this.state.keyword);
    this.props.onChangeData();
  }

  goToSearch() {
    window.location =
      "http://localhost:3000/searchproduct/" + this.state.keyword;
  }

  render() {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    return (
      <nav className="navbar bg-dark navbar-dark container-fluid">
        <div className="row w-100">
          {/* <!-- icon or logo --> */}
          <div className="col-md-auto">
            <Link
              style={{ textDecoration: "none", color: "white"}}
              to="/"
            >
              <h5>Badminton Shop Online</h5>
            </Link>
          </div>
          {/* <!-- close logo --> */}

          {/* <!-- search bar --> */}
          <div className="col-md-6">
            <div className="input-group w-100">
              <input
                className="form-control border"
                type="text"
                placeholder="Search"
                aria-label="Search"
                id="search"
                value={this.state.keyword}
                onChange={this.changeKeyword}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  onClick={() => this.goToSearch()}
                >
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
          {/* <!-- close search bar --> */}
          <div className="col-md-auto">
            <ShoppingCartModal />
          </div>
          <div className="col-md-auto">
            {token === null || token === undefined ? (
              <LoginModal
                loadUser={account => this.setState({ account: account })}
              />
            ) : (
              <div>
                <b style={{ color: "white", paddingRight: 10 }}>
                  Hello, {username}
                </b>
                <Button onClick={() => this.handleLogout()}>Logout</Button>
              </div>
            )}
          </div>
          <div className="col-md-auto">
          {token === null || token === undefined ? (
              <RegisterModal />
            ) : (
              <div>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setKeywordRedux: keyword => {
      dispatch({
        type: "SET_KEYWORD",
        payload: keyword
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
