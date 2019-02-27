import Model from '../model'
import {getConnection} from "typeorm"
import {Category} from '../../entity'
const Product = {
    ...Model,
    key: 'Product',
    relations:["categories_id","galleries_id"],

}

export default Product