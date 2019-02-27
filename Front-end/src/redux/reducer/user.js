import {
 LOAD_USERS_REQUEST,
 LOAD_USERS_SUCCESS
} from '../action'
import { CALL_API } from '../../middleware';

const initialstate = [
  {
    id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    tel: "",
    is_admin: ""
  }
]

export default (state = initialstate , { type, user ,payload}) => {
    switch (type) {
      case 'SAVE_SESSION':
        return {
          id:user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          email: user.email,
          tel: user.tel,
          is_admin: user.is_admin,
          gallery_id:user.gallery_id
        }

      case 'DELETE_SESSION':
        return initialstate
      
      case LOAD_USERS_REQUEST :
      return {
         items:[],
         isLoading:true
      }

      case LOAD_USERS_SUCCESS : 
      return {
        isLoading:false,
        items:payload['users']['User']
      }
      default:
        return state
    }
  }

