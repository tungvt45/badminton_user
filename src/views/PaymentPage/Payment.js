import React, { Component } from "react";
import axios from "axios";
import product1 from "../../../public/image/product2.jpeg";
import { Row, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import PaginationComponent from "../Pagination/Pagination";
import TopBar from "../TopBar/TopBar";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/config";
import { URL } from "../../constants/config";
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      product: []
    };
  }

  async componentWillMount() {
    console.log(this.props);
    const listShoppingProduct = this.props.shoppingCart.product;

    await this.setState({
      show: true,
      product: listShoppingProduct
    });
    let token = localStorage.getItem("token");
    await axios
      .get(API_URL + "/user/get-user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            account: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async payment() {
    const { product } = this.state;
    let token = localStorage.getItem("token");
    if (token == null) {
      alert("You must login to continue");
      return;
    }
    if (product.length == 0) {
      alert("You must choose something to checkout");
      return;
    }
    await axios
      .post(API_URL + "/order", product, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.status === 200) {
          // this.setState({
          //   account: response.data
          // });
          alert("Payment Success");
          setTimeout(function() {
            window.location = URL + ":3000";
          }, 1000);
        } else {
          alert("Some error happen");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { product } = this.state;
    const renderShoppingItem = product.map((product, i) => (
      <TableRow key={i} data={product} number={i} />
    ));
    let total = 0;
    for (let i = 0; i < product.length; i++) {
      if (product.promotion !== null & product.promotion !== undefined) {
        total += product[i].price * product[i].count * product[i].promotion.discount;  
      } else {
        total += product[i].price * product[i].count;
      }
    }
    const { account } = this.state;
    return (
      <div className="container" style={{ backgroundColor: "white" }}>
        <h1>PAYMENT</h1>
        <div className="container">
          <b>Name: </b>
          <p>{account.name}</p>
          <b>Email: </b>
          <p>{account.email}</p>
          <b>Address: </b>
          <p>{account.address}</p>
        </div>
        <div className="container">
          {product.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>{renderShoppingItem}</tbody>
            </Table>
          ) : (
            <h3>No item !!!</h3>
          )}
        </div>
        <h3>Total: {total}</h3>
        <Row>
          <div className="container">
            <Button
              variant="primary"
              onClick={() => this.payment()}
              style={{
                float: "right",
                marginBottom: 10,
                width: 100,
                height: 70
              }}
            >
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Check Out
              </Link>
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    var { id, name, price, count, promotion } = this.props.data;
    return (
      <tr>
        <td>{this.props.number + 1}</td>
        <td>{id}</td>
        <td>{name}</td>
        {promotion !== undefined && promotion !== null ? (
          <td>{price * count * promotion.discount}</td>
        ) : (
          <td>{price * count}</td>
        )}
        <td>{count}</td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart,
    product: state.product
  };
};

export default connect(mapStateToProps)(Payment);
