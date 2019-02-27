import {
 LOAD_USERS_REQUEST,
 LOAD_USERS_SUCCESS
} from './'
import constants from '../../constants';
import { CALL_API } from '../../middleware';

export const saveSession = ( user ) => {
    return {
      type: 'SAVE_SESSION',
      user
    }
  }
  
  export const deleteSession = () => {
    return {
      type: 'DELETE_SESSION'
    }
  }
  
export const loadUsers = () => {
  return {
    [CALL_API] : {
       endpoint : `${constants.API}/users`,
       types:[LOAD_USERS_REQUEST,LOAD_USERS_SUCCESS]
    }
  }
}