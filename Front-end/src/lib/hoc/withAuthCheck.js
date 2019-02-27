import React from 'react'
import {Redirect} from 'react-router-dom'
import {
    compose,
    setDisplayName,
    branch ,
    renderComponent
} from 'recompose'
import withAuth from './withAuth';

const RedirectToHome = () => <Redirect to='/'/>

const withAuthCheck = WrappedComponent => props => (
    <WrappedComponent {...props}/>
)

export default WrappedComponent => compose(
    setDisplayName('withAuthCheck'),
    withAuth,
    branch(({
        auth:{getToken}
    })=>getToken(),
    withAuthCheck,
    renderComponent(RedirectToHome)
    )
)(WrappedComponent)