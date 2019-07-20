import { SET_TITLE } from "../action/types";

let STATE = {
    title : ''
}

export const ProductReducers = (state = STATE, action) => {
    console.log(action.payload);
    switch (action.type) {
        case SET_TITLE:
            state = {
                ...state,
                title: action.payload
            }
            break;
        default:
            return state;
    }
    return state;
}