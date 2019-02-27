import { 
 REGISTER_SUCCESS,
 LOGOUT,
 LOGIN_SUCCESS
} from '../action'
import {Auth} from '../../lib/'

const initState = {
    user:{},
    token: Auth.getToken()
}

export default (state = initState,{type,payload})=> {
    switch (type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:    
             return {
                 user:payload.user,
                 token:payload.token
             }
        case LOGOUT:
             return{
                 token:null
             }
        default:
            return state
    }
}