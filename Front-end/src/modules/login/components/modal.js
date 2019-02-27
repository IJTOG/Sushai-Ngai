import React from 'react';
import { Col,Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input } from 'reactstrap'
import { SignUp } from '../../index'
import {withAuth }  from '../../../lib'
import { compose,withHandlers,withState } from 'recompose'
import { connect } from 'react-redux'
import { login } from '../../../redux/action'
import {withRouter} from 'react-router-dom'
import {PacmanLoader} from 'react-spinners'

const ModalLogin = ({ 
 login,
 formLogin,
 openSignUp,
 handleInput,
 isOpen,
 handleOpen
  }) => (
<Modal isOpen={isOpen} >
          <ModalHeader toggle={handleOpen}>Login</ModalHeader>
          <ModalBody>
          {formLogin.isLoading ? <PacmanLoader
             //   className={override}
            sizeUnit={"px"}
            size={70}
            color={'#36D7B7'}
            loading={true}
            />  : 
                                  <Form>
                                  <FormGroup row>
                                      <Label for="username" sm={2}>Username</Label>
                                      <Col sm={10}>
                                          <Input 
                                               type="email" 
                                               name="username" 
                                               placeholder="Enter username" 
                                               onChange={handleInput} 
                                          />
                                      </Col>
                                      </FormGroup>
                                      <FormGroup row>
                                      <Label for="password" sm={2}>Password</Label>
                                      <Col sm={10}>
                                          <Input 
                                              type="password" 
                                              name="password" 
                                              placeholder="Enter password" 
                                              onChange={handleInput} 
                                          />
                                      </Col>
                                  </FormGroup>
                                  <SignUp />
                                </Form>
                                
          }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => login(formLogin.username,formLogin.password)}>Submit</Button>{' '}
            <Button color="secondary" onClick={handleOpen}>Cancel</Button>
          </ModalFooter>
        </Modal>

)

export default compose(
  withAuth,
  withRouter,
  withState('formLogin','setformLogin',{ 
    username: "", 
    password: "", 
    isOpenSignUp:false,
    isLoading:false 
  }),
  connect(
    ({auth,user}) => ({auth,user}),
     (dispatch,{setformLogin,auth}) => ({
      login(username,password){
        if(username !== "" && password !== ""){
          dispatch(login(username,password))
          setformLogin({
            isLoading:true
          })
           setTimeout( _ => {
             if(auth.getToken())
             window.location.href = '/'
             else{
              setformLogin({
                isLoading:false
              })
               alert("Username or Password is incorrect")
             }
           },3000)
          }
          else{
            alert("Pleas enter username and password")
          }
      }
     }) 
  ),
  withHandlers({
    openSignUp:({ setformLogin,formLogin }) => () => {
      setformLogin({
        isOpenSignUp:!formLogin.isOpenSignUp
      })
    },
    handleInput:({ setformLogin,formLogin }) => ({target}) => {
      setformLogin(Object.assign(formLogin, {
        [target.name]: target.value
      }))
    }
  })
)(ModalLogin)


