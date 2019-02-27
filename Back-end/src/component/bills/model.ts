import Model from '../model'
import {getConnection} from 'typeorm'
import {List ,Bill as BillEntity,Product,User} from '../../entity'

const Bill = {
    ...Model,
    relations:["user_id"],
    key:'Bill',
    createBill(amount,id){
        return new Promise(async (resolve,reject) => {
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(this.collection())
            .values([{ 
            amount,
            user_id:id ,
            status:'onProgress'                
        }])
        .execute()
        .then( ({identifiers}) => resolve(identifiers[0]['id']))
        .catch(err => console.error(err))
        })   
    },
  async queryBill(id){
    return  await  getConnection().getRepository(BillEntity).createQueryBuilder('bill').leftJoinAndSelect("bill.lists", "list").
                   leftJoinAndSelect("list.product_id","product").leftJoinAndSelect("bill.user_id","user").where(`bill.id = ${id}`).getMany()
 },
 async queryBills(){
    return  await  getConnection().getRepository(BillEntity).createQueryBuilder('bill').leftJoinAndSelect("bill.lists", "list").
                   leftJoinAndSelect("list.product_id","product").leftJoinAndSelect("bill.user_id","user").getMany()
 },
 async queryBillStatus(status){
    return  await  getConnection().getRepository(BillEntity).createQueryBuilder('bill').leftJoinAndSelect("bill.lists", "list").
                   leftJoinAndSelect("list.product_id","product").leftJoinAndSelect("bill.user_id","user").where(`bill.status = "${status}"`).getMany()
 }
}

export default Bill