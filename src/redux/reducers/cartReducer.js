import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"

export default function cartReducer(state = initialState.cart, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            // eğer sepette eleman varsa
            var addedItem = state.find(c => c.product.id === action.payload.product.id)
            if (addedItem) {
                var newState = state.map(cartItem => {
                    if (cartItem.product.id === action.payload.product.id) {
                        return Object.assign({}, addedItem, { quantity: addedItem.quantity + 1 })
                    }
                    return cartItem
                })
                return newState
            } else {
                // sepette eleman yoksa
                return [...state, { ...action.payload }]
            }

        case actionTypes.REMOVE_FROM_CART:
            // parametreyele gönderilen id farklı ise filter et ve sil
            const newState2 = state.filter(cartItem => cartItem.product.id !== action.payload.id)   
            return newState2
        default:
            return state
    }
}