import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { SET_STATUS } from "../../redux/action/types";
import { Link } from "react-router-dom";
class ShoppingCartModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      product: []
    };
  }

  handleDeleteItem(productId) {
    this.props.deleteFromCart(productId);
    const listShoppingProduct = this.props.shoppingCart.product;
    this.setState({
      show: true,
      product: listShoppingProduct
    });
  }

  handleAddItem(product) {
    this.props.addItem(product);
    const listShoppingProduct = this.props.shoppingCart.product;
    this.setState({
      show: true,
      product: listShoppingProduct
    });
  }

  handleSubItem(product) {
    this.props.subItem(product);
    const listShoppingProduct = this.props.shoppingCart.product;
    console.log(listShoppingProduct);
    this.setState({
      show: true,
      product: listShoppingProduct
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    const listShoppingProduct = this.props.shoppingCart.product;
    this.setState({
      show: true,
      product: listShoppingProduct
    });
  }

  handleOpenPaymentPopup() {
    const listShoppingProduct = this.props.shoppingCart.product;
    let token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      alert("You must login first to payment");
    } else if (listShoppingProduct.length === 0) {
      alert("No item to payment");
    } else this.handleClose();
  }

  render() {
    const token = localStorage.getItem("token");
    const { product } = this.state;
    const renderShoppingItem = product.map((product, i) => (
      <TableRow
        key={i}
        data={product}
        number={i}
        onDeleteItem={() => this.handleDeleteItem(product.id)}
        onAddItem={() => this.handleAddItem(product)}
        onSubItem={() => this.handleSubItem(product)}
      />
    ));
    return (
      <div>
        <a
          onClick={this.handleShow}
          href=""
          className="navbar-brand fa fa-shopping-cart fa-2x"
          role="button"
          data-toggle="modal"
          data-placement="bottom"
          title="Tài khoản"
        />
        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {product.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Action</th>
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
            <Button
              variant="primary"
              onClick={() => this.handleOpenPaymentPopup()}
            >
              {product.length && !(token === null || token === undefined) > 0 ? (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/payment"
                >
                  Payment
                </Link>
              ) : (
                <div>Payment</div>
              )}
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
        <td>
          <p
            className="btn btn-success"
            style={{ cursor: "pointer" }}
            onClick={this.props.onSubItem}
          >
            -
          </p>{" "}
          <p
            className="btn btn-warning"
            style={{ cursor: "pointer" }}
            onClick={this.props.onAddItem}
          >
            +
          </p>{"  "}
          <p className="btn btn-primary" onClick={this.props.onDeleteItem}>
            Delete
          </p>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: productId => {
      dispatch({
        type: "DELETE_ITEM_SHOPPING",
        productId: productId
      });
    },
    addItem: product => {
      dispatch({
        type: "ADD_QUANTITY_ITEM_SHOPPING",
        product: product
      });
    },
    subItem: product => {
      dispatch({
        type: "REMOVE_QUANTITY_ITEM_SHOPPING",
        product: product
      });
    },
    setStatusModal: status => {
      dispatch({
        type: SET_STATUS,
        payload: status
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartModal);
