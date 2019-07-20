import { SET_KEYWORD, SET_DATA, SET_MAXPAGE } from "../action/types";

let STATE = {
    keyword: '',
    data: [],
    maxPage: 0
}

export const SearchReducers = (state = STATE, action) => {
    console.log(action.payload);
    switch (action.type) {
        case SET_KEYWORD:
            state = {
                ...state,
                keyword: action.payload
            }
            break;
        default:
            return state;
    }
    return state;
}