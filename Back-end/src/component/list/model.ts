import Model from '../model'
import { getConnection,createQueryBuilder } from 'typeorm';
import * as moment from 'moment'
import Repo from '../../entity/List'
const List = {
    ...Model,
    relations:['bill_id','product_id'],
    key:'List',
    createList(billId,product){
        let product_id = product.map(data=>data.id)
        let qty = product.map(data=>data.qty)
        return new Promise(async (resolve,reject) => {
            for(let i=0;i<qty.length;i++){
                await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(this.collection())
                    .values([{ 
                        bill_id:billId,
                        product_id:product_id[i],
                        qty:qty[i]           
                }])
                .execute().then(({identifiers}) => resolve(identifiers[0]['id']))
            }
    })
  },
 async qtyPerDay(){
   const data=  await getConnection()
    .getRepository(Repo)
    .find()
      return new Promise((resolve)=>{
          let dates= []
          let list = data.map( (data,index)=>{
           dates[index] =  moment( data['created_at']).format('DD/MM/YYYY')           
          })
          let date = []
          date = dates.filter(function(item, pos) {
              return dates.indexOf(item) == pos
          })
          
          let qty = date.map(_=>0)
          for(let i =0;i<date.length;i++){
              for(let j =0;j<data.length;j++){
                  if(date[i]== moment(data[j]['created_at']).format('DD/MM/YYYY')){
                      qty[i] += data[j]['qty']
                  }
                }
          }
          let qtyPerDate = date.map((_,i)=>([date[i],qty[i]]))
          resolve({
            qtyPerDate
          })
      })
  }
}

export default List
// SELECT Bill.id , Bill.amount , user.username 
// from ((Bill INNER JOIN user on user.id = bill.userIdId) INNER JOIN list on list.billIdId = bill.id)
// WHERE bill.id = 24