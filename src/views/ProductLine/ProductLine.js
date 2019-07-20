import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import product1 from "../../../public/image/product2.jpeg";
import "./product.css";
import axios from "axios";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {API_URL} from "../../constants/config";

import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from "mdbreact";
import { SET_TITLE } from "../../redux/action/types";

class ProductLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };

    this.goToDetail = this.goToDetail.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.handleCarouselItem = this.handleCarouselItem.bind(this);
  }

  setTitle(title) {
    this.props.setTitleRedux(title);
  }

  goToDetail(id) {
    window.location = "http://localhost:3000/detail/" + id;
  }

  viewAll(title) {
    window.location = "http://localhost:3000/product?title=" + title;
  }

  addToCart = product => {
    this.props.addToCart(product);
  };

  handleCarouselItem() {
    let listProduct = this.props.data;
    let listProductTemp = [];
    let listThreeItem = [];
    let size = 3;
    for (let i = 0; i < listProduct.length; i++) {
      for (let j = 1; j <= size; j++) {
        if (listProduct[i] !== null && listProduct[i] !== undefined) {
          listThreeItem.push(listProduct[i]);
          if (!(j === size)) {
            i++;
          }
        }
      }
      listProductTemp.push(listThreeItem);
      listThreeItem = [];
    }
    console.log(listProductTemp);
    return listProductTemp;
  }

  componentDidMount() {
    console.log(API_URL);
  }

  getLinkDetail(id) {
    return "/detail/" + id;
  }

  render() {
    let listProduct = this.handleCarouselItem();
    const length = listProduct.length;
    let position = 1;
    console.log(listProduct.length);
    let render = listProduct.map((product, index) => (
      <MDBCarouselItem itemId={index + 1} key={index}>
        <MDBRow>
          <MDBCol md="4">
            <MDBCard className="mb-2">
              <MDBCardImage
                className="img-fluid"
                src={product[0].image[0].url}
                style={{width: "100%", height: 300}}
              />
              <MDBCardBody>
                <MDBCardTitle>{product[0].name}</MDBCardTitle>
                {product[0].promotion !== null &&
                product[0].promotion !== undefined ? (
                  <div>
                    <span
                      style={{ textDecoration: "line-through" }}
                      className="card-text"
                    >
                      {product[0].price} VND
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        marginLeft: 5
                      }}
                      className="card-text"
                    >
                      {product[0].price * product[0].promotion.discount} VND
                    </span>
                  </div>
                ) : (
                  <p className="card-text">{product[0].price} VND</p>
                )}
                <MDBBtn color="primary">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={this.getLinkDetail(product[0].id)}
                  >
                    View Detail
                  </Link>
                </MDBBtn>{" "}
                <MDBBtn
                  color="success"
                  onClick={() => {
                    this.props.addToCart(product[0]);
                  }}
                >
                  Add to Cart
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-2">
              <MDBCardImage
                className="img-fluid"
                src={product[1].image[0].url}
                style={{width: "100%", height: 300}}
              />
              <MDBCardBody>
                <MDBCardTitle>{product[1].name}</MDBCardTitle>
                {product[1].promotion !== null &&
                product[1].promotion !== undefined ? (
                  <div>
                    <span
                      style={{ textDecoration: "line-through" }}
                      className="card-text"
                    >
                      {product[1].price} VND
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        marginLeft: 5
                      }}
                      className="card-text"
                    >
                      {product[1].price * product[1].promotion.discount} VND
                    </span>
                  </div>
                ) : (
                  <p className="card-text">{product[1].price} VND</p>
                )}
                <MDBBtn color="primary">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={this.getLinkDetail(product[1].id)}
                  >
                    View Detail
                  </Link>
                </MDBBtn>{" "}
                <MDBBtn
                  color="success"
                  onClick={() => {
                    this.props.addToCart(product[1]);
                  }}
                >
                  Add to Cart
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-2">
              <MDBCardImage
                className="img-fluid"
                src={product[2].image[0].url}
                style={{width: "100%", height: 300}}
              />
              <MDBCardBody>
                <MDBCardTitle>{product[2].name}</MDBCardTitle>
                {product[2].promotion !== null &&
                product[2].promotion !== undefined ? (
                  <div>
                    <span
                      style={{ textDecoration: "line-through" }}
                      className="card-text"
                    >
                      {product[2].price} VND
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        marginLeft: 5
                      }}
                      className="card-text"
                    >
                      {product[2].price * product[2].promotion.discount} VND
                    </span>
                  </div>
                ) : (
                  <p className="card-text">{product[2].price} VND</p>
                )}
                <MDBBtn color="primary">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={this.getLinkDetail(product[2].id)}
                  >
                    View Detail
                  </Link>
                </MDBBtn>{" "}
                <MDBBtn
                  color="success"
                  onClick={() => {
                    this.props.addToCart(product[2]);
                  }}
                >
                  Add to Cart
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBCarouselItem>
    ));

    return (
      <div className="container-fluid col-md-11">
        <div>
          <Row className="row">
            <Col className="col-md-3">
              <p className="title">{this.props.title}</p>
            </Col>
            <Col className="offset-md-7">
              <Link
                to="/product"
                onClick={() => this.setTitle(this.props.title)}
              >
                view all
              </Link>
            </Col>
          </Row>
        </div>{" "}
        <MDBContainer>
          <MDBCarousel
            activeItem={1}
            length={3}
            slide={true}
            showControls={true}
            showIndicators={true}
            multiItem
          >
            <MDBCarouselInner>
              <MDBRow>{render}</MDBRow>
            </MDBCarouselInner>
          </MDBCarousel>
        </MDBContainer>
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
    setTitleRedux: title => {
      dispatch({
        type: SET_TITLE,
        payload: title
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
)(ProductLine);
