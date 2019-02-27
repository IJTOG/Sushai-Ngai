import Serializer from '../users/serializer'

const SessionsSerializer = {
    ...Serializer,
     create(user){
         const {id,email,username,tel,first_name,last_name,is_admin,address,gallery_id} =  user
         return  {id,email,username,tel,first_name,last_name,is_admin,address,gallery_id} 
    }
}

export default SessionsSerializer