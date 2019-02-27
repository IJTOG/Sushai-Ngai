import List from './model'
import * as moment from 'moment'
const listController = {
    getAll(req,res){
       const {page,perPage} = req.query
       const gallery = List.paginate({},page,perPage).then(results => {
        res.set('Content-Type', 'application/json');
        if(results !== undefined){
            res.status(200).json({
                list:results['List'],
                meta:results['meta']
            })
        }
        else {
            res.status(404).json("NOT FOUND")
            
         }
       })
    },
    getById(req,res){
        res.set('Content-Type', 'application/json');
        List.findById(req.params.id).then(results => {
            res.set('Content-Type', 'application/json');
            res.status(200).json({
                list:results
            })
        }).catch(err => {
            res.status(404).json({
                list:"NOT FOUND"
            })
        }) 
    },
    create(req,res){
        const {body} = req
            List.create(body).then(result => {
            res.set('Content-Type', 'application/json');
            res.status(201).json({
                result:"created",
                gallery:{
                    id:result
                }
            })
        }
        ).catch(err => {
            res.status(201).json({
                result:"fail",
                err
            })
        })
    },
    editById(req,res){
        const {body} = req
         const result = List.update(req.params.id,body).then(result => {
          res.set('Content-Type', 'application/json');
              if(result !== undefined){
                  res.status(201).json({
                      gallery:result
                  })
              }
              else {
                  res.status(404).json("NOT FOUND")
                  
              }
        })
    },
    deleteById(req,res){
        const result = List.destroy(req.params.id).then(async results => {
            res.set('Content-Type', 'application/json');
            res.status(201).json({"result":"delete finish"})
          })
    },
    getQtyPerDay(req,res){
        const {page,perPage} = req.query
    
         List.qtyPerDay().then(({qtyPerDate})=>{
             res.set('Content-Type', 'application/json');
             if(qtyPerDate !== undefined){
                 res.status(200).json({
                    qtyPerDate
                 })
             }
             else {
                 res.status(404).json("NOT FOUND")
                 
              }
            })
    }
}

export default listController