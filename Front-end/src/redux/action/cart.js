import {REMOVE_PRODUCT_TO_CART,SAVE_PRODUCT_TO_CART,REMOVE_ALL_PRODUCT_TO_CART} from './'

export const saveProductToCart = (value) => {
    return {
        type: SAVE_PRODUCT_TO_CART,
        cart:value
    }
}

export const removeProductFromCart = index => {
    return {
        type:REMOVE_PRODUCT_TO_CART,
        index
    }
}

export const removeAllProductFromCart = () => {
    return {
        type:REMOVE_ALL_PRODUCT_TO_CART
    }
}