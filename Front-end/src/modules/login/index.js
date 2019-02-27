import React from 'react'
import { Modal } from './components' 
class Login extends React.Component {

    render(){

        return(
            <Modal handleOpen= {this.props.handleOpen} isOpen ={this.props.isOpen}/>
        )
    }
}
export default Login