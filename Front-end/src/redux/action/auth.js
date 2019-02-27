import {
 LOGIN_SUCCESS,LOGIN_REQUEST,LOGOUT,
 REGISTER_REQUEST,REGISTER_SUCCESS
} from './'
import {Auth} from '../../lib'
import constants from '../../constants';
import { CALL_API } from '../../middleware';



export function login(username,password){
    return {
        [CALL_API] : {
            endpoint:`${constants.API}/sessions`,
            body:{
                 username,
                 password
            },
            method:'post',
            types:[LOGIN_REQUEST,{
                type:LOGIN_SUCCESS,
                payload(action,state,data){
                    const token = data.Authorization
                    const user = data.user
                    Auth.setToken(token)
                    return {
                        user,
                        token
                    }
                }
            }]
        }
    }
}

export function logout(){
    Auth.removeToken()
    return {
        type:LOGOUT
    }
}


export function register(body){
    return {
        [CALL_API]: {
            endpoint:`${constants.API}/users/create`,
            method:'post',
            body,
            types:[REGISTER_REQUEST,{
                type:REGISTER_SUCCESS,
                payload(action,state,data){
                    const token = data.Authorization
                    Auth.setToken(token)
                    return {
                        token
                    }
                }
            }]
        }
    }
}


        