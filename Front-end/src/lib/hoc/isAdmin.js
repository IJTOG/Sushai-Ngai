import React from 'react'
import {
 compose
} from 'recompose'
import {
 connect
} from 'react-redux'

const isAdmin  = WrappedComponent => props => (
   props.user['is_admin'] !== undefined ?
    <WrappedComponent {...props} isAdmin={props.user['is_admin']} />
                                        : 
    <WrappedComponent {...props} isAdmin={false} />               
)

export default WrappedComponent => compose(
  connect(
      ({user}) => ({user})
  ),
  isAdmin
)(WrappedComponent)