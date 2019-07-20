import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import {API_URL} from "../../constants/config";
class PaymnentModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      account: "",
      product: []
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  componentWillMount() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(this.props.status)
    if (this.props.status !== undefined) {
      this.handleShow();
    }
  }

  async handleShow() {
    const listShoppingProduct = this.props.shoppingCart.product;
    await this.setState({
      show: true,
      product: listShoppingProduct
    });
    let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: "Bearer " + token }
    };

    // let headers = { Authorization: "Bearer " +  };
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

  render() {
    const { product, account } = this.state;
    const renderShoppingItem = product.map((product, i) => (
      <TableRow
        key={i}
        data={product}
        number={i}
        onDeleteItem={() => this.handleDeleteItem(product.id)}
        onAddItem={() => this.handleAddItem(product)}
      />
    ));
    return (
      <div>
        <Button onClick={this.handleShow}>Payment</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>{account.email}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{account.name}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td />
                </tr>
              </tbody>
            </Table>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Payment
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    var { id, name, price, count } = this.props.data;
    return (
      <tr>
        <td>{this.props.number + 1}</td>
        <td>{id}</td>
        <td>{name}</td>
        <td>{price * count}</td>
        <td>{count}</td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart,
    modal: state.modal
  };
};

export default connect(mapStateToProps)(PaymnentModal);
