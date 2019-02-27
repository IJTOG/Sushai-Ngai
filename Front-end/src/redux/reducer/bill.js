import {
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
  LOAD_BILLS_REQUEST,
  LOAD_BILLS_SUCCESS,
  LOAD_BILL_REQUEST,
  LOAD_BILL_SUCCESS,
  LOAD_BILLS_REQUEST_STATUS,
  LOAD_BILLS_SUCCESS_STATUS
 } from '../action'
 
 const initialState = {
     isLoading:false,
     items:[],
     billId:"",
 }
 
 export default (state=initialState,{type,payload}) => {
     switch (type) {
         case CREATE_BILL_REQUEST:
          return{
            isLoading:true,
            items:[]
          }
         case CREATE_BILL_SUCCESS:
          if(payload !== undefined)
            return {
                items:[],
                isLoading:false,
                billId:payload.bill
            }
          case LOAD_BILLS_REQUEST:
          return{
            isLoading:true,
            items:[]
          }
          case LOAD_BILLS_SUCCESS:
          return{
            isLoading:false,
            items:payload.Bill
          }
          case LOAD_BILL_REQUEST:
          return{
            ...state,
            isLoading:false,
            items:[]
          }
          case LOAD_BILL_SUCCESS:
          return{
            ...state,
            isLoading:false,
            items:payload.Bill,
          }
          case LOAD_BILLS_REQUEST_STATUS:
          return{
            isLoading:true,
            items:[],
          }
          case LOAD_BILLS_SUCCESS_STATUS:
          return{
            isLoading:false,
            items:payload.Bill,
          }

         default:
             return state
     }
 }