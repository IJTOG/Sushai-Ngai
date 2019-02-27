import {
    LOAD_LIST_REQUEST,
    LOAD_LIST_SUCCESS
} from './'
import {CALL_API} from '../../middleware'
import constants from '../../constants'

export function loadListToChart(){
    return{
        [CALL_API]:{
            endpoint:`${constants.API}/list/qty`,
            types:[LOAD_LIST_REQUEST,LOAD_LIST_SUCCESS]
        }
    }
}