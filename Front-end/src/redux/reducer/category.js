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
} from '../action'

const initialState = {
  isLoading: false,
  items:[]
}

  export default (state = initialState , { type,gallery,category,payload,deleteId}) => {
      switch (type) {
        case LOAD_CATEGORY_REQUEST :
        case LOAD_CATEGORIES_REQUEST:
          return {
             isLoading:true,
             items:[]
          }
        case LOAD_CATEGORY_SUCCESS : 
          return {
            isLoading:true,
            item:payload.categories 
          }
        case LOAD_CATEGORIES_SUCCESS: 
          if(payload.categories === undefined) payload.categories= []
        return {
                items:payload.categories,
                isLoading:false
            }
        case  DELETE_CATEGORY_REQUEST:
        return {
           isLoading:true,
           items:[]
        }
        
        case DELETE_CATEGORY_SUCCESS:
        return {
          isLoading:true,
          items:[]
       }

        case SAVE_CATEGORY: state = payload.categories
        return state

        case CREATE_CATEGORY_REQUEST:
        return {
           items:[],
           isLoading:true
        }

        case CREATE_CATEGORY_SUCCESS:
        return {
           items:[],
           isLoading:false
        }

        case EIDT_CATEGORY_REQUEST:
        return  {
          items:[],
          isLoading:true
       }

        case EDIT_CATEGORY_SUCCESS:
        return {
          items:[],
          isLoading:false
       }

        default:
          return state
      }
    }