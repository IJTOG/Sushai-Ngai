import Bill from './model'
import List from '../list/model'
import {getConnection} from 'typeorm'
import {Product} from '../../entity'
const BillsControllers = {
    getAll(req,res){
        Bill.queryBills().then(result => {
            res.set('Content-Type', 'application/json')
            res.status(200)
                .json({
                    "Bill":result
                })
        })
    },
    getById(req,res){
        res.set('Content-Type', 'application/json');
        Bill.findById(req.params.id).then(results => {
            res.set('Content-Type', 'application/json');
            res.status(200).json({
                bill:results
            })
        }).catch(err => {
            res.status(404).json({
                bill:"NOT FOUND"
            })
        }) 
    },
    create(req,res){
        const {body} = req
        const {user,amount,product} = body
        let product_id = product.map(data=>data.id)
        let qtys = product.map(data=>data.qty)
        Bill.createBill(amount,user).then( bill =>{
            List.createList(bill,product).then( id =>{
                res.set('Content-Type', 'application/json');
                 res.status(201)
                    .json({
                        result:"Done",
                        id:bill
                    })
            })
            
        }).then(async _=>{
            for(let i = 0; i< qtys.length;i++){
                await  getConnection()
                        .getRepository(Product)
                        .findOne(product_id[i]).then( async result =>{
                            await getConnection()
                                .createQueryBuilder()
                                .update(Product)
                                .set({ quantity:result['quantity']-qtys[i] })
                                .where("id = :id", { id: product_id[i] })
                                .execute();
                        })
            }
        })


    },
    editById(req,res){
        const {body} = req
        const result = Bill.update(req.params.id,body).then(result => {
            res.set('Content-Type', 'application/json');
                if(result !== undefined){
                    res.status(201).json({
                        bill:result
                    })
                }
                else {
                    res.status(404).json("NOT FOUND")
                    
                }
          })
    },
    deleteById(req,res){
        const result = Bill.destroy(req.params.id).then(async results => {
            res.set('Content-Type', 'application/json');
            res.status(201).json({"result":"delete finish"})
          })
    },
    queryBill(req,res){
        Bill.queryBill(req.params.id).then(result => {
            res.set('Content-Type', 'application/json')
            res.status(200)
                .json({
                    "Bill":result
                })
        })

    },
    queryBillStatus(req,res){
        Bill.queryBillStatus(req.params.status).then(result => {
            res.set('Content-Type', 'application/json')
            res.status(200)
                .json({
                    "Bill":result
                })
        })
    }

}

export default BillsControllers