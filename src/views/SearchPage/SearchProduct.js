import React, { Component } from "react";
import axios from "axios";
import product1 from "../../../public/image/product2.jpeg";
import { connect } from "react-redux";
import PaginationComponent from "../Pagination/Pagination";
import TopBar from "../TopBar/TopBar";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/config";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row
} from "reactstrap";

class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      maxPage: 0,
      pageSize: 5,
      currentPage: 1,
      keyword: ""
    };
    this.changeKeyword = this.changeKeyword.bind(this);
    this.getSearchProduct = this.getSearchProduct.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
  }

  goToDetail(id) {
    window.location = "http://localhost:3000/detail/" + id;
  }

  changeKeyword(value) {
    this.setState({
      keyword: value
    });
  }

  changeCurrentPage(index) {
    this.setState({
      currentPage: index
    });
  }

  getSearchProduct() {
    let pageParam = encodeURIComponent(this.state.currentPage);
    let pageSizeParam = encodeURIComponent(this.state.pageSize);
    let searchValueParam = encodeURIComponent(this.state.keyword);
    console.log(this.state.keyword);
    fetch(
      API_URL +
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
        result.json().then(data => {
          this.setState({
            products: data.data,
            maxPage: data.maxPage
          });
        });
      }
    });
  }

  getLinkDetail(id) {
    return "/detail/" + id;
  }

  async componentWillMount() {
    await this.setState({
      keyword: this.props.match.params.keyword
    });
    await this.getSearchProduct();
  }

  render() {
    const { products } = this.state;
    const listProduct = products.map(product => (
      <div className="card product col-md-3 ml-1 mr-1 mb-1">
        <Row>
          <img
            className="card-img-top"
            src={product.image[0].url}
            alt="Card image cap"
          />
        </Row>
        <Row>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            {product.promotion !== null && product.promotion !== undefined ? (
              <div>
                <span
                  style={{ textDecoration: "line-through" }}
                  className="card-text"
                >
                  {product.price} VND
                </span>
                <span
                  style={{ fontWeight: "bold", color: "red", marginLeft: 5 }}
                  className="card-text"
                >
                  {product.price * product.promotion.discount} VND
                </span>
              </div>
            ) : (
              <div><span className="card-text">{product.price} VND</span></div>
            )}
            <Button color="primary">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={this.getLinkDetail(product.id)}
              >
                View Detail
              </Link>
            </Button>{" "}
            <Button
              onClick={() => {
                this.props.addToCart(product);
              }}
              color="success"
            >
              Add to Cart
            </Button>
          </div>
        </Row>
      </div>
    ));

    return (
      <div>
        {/* <TopBar onChangeKeyword={this.changeKeyword} onChangeData={this.getSearchProduct} /> */}
        <div className="container-fluid col-md-11">
          <br />
          {products.length > 0 ? (
            <div>
              <Row>
                <p className="h3">Search for [{this.state.keyword}]</p>
              </Row>
              {listProduct}
              <Row>
                <PaginationComponent
                  maxPage={this.state.maxPage}
                  currentPage={this.state.currentPage}
                  onChange={this.getSearchProduct}
                  changePage={this.changeCurrentPage}
                />
              </Row>
            </div>
          ) : (
            <div>
              <Row>
                <p className="h3">Search for [{this.state.keyword}]</p>
              </Row>
              <h1>No items found!!</h1>
            </div>
          )}
        </div>
      </div>
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
    },
    addToCart: product => {
      dispatch({
        type: "ADD_QUANTITY_ITEM_SHOPPING",
        product: product
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProduct);
