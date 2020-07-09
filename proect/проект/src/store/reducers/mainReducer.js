import {
    ORDER_DATA,
    RENDER_DATA_SUCCESS,
    RENDER_ITEMS_SUCCESS,
    RENDER_ORDERS
} from "../actions/actionTypes";

const initialState = {
    items: [],
    personId: '',
    personData: {},
    orders: [],
    price: null,
    count: null,
};

export default function mainReducer(state = initialState, action) {
    switch(action.type) {
        case RENDER_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.items
            };
        case RENDER_DATA_SUCCESS:
            return {
                ...state,
                personId: action.personId,
                personData: action.personData
            };
        case RENDER_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        case ORDER_DATA:
            return {
              ...state,
              price: action.price,
              count: action.count
            };
        default:
            return state;
    }
}