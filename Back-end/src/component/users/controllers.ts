import User from './model'
import UserSereializer from './serializer';
const UsersControllers = {

    fillFormByOcr(req,res){
        User.uploadImage(req.body.uri).then( results =>{
            res.set('Content-Type', 'application/json');
            if(results !== undefined){
                res.status(200).json({
                    users:results
                })
            }
        }).catch(x=>console.log(x))
    },
    getAll(req,res){
        const {page,perPage} = req.query
        const user = User.paginate({},page,perPage).then(results => {
         res.set('Content-Type', 'application/json');
         if(results !== undefined){
             res.status(200).json({
                 users:results
             })
         }
         else {
             res.status(404).json("NOT FOUND")
             
          }
        })
    },
    getById(req,res){
        const result = User.findById(req.params.id).then(async results => {
            res.set('Content-Type', 'application/json');
            console.log(results,"ssssss")
                if(results !== undefined){
                    res.status(200).json({
                        user:UserSereializer.for('get',results)
                    })
                }
                else {
                    res.status(404).json("NOT FOUND")
                    
                }
          }).catch( err =>  {
            res.status(404).json("NOT FOUND")
          })
    },
    create(req,res){
        const {body} = req
        User.create(body).then(result => {
            res.set('Content-Type', 'application/json');
            if(result !== undefined){
                res
                  .status(201)
                  .json({
                    users:result,
                    Authorization:User.genToken(result)
                })
            }
            else {
                res.status(404).json("NOT FOUND")
                
            }
        }).catch(err => console.log(err) )
    
    },
    editById(req,res){
        const {body} = req
        const result = User.update(req.params.id,body).then(result => {
            res.set('Content-Type', 'application/json');
                if(result !== undefined){
                    res.status(201).json({
                        users:result
                    })
                }
                else {
                    res.status(404).json("NOT FOUND")
                    
                }
          })
    },
    deleteById(req,res){
        const {body} = req
        const result = User.destroy(req.params.id).then(async results => {
            res.set('Content-Type', 'application/json');
            res.status(201).json({"result":"delete finish"})
          })
    },
    getUsername(req,res){
        return User.findByUsername(req.params.username)

    },
    getProfile(req,res){
        const result = User.findById(req.user).then(async results => {
            res.set('Content-Type', 'application/json');
                if(results !== undefined){
                    res.status(200).json({
                        user:UserSereializer.for('get',results)
                    })
                }
                else {
                    res.status(404).json("NOT FOUND")
                }
          })
    }
}

export default UsersControllers