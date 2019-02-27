import {
 LOAD_LIST_REQUEST,
 LOAD_LIST_SUCCESS
} from '../action'

import moment from 'moment'
// data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
let initialState = {
    label:'quantity',
    data:[[0,0]]
}

export default (state=initialState,{type,payload}) => {

    switch (type) {
        case LOAD_LIST_REQUEST:
        return{
            isLoading:true,
            data:state.data
        }
            
        case LOAD_LIST_SUCCESS:
        const {qtyPerDate}  = payload 
        return{
            isLoading:false,
            data:{
                qtyPerDate
            }
        }
        default:
            return state
    }
}