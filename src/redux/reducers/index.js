import {combineReducers} from 'redux';
import { ProductReducers } from "./productReducers";
import { ShoppingCartReducers } from "./shoppingCartReducers";
import { SearchReducers } from "./searchReducers";

export default combineReducers({
    product: ProductReducers,
    shoppingCart: ShoppingCartReducers,
    search: SearchReducers
});