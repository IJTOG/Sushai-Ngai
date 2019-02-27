import {
    REMOVE_PRODUCT_TO_CART,
    SAVE_PRODUCT_TO_CART,
    REMOVE_ALL_PRODUCT_TO_CART
} from '../action'

const initialState = {
    isLoading: false,
    items:[]
  }

export default (state=initialState,{type,cart,index}) => {

    switch (type) {
    case SAVE_PRODUCT_TO_CART:{
         return {
                items: state.items.concat(cart)
            }
        }
    case REMOVE_PRODUCT_TO_CART:
         state.items.splice(index,1)
    return{
        items:state.items
    }
    case REMOVE_ALL_PRODUCT_TO_CART:
         return {
             items:[]
         }
        default:
            return state
    }

}