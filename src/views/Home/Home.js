import React, { Component } from "react";
import Carousel from "../Carousel/Carousel";
import TopBar from "../TopBar/TopBar";
import ProductLine from "../ProductLine/ProductLine";
import axios from "axios";
import { Row } from "reactstrap";
import PaginationComponent from "../Pagination/Pagination";
import {API_URL} from "../../constants/config";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionProduct: Array().fill(null),
      bestSaleProduct: Array().fill(null),
      fourProduct: Array().fill(null),
      products: [],
      maxPage: 0,
      pageSize: 1,
      currentPage: 1
    };
    this.changeKeyword = this.changeKeyword.bind(this);
    this.getSearchProduct = this.getSearchProduct.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
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
    fetch( API_URL +
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
      console.log("RESULT", result);
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

  async componentWillMount() {
    let promotionProductList = Array().fill(null);
    await axios
      .get(API_URL + "/products/promotionProduct")
      .then(response => {
        promotionProductList = response.data;
        // console.log("data " + dataProduct);
        this.setState({ promotionProduct: promotionProductList });
        console.log("pro" + this.state.promotionProduct);
      })
      .catch(error => {
        console.log(error);
      });
    let bestSalesProductList = Array().fill(null);
    await axios
      .get(API_URL + "/products/bestSalesProduct")
      .then(response => {
        bestSalesProductList = response.data;
        // console.log("data " + dataProduct);
        this.setState({ bestSaleProduct: bestSalesProductList });
        console.log("pro" + this.state.bestSaleProduct);
      })
      .catch(error => {
        console.log(error);
      });
    let fourProductList = Array().fill(null);
    await axios
      .get(API_URL + "/products/fourProduct")
      .then(response => {
        fourProductList = response.data;
        // console.log("data " + dataProduct);
        this.setState({ fourProduct: fourProductList });
        console.log("pro" + this.state.fourProduct);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let searchProducts;
    searchProducts = this.state.products.map(product => (
      <div className="card product col-md-3 ml-1 mr-1 mb-1 mt-1">
        {/* product.map() */}
        <img
          className="mt-3 card-img-top"
          src={product.image[0].url}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <span className="card-text">{product.price} VND</span>
          {/* <button onClick={() => this.goToDetail(product.id)} className="btn btn-primary">View detail</button>{' '} */}
          <a href="#" className="btn btn-primary">
            Add to Cart
          </a>
        </div>
      </div>
    ));

    return (
      <div>
        {this.state.products.length === 0 ? (
          <div className="container-fluid col-md-11">
            <Carousel />
            <br />
            <ProductLine
              data={this.state.promotionProduct}
              title={"Promotion"}
            />
            <br />
            <ProductLine
              data={this.state.bestSaleProduct}
              title={"Best Sales"}
            />
            <br />
            <ProductLine data={this.state.fourProduct} title={"Racket"} />
            <br />
          </div>
        ) : (
          <div className="container-fluid col-md-11">
            <br />
            <Row>
              <p className="h3">Search for [{this.state.keyword}]</p>
            </Row>
            {searchProducts}
            <PaginationComponent
              maxPage={this.state.maxPage}
              currentPage={this.state.currentPage}
              onChange={this.getSearchProduct}
              changePage={this.changeCurrentPage}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
