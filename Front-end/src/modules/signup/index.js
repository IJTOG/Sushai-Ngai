import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import {withAuth} from '../../lib'
import ImageUploader from 'react-images-upload';
import {
 withState,
 withHandlers
} from 'recompose'
import { compose } from 'redux';
import {connect} from 'react-redux'
import {uploadGallery,upToCloud,register} from '../../redux/action'
import {PacmanLoader} from 'react-spinners'
import {withRouter} from 'react-router-dom'

const SignUp = ({
 uploadGallery,modal,toggle,closeModal,first_name,
 last_name, email, tel, username, password, address,
 Onchange,handleSubmit,isFetching,isUploaded
}) => (
  <div>
        <Button color="danger" onClick={toggle}>Register</Button>
        <Modal isOpen={modal} >
          <ModalHeader toggle={closeModal}>SignUp</ModalHeader>
          <ModalBody>
            <Form>
            {isFetching ? <div className="container" style={{position: "fixed",
                                        top: "50%",
                                        left:"50%",
                                        marginTop: "-50px",
                                        marginLeft: "-100px"}}>
                                            <PacmanLoader
             //   className={override}
            sizeUnit={"px"}
            size={70}
            color={'#36D7B7'}
            loading={true}
            />
                            </div>     :    
                            <div>
                              <ImageUploader
                                  withIcon={true}
                                  buttonText='Choose images profile'
                                  onChange={uploadGallery}
                                  imgExtension={['.jpg', '.gif', '.png']}
                                  maxFileSize={5242880}
                                  withPreview={true}
                                  withLabel={false}
                              /> 
                              {isUploaded &&
                                  <h6> Upload picture already</h6>
                              }
                               <FormGroup row>
                        <Label for="firstname" sm={2}>Firstname</Label>
                        <Col sm={4}>
                          <Input
                            value = {first_name}
                            name="first_name"
                            placeholder=""
                            onChange={Onchange}
                          />
                        </Col>
                        <Label for="lastname" sm={2}>Lastname</Label>
                        <Col sm={4}>
                          <Input
                            value = {last_name}
                            name="last_name"
                            placeholder=""
                            onChange={Onchange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Email</Label>
                        <Col sm={4}>
                          <Input
                            type="email"
                            name="email"
                            placeholder=""
                            onChange={Onchange}
                          />
                        </Col>
                        <Label sm={2}>Tel</Label>
                        <Col sm={4}>
                          <Input
                            type="tel"
                            name="tel"
                            placeholder=""
                            onChange={Onchange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2} for="exampleText">Address</Label>
                        <Col sm={10} >
                          <Input
                          type="textarea" 
                          name="address" 
                          onChange={Onchange} 
                          value = {address}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Username</Label>
                        <Col sm={4}>
                          <Input
                            name="username"
                            placeholder=""
                            onChange={Onchange}
                          />
                        </Col>
                        <Label sm={2}>Password</Label>
                        <Col sm={4}>
                          <Input
                            type="password"
                            name="password"
                            placeholder=""
                            onChange={Onchange}
                          />
                        </Col>
                      </FormGroup>
                        </div>
            }
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
)
export default compose(
  withAuth,
  withRouter,
  withState('modal','setModal',false),
  withState('first_name','setFname',''),
  withState('last_name','setLname',''),
  withState('email','setEmail',''),
  withState('tel','setTel',''),
  withState('address','setAddress',''),
  withState('username','setUsername',''),
  withState('password','setPassword',''),
  withState('uri','setUri',""),
  withState('isFetching','setFetching',false),
  withState('isUploaded','setUploaded',false),
  connect(
    ({gallery}) => ({gallery}),
        (dispatch,props)=>({
            async uploadGallery(file,base64){
                props.setFetching(true)
                const uri = base64[0]
                const alt_name = file[0]['name']
                dispatch(uploadGallery(await upToCloud(uri),alt_name))
                props.setFetching(false)
                props.setUploaded(true)
            },
            dispatch
        })
  ),
 withHandlers({

  toggle : ({setModal,modal}) => _ => {
    setModal(!modal)
  },

  closeModal : ({setModal}) => _ => {
    setModal(false)
  },

  handleSubmit : ({ gallery,first_name,
                  last_name, email, tel, username,
                  password, address ,auth:{setToken},dispatch,
                  history
  }) => _ => {
    if(first_name && last_name && email && tel && username && password && address !== ""){
    const  body = {
          first_name,
          last_name,
          email,
          address,
          tel,
          username,
          password, 
          gallery_id:gallery['galleryId'] > 0 ? gallery['galleryId'] : null
       }
       dispatch(register(body))
       setTimeout(() => {
          window.location.href = '/'
          alert('register success please log-in')
       }, 1000);
    }
  },
  Onchange : ({setAddress,setFname,setLname,setEmail,setTel,setUsername,setPassword}) => e => {
     switch(e.target.name) {
       case 'first_name':
       setFname(e.target.value)
       break;
       case 'last_name':
       setLname(e.target.value)
       break;
       case 'username':
       setUsername(e.target.value)
       break;
       case 'password':
       setPassword(e.target.value)
       break;
       case 'email':
       setEmail(e.target.value)
       break;
       case 'tel':
       setTel(e.target.value)
       break;
       case 'address':
       setAddress(e.target.value)
       break;
     default:
       break;
   }     
  }
 })
)(SignUp)
