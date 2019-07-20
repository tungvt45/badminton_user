import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PageDetailBody.css";
import axios from "axios";
import { connect } from "react-redux";
import {API_URL} from "../../constants/config";
class PageDetailBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      imageClick: ""
    };
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    axios
      .get(API_URL + "/products/" + id)
      .then(response => {
        const dataProduct = response.data;
        console.log("first image", dataProduct.image[0].url);
        this.setState({ product: dataProduct, imageClick: dataProduct.image[0].url });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    let { product } = this.state;
    var listImage = product.image;
    console.log(listImage);
    var listImageRender = [];
    if (listImage !== undefined) {
      for (let i = 0; i < listImage.length; i++) {
        listImageRender.push(
          <li className="">
            <a data-target="#pic-1" data-toggle="tab" onClick={()=>{this.setState({ imageClick: listImage[i].url })}}>
              <img style={{width: 120, height: 100}} alt="" src={listImage[i].url} />
            </a>
          </li>
        );
      }
    }
    let imageSlideShow = (
      <div className="preview-pic tab-content">
        <div className="tab-pane active" id="pic-1">
          <img style={{width: 600, height: 400}} alt="" src={this.state.imageClick} />
        </div>
      </div>
    );
    return (
      <div>
        <div className="container">
          <div className="card mt-3 mb-3 p-4">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-6">
                  {imageSlideShow}

                  <ul className="preview-thumbnail nav nav-tabs">
                    {listImageRender}
                  </ul>
                </div>
                <div className="details col-md-6">
                  <h3 className="product-title">{this.state.product.name}</h3>
                  <br />
                  <p>
                    <b>Shaft:</b> {this.state.product.shaft}
                  </p>
                  <p>
                    <b>Flex:</b> {this.state.product.flex}
                  </p>
                  <p>
                    <b>Weigh:</b> {this.state.product.weight}
                  </p>
                  <p>
                    <b>Color:</b> {this.state.product.color}
                  </p>
                  <h5 className="price">
                    current price:
                    {this.state.product.promotion !== null &&
                    this.state.product.promotion !== undefined ? (
                      <div>
                        <span
                          style={{ textDecoration: "line-through" }}
                          className="card-text"
                        >
                          {this.state.product.price} VND
                        </span>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            marginLeft: 5
                          }}
                          className="card-text"
                        >
                          {this.state.product.price *
                            this.state.product.promotion.discount}{" "}
                          VND
                        </span>
                      </div>
                    ) : (
                      <p className="card-text">
                        {this.state.product.price} VND
                      </p>
                    )}
                  </h5>

                  <div className="action">
                    <button
                      className="add-to-cart btn btn-default mt-1"
                      type="button"
                      onClick={() => {
                        this.props.addToCart(this.state.product);
                      }}
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <div className="card-header">Description</div>
            <div className="card-body">{this.state.product.description}</div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
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
        type: "SET_TITLE",
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
)(PageDetailBody);
