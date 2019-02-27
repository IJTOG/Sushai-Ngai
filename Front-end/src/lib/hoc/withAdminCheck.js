import React from 'react'
import {
    renderComponent,
    compose, branch
} from 'recompose'
import {
 connect
} from 'react-redux'
import {Redirect} from 'react-router-dom'

const RedirectToHome = () => <div>
                                {alert('you are not admin')}
                                <Redirect to='/'/>
                             </div>

const withAdminCheck  = WrappedComponent => props => (
    <WrappedComponent {...props} />               
)

export default WrappedComponent => compose(
  connect(
      ({auth:{user}}) => ({user})
  ),
  branch(
      ({user})=> user['is_admin'],
      withAdminCheck,
      renderComponent(RedirectToHome)
  ),
  withAdminCheck
)(WrappedComponent)