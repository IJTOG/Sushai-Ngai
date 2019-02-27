import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'
import category from './category'
import product from './product'
import cart from './cart'
import bill from './bill'
import admin from './admin'
import chart from './chart'
import gallery from './gallery'

export default combineReducers({
  user,
  auth,
  category,
  product,
  cart,
  bill,
  admin,
  chart,
  gallery
})