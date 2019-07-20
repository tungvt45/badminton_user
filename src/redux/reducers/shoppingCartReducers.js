import { ADD_QUANTITY_ITEM_SHOPPING } from "../action/types";
import { REMOVE_QUANTITY_ITEM_SHOPPING } from "../action/types";
import { DELETE_ITEM_SHOPPING } from "../action/types";
import { GET_SHOPPING_CART } from "../action/types";

let STATE = {
  product: []
};

export const ShoppingCartReducers = (state = STATE, action) => {
  switch (action.type) {
    case ADD_QUANTITY_ITEM_SHOPPING:
      var listProduct = state.product;
      const item = listProduct.find(
        product => product.id === action.product.id
      );
      if (typeof item === "undefined") {
        action.product.count = 1;
        state.product.push(action.product);
      } else {
        const itemIndex = listProduct.findIndex(
          product => product.id === action.product.id
        );
        listProduct[itemIndex].count += 1;
      }
      break;
    case REMOVE_QUANTITY_ITEM_SHOPPING:
      var listProduct = state.product;
      const itemIndex = listProduct.findIndex(
        product => product.id === action.product.id
      );
      if (listProduct[itemIndex].count === 1) {
        listProduct = listProduct.filter(
          product => product.id !== listProduct[itemIndex].id
        );
        console.log(listProduct);
        state.product = listProduct;
        break;
      } else {
        listProduct[itemIndex].count -= 1;
      }
      break;
    case DELETE_ITEM_SHOPPING:
      const items = state.product.filter(
        product => product.id !== action.productId
      );
      state.product = items;
      break;
    default:
      return state;
  }
  return state;
};
