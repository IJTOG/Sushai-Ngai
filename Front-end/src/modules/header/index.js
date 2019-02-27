import Bar from './components/ฺBar'
import {withRouter } from 'react-router-dom'
import {withAuth} from '../../lib'
import {
 withState,
 withHandlers,
 compose
} from 'recompose'
import {connect} from 'react-redux'
import {logout} from '../../redux/action'
import { deleteSession } from '../../redux/action'

export default compose(
    withRouter,
    withAuth,
    withState('isOpen','setOpen',false),
    withState('isOpenLogin','setOpenLogin',false),
    withState('isOpenSignup','setOpenSignup',false),
    withHandlers({
        toggle: ({setOpen,isOpen}) => _ => {
            setOpen(!isOpen)
        },
        handleClickLogin: ({isOpenLogin,setOpenLogin,}) => _ => {
            setOpenLogin(!isOpenLogin)
        }
    }),
    connect(
        null,
        (dispatch,{history}) => ({
            handleLogout(){
                dispatch(logout)
                dispatch(deleteSession())
                window.location.href = '/'
            }
        })
    )
)(Bar)
