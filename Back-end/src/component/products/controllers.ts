import Product from './model'

const ProductsController = {
   getAll(req,res){
       const {page,perPage} = req.query
       const product = Product.paginate({},page,perPage).then(({Product,meta}) => {
        res.set('Content-Type', 'application/json');
        if(Product !== undefined){
            res.status(200).json({
                products:Product,
                meta
            })
        }
        else {
            res.status(404).json("NOT FOUND")
            
         }
       })
   },
  getById(req,res){
       res.set('Content-Type', 'application/json');
        Product.findById(req.params.id).then(results => {
            res.set('Content-Type', 'application/json');
            res.status(200).json({
                product:results
            })
        }).catch(err => {
            res.status(404).json({
                product:"NOT FOUND"
            })
        })      
  },
  create(req,res){
    const {body} = req
    Product.create(body).then(result => {
        res.set('Content-Type', 'application/json');
        res.status(201).json({
            result:"created"
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
      const result = Product.update(req.params.id,body).then(result => {
          res.set('Content-Type', 'application/json');
              if(result !== undefined){
                  res.status(201).json({
                      products:result
                  })
              }
              else {
                  res.status(404).json("NOT FOUND")
                  
              }
        })
  },
  deleteById(req,res){
      const result = Product.destroy(req.params.id).then(async results => {
          res.set('Content-Type', 'application/json');
          res.status(201).json({"result":"delete finish"})
        })
  }
  
}
export default ProductsController