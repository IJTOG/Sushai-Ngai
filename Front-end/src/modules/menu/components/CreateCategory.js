import React from 'react'
import { Col,Form, FormGroup, Label, Input } from 'reactstrap'
import {
 compose,
 withHandlers,
 withState
} from 'recompose'
import { connect } from 'react-redux'
import { uploadGallery ,createCategory,upToCloud } from '../../../redux/action'
import FileBase64 from 'react-file-base64'
import {PacmanLoader} from 'react-spinners'
import {withRouter} from 'react-router-dom'

const CreateCategory = ({
 isUploaded,name,detail,setDetail,setName,handleInput,createCategory,uploadGallery,setUri,uri,nameOfPic,gallery,isFetching,insertCategory
}) => (
    <div className='container' style={{paddingLeft:"5%",paddingRight:"5%"}}><br/>
               <h3 className="text-center">Create Categories</h3><br/>
         <Form>
             { }
             {isFetching ? <div className="container" style={{position: "fixed",
                                        top: "50%",
                                        left:"50%",
                                        marginTop: "-50px",
                                        marginLeft: "-100px"}}>
                                            <PacmanLoader
                                            //   className={override}
                                            sizeUnit={"px"}
                                            size={150}
                                            color={'#36D7B7'}
                                            loading={true}
                                            />
                                        </div> :  
                    <div>
                    {!isUploaded ? 
                    <div>
                            <FileBase64
                            multiple={ true }
                            onDone={uri => setUri(uri)} 
                            />
                        <FormGroup row>
                        
                            <Label for="alt_name" sm={2}>name of picture</Label>
                            <Col sm={3}>
                                <Input 
                                    type="text" 
                                    name="alt_name" 
                                    onChange={handleInput}
                                    />
                            </Col>
                            <Col>
                                <button onClick={(e)=>uploadGallery(uri,nameOfPic,e)}>upload</button>
                            </Col>
                        </FormGroup>
                    </div> : <h6> Upload picture already</h6>
                        
                }
            <FormGroup row>
                <Label for="name" sm={2}>name</Label>
                <Col sm={5}>
                    <Input 
                         type="text" 
                         name="name" 
                         onChange={handleInput}
                         />
                </Col>
             </FormGroup>
                <FormGroup row>
                <Label for="detail" sm={2}>detail</Label>
                <Col sm={5}>
                    <Input 
                        type="textarea" 
                        name="detail"
                        onChange={handleInput}
                        />
                </Col>
            </FormGroup>
            <button className="btn btn-primary" onClick={insertCategory}>submit</button>
            </div>  
                                    
            }
       
          </Form>
    </div>
    )
    export default compose(
    withRouter,
    withState('name','setName',""),
    withState('detail','setDetail',""),
    withState('nameOfPic','setNameOfPic',""),
    withState('uri','setUri',""),
    withState('isFetching','setFetching',false),
    withState('isUploaded','setUploaded',false),
    connect(
        ({gallery}) => ({gallery}),
        (dispatch,props)=>({
            async uploadGallery(file,nameOfPic,e){
                e.preventDefault()
                props.setFetching(true)
                const uri = file[0].base64
                dispatch(uploadGallery(await upToCloud(uri),nameOfPic))
                props.setFetching(false)
                props.setUploaded(true)
            },
            dispatch
        })
    ),
    withHandlers({
        handleInput: ({setName,setDetail,setNameOfPic}) => ({target}) => {
            switch (target.name) {
                case "name": 
                    setName(target.value)
                    break;
                case "detail": 
                    setDetail(target.value)
                    break;
                case "alt_name":
                    setNameOfPic(target.value)
                    break
                default:
                    break;
            }
        },
        insertCategory:(props)=>(event)=>{
            event.preventDefault();
            if(!props.isUploaded) alert('please upload picture before you submit')
            const {name,detail,gallery,nameOfPic,dispatch} = props
            dispatch(createCategory({name,detail,gallery,nameOfPic}))
            setTimeout(() => {
                props.history.push('/menu')
            }, 1000);
    }
    })
)(CreateCategory)