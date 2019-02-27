import React from 'react'
import { Col,Form, FormGroup, Label, Input } from 'reactstrap'
import {
 compose,
 withHandlers,
 withState,
} from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './style.css'
import axios from 'axios'
import constants from '../../constants';

const EditCategory = ({
    handleInput,user,handlesubmit
}) => (
    <div className="container" style={{padding:"5%"}}>
    <h3 className='text-center'>Edit address</h3><br/><br/>
    <Form className="container"> 
       <FormGroup row>
           <Label for="name" sm={2}>address {user.id}</Label>
           <Col sm={5}>
               <Input 
                    type="textarea" 
                    name="name"
                    placeholder={user.address}
                    onChange={handleInput}
               />
           </Col>
        </FormGroup>
     </Form>
     <button style={{backgroundColor:"#93C0C5"}} onClick={handlesubmit} className="btn btn-info btn3d">submit</button>
</div>
)
export default compose(
    withRouter,
    withState('Address','setaddress',''),
    connect(
        ({user}) => ({user}),
        null
    ),
    withHandlers({
        handleInput: ({setaddress}) => ({target}) =>{
            setaddress(target.value)
        },
        handlesubmit: ({ Address,user }) => () =>{
            const body ={
                address: Address
            }
            console.log(user.id)
                    axios.put(`${constants.API}/users/edit/${user.id}`,body)
                      .then( ({data})  => {
                          if(data)
                          window.location.href = '/profile'
                    })
                   .catch( (err) => {
                    if(err) {
                      console.log(err)}}
                    )
                
        }
    })
)(EditCategory)