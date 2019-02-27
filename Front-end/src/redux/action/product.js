import {
    LOAD_PRODUCTS_REQUEST,
    LOAD_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    LOAD_PRODUCT_REQUEST,
    LOAD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_REQUEST, 
    EDIT_PRODUCT_SUCCESS 
} from './'
import CONSTANTS from '../../constants'
import {CALL_API} from '../../middleware'

export function loadProducts() {
    return {
      [CALL_API] :{
        endpoint: `${CONSTANTS.API}/products`,
        types:[LOAD_PRODUCTS_REQUEST,LOAD_PRODUCTS_SUCCESS]
      }
    }
  }

export function loadProduct(id){
  return {
    [CALL_API]: {
      endpoint: `${CONSTANTS.API}/products/${id}`,
      types:[LOAD_PRODUCT_REQUEST,LOAD_PRODUCT_SUCCESS]
    }
  }
}


export function createProduct(value){
  return {
    [CALL_API]: {
       endpoint:`${CONSTANTS.API}/products/create`,
       body:value,
       method:'post',
       types:[CREATE_PRODUCT_REQUEST,CREATE_PRODUCT_SUCCESS]
    }
  }
}

export function editProduct(value){
  return {
    [CALL_API]:{
      endpoint:`${CONSTANTS.API}/products/edit/${value['id']}`,
       body:value,
       method:'put',
       types:[EDIT_PRODUCT_REQUEST,EDIT_PRODUCT_SUCCESS]
    } 
  }
}

export const deleteProduct = (id) => {
  
  return {
    [CALL_API]:{
      endpoint:`${CONSTANTS.API}/products/delete/${id}`,
      method:'delete',
      types:[DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS]
    }
  }
}
export function saveProduct(value){
  return {
    type: 'SAVE_PRODUCT',
     payload:{
       ...value
     }
  }
}