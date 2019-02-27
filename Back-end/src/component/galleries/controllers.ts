import Gallery from './model'

const galleriesController = {
    getAll(req,res){
       const {page,perPage} = req.query
       const gallery = Gallery.paginate({},page,perPage).then(results => {
        res.set('Content-Type', 'application/json');
        if(results !== undefined){
            res.status(200).json({
                galleries:results
            })
        }
        else {
            res.status(404).json("NOT FOUND")
            
         }
       })
    },
    getById(req,res){
        res.set('Content-Type', 'application/json');
        Gallery.findById(req.params.id).then(results => {
            res.set('Content-Type', 'application/json');
            res.status(200).json({
                gallery:results
            })
        }).catch(err => {
            res.status(404).json({
                gallery:"NOT FOUND"
            })
        }) 
    },
    create(req,res){
        const {body} = req
            Gallery.create(body).then(result => {
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
         const result = Gallery.update(req.params.id,body).then(result => {
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
        const result = Gallery.destroy(req.params.id).then(async results => {
            res.set('Content-Type', 'application/json');
            res.status(201).json({"result":"delete finish"})
          })
    }
}

export default galleriesController