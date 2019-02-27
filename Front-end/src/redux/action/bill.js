import {
    CREATE_BILL_REQUEST,
    CREATE_BILL_SUCCESS,
    LOAD_BILLS_REQUEST,
    LOAD_BILLS_SUCCESS,
    LOAD_BILL_REQUEST,
    LOAD_BILL_SUCCESS
   } from './'
   import constants from '../../constants';
   import { CALL_API } from '../../middleware';
   
   export function createBill(user,product,amount){
   
       return {
           [CALL_API]:{
               endpoint:`${constants.API}/bills/create`,
               body:{
                   user:user.id,
                   amount,
                   product,
                   status:"onProgress",
               },
               method:'post',
               types:[CREATE_BILL_REQUEST,{
                   type:CREATE_BILL_SUCCESS,
                   payload(action,state,data){
                       const billId = data.id
                       return{
                               bill:billId,
                               amount,
                               products:product
                       }
                   }
               }]
           }
       }
   }

   export function loadBills(){
        return {
            [CALL_API]:{
                endpoint: `${constants.API}/bills`,
                types:[LOAD_BILLS_REQUEST,LOAD_BILLS_SUCCESS]
            }
        }
   }

   export function loadBill(id){
    return {
        [CALL_API]:{
            endpoint: `${constants.API}/bills/query/${id}`,
            types:[LOAD_BILL_REQUEST,LOAD_BILL_SUCCESS]
        }
    }
}