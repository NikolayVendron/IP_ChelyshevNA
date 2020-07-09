import axios from "axios";
import {
    ORDER_DATA,
    RENDER_DATA_SUCCESS,
    RENDER_ITEMS_SUCCESS,
    RENDER_ORDERS
} from "./actionTypes";

export function renderItems() {
    return async dispatch => {
        try {
            const response = await axios.get('https://furniture-shop-71b70.firebaseio.com/furniture.json');
            const items = Object.entries(response.data).map((item) => {
                return {
                    key: item[0],
                    id: item[0],
                    name: item[1].name,
                    type: item[1].type,
                    material: item[1].material,
                    count: item[1].count,
                    price: item[1].price,
                }
            });
            return dispatch(renderItemsSuccess(items));
        } catch (e) {
            console.log(e)
        }
    }
}

export function renderData() {
    return async dispatch => {
        try {
            const response = await axios.get(`https://furniture-shop-71b70.firebaseio.com/users/${localStorage.userId}.json`);
            Object.entries(response.data).map((personData) => {
                return dispatch(renderDataSuccess(personData[0], personData[1]))
            });
            Object.entries(response.data).map((userData) => {
                const orders = Object.entries(userData[1].orders).map((order) => {
                    return {
                        orderId: order[0],
                        orderData: order[1]
                    }
                });
                return dispatch(renderOrders(orders));
            });
        } catch (e) {
            console.log(e)
        }
    }
}

export function orderData(price, count) {
    return {
        type: ORDER_DATA,
        price, count
    }
}

export function renderItemsSuccess(items) {
    return {
        type: RENDER_ITEMS_SUCCESS,
        items
    }
}

export function renderDataSuccess(personId, personData) {
    return {
        type: RENDER_DATA_SUCCESS,
        personId,
        personData
    }
}

export function renderOrders(orders) {
    return {
        type: RENDER_ORDERS,
        orders
    }
}