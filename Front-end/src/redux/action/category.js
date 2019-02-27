import {
          CREATE_CATEGORY_REQUEST,
          CREATE_CATEGORY_SUCCESS,
          EIDT_CATEGORY_REQUEST,
          EDIT_CATEGORY_SUCCESS,
          DELETE_CATEGORY_REQUEST,
          DELETE_CATEGORY_SUCCESS, 
          SAVE_CATEGORY,
          LOAD_CATEGORIES_REQUEST,
          LOAD_CATEGORIES_SUCCESS,
          LOAD_CATEGORY_REQUEST,
          LOAD_CATEGORY_SUCCESS
} from './'
import CONSTANTS from '../../constants'
import {CALL_API} from '../../middleware'


export const saveCategory = value => { 
  const {id,name,detail} = value
  return {
    type: SAVE_CATEGORY,
    category : {
      name,detail,id
    }
  }
}



export const createCategory = ( value ) => {
  const {name,detail,gallery,nameOfPic} = value
  return {
    [CALL_API]:{
        endpoint:`${CONSTANTS.API}/categories/create`,
        body:{
            name,
            detail,
            gallery_id:gallery['galleryId']
        },
        method:'post',
        types:[CREATE_CATEGORY_REQUEST,{
           type:CREATE_CATEGORY_SUCCESS,
           payload(action,state,data){
              return {
                data
              }
           }
        }]
    }
  }
}

export const editCategory = value => {
  
  return {
    [CALL_API]:{
      endpoint: `${CONSTANTS.API}/categories/edit/${value['id']}`,
      method:'put',
      types:[EIDT_CATEGORY_REQUEST,EDIT_CATEGORY_SUCCESS],
      body:value
    }
  }
}

export const deleteCategory = ({id}) => {
  
  return {
    [CALL_API]:{
      endpoint:`${CONSTANTS.API}/categories/delete/${id}`,
      method:'delete',
      types:[DELETE_CATEGORY_REQUEST,LOAD_CATEGORIES_SUCCESS]
    }
  }
}

export function loadCategories() {
  return {
    [CALL_API] :{
      endpoint: `${CONSTANTS.API}/categories`,
      types:[LOAD_CATEGORIES_REQUEST,LOAD_CATEGORIES_SUCCESS]
    }
  }
}

  export function loadCategory(id) {
    return {
      [CALL_API] :{
        endpoint: `${CONSTANTS.API}/categories/${id}`,
        types:[LOAD_CATEGORY_REQUEST,LOAD_CATEGORY_SUCCESS]
      }
    }
  }