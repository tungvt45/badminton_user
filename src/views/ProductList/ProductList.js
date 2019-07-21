import React, { Component } from "react";
import axios from "axios";
import product1 from "../../../public/image/product2.jpeg";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import PaginationComponent from "../Pagination/Pagination";
import TopBar from "../TopBar/TopBar";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/config";
import { URL } from "../../constants/config";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPromotionProduct: [],
      allBestSaleProduct: [],
      allProduct: [],
      products: [],
      maxPage: 0,
      pageSize: 20,
      currentPage: 1
    };
    this.getAllPromotionProduct = this.getAllPromotionProduct.bind(this);
    this.getAllBestSalesProduct = this.getAllPromotionProduct.bind(this);
    this.getAllProduct = this.getAllProduct.bind(this);
    this.getDataFromAPI = this.getDataFromAPI.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.getSearchProduct = this.getSearchProduct.bind(this);
  }

  changeKeyword(value) {
    this.setState({
      keyword: value
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

  changeCurrentPage(index) {
    this.setState({
      currentPage: index
    });
  }

  getLinkDetail(id) {
    return "/detail/" + id;
  }

  getAllPromotionProduct() {
    let pageParam = encodeURIComponent(this.state.currentPage);
    let pageSizeParam = encodeURIComponent(this.state.pageSize);
    fetch(
      API_URL +
        "/products/allPromotionProduct?page=" +
        pageParam +
        "&element=" +
        pageSizeParam,
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
            allPromotionProduct: data.data,
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

  getAllBestSalesProduct() {
    let pageParam = encodeURIComponent(this.state.currentPage);
    let pageSizeParam = encodeURIComponent(this.state.pageSize);
    fetch(
      API_URL +
        "/products/allBestSalesProduct?page=" +
        pageParam +
        "&element=" +
        pageSizeParam,
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
            allBestSaleProduct: data.data,
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

  getAllProduct() {
    let pageParam = encodeURIComponent(this.state.currentPage);
    let pageSizeParam = encodeURIComponent(this.state.pageSize);
    fetch(
      API_URL + "/products/?page=" + pageParam + "&element=" + pageSizeParam,
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
            allProduct: data.data,
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

  // componentWillMount() {
  // let promotionProductList = Array().fill(null);
  // axios.get('http://localhost:8080/products/promotionProduct')
  //     .then(response => {
  //         promotionProductList = response.data;
  //         // console.log("data " + dataProduct);
  //         this.setState({ promotionProduct: promotionProductList });
  //         console.log("pro" + this.state.promotionProduct);
  //     })
  //     .catch(error => {
  //         console.log(error);
  //     });
  // let bestSalesProductList = Array().fill(null);
  // }

  getDataFromAPI() {
    console.log("title", this.props.product.title);
    if (this.props.product.title === "Promotion") {
      this.getAllPromotionProduct();
    } else if (this.props.product.title === "Best Sales") {
      this.getAllBestSalesProduct();
    } else {
      this.getAllProduct();
    }
  }

  componentDidMount() {
    console.log(this.props.product.title);
    // console.log(this.state.allProduct);
    this.getDataFromAPI();
  }

  getLinkDetail(id) {
    return "/detail/" + id;
  }
  render() {
    let listProduct;
    if (this.state.allPromotionProduct.length !== 0) {
      listProduct = this.state.allPromotionProduct.map(product => (
        <div className="card product col-md-3 ml-1 mr-1 mb-1 mt-1">
          <Row>
            <img
              className="card-img-top"
              src={product.image[0].url}
              alt="Card image cap"
              style={{ width: "100%", height: 300 }}
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
                <p className="card-text">{product.price} VND</p>
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
    } else if (this.state.allBestSaleProduct.length !== 0) {
      listProduct = this.state.allBestSaleProduct.map(product => (
        <div className="card product col-md-3 ml-1 mr-1 mb-1 mt-1">
          <Row>
            <img
              className="card-img-top"
              src={product.image[0].url}
              alt="Card image cap"
              style={{ width: "100%", height: 300 }}
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
                <span className="card-text">{product.price} VND</span>
              )}
              <Button color="primary">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={this.getLinkDetail(product[0].id)}
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
    } else if (this.state.allProduct.length !== 0) {
      listProduct = this.state.allProduct.map(product => (
        <div className="card product col-md-3 ml-1 mr-1 mb-1 mt-1">
          <Row>
            <img
              className="card-img-top"
              src={product.image[0].url}
              alt="Card image cap"
              style={{ width: "100%", height: 300 }}
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
                <div>
                  <span className="card-text">{product.price} VND</span>
                </div>
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
    }
    // let searchProducts;
    // if (this.state.products.length !== 0) {
    //   searchProducts = this.state.products.map(product => (
    //     <div className="card product col-md-3 ml-1 mr-1 mb-1 mt-1">
    //       <Row>
    //         <img
    //           className="card-img-top"
    //           src={product.image[0].url}
    //           alt="Card image cap"
    //           style={{width: "100%", height: 300}}
    //         />
    //       </Row>
    //       <Row>
    //         <div className="card-body">
    //           <h5 className="card-title">{product.name}</h5>
    //           <p className="card-text">{product.price} VND</p>
    //           <Button
    //             onClick={() => this.goToDetail(product.id)}
    //             color="primary"
    //           >
    //             View detail
    //           </Button>{" "}
    //           <Button
    //             onClick={() => {
    //               this.props.addToCart(product);
    //             }}
    //             color="success"
    //           >
    //             Add to Cart
    //           </Button>
    //         </div>
    //       </Row>
    //     </div>
    //   ));
    // }
    return (
      <div>
        <div className="container-fluid col-md-11">
          <br />
          <Row>
            <p className="h3">{this.props.product.title} list</p>
          </Row>
          {listProduct}
          <PaginationComponent
            maxPage={this.state.maxPage}
            currentPage={this.state.currentPage}
            onChange={this.getDataFromAPI}
            changePage={this.changeCurrentPage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
)(ProductList);
