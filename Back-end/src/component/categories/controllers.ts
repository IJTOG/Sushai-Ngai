import Category from './model'

const CategoriesControllers = {
    getAll(req,res){
        const {page,perPage} = req.query
       const category = Category.paginate({},page,perPage).then((result) => {
        res.set('Content-Type', 'application/json');
        setTimeout(function(){ 
            if(result !== undefined){
                res.status(200).json({
                    categories:result['Category'],
                    meta:result['meta']
                })
            }
            else {
                res.status(404).json("NOT FOUND")
                
             }
        },1500)
       
       })
    },
    getById(req,res){
        res.set('Content-Type', 'application/json');
        Category.findById(req.params.id).then(results => {
            res.set('Content-Type', 'application/json');
            res.status(200).json({
                categories:results
            })
        }).catch(err => {
            res.status(404).json({
                category:"NOT FOUND"
            })
        }) 
    },
    create(req,res){
        const {body} = req
        Category.create(body).then(result => {
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
        const result = Category.update(req.params.id,body).then(result => {
            res.set('Content-Type', 'application/json');
                if(result !== undefined){
                    res.status(201).json({
                        categories:result
                    })
                }
                else {
                    res.status(404).json("NOT FOUND")
                    
                }
          })
    },
    deleteById(req,res){
        const result = Category.destroy(+req.params.id).then(async results => {
            res.set('Content-Type', 'application/json');
            res.status(201).json({"result":"delete finish"})
          }).catch( err => console.error(err))
    },
    uploadPic(req,res){
        Category.uploadPic(req.body.uri).then( ({url}) => {
            res.status(201).json({
                url
            })
        })
    }

}

export default CategoriesControllers