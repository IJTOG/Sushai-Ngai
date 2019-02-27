import Serializer from '../serializer'

const UserSereializer = {
    ...Serializer,
    get(resource){
        return this.serialize(resource)

    },
    getAll(resources){
        return resources.map(resource => this.serialize(resource))
    },
    serialize(user) {
        const {id,email,username,tel,first_name,last_name,is_admin,gallery_id,bill_id,address} = user
    
        return {id,email,username,tel,first_name,last_name,is_admin,gallery_id,bill_id,address}
      }

}

export default UserSereializer