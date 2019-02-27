import {
    LOAD_BILLS_REQUEST,
    LOAD_BILLS_SUCCESS,
    LOAD_BILLS_REQUEST_STATUS,
    LOAD_BILLS_SUCCESS_STATUS,
} from '../action'
import moment from 'moment'
const initialState = {
    isLoading:false,
    items:[],
    billId:"",
}

export default (state=initialState,{type,payload}) => {
    let itemsRow = []
     if(payload !==undefined) {
         if(payload.Bill !== undefined){
             let bill = payload.Bill
              let products=""
              bill.map(data=>{
                 Object.keys(data['lists']).map(p=>{
                   if(data['lists'][p]['product_id']['name_th'] !== undefined) 
                   products+=data['lists'][p]['product_id']['name_en']+" x"+data['lists'][p]['qty']+ " "
                 })
                 if(data['user_id'] !== null)
                 itemsRow = itemsRow.concat({
                   billId:data['id'],
                   customerName:`${data['user_id']['username']}`,
                   date:moment(bill["bill_date"]).format('DD-MM-YYYY'),
                   status:data['status'],
                   amount:data['amount'],
                   products
                  })
                  products = ""
               })
             
         }
        }
    switch (type) {
         case LOAD_BILLS_REQUEST:
         return{
           isLoading:true,
           items:[]
         }
         case LOAD_BILLS_SUCCESS:
         
         return{
           isLoading:false,
           items:itemsRow
         }
         case LOAD_BILLS_REQUEST_STATUS:
         return{
           isLoading:true,
           items:[],
         }
         case LOAD_BILLS_SUCCESS_STATUS:
         return{
           isLoading:false,
           items:itemsRow,
         }

        default:
            return state
    }
}