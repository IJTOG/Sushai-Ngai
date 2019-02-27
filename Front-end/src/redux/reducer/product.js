import {
 LOAD_PRODUCTS_REQUEST,
 LOAD_PRODUCTS_SUCCESS,
 CREATE_PRODUCT_REQUEST,
 CREATE_PRODUCT_SUCCESS,
 DELETE_PRODUCT_REQUEST,
 DELETE_PRODUCT_SUCCESS,
 LOAD_PRODUCT_REQUEST,
 LOAD_PRODUCT_SUCCESS,
 EDIT_PRODUCT_REQUEST,
 EDIT_PRODUCT_SUCCESS
} from '../action'

const initialState = {
    isLoading: false,
    items:[]
  }

  export default (state = initialState, {type,payload}) => {

       switch (type) {
            case LOAD_PRODUCTS_REQUEST:
            return {
                isLoading:true,
                items:[]
             }

            case LOAD_PRODUCTS_SUCCESS:
            if(payload[`products`] === undefined) payload[`products`]= []
            return {
                isLoading:false,
                items:payload.products
             }

             case CREATE_PRODUCT_REQUEST:
             return{
                 isLoading:true,
             }

             case CREATE_PRODUCT_SUCCESS:
             return{
                 isLoading:false,
                 items:[]
             }

             case DELETE_PRODUCT_REQUEST:
             return {
                 isLoading:true,
                 items:[]
             }
             case DELETE_PRODUCT_SUCCESS:
             return {
                isLoading:false,
                items:[]
             }

             case LOAD_PRODUCT_REQUEST:
             return {
                isLoading:true,
                items:[]
             }

             case LOAD_PRODUCT_SUCCESS:
             return{
                isLoading:false,
                items:[payload['product']]
             }

             case EDIT_PRODUCT_REQUEST:
             return {
                isLoading:true,
                items:[]
             }

             case EDIT_PRODUCT_SUCCESS:
             return{
                isLoading:false,
                items:[]
             }

             case 'SAVE_PRODUCT':
             return{
                 isLoading:false,
                 items:[payload]
             }
           default:
            return state
       }
  }