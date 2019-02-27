import Users from '../users/model'
import SessionsSerializer from './serializers'

const SessionsController = {
     create(req,res){
         const {username,password} = req.body
         const result = Users.findByUsername(username).then(user => {
            Users.verify(user[0],password).then(isValid =>{
                if(isValid){
                   res
                     .header('Authorization',`Bearer ${Users.genToken(user[0].id)}` )
                     .status(201)
                     .json({
                         user: SessionsSerializer.for('create', user[0]),
                         Authorization: `Bearer ${Users.genToken(user[0].id)}`
                     })
                }
                else {
                   res
                     .status(401)
                     .json({
                         user:{
                             errors:['Invalid Credential']
                         }
                     })
                }
            })
         }).catch( _ => {
            res
            .status(404)
         })
     }
}

export default SessionsController