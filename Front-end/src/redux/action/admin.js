import {
    LOAD_BILLS_REQUEST,
    LOAD_BILLS_SUCCESS,
    LOAD_BILLS_REQUEST_STATUS,
    LOAD_BILLS_SUCCESS_STATUS,
    REQUEST_CHANGE_STATUS_BILL_TO_DONE, 
    SUCCESS_CHANGE_STATUS_BILL_TO_DONE
   } from './'
   import constants from '../../constants';
   import { CALL_API } from '../../middleware';
   

   export function loadBillsByAdmin(){
        return {
            [CALL_API]:{
                endpoint: `${constants.API}/bills`,
                types:[LOAD_BILLS_REQUEST,LOAD_BILLS_SUCCESS]
            }
        }
   }


    export function loadBillsStatusByAdmin(status){
        return {
            [CALL_API]:{
                endpoint: `${constants.API}/bills/status/${status}`,
                types:[LOAD_BILLS_REQUEST_STATUS,LOAD_BILLS_SUCCESS_STATUS]
            }
        }
    }
    
    export function changeStatusByAdmin(value,id){
        return{
            [CALL_API]:{
                endpoint:`${constants.API}/bills/edit/${id}`,
                body:{
                    ...value
                },
                method:'put',
                types:[REQUEST_CHANGE_STATUS_BILL_TO_DONE,SUCCESS_CHANGE_STATUS_BILL_TO_DONE]

            }
        }
    }
    


